import { NextRequest, NextResponse } from "next/server";
import {
  generateAccessToken,
  generateRefreshToken,
  setCookie,
} from "@/lib/jwt";
import User from "@/models/UserSchema";
import { dbConnect } from "@/lib/db";
import { loginSchema } from "@/validators/authValidators";

export async function POST(req: NextRequest) {
  // Parse and validate request body
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  await dbConnect();

  // Check that user exists
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Verify password using schema's comparePassword()
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    sub: user._id?.toString(),
    email: user.email,
  });
  const refreshToken = generateRefreshToken({ sub: user._id?.toString() });

  // Build response and set cookies
  const res = NextResponse.json(
    { message: "Logged in successfully" },
    { status: 200 }
  );
  setCookie(res, "access-token", accessToken, 15 * 60); // 15 minutes
  setCookie(res, "refresh-token", refreshToken, 7 * 24 * 60 * 60); // 7 days

  return res;
}
