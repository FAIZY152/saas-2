import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User, { IUser } from "@/models/UserSchema";
import { authRateLimiter, withRateLimit } from "@/lib/rateLimiter";
import { registerSchema } from "@/validators/authValidators";
import { ZodError } from "zod";


async function registerHandler(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { fullname, email, password } = registerSchema.parse(body);

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" }, 
        { status: 409 } // Conflict status
      );
    }

    // Create new user (password will be hashed automatically)
    const user = await User.create({
      fullname,
      email,
      password,
      provider: "credentials",
      isVerified: false, // Email verification required
    }) as IUser;

    // Ensure user._id exists
    if (!user._id) {
      throw new Error("User creation failed");
    }

    // Don't return sensitive user data
    return NextResponse.json(
      { 
        message: "User created successfully",
        userId: user._id.toString()
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          error: "Validation error", 
          details: process.env.NODE_ENV === 'development' ? error.errors : undefined
        }, 
        { status: 400 }
      );
    }

    // Handle MongoDB duplicate key error
    if (typeof error === "object" && error !== null && "code" in error && (error as any).code === 11000) {
      return NextResponse.json(
        { error: "User already exists" }, 
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(registerHandler, authRateLimiter);
