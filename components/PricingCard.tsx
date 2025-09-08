"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { useAuth } from "@/store";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  service: string;
  plan: {
    name: string;
    price: { monthly: number; yearly: number };
    description: string;
    features: string[];
    popular: boolean;
  };
  billingCycle: "monthly" | "yearly";
}

export function PricingCard({ service, plan, billingCycle }: PricingCardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      router.push(`/dashboard/${service}`);
      setLoading(false);
    }, 2000);
  };

  return (
    <Card
      className={`relative transition-all hover:shadow-xl ${
        plan.popular
          ? "border-primary shadow-lg scale-105 bg-gradient-to-br from-primary/5 to-purple/5"
          : "hover:scale-105"
      }`}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
          <Sparkles className="h-3 w-3 mr-1" />
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
              Save ${plan.price.monthly * 12 - plan.price.yearly}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
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
          onClick={handleGetStarted}
          disabled={loading}
        >
          {loading ? "Processing..." : isAuthenticated ? "Get Started" : "Login to Continue"}
        </Button>
      </CardContent>
    </Card>
  );
}