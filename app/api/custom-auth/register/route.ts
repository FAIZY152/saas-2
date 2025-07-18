import { NextRequest, NextResponse } from "next/server";
import {
  generateAccessToken,
  generateRefreshToken,
  setCookie,
} from "@/lib/jwt";
import User from "@/models/UserSchema";
import { dbConnect } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { fullname, email, password } = body;
  if (!fullname || !email || !password) {
    return NextResponse.json({ error: "Fields are missing" }, { status: 400 });
  }
  await dbConnect();

  console.log("body", fullname, email, password);

  if (await User.findOne({ email })) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    );
  }

  const user = await User.create({ fullname, email, password });

  const accessToken = generateAccessToken({ sub: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ sub: user._id });

  const res = NextResponse.json(
    { message: "User registered and logged in" },
    { status: 201 }
  );
  setCookie(res, "access-token", accessToken, 15 * 60);
  setCookie(res, "refresh-token", refreshToken, 7 * 24 * 60 * 60);

  return res;
}
