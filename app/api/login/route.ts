import { NextRequest, NextResponse } from "next/server";

// This endpoint is deprecated - authentication is now handled by NextAuth
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "This endpoint is deprecated. Use NextAuth for authentication." }, 
    { status: 410 }
  );
}