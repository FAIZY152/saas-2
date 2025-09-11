"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Youtube, Video } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  icon: any;
  price: number;
  features: string[];
  popular?: boolean;
}

export default function SelectServicesPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: "youtube-analytics",
      name: "YouTube Analytics Tools",
      description: "Complete suite of AI-powered YouTube optimization tools",
      icon: Youtube,
      price: 79,
      popular: true,
      features: [
        "AI Thumbnail Generator",
        "Thumbnail Search & Analysis",
        "Content Generator (Titles, Descriptions, Scripts)",
        "Outlier Detection & Viral Pattern Analysis",
        "Trending Keywords Research",
      ],
    },
    {
      id: "video-ads-generator",
      name: "AI Video Ads Generator",
      description:
        "Create professional video advertisements with AI avatars and voices",
      icon: Video,
      price: 99,
      features: [
        "AI Video Script Generator",
        "Image-Based Ad Creation",
        "20+ Talking AI Avatars",
        "Natural AI Voice Generation",
        "Multi-language Support",
      ],
    },
  ];

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const totalPrice = products
    .filter((product) => selectedProducts.includes(product.id))
    .reduce((sum, product) => sum + product.price, 0);

  const youtubeServices = products.filter((s) => s.id === "youtube-analytics");
  const videoAdServices = products.filter(
    (s) => s.id === "video-ads-generator"
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your AI Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select only the services you need. No bundling required. Pay for
            what you use.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedProducts.includes(product.id)
                      ? "ring-2 ring-primary border-primary/50"
                      : "hover:border-primary/30"
                  }`}
                  onClick={() => handleProductToggle(product.id)}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-lg ${
                            product.id === "youtube-analytics"
                              ? "bg-red-500/10 border border-red-500/20"
                              : "bg-purple-500/10 border border-purple-500/20"
                          }`}>
                          <product.icon
                            className={`h-6 w-6 ${
                              product.id === "youtube-analytics"
                                ? "text-red-500"
                                : "text-purple-500"
                            }`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            {product.name}
                            {product.popular && (
                              <Badge variant="secondary">Popular</Badge>
                            )}
                          </CardTitle>
                          <div
                            className={`text-2xl font-bold mt-1 ${
                              product.id === "youtube-analytics"
                                ? "text-red-500"
                                : "text-purple-500"
                            }`}>
                            ${product.price}/mo
                          </div>
                        </div>
                      </div>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleProductToggle(product.id)}
                        className={`data-[state=checked]:border-primary ${
                          product.id === "youtube-analytics"
                            ? "data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                            : "data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        }`}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {product.description}
                    </CardDescription>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Included Features:
                      </h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                product.id === "youtube-analytics"
                                  ? "bg-red-500"
                                  : "bg-purple-500"
                              }`}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {selectedProducts.length} product
                  {selectedProducts.length !== 1 ? "s" : ""} selected
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProducts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Select products to see your order summary
                  </p>
                ) : (
                  <>
                    <div className="space-y-2">
                      {products
                        .filter((product) =>
                          selectedProducts.includes(product.id)
                        )
                        .map((product) => (
                          <div
                            key={product.id}
                            className="flex justify-between items-center">
                            <span className="text-sm">{product.name}</span>
                            <span className="font-medium">
                              ${product.price}/mo
                            </span>
                          </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span>${totalPrice}/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed monthly • Cancel anytime
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      disabled={selectedProducts.length === 0}
                      asChild>
                      <Link href="/pricing">
                        Continue to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
