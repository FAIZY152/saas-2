"use client";

import { useAuth, useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Settings, User, Moon, Sun } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const { user, isAuthenticated } = useAuth();
  const { theme, setTheme, sidebarOpen, toggleSidebar, currentService } = useAppStore();

  if (!isAuthenticated) return null;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Quick Actions
        </CardTitle>
        {currentService && (
          <p className="text-sm text-muted-foreground">
            Current: {currentService}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </Button>
        
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 mr-2" />
          ) : (
            <Moon className="h-4 w-4 mr-2" />
          )}
          Toggle Theme
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={toggleSidebar}
        >
          <Settings className="h-4 w-4 mr-2" />
          {sidebarOpen ? "Hide" : "Show"} Sidebar
        </Button>

        <div className="pt-2 text-xs text-muted-foreground">
          Welcome back, {user?.name}!
        </div>
      </CardContent>
    </Card>
  );
}