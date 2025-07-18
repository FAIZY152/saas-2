import { generateAccessToken, setCookie, verifyAccessToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get("refresh-token")?.value;
  if (!cookie) return NextResponse.json({ error: "No token" }, { status: 401 });

  try {
    const payload = verifyAccessToken(cookie);
    if (
      typeof payload === "string" ||
      !("email" in payload) ||
      !("sub" in payload)
    ) {
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

    setCookie(res, "access-token", newAccess, 15 * 60);
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}