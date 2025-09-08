"use client";

import { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/youtubePages/app-sidebar";
import { DashboardHeader } from "@/components/layout/youtubePages/dashboard-header";
import { MetricsCards } from "@/components/layout/youtubePages/metrics-cards";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { LazyComponents, DashboardSkeleton } from "@/components/LazyComponents";

export default function YouTubeDashboard() {
  const { data: session, status } = useSession();
  const [selectedChannel, setSelectedChannel] = useState("main-channel");
  const [dateRange, setDateRange] = useState("30d");
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen w-full bg-background">
        <div className="w-64 border-r bg-muted/10" /> {/* Sidebar skeleton */}
        <div className="flex-1 p-6">
          <DashboardSkeleton />
        </div>
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
            {/* Load metrics cards immediately (lightweight) */}
            <MetricsCards dateRange={dateRange} />
            
            {/* Lazy load heavy chart components */}
            <Suspense fallback={<div className="grid grid-cols-1 xl:grid-cols-1"><LazyComponents.Analytics /></div>}>
              <div className="grid grid-cols-1 xl:grid-cols-1">
                <LazyComponents.Analytics />
              </div>
            </Suspense>
            
            <Suspense fallback={<LazyComponents.VideoPerformance />}>
              <LazyComponents.VideoPerformance dateRange={dateRange} />
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
