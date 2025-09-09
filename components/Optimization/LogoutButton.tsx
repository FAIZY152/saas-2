"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function LogoutButton({ variant = "outline", size = "default" }: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Button variant={variant} size={size} onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}