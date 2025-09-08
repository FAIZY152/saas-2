import { NextRequest, NextResponse } from 'next/server';
import { Env } from './Env';

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

class MemoryStore {
  private store: Map<string, { count: number; resetTime: number }> = new Map();

  async increment(key: string, windowMs: number): Promise<RateLimitResult> {
    const now = Date.now();
    const item = this.store.get(key);

    if (!item || now > item.resetTime) {
      // Create new or reset expired entry
      this.store.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return {
        success: true,
        limit: Env.RATE_LIMIT_MAX,
        remaining: Env.RATE_LIMIT_MAX - 1,
        reset: now + windowMs,
      };
    }

    // Increment existing entry
    item.count++;
    const remaining = Math.max(0, Env.RATE_LIMIT_MAX - item.count);
    
    return {
      success: item.count <= Env.RATE_LIMIT_MAX,
      limit: Env.RATE_LIMIT_MAX,
      remaining,
      reset: item.resetTime,
    };
  }

  // Cleanup expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now > value.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

const store = new MemoryStore();

// Cleanup expired entries every 10 minutes
setInterval(() => {
  store.cleanup();
}, 10 * 60 * 1000);

export interface RateLimitOptions {
  maxRequests?: number;
  windowMs?: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (request: NextRequest) => string;
  onLimitReached?: (request: NextRequest) => void;
}

export class RateLimiter {
  private maxRequests: number;
  private windowMs: number;
  private skipSuccessfulRequests: boolean;
  private skipFailedRequests: boolean;
  private keyGenerator: (request: NextRequest) => string;
  private onLimitReached?: (request: NextRequest) => void;

  constructor(options: RateLimitOptions = {}) {
    this.maxRequests = options.maxRequests ?? Env.RATE_LIMIT_MAX;
    this.windowMs = options.windowMs ?? Env.RATE_LIMIT_WINDOW;
    this.skipSuccessfulRequests = options.skipSuccessfulRequests ?? false;
    this.skipFailedRequests = options.skipFailedRequests ?? false;
    this.keyGenerator = options.keyGenerator ?? this.defaultKeyGenerator;
    this.onLimitReached = options.onLimitReached;
  }

  private defaultKeyGenerator(request: NextRequest): string {
    // Use forwarded IP, then connecting IP, then a fallback
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const connectingIP = request.headers.get('x-connecting-ip');
    
    const ip = forwarded?.split(',')[0] ?? realIP ?? connectingIP ?? 'unknown';
    const userAgent = request.headers.get('user-agent') ?? 'unknown';
    
    // Create a more specific key for better rate limiting
    return `${ip}:${request.method}:${request.nextUrl.pathname}:${userAgent.slice(0, 50)}`;
  }

  async limit(request: NextRequest): Promise<{
    response: NextResponse | null;
    result: RateLimitResult;
  }> {
    const key = this.keyGenerator(request);
    const result = await store.increment(key, this.windowMs);

    if (!result.success) {
      if (this.onLimitReached) {
        this.onLimitReached(request);
      }

      // Log rate limit exceeded
      console.warn(`Rate limit exceeded for key: ${key}`);

      const response = NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(result.reset / 1000).toString(),
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
          },
        }
      );

      return { response, result };
    }

    return { response: null, result };
  }
}

// Pre-configured rate limiters for different use cases
export const apiRateLimiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
});

export const authRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes - stricter for auth endpoints
});

export const strictRateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute - very strict
});

// Helper function to apply rate limiting to API routes
export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  rateLimiter: RateLimiter = apiRateLimiter
) {
  return async (request: NextRequest) => {
    const { response, result } = await rateLimiter.limit(request);
    
    if (response) {
      return response; // Rate limit exceeded
    }

    // Add rate limit headers to successful requests
    const handlerResponse = await handler(request);
    
    handlerResponse.headers.set('X-RateLimit-Limit', result.limit.toString());
    handlerResponse.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    handlerResponse.headers.set('X-RateLimit-Reset', Math.ceil(result.reset / 1000).toString());
    
    return handlerResponse;
  };
}
