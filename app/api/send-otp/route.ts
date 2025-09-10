import { NextRequest, NextResponse } from "next/server";
import { AuthDB } from "@/lib/auth-db";
import { sendVerificationEmail } from "@/lib/resend";
import { z } from "zod";

const sendOtpSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = sendOtpSchema.parse(body);

    const user = await AuthDB.findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await AuthDB.setVerificationToken(email, otp);
    const emailSent = await sendVerificationEmail(email, otp);

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Verification code sent to your email"
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}