import { NextRequest, NextResponse } from "next/server";
import { AuthDB } from "@/lib/auth-db";
import { authRateLimiter, withRateLimit } from "@/lib/rateLimiter";
import { loginSchema } from "@/validators/authValidators";
import { ZodError } from "zod";

async function loginHandler(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    try {
      const user = await AuthDB.findUserByEmail(email);
      
      if (!user || !(await AuthDB.comparePassword(password, user.password))) {
        return NextResponse.json(
          { error: "Invalid email or password" }, 
          { status: 401 }
        );
      }

      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.fullname,
      });
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." }, 
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof ZodError) {
      const firstError = error.errors[0];
      return NextResponse.json(
        { 
          error: firstError.message || "Please check your email and password"
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