"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Youtube, Video } from "lucide-react"
import Link from "next/link"

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const youtubePlans = [
    {
      name: "Starter",
      price: { monthly: 29, yearly: 290 },
      description: "Perfect for individual creators",
      features: ["50 thumbnails/month", "Basic analytics", "5 trending keyword searches", "Email support"],
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 79, yearly: 790 },
      description: "For growing YouTube channels",
      features: [
        "200 thumbnails/month",
        "Advanced analytics",
        "Unlimited keyword searches",
        "Content suggestions",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: { monthly: 199, yearly: 1990 },
      description: "For agencies and large creators",
      features: [
        "Unlimited thumbnails",
        "Full analytics suite",
        "White-label options",
        "API access",
        "Dedicated support",
      ],
      popular: false,
    },
  ]

  const videoAdPlans = [
    {
      name: "Basic",
      price: { monthly: 39, yearly: 390 },
      description: "Essential video ad creation",
      features: ["20 video ads/month", "5 AI avatars", "Basic voice options", "HD export"],
      popular: false,
    },
    {
      name: "Professional",
      price: { monthly: 99, yearly: 990 },
      description: "Advanced ad creation tools",
      features: ["100 video ads/month", "20+ AI avatars", "Premium voices", "4K export", "Custom branding"],
      popular: true,
    },
    {
      name: "Agency",
      price: { monthly: 249, yearly: 2490 },
      description: "For marketing agencies",
      features: [
        "Unlimited video ads",
        "All avatars & voices",
        "Team collaboration",
        "Client management",
        "Priority rendering",
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Perfect Plan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Select individual tools or combine them for maximum impact. No bundling required.
          </p>

          <div className="inline-flex items-center rounded-lg border p-1 bg-muted/50">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "yearly" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>

        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube Tool
            </TabsTrigger>
            <TabsTrigger value="video-ads" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Ads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youtube">
            <div className="grid md:grid-cols-3 gap-8">
              {youtubePlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "border-purple-500 shadow-lg scale-105" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">${plan.price[billingCycle]}</span>
                      <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href="/select-services">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="video-ads">
            <div className="grid md:grid-cols-3 gap-8">
              {videoAdPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "border-purple-500 shadow-lg scale-105" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">${plan.price[billingCycle]}</span>
                      <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href="/select-services">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
