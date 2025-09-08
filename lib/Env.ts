const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'NEXTAUTH_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
] as const;

// Validate required environment variables
function validateEnv() {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }
}

// Only validate in production or when NODE_ENV is set
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV) {
  validateEnv();
}

export class Env {
  static readonly BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';
  static readonly MONGO_URI = process.env.MONGO_URI!;
  static readonly JWT_SECRET = process.env.JWT_SECRET!;
  static readonly NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;
  static readonly REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
  static readonly GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
  static readonly GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
  static readonly YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  static readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  static readonly NODE_ENV = process.env.NODE_ENV || 'development';
  static readonly BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
  static readonly RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
  static readonly RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10);
  static readonly SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || '2592000', 10);
  
  // Security headers configuration
  static readonly SECURITY_HEADERS = {
    'X-DNS-Prefetch-Control': 'on',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  } as const;
}
