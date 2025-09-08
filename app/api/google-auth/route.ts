import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User, { IUser } from "@/models/UserSchema";
import { authRateLimiter, withRateLimit } from "@/lib/rateLimiter";
import { z } from "zod";
import crypto from "crypto";

// Validation schema for Google auth data
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

    await dbConnect();
    
    let user: IUser | null = await User.findOne({
      $or: [{ email }, { googleId }]
    });
    
    if (!user) {
      // Generate a secure random password for Google users
      const randomPassword = crypto.randomBytes(32).toString('hex');
      
      user = await User.create({
        fullname: name.trim(),
        email: email.toLowerCase(),
        password: randomPassword, // Will be hashed by pre-save hook
        provider: "google",
        googleId,
        avatar: image,
        isVerified: true,
      }) as IUser;
    } else {
      // Update existing user with Google info if needed
      let needsUpdate = false;
      
      if (!user.googleId && user.provider === "credentials") {
        user.googleId = googleId;
        user.provider = "google";
        needsUpdate = true;
      }
      
      if (!user.avatar && image) {
        user.avatar = image;
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await user.save();
      }
    }

    // Ensure user._id exists and is properly typed
    if (!user._id) {
      throw new Error("User creation failed");
    }

    return NextResponse.json({
      id: user._id.toString(),
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
