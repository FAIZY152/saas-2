import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "1y";

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_EXPIRES,
    algorithm: "HS256",
  });
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES,
    algorithm: "HS256",
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}



export function setCookie(
  res: Response,
  name: string,
  token: string,
  maxAgeSeconds: number
) {
  const cookie = serialize(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: maxAgeSeconds,
    path: "/",
  });
  res.headers.set("Set-Cookie", cookie);
}
