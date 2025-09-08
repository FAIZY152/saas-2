"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart3, Zap, Palette, Video, TrendingUp, Users } from "lucide-react";
import { useAuth } from "@/store";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const services = [
    {
      title: "YouTube Analytics",
      description: "Track performance, analyze trends, and optimize your content",
      icon: BarChart3,
      route: "/dashboard/youtube",
      color: "bg-red-500",
    },
    {
      title: "Ads Generator",
      description: "Create compelling video ads with AI-powered tools",
      icon: Video,
      route: "/dashboard/ads",
      color: "bg-blue-500",
    },
    {
      title: "Logo Generator",
      description: "Design professional logos for your brand",
      icon: Palette,
      route: "/dashboard/logo",
      color: "bg-purple-500",
    },
    {
      title: "Content Creator",
      description: "Generate engaging content for social media",
      icon: Zap,
      route: "/dashboard/content",
      color: "bg-green-500",
    },
    {
      title: "Growth Analytics",
      description: "Monitor audience growth and engagement metrics",
      icon: TrendingUp,
      route: "/dashboard/growth",
      color: "bg-orange-500",
    },
    {
      title: "Audience Insights",
      description: "Understand your audience demographics and behavior",
      icon: Users,
      route: "/dashboard/audience",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
        <nav className="border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">TubeViral AI</h1>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.avatar || ""} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">
                    Welcome back, {user?.name}!
                  </h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Choose a service below to get started with AI-powered tools for
                your content creation needs.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${service.color}`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <span>{service.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  <Button
                    className="w-full"
                    onClick={() => router.push(service.route)}>
                    Open Dashboard
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
}