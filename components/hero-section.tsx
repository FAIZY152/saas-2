import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm mb-8 bg-background/50 backdrop-blur">
            <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
            <span className="font-medium">Powered by Advanced AI Technology</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Lovable
            </span>
            <br />
            AI-Powered SaaS Tools
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your content creation and marketing with our cutting-edge AI tools. Generate stunning YouTube
            thumbnails, analyze trends, and create compelling video ads effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/select-services">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-500">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-500">1M+</div>
              <div className="text-sm text-muted-foreground">Thumbnails Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">500K+</div>
              <div className="text-sm text-muted-foreground">Video Ads Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
