"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Loading skeletons for better UX
export const ChartSkeleton = () => (
  <Card className="w-full h-96">
    <CardHeader>
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-3 w-32" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Header skeleton */}
    <div className="flex justify-between items-center">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>

    {/* Metrics cards skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Chart skeleton */}
    <ChartSkeleton />
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Card>
    <CardContent className="p-0">
      <div className="divide-y">
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4" />
          ))}
        </div>
        {/* Rows */}
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 p-4">
            {[...Array(4)].map((_, j) => (
              <Skeleton key={j} className="h-4" />
            ))}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Lazy loaded components with proper loading states
export const LazyAnalyticsCharts = dynamic(
  () => import("@/components/layout/youtubePages/analytics-charts"),
  {
    loading: () => <ChartSkeleton />,
    ssr: false, // Disable SSR for charts to improve initial load
  }
);

export const LazyVideoPerformance = dynamic(
  () =>
    import("@/components/layout/youtubePages/video-performance").then(
      (mod) => mod.default
    ),
  {
    loading: () => <TableSkeleton />,
    ssr: false,
  }
);

export const LazyPricingSection = dynamic(
  () =>
    import("@/components/pages/other/pricing-section").then(
      (mod) => mod.default
    ),
  {
    loading: () => (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="relative">
                <CardHeader>
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <div className="flex items-baseline">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-12 ml-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

export const LazyTestimonialsSection = dynamic(
  () =>
    import("@/components/pages/other/testimonials-section").then(
      (mod) => mod.default
    ),
  {
    loading: () => (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-72 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

// Export all lazy components
export const LazyComponents = {
  Analytics: LazyAnalyticsCharts,
  VideoPerformance: LazyVideoPerformance,
  Pricing: LazyPricingSection,
  Testimonials: LazyTestimonialsSection,
};
