"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Video } from "lucide-react";

export default function AdsGeneratorDashboard() {
  const router = useRouter();
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur p-4">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ads Generator</h1>
          <p className="text-muted-foreground">Create compelling video ads with AI-powered tools</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span>Create New Ad</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Ad Title</Label>
              <Input
                id="title"
                value={adTitle}
                onChange={(e) => setAdTitle(e.target.value)}
                placeholder="Enter ad title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={adDescription}
                onChange={(e) => setAdDescription(e.target.value)}
                placeholder="Describe your ad content"
                rows={4}
              />
            </div>
            <Button className="w-full">
              Generate Ad
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}