"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/youtubePages/app-sidebar";

import Analytics from "@/components/layout/youtubePages/analytics-charts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ThumbnailGenerator from "@/components/layout/youtubePages/Components/ThumbnailGenerator";

// Component mapping
const components = {
  overview: () => <Analytics />,
  thumbnail: () => (
    <div>
      <ThumbnailGenerator />
    </div>
  ),
  search: () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Search Thumbnail</h2>
      <p className="text-muted-foreground">Coming Soon</p>
    </div>
  ),
  keywords: () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Keywords</h2>
      <p className="text-muted-foreground">Coming Soon</p>
    </div>
  ),
  optimize: () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Optimize</h2>
      <p className="text-muted-foreground">Coming Soon</p>
    </div>
  ),
  outlier: () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Outlier</h2>
      <p className="text-muted-foreground">Coming Soon</p>
    </div>
  ),
  video: () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Video Content Generator</h2>
      <p className="text-muted-foreground">Coming Soon</p>
    </div>
  ),
  billing: () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Billing</h2>
      <p className="text-muted-foreground">Coming Soon</p>
    </div>
  ),
  profile: () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Profile</h2>
      <p className="text-muted-foreground">Coming Soon</p>
    </div>
  ),
};

export default function YouTubeDashboard() {
  const [activeComponent, setActiveComponent] = useState("overview");
  const [dateRange, setDateRange] = useState("30d");
  const router = useRouter();

  const renderComponent = () => {
    const Component = components[activeComponent as keyof typeof components];
    return Component ? <Component /> : <Analytics />;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="border-b bg-background/95 backdrop-blur p-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Main Dashboard
            </Button>
          </div>

          <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto">
            <div className="grid grid-cols-1 xl:grid-cols-1">
              {renderComponent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
