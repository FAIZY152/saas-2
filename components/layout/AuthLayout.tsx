"use client";
import type React from "react";
import { Youtube, Video, Play, TrendingUp, Zap, ImageIcon } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Visual content */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full" />
          <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full" />
          <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/20 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-12 text-white">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Transform Your Content with
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                AI-Powered Tools
              </span>
            </h1>

            <p className="text-xl text-purple-100 mb-12 leading-relaxed">
              Create viral YouTube content and compelling video ads with our
              advanced AI technology. Join thousands of creators who are already
              transforming their workflow.
            </p>

            <div className="space-y-8">
              {/* YouTube Analytics Tools */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/10 backdrop-blur border border-white/20">
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-400/30">
                  <Youtube className="h-6 w-6 text-red-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    YouTube Analytics Tools
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-purple-100">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-3 w-3" />
                      <span>Thumbnail Generator</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3" />
                      <span>Trend Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3" />
                      <span>Keyword Research</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="h-3 w-3" />
                      <span>Content Ideas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Video Ads Generator */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/10 backdrop-blur border border-white/20">
                <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-400/30">
                  <Video className="h-6 w-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    AI Video Ads Generator
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-purple-100">
                    <div className="flex items-center gap-2">
                      <Video className="h-3 w-3" />
                      <span>Script Generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="h-3 w-3" />
                      <span>AI Avatars</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3" />
                      <span>Voice Synthesis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-3 w-3" />
                      <span>Visual Effects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">10K+</div>
                <div className="text-sm text-purple-200">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-300">1M+</div>
                <div className="text-sm text-purple-200">Content Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">99.9%</div>
                <div className="text-sm text-purple-200">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 right-12 animate-bounce">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-20" />
        </div>
        <div className="absolute bottom-1/4 right-24 animate-pulse">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-30" />
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}
