"use client"

import { CalendarDays, Download, Filter, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardHeaderProps {
  selectedChannel: string
  setSelectedChannel: (channel: string) => void
  dateRange: string
  setDateRange: (range: string) => void
}

export function DashboardHeader({
  selectedChannel,
  setSelectedChannel,
  dateRange,
  setDateRange,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 md:h-16 items-center px-4 md:px-6 gap-4">
        <SidebarTrigger className="md:hidden" />

        <div className="flex items-center gap-4 flex-1 min-w-0">
          <h1 className="text-lg md:text-xl font-semibold truncate">Analytics Overview</h1>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main-channel">Main Channel</SelectItem>
              <SelectItem value="gaming-channel">Gaming Channel</SelectItem>
              <SelectItem value="tech-channel">Tech Channel</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <CalendarDays className="w-4 h-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7d</SelectItem>
              <SelectItem value="30d">30d</SelectItem>
              <SelectItem value="90d">90d</SelectItem>
              <SelectItem value="1y">1y</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Channel Selector */}
      <div className="lg:hidden border-t px-4 py-2">
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main-channel">Main Channel</SelectItem>
            <SelectItem value="gaming-channel">Gaming Channel</SelectItem>
            <SelectItem value="tech-channel">Tech Channel</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}
