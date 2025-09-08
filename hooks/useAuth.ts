"use client";

import { useSession, signOut } from "next-auth/react";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
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

  return {
    user,
    isAuthenticated: !!session || isAuthenticated,
    isLoading: status === "loading",
    logout,
  };
}