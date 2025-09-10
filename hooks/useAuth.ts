"use client";

import { useSession, signOut } from "next-auth/react";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

// Safe session hook that handles missing SessionProvider
function useSafeSession() {
  try {
    return useSession();
  } catch (error) {
    return { data: null, status: "unauthenticated" as const };
  }
}

export function useAuth() {
  const { data: session, status } = useSafeSession();
  const { user, setUser, clearUser, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id || "",
        email: session.user.email || "",
        name: session.user.name || "",
        avatar: session.user.image || undefined,
        provider: "nextauth",
      });
    } else if (status === "unauthenticated") {
      clearUser();
    }
  }, [session, status, setUser, clearUser]);

  const logout = async () => {
    clearUser();
    await signOut({ callbackUrl: "/" });
  };

  // Return store state immediately if available, otherwise wait for session
  const finalIsAuthenticated = isAuthenticated || !!session;
  const finalIsLoading = !isAuthenticated && status === "loading";

  return {
    user: user || (session?.user ? {
      id: session.user.id || "",
      email: session.user.email || "",
      name: session.user.name || "",
      avatar: session.user.image || undefined,
      provider: "nextauth",
    } : null),
    isAuthenticated: finalIsAuthenticated,
    isLoading: finalIsLoading,
    logout,
  };
}