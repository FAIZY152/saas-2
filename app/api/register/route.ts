import { NextRequest, NextResponse } from "next/server";
import { AuthDB } from "@/lib/auth-db";
import { authRateLimiter, withRateLimit } from "@/lib/rateLimiter";
import { registerSchema } from "@/validators/authValidators";
import { ZodError } from "zod";

async function registerHandler(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullname, email, password } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await AuthDB.findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" }, 
        { status: 409 }
      );
    }

    // Create new user
    const user = await AuthDB.createUser({
      fullname,
      email: email.toLowerCase(),
      password,
      provider: "credentials",
      isVerified: false,
    });

    return NextResponse.json(
      { 
        message: "User created successfully",
        userId: user.id
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

    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(registerHandler, authRateLimiter);