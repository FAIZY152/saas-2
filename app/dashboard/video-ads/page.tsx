import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Video, Upload, User, Mic, Play, Download, Share, Settings } from "lucide-react"

export default function VideoAdsDashboardPage() {
  const videoAds = [
    {
      id: 1,
      title: "Product Launch Campaign",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "0:30",
      views: "25.3K",
      conversions: "1.2K",
      created: "1 hour ago",
      status: "active",
    },
    {
      id: 2,
      title: "Summer Sale Promotion",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "0:45",
      views: "18.7K",
      conversions: "892",
      created: "2 days ago",
      status: "completed",
    },
    {
      id: 3,
      title: "Brand Awareness Ad",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "1:00",
      views: "42.1K",
      conversions: "2.3K",
      created: "1 week ago",
      status: "completed",
    },
  ]

  const avatars = [
    { id: 1, name: "Sarah", image: "/placeholder.svg?height=60&width=60", category: "Professional" },
    { id: 2, name: "Marcus", image: "/placeholder.svg?height=60&width=60", category: "Casual" },
    { id: 3, name: "Elena", image: "/placeholder.svg?height=60&width=60", category: "Friendly" },
    { id: 4, name: "David", image: "/placeholder.svg?height=60&width=60", category: "Corporate" },
    { id: 5, name: "Maya", image: "/placeholder.svg?height=60&width=60", category: "Creative" },
    { id: 6, name: "Alex", image: "/placeholder.svg?height=60&width=60", category: "Tech" },
  ]

  const voices = [
    { id: 1, name: "Natural Female", language: "English (US)", accent: "American" },
    { id: 2, name: "Professional Male", language: "English (UK)", accent: "British" },
    { id: 3, name: "Friendly Female", language: "English (AU)", accent: "Australian" },
    { id: 4, name: "Corporate Male", language: "English (CA)", accent: "Canadian" },
    { id: 5, name: "Warm Female", language: "Spanish (ES)", accent: "Spanish" },
    { id: 6, name: "Clear Male", language: "French (FR)", accent: "French" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">AI Video Ads Generator</h1>
          <p className="text-muted-foreground">
            Create compelling video advertisements with AI-powered scripts, avatars, and voices.
          </p>
        </div>

        <Tabs defaultValue="script" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="script" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Script
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="avatar" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Avatar
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Voice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="script" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Generate Video Script</CardTitle>
                  <CardDescription>Create compelling ad scripts tailored to your audience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Product/Service</label>
                    <Input placeholder="What are you advertising?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Audience</label>
                    <Input placeholder="Who is your target audience?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Key Message</label>
                    <Textarea placeholder="What's your main selling point?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Call to Action</label>
                    <Input placeholder="What action should viewers take?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video Duration</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="45">45 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Video className="mr-2 h-4 w-4" />
                    Generate Script
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Script Templates</CardTitle>
                  <CardDescription>Quick start with proven templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Product Launch
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Sale/Promotion
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Brand Awareness
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    App Download
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Service Promotion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Images</CardTitle>
                  <CardDescription>Upload your product images or brand assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop your images here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">Supports JPG, PNG, GIF up to 10MB</p>
                    <Button variant="outline">Choose Files</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Image Library</CardTitle>
                  <CardDescription>Choose from our stock image collection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input placeholder="Search stock images..." />
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative group cursor-pointer">
                          <img
                            src={`/placeholder.svg?height=120&width=160`}
                            alt={`Stock image ${i}`}
                            className="w-full rounded border"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                            <Button size="sm" variant="secondary">
                              Select
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="avatar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your AI Avatar</CardTitle>
                <CardDescription>Select from diverse AI avatars to present your ads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {avatars.map((avatar) => (
                    <div key={avatar.id} className="text-center space-y-2">
                      <div className="relative group cursor-pointer">
                        <Avatar className="w-16 h-16 mx-auto border-2 border-transparent hover:border-primary transition-colors">
                          <AvatarImage src={avatar.image || "/placeholder.svg"} alt={avatar.name} />
                          <AvatarFallback>{avatar.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{avatar.name}</p>
                        <p className="text-xs text-muted-foreground">{avatar.category}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">Avatar Customization</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Clothing Style</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Background</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select background" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="outdoor">Outdoor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mood</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mood" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="energetic">Energetic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Avatar Voice</CardTitle>
                <CardDescription>Choose natural-sounding voices in multiple languages and accents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {voices.map((voice) => (
                    <div
                      key={voice.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{voice.name}</h3>
                        <Button size="sm" variant="outline">
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{voice.language}</p>
                      <p className="text-xs text-muted-foreground">{voice.accent} accent</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Voice Settings</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Speed</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Normal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="fast">Fast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pitch</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Normal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Emotion</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Neutral" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="excited">Excited</SelectItem>
                          <SelectItem value="calm">Calm</SelectItem>
                          <SelectItem value="confident">Confident</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button className="w-full" size="lg">
                    <Video className="mr-2 h-4 w-4" />
                    Generate Video Ad
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Your Video Ads</CardTitle>
            <CardDescription>Recently created video advertisements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {videoAds.map((ad) => (
                <div key={ad.id} className="space-y-3">
                  <div className="relative group">
                    <img src={ad.thumbnail || "/placeholder.svg"} alt={ad.title} className="w-full rounded-lg border" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                      {ad.duration}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">{ad.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{ad.views} views</span>
                      <span>{ad.conversions} conversions</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                      <span>{ad.created}</span>
                      <Badge variant={ad.status === "active" ? "default" : "secondary"}>{ad.status}</Badge>
                    </div>
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
