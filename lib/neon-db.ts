import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "@/lib/schema";

const sql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle(sql, { schema: { users } });

export { users };
