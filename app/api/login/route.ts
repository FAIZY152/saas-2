import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User, { IUser } from "@/models/UserSchema";
import { authRateLimiter, withRateLimit } from "@/lib/rateLimiter";
import { loginSchema } from "@/validators/authValidators";
import { ZodError } from "zod";

async function loginHandler(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Remove debug logs in production
    if (process.env.NODE_ENV === 'development') {
      console.log("Login attempt for:", email);
    }

    await dbConnect();
    
    // Find user with minimal data exposure
    const user: IUser | null = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      // Consistent timing to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
      
      if (process.env.NODE_ENV === 'development') {
        console.log(user ? "Invalid password" : "User not found");
      }
      
      return NextResponse.json(
        { error: "Invalid credentials" }, 
        { status: 401 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log("Login successful");
    }

    // Ensure user._id exists and is properly typed
    if (!user._id) {
      throw new Error("User authentication failed");
    }

    // Don't include sensitive data in response
    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.fullname,
    });
  } catch (error) {
    console.error('Login error:', error);
    
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

export const POST = withRateLimit(loginHandler, authRateLimiter);
