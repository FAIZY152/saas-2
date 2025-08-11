import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, verifyAccessToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  const refresh = req.cookies.get("refresh-token")?.value;
  if (!refresh)
    return NextResponse.json({ error: "No token" }, { status: 401 });

  let payload;
  try {
    payload = verifyAccessToken(refresh);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (typeof payload === "string" || !("sub" in payload)) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 401 }
    );
  }

  const newAccess = generateAccessToken({
    sub: payload.sub,
    email: payload.email,
  });
  const res = NextResponse.json({ success: true });

  // 1. Delete old access-token if needed
  res.cookies.delete("access-token");

  // 2. Set new tokens consistently
  res.cookies.set("access-token", newAccess, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60,
    path: "/",
    domain: "localhost",
  });

  return res;
}
