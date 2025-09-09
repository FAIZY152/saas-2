import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_ua9yfil7xwhm@ep-wandering-lake-a1bygco9-pooler.ap-southeast-1.aws.neon.tech/ai-sass-app?sslmode=require&channel_binding=require',
  },
} satisfies Config;