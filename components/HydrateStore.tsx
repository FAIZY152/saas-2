"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export function HydrateStore() {
  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    // Force hydration on mount
    useUserStore.persist.rehydrate();
  }, []);

  return null;
}