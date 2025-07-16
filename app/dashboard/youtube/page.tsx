import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Search, FileText, TrendingUp, Zap, Upload, Download, Eye, Heart, Share } from "lucide-react"
import { DashboardLayout } from "@/components/pages/Main/dashboard-layout"

export default function YouTubeDashboardPage() {
  const thumbnails = [
    {
      id: 1,
      title: "Tech Review Thumbnail",
      url: "/placeholder.svg?height=180&width=320",
      views: "12.5K",
      likes: "892",
      created: "2 hours ago",
    },
    {
      id: 2,
      title: "Gaming Tutorial",
      url: "/placeholder.svg?height=180&width=320",
      views: "8.3K",
      likes: "654",
      created: "1 day ago",
    },
    {
      id: 3,
      title: "Product Unboxing",
      url: "/placeholder.svg?height=180&width=320",
      views: "15.2K",
      likes: "1.2K",
      created: "3 days ago",
    },
  ]

  const trendingKeywords = [
    { keyword: "AI technology", volume: "125K", trend: "+15%" },
    { keyword: "React tutorial", volume: "89K", trend: "+8%" },
    { keyword: "iPhone review", volume: "234K", trend: "+22%" },
    { keyword: "Gaming setup", volume: "67K", trend: "+12%" },
    { keyword: "Productivity tips", volume: "156K", trend: "+18%" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">YouTube Analytics Tools</h1>
          <p className="text-muted-foreground">
            Create, analyze, and optimize your YouTube content with AI-powered tools.
          </p>
        </div>

        <Tabs defaultValue="thumbnails" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="thumbnails" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Thumbnails
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="outlier" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Outlier
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Keywords
            </TabsTrigger>
          </TabsList>

          <TabsContent value="thumbnails" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Generate New Thumbnail</CardTitle>
                  <CardDescription>Create eye-catching thumbnails with AI assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video Title</label>
                    <Input placeholder="Enter your video title..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Describe your video content..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Style Preference</label>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        Minimalist
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        Bold
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        Gaming
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        Tech
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Generate Thumbnail
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Custom Image</CardTitle>
                  <CardDescription>Upload your own image to enhance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop your image here, or click to browse
                    </p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your Thumbnails</CardTitle>
                <CardDescription>Recently generated thumbnails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {thumbnails.map((thumbnail) => (
                    <div key={thumbnail.id} className="space-y-3">
                      <div className="relative group">
                        <img
                          src={thumbnail.url || "/placeholder.svg"}
                          alt={thumbnail.title}
                          className="w-full rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{thumbnail.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {thumbnail.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {thumbnail.likes}
                          </span>
                          <span>{thumbnail.created}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thumbnail Search & Analysis</CardTitle>
                <CardDescription>Find and analyze competitor thumbnails for inspiration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Search for thumbnails by keyword..." className="flex-1" />
                  <Button>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a keyword to search for thumbnail inspiration</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Generator</CardTitle>
                <CardDescription>Generate engaging titles, descriptions, and scripts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic</label>
                  <Input placeholder="What's your video about?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Audience</label>
                  <Input placeholder="Who is your target audience?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Tutorial
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Review
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Vlog
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Entertainment
                    </Badge>
                  </div>
                </div>
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Content Ideas
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outlier" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Outlier Detection</CardTitle>
                <CardDescription>Identify viral content patterns and anomalies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Connect your YouTube channel to analyze outlier content</p>
                  <Button className="mt-4">Connect YouTube Channel</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Keywords</CardTitle>
                <CardDescription>Discover hot keywords and optimize your content strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Enter your niche or topic..." className="flex-1" />
                    <Button>
                      <Zap className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">Current Trending Keywords</h3>
                    {trendingKeywords.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{item.keyword}</span>
                          <span className="text-sm text-muted-foreground ml-2">{item.volume} searches</span>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          {item.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
