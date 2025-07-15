import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, DollarSign, Youtube, Video, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Projects",
      value: "24",
      change: "+3",
      trend: "up",
      icon: BarChart3,
    },
    {
      title: "Thumbnails Generated",
      value: "1,234",
      change: "+89",
      trend: "up",
      icon: Youtube,
    },
    {
      title: "Video Ads Created",
      value: "456",
      change: "+23",
      trend: "up",
      icon: Video,
    },
  ]

  const recentActivity = [
    {
      action: "Generated thumbnail",
      project: "Tech Review Channel",
      time: "2 minutes ago",
      status: "completed",
    },
    {
      action: "Created video ad",
      project: "E-commerce Campaign",
      time: "15 minutes ago",
      status: "completed",
    },
    {
      action: "Analyzed keywords",
      project: "Gaming Content",
      time: "1 hour ago",
      status: "completed",
    },
    {
      action: "Generated script",
      project: "Product Launch",
      time: "2 hours ago",
      status: "processing",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your AI tools performance.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump into your most used tools</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                <a href="/dashboard/youtube">
                  <Youtube className="h-6 w-6" />
                  <span>YouTube Tools</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                <a href="/dashboard/video-ads">
                  <Video className="h-6 w-6" />
                  <span>Video Ads</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Team</span>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions across all tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.project}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={activity.status === "completed" ? "default" : "secondary"}>{activity.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
