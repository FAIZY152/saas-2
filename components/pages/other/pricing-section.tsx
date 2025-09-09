"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Youtube,
  Video,
  Palette,
  Zap,
  CreditCard,
  Smartphone,
  Building,
} from "lucide-react";
import { PricingCard } from "@/components/Price/PricingCard";
import { Card } from "@/components/ui/card";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const services = {
    youtube: {
      name: "YouTube Analytics",
      icon: Youtube,
      plan: {
        name: "Pro",
        price: { monthly: 29, yearly: 290 },
        description: "Unlimited access to all features",
        features: [
          "Unlimited thumbnails",
          "Advanced analytics",
          "Unlimited searches",
          "Priority support",
          "API access",
        ],
        popular: true,
      },
    },
    ads: {
      name: "Video Ads Generator",
      icon: Video,
      plan: {
        name: "Pro",
        price: { monthly: 39, yearly: 390 },
        description: "Professional ad creation",
        features: [
          "Unlimited video ads",
          "All AI avatars",
          "Premium voices",
          "4K export",
          "Custom branding",
        ],
        popular: true,
      },
    },
    logo: {
      name: "Logo Generator",
      icon: Palette,
      plan: {
        name: "Pro",
        price: { monthly: 19, yearly: 190 },
        description: "Professional logo design",
        features: [
          "Unlimited logos",
          "Premium templates",
          "Vector files",
          "Brand guidelines",
          "Commercial license",
        ],
        popular: true,
      },
    },
    content: {
      name: "Content Creator",
      icon: Zap,
      plan: {
        name: "Pro",
        price: { monthly: 25, yearly: 250 },
        description: "Unlimited content creation",
        features: [
          "Unlimited posts",
          "All platforms",
          "Premium templates",
          "Analytics",
          "Scheduling",
        ],
        popular: true,
      },
    },
  };

  const paymentMethods = [
    {
      name: "Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Amex",
    },
    { name: "PayPal", icon: Smartphone, description: "Secure PayPal payments" },
    {
      name: "Bank Transfer",
      icon: Building,
      description: "Direct bank transfer",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pro Plans for Every Creator
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Unlock unlimited access to all features. Start with free access,
            upgrade to Pro when you need more.
          </p>

          <div className="inline-flex items-center rounded-lg border p-1 bg-background shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              Yearly
              <Badge
                variant="secondary"
                className="ml-2 bg-green-100 text-green-800">
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
                className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <service.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{service.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(services).map(([key, service]) => (
            <TabsContent key={key} value={key}>
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-md">
                  <PricingCard
                    service={key}
                    serviceName={service.name}
                    plan={service.plan}
                    billingCycle={billingCycle}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Payment Methods */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Secure Payment Methods</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {paymentMethods.map((method, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <method.icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">{method.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
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
