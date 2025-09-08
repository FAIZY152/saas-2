"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const routes = [
  "/register",
  "/login",
  "/dashboard",
  "/dashboard/youtube",
  "/dashboard/ads",
  "/dashboard/logo",
  "/dashboard/content",
];

export function RoutePreloader() {
  const router = useRouter();

  useEffect(() => {
    routes.forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);

  return null;
}
