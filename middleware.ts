import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // API routes for authentication
  const isAuthApiRoute = nextUrl.pathname.startsWith("/api/auth");

  // If it's an auth API route, allow it
  if (isAuthApiRoute) {
    return NextResponse.next();
  }

  // If user is not logged in and trying to access protected route
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // If user is logged in and trying to access login/register, redirect to dashboard
  if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};