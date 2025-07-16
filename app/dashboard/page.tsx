"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/youtubePages/app-sidebar";
import { DashboardHeader } from "@/components/layout/youtubePages/dashboard-header";
import { MetricsCards } from "@/components/layout/youtubePages/metrics-cards";
import { VideoPerformance } from "@/components/layout/youtubePages/video-performance";
import Analytics from "@/components/layout/youtubePages/analytics-charts";
export default function Dashboard() {
  const [selectedChannel, setSelectedChannel] = useState("main-channel");
  const [dateRange, setDateRange] = useState("30d");

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
