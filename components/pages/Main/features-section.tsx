import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Youtube, ImageIcon, Search, FileText, TrendingUp, Zap, Video, Upload, User, Mic } from "lucide-react"

export function FeaturesSection() {
  const youtubeFeatures = [
    {
      icon: ImageIcon,
      title: "Thumbnail Generator",
      description: "Create eye-catching thumbnails with AI-powered design suggestions",
    },
    {
      icon: Search,
      title: "Thumbnail Search",
      description: "Find and analyze competitor thumbnails for inspiration",
    },
    {
      icon: FileText,
      title: "Content Generator",
      description: "Generate engaging video titles, descriptions, and scripts",
    },
    {
      icon: TrendingUp,
      title: "Outlier Detection",
      description: "Identify viral content patterns and anomalies",
    },
    {
      icon: Zap,
      title: "Trending Keywords",
      description: "Discover hot keywords and optimize your content strategy",
    },
  ]

  const videoAdFeatures = [
    {
      icon: Video,
      title: "Video Script Generator",
      description: "Create compelling ad scripts tailored to your audience",
    },
    {
      icon: Upload,
      title: "Image-Based Ads",
      description: "Upload images and transform them into dynamic video ads",
    },
    {
      icon: User,
      title: "Talking Avatar",
      description: "Choose from diverse AI avatars to present your ads",
    },
    {
      icon: Mic,
      title: "AI Avatar Voice",
      description: "Natural-sounding voices in multiple languages and accents",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful AI Tools for Content Creators</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our suite of AI-powered tools designed to supercharge your content creation workflow
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* YouTube Analytics Tool */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <Youtube className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">YouTube Analytics Tool</h3>
                <Badge variant="secondary" className="mt-1">
                  Most Popular
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {youtubeFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="border-l-4 border-l-red-500/50 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <feature.icon className="h-5 w-5 text-red-500" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Video Ads Generator */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <Video className="h-8 w-8 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AI Video Ads Generator</h3>
                <Badge variant="secondary" className="mt-1">
                  New
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {videoAdFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="border-l-4 border-l-purple-500/50 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <feature.icon className="h-5 w-5 text-purple-500" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
