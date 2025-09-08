import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    await dbConnect();
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.fullname,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}