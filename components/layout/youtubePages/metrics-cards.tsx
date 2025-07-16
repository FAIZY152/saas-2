import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Eye, Clock, Users, DollarSign } from "lucide-react"

interface MetricsCardsProps {
  dateRange: string
}

const metrics = [
  {
    title: "Total Views",
    value: "2,389,098",
    change: "+12.5%",
    trend: "up" as const,
    icon: Eye,
    color: "text-blue-600",
  },
  {
    title: "Watch Time",
    value: "1,234,567 hrs",
    change: "+8.2%",
    trend: "up" as const,
    icon: Clock,
    color: "text-green-600",
  },
  {
    title: "Subscribers",
    value: "45,234",
    change: "+5.7%",
    trend: "up" as const,
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Estimated Revenue",
    value: "$12,456",
    change: "-2.1%",
    trend: "down" as const,
    icon: DollarSign,
    color: "text-orange-600",
  },
]

export function MetricsCards({ dateRange }: MetricsCardsProps) {
  const getPeriodText = (range: string) => {
    switch (range) {
      case "7d":
        return "week"
      case "30d":
        return "month"
      case "90d":
        return "quarter"
      case "1y":
        return "year"
      default:
        return "period"
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground truncate pr-2">{metric.title}</CardTitle>
            <metric.icon className={`w-4 h-4 ${metric.color} flex-shrink-0`} />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold truncate">{metric.value}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {metric.trend === "up" ? (
                <ArrowUpIcon className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
              ) : (
                <ArrowDownIcon className="w-3 h-3 text-red-500 mr-1 flex-shrink-0" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
              <span className="ml-1 truncate">from last {getPeriodText(dateRange)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
