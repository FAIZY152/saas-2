import { db, users } from '@/lib/neon-db';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import type { User, NewUser } from '@/lib/schema';

const SALT_ROUNDS = 10;

export class AuthDB {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static async createUser(userData: Omit<NewUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password);
    
    const [user] = await db.insert(users).values({
      ...userData,
      password: hashedPassword,
    }).returning();

    return user;
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  static async findUserByEmailOrGoogleId(email: string, googleId?: string): Promise<User | null> {
    const conditions = [eq(users.email, email)];
    if (googleId) {
      conditions.push(eq(users.googleId, googleId));
    }
    
    const [user] = await db.select().from(users).where(or(...conditions));
    return user || null;
  }

  static async updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const [user] = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  static async setVerificationToken(email: string, token: string): Promise<void> {
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await db.update(users)
      .set({ verificationToken: token, tokenExpiry: expiry })
      .where(eq(users.email, email));
  }

  static async verifyToken(email: string, token: string): Promise<boolean> {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.email, email));
    
    if (!user || !user.verificationToken || !user.tokenExpiry) {
      return false;
    }
    
    if (user.verificationToken !== token || new Date() > user.tokenExpiry) {
      return false;
    }
    
    await db.update(users)
      .set({ isVerified: true, verificationToken: null, tokenExpiry: null })
      .where(eq(users.email, email));
    
    return true;
  }
}