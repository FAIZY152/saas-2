"use client";

import { useEffect, useState } from "react";
import { LoadingSkeleton } from "./SkeletonLoader";

interface PageLoaderProps {
  variant?: "login" | "dashboard" | "profile" | "list" | "card" | "form";
  delay?: number;
  className?: string;
}

export function PageLoader({
  variant = "card",
  delay = 0,
  className,
}: PageLoaderProps) {
  const [show, setShow] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!show) return null;

  return (
    <div className="animate-in fade-in-0 duration-500">
      <LoadingSkeleton variant={variant} className={className} />
    </div>
  );
}
