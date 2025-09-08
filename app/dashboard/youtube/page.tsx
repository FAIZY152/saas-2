"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/youtubePages/app-sidebar";
import { DashboardHeader } from "@/components/layout/youtubePages/dashboard-header";
import { MetricsCards } from "@/components/layout/youtubePages/metrics-cards";
import { VideoPerformance } from "@/components/layout/youtubePages/video-performance";
import Analytics from "@/components/layout/youtubePages/analytics-charts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function YouTubeDashboard() {
  const { data: session, status } = useSession();
  const [selectedChannel, setSelectedChannel] = useState("main-channel");
  const [dateRange, setDateRange] = useState("30d");
  const router = useRouter();

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
          <div className="border-b bg-background/95 backdrop-blur p-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push("/dashboard")}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <DashboardHeader
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto">
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