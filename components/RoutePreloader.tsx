"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const routes = [
  "/dashboard",
  "/dashboard/youtube", 
  "/dashboard/ads",
  "/dashboard/logo",
  "/dashboard/content",
  "/login",
  "/register"
];

export function RoutePreloader() {
  const router = useRouter();

  useEffect(() => {
    routes.forEach(route => {
      router.prefetch(route);
    });
  }, [router]);

  return null;
}