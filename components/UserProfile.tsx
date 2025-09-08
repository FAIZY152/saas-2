"use client";

import { useAuth, useAppStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme, preferences, updatePreferences } = useAppStore();

  if (!isAuthenticated || !user) {
    return <div>Please login to view profile</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-muted-foreground">{user.email}</p>
            <Badge variant="secondary">{user.provider}</Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Theme</h4>
          <div className="flex space-x-2">
            {["light", "dark", "system"].map((t) => (
              <Button
                key={t}
                variant={theme === t ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme(t as any)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}