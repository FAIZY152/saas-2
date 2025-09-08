import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, name, image, googleId } = await request.json();

    await dbConnect();
    
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        fullname: name || "Google User",
        email,
        password: await bcrypt.hash(Math.random().toString(36), 10),
        provider: "google",
        googleId,
        avatar: image,
        isVerified: true,
      });
    }

    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.fullname,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}