import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface VideoPerformanceProps {
  dateRange: string
}

const videoData = [
  {
    title: "How to Build a YouTube Analytics Dashboard",
    views: "125,432",
    watchTime: "8.2 hrs",
    engagement: "12.5%",
    revenue: "$245",
    trend: "up" as const,
    published: "2 days ago",
  },
  {
    title: "React Best Practices for 2024",
    views: "89,123",
    watchTime: "6.1 hrs",
    engagement: "9.8%",
    revenue: "$178",
    trend: "up" as const,
    published: "5 days ago",
  },
  {
    title: "Next.js App Router Deep Dive",
    views: "67,890",
    watchTime: "4.5 hrs",
    engagement: "8.2%",
    revenue: "$134",
    trend: "down" as const,
    published: "1 week ago",
  },
  {
    title: "TypeScript Tips and Tricks",
    views: "45,678",
    watchTime: "3.2 hrs",
    engagement: "11.1%",
    revenue: "$89",
    trend: "up" as const,
    published: "2 weeks ago",
  },
  {
    title: "CSS Grid vs Flexbox Comparison",
    views: "34,567",
    watchTime: "2.8 hrs",
    engagement: "7.5%",
    revenue: "$67",
    trend: "down" as const,
    published: "3 weeks ago",
  },
]

export function VideoPerformance({ dateRange }: VideoPerformanceProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">Video Performance</CardTitle>
        <CardDescription className="text-sm">Top performing videos in the selected time period</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px] md:min-w-[300px]">Video Title</TableHead>
                <TableHead className="min-w-[80px]">Views</TableHead>
                <TableHead className="min-w-[90px]">Watch Time</TableHead>
                <TableHead className="min-w-[100px]">Engagement</TableHead>
                <TableHead className="min-w-[80px]">Revenue</TableHead>
                <TableHead className="min-w-[60px]">Trend</TableHead>
                <TableHead className="min-w-[100px]">Published</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videoData.map((video, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="max-w-[250px] md:max-w-[300px] truncate" title={video.title}>
                      {video.title}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{video.views}</TableCell>
                  <TableCell className="font-mono text-sm">{video.watchTime}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {video.engagement}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium font-mono text-sm">{video.revenue}</TableCell>
                  <TableCell>
                    {video.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{video.published}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Video</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
