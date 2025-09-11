"use client";

import { Suspense, lazy } from "react";
import { LoadingSkeleton } from "@/components/ui/loading";

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  variant?:
    | "login"
    | "dashboard"
    | "profile"
    | "list"
    | "card"
    | "form"
    | "navbar"
    | "hero";
}

export function LazyWrapper({
  children,
  fallback,
  variant = "card",
}: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback || <LoadingSkeleton variant={variant} />}>
      {children}
    </Suspense>
  );
}

// Lazy load components with proper loading states
export const LazyDashboard = lazy(
  () => import("@/app/(Dashboard)/dashboard/page")
);
export const LazyLogin = lazy(() => import("@/app/(Auth)/login/page"));
export const LazyRegister = lazy(() => import("@/app/(Auth)/register/page"));
export const LazyYouTubeDashboard = lazy(
  () => import("@/app/(Dashboard)/dashboard/youtube/page")
);

// Lazy component wrapper with loading
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  variant:
    | "login"
    | "dashboard"
    | "profile"
    | "list"
    | "card"
    | "form"
    | "navbar"
    | "hero" = "card"
) {
  return function LazyComponent(props: T) {
    return (
      <LazyWrapper variant={variant}>
        <Component {...props} />
      </LazyWrapper>
    );
  };
}
