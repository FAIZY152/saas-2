import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Download, Calendar, TrendingUp, AlertCircle } from "lucide-react"

export default function BillingPage() {
  const currentPlan = {
    name: "Professional",
    price: 99,
    billing: "monthly",
    nextBilling: "Dec 15, 2024",
    services: ["YouTube Thumbnail Generator", "Content Generator", "Video Script Generator", "AI Avatar Voice"],
  }

  const invoices = [
    {
      id: "INV-001",
      date: "Nov 15, 2024",
      amount: 99,
      status: "paid",
      services: "Professional Plan",
    },
    {
      id: "INV-002",
      date: "Oct 15, 2024",
      amount: 99,
      status: "paid",
      services: "Professional Plan",
    },
    {
      id: "INV-003",
      date: "Sep 15, 2024",
      amount: 79,
      status: "paid",
      services: "Starter Plan",
    },
  ]

  const usageStats = [
    {
      service: "Thumbnail Generator",
      used: 156,
      limit: 200,
      percentage: 78,
    },
    {
      service: "Video Ads Created",
      used: 23,
      limit: 100,
      percentage: 23,
    },
    {
      service: "Content Generated",
      used: 89,
      limit: 150,
      percentage: 59,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Billing & Usage</h1>
          <p className="text-muted-foreground">Manage your subscription, view usage, and download invoices.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                  <p className="text-muted-foreground">
                    ${currentPlan.price}/{currentPlan.billing}
                  </p>
                </div>
                <Badge className="bg-green-500">Active</Badge>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Included Services:</h4>
                <ul className="space-y-1">
                  {currentPlan.services.map((service, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next billing date</p>
                  <p className="font-medium">{currentPlan.nextBilling}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Your default payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Usage This Month
            </CardTitle>
            <CardDescription>Track your usage across all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {usageStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{stat.service}</span>
                    <span className="text-sm text-muted-foreground">
                      {stat.used} / {stat.limit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        stat.percentage > 80 ? "bg-red-500" : stat.percentage > 60 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  {stat.percentage > 80 && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      <span>Approaching limit</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Billing History
            </CardTitle>
            <CardDescription>Download your invoices and view payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{invoice.id}</span>
                      <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{invoice.services}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">${invoice.amount}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
