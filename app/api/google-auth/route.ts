import { NextRequest, NextResponse } from "next/server";
import { AuthDB } from "@/lib/auth-db";
import { authRateLimiter, withRateLimit } from "@/lib/rateLimiter";
import { z } from "zod";
import crypto from "crypto";

const googleAuthSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  image: z.string().url().optional(),
  googleId: z.string().min(1),
});

async function googleAuthHandler(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, image, googleId } = googleAuthSchema.parse(body);

    let user = await AuthDB.findUserByEmailOrGoogleId(email, googleId);
    
    if (!user) {
      // Generate a secure random password for Google users
      const randomPassword = crypto.randomBytes(32).toString('hex');
      
      user = await AuthDB.createUser({
        fullname: name.trim(),
        email: email.toLowerCase(),
        password: randomPassword,
        provider: "google",
        googleId,
        avatar: image,
        isVerified: true,
      });
    } else {
      // Update existing user with Google info if needed
      const updates: any = {};
      
      if (!user.googleId && user.provider === "credentials") {
        updates.googleId = googleId;
        updates.provider = "google";
      }
      
      if (!user.avatar && image) {
        updates.avatar = image;
      }
      
      if (Object.keys(updates).length > 0) {
        user = await AuthDB.updateUser(user.id, updates);
      }
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.fullname,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Invalid Google auth data", 
          details: process.env.NODE_ENV === 'development' ? error.errors : undefined
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(googleAuthHandler, authRateLimiter);