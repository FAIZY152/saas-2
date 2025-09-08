import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const authRateLimiter: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 attempts per window
};

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config: RateLimitConfig
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const clientIP = getClientIP(request);
    const now = Date.now();
    const key = `${clientIP}:${request.nextUrl.pathname}`;
    
    const record = requestCounts.get(key);
    
    if (!record || now > record.resetTime) {
      requestCounts.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return handler(request);
    }
    
    if (record.count >= config.maxRequests) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    
    record.count++;
    return handler(request);
  };
}