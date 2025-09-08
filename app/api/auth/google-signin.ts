import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, name, googleId, avatar } = await request.json();
    
    if (!email || !googleId) {
      return NextResponse.json(
        { error: "Email and Google ID required" },
        { status: 400 }
      );
    }

    await dbConnect();
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user for Google OAuth
      user = await User.create({
        fullname: name || "Google User",
        email: email,
        password: await bcrypt.hash(Math.random().toString(36), 10),
        provider: "google",
        googleId: googleId,
        avatar: avatar,
        isVerified: true,
      });
    } else if (!user.googleId) {
      // Update existing user with Google info
      user.googleId = googleId;
      user.avatar = avatar;
      user.isVerified = true;
      await user.save();
    }

    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.fullname,
    });
    
  } catch (error) {
    console.error("Google signin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}