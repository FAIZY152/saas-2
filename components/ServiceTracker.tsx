"use client";

import { useAppStore } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ServiceTracker() {
  const { setCurrentService } = useAppStore();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/dashboard/youtube")) {
      setCurrentService("YouTube Analytics");
    } else if (pathname.includes("/dashboard/ads")) {
      setCurrentService("Ads Generator");
    } else if (pathname.includes("/dashboard/logo")) {
      setCurrentService("Logo Generator");
    } else if (pathname.includes("/dashboard/content")) {
      setCurrentService("Content Creator");
    } else if (pathname.includes("/dashboard")) {
      setCurrentService("Main Dashboard");
    } else {
      setCurrentService(null);
    }
  }, [pathname, setCurrentService]);

  return null;
}