"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Youtube, Video, Palette, Zap, CreditCard, Smartphone, Building } from "lucide-react";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const services = {
    youtube: {
      name: "YouTube Analytics",
      icon: Youtube,
      plans: [
        {
          name: "Starter",
          price: { monthly: 29, yearly: 290 },
          description: "Perfect for individual creators",
          features: ["50 thumbnails/month", "Basic analytics", "5 trending searches", "Email support"],
          popular: false,
        },
        {
          name: "Pro",
          price: { monthly: 79, yearly: 790 },
          description: "For growing channels",
          features: ["200 thumbnails/month", "Advanced analytics", "Unlimited searches", "Priority support"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: { monthly: 199, yearly: 1990 },
          description: "For agencies",
          features: ["Unlimited thumbnails", "Full analytics", "API access", "Dedicated support"],
          popular: false,
        },
      ],
    },
    ads: {
      name: "Video Ads Generator",
      icon: Video,
      plans: [
        {
          name: "Basic",
          price: { monthly: 39, yearly: 390 },
          description: "Essential ad creation",
          features: ["20 video ads/month", "5 AI avatars", "Basic voices", "HD export"],
          popular: false,
        },
        {
          name: "Professional",
          price: { monthly: 99, yearly: 990 },
          description: "Advanced tools",
          features: ["100 video ads/month", "20+ avatars", "Premium voices", "4K export"],
          popular: true,
        },
        {
          name: "Agency",
          price: { monthly: 249, yearly: 2490 },
          description: "For marketing teams",
          features: ["Unlimited ads", "All avatars", "Team collaboration", "Priority rendering"],
          popular: false,
        },
      ],
    },
    logo: {
      name: "Logo Generator",
      icon: Palette,
      plans: [
        {
          name: "Starter",
          price: { monthly: 19, yearly: 190 },
          description: "Basic logo creation",
          features: ["50 logos/month", "Basic templates", "PNG export", "Email support"],
          popular: false,
        },
        {
          name: "Pro",
          price: { monthly: 49, yearly: 490 },
          description: "Professional designs",
          features: ["200 logos/month", "Premium templates", "Vector files", "Brand guidelines"],
          popular: true,
        },
        {
          name: "Business",
          price: { monthly: 99, yearly: 990 },
          description: "Complete branding",
          features: ["Unlimited logos", "Custom templates", "Full brand kit", "Commercial license"],
          popular: false,
        },
      ],
    },
    content: {
      name: "Content Creator",
      icon: Zap,
      plans: [
        {
          name: "Basic",
          price: { monthly: 25, yearly: 250 },
          description: "Social media content",
          features: ["100 posts/month", "5 platforms", "Basic templates", "Scheduling"],
          popular: false,
        },
        {
          name: "Pro",
          price: { monthly: 59, yearly: 590 },
          description: "Multi-platform content",
          features: ["500 posts/month", "All platforms", "Premium templates", "Analytics"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: { monthly: 149, yearly: 1490 },
          description: "Team collaboration",
          features: ["Unlimited posts", "Team workspace", "Custom branding", "API access"],
          popular: false,
        },
      ],
    },
  };

  const paymentMethods = [
    { name: "Credit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
    { name: "PayPal", icon: Smartphone, description: "Secure PayPal payments" },
    { name: "Bank Transfer", icon: Building, description: "Direct bank transfer" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your AI Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Select individual services or combine them for maximum impact. Flexible pricing for every need.
          </p>

          <div className="inline-flex items-center rounded-lg border p-1 bg-background shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>

        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 h-auto p-1">
            {Object.entries(services).map(([key, service]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <service.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{service.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(services).map(([key, service]) => (
            <TabsContent key={key} value={key}>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {service.plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative transition-all hover:shadow-xl ${
                      plan.popular
                        ? "border-primary shadow-lg scale-105 bg-gradient-to-br from-primary/5 to-purple/5"
                        : "hover:scale-105"
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <p className="text-muted-foreground">{plan.description}</p>
                      <div className="mt-6">
                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${plan.price[billingCycle]}
                        </span>
                        <span className="text-muted-foreground text-lg">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                        {billingCycle === "yearly" && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            Save ${(plan.price.monthly * 12 - plan.price.yearly)}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full h-12 font-semibold ${
                          plan.popular
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Payment Methods */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Secure Payment Methods</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <method.icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">{method.name}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>🔒 SSL Encrypted</span>
            <span>•</span>
            <span>💳 PCI Compliant</span>
            <span>•</span>
            <span>🛡️ 30-day Money Back</span>
          </div>
        </div>
      </div>
    </section>
  );
}