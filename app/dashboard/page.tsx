"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/youtubePages/app-sidebar";
import { DashboardHeader } from "@/components/layout/youtubePages/dashboard-header";
import { MetricsCards } from "@/components/layout/youtubePages/metrics-cards";
import { VideoPerformance } from "@/components/layout/youtubePages/video-performance";
import Analytics from "@/components/layout/youtubePages/analytics-charts";
import { LogoutButton } from "@/components/LogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Dashboard() {
  const { data: session, status } = useSession();
  const [selectedChannel, setSelectedChannel] = useState("main-channel");
  const [dateRange, setDateRange] = useState("30d");

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto">
            {/* User Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback>
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold">Welcome back, {session?.user?.name}!</h2>
                      <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                      <p className="text-xs text-muted-foreground">Provider: {session?.user?.provider}</p>
                    </div>
                  </div>
                  <LogoutButton />
                </CardTitle>
              </CardHeader>
            </Card>
            
            <MetricsCards dateRange={dateRange} />
            <div className="grid grid-cols-1 xl:grid-cols-1">
              <Analytics />
            </div>
            <VideoPerformance dateRange={dateRange} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
