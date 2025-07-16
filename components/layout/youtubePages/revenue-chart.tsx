"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface RevenueChartProps {
  dateRange: string
}

const revenueData = [
  { month: "Jan", revenue: 1200, adRevenue: 800, memberships: 400 },
  { month: "Feb", revenue: 1500, adRevenue: 1000, memberships: 500 },
  { month: "Mar", revenue: 1800, adRevenue: 1200, memberships: 600 },
  { month: "Apr", revenue: 2200, adRevenue: 1500, memberships: 700 },
  { month: "May", revenue: 1900, adRevenue: 1300, memberships: 600 },
  { month: "Jun", revenue: 2500, adRevenue: 1700, memberships: 800 },
]

const chartConfig = {
  revenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-1))",
  },
  adRevenue: {
    label: "Ad Revenue",
    color: "hsl(var(--chart-2))",
  },
  memberships: {
    label: "Memberships",
    color: "hsl(var(--chart-3))",
  },
}

export function RevenueChart({ dateRange }: RevenueChartProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">Revenue Breakdown</CardTitle>
        <CardDescription className="text-sm">Monthly revenue from different sources</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <ChartContainer config={chartConfig} className="h-[250px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="adRevenue" stackId="a" fill="var(--color-adRevenue)" radius={[0, 0, 4, 4]} />
              <Bar dataKey="memberships" stackId="a" fill="var(--color-memberships)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
