"use client";

import type React from "react";

import { useState } from "react";
import {
  ImageIcon,
  Search,
  Hash,
  TrendingUp,
  BarChart3,
  Zap,
  Menu,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  active?: boolean;
}

interface ToolCard {
  title: string;
  subtitle: string;
  color: string;
  darkColor: string;
  textColor: string;
  buttonText: string;
  icon?: React.ComponentType<any>;
}

const toolCards: ToolCard[] = [
  {
    title: "Thumbnail",
    subtitle: "Generator",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    darkColor: "dark:from-orange-600 dark:to-orange-700",
    textColor: "text-white",
    buttonText: "Get Started",
    icon: ImageIcon,
  },
  {
    title: "Search",
    subtitle: "Thumbnail",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    darkColor: "dark:from-blue-600 dark:to-blue-700",
    textColor: "text-white",
    buttonText: "Get Started",
    icon: Search,
  },
  {
    title: "Content",
    subtitle: "Generator",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    darkColor: "dark:from-purple-600 dark:to-purple-700",
    textColor: "text-white",
    buttonText: "Get Started",
    icon: Sparkles,
  },
  {
    title: "Outlier",
    subtitle: "Detection",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    darkColor: "dark:from-green-600 dark:to-green-700",
    textColor: "text-white",
    buttonText: "Get Started",
    icon: TrendingUp,
  },
  {
    title: "Trending",
    subtitle: "Keywords",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    darkColor: "dark:from-indigo-600 dark:to-indigo-700",
    textColor: "text-white",
    buttonText: "Get Started",
    icon: Hash,
  },
];

export default function Analytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-300">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-6 py-4 lg:hidden sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white rounded-sm transform rotate-45 shadow-sm"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                TubePulse
              </span>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-8">
          {/* Banner */}
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 dark:from-orange-600 dark:via-orange-700 dark:to-red-700 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-orange-200" />
                <span className="text-orange-200 font-medium text-sm uppercase tracking-wider">
                  AI-Powered Analytics
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                AI YouTube Analytics Tools
                <span className="block text-2xl md:text-3xl font-semibold text-orange-100">
                  Smarter Growth Insights!
                </span>
              </h1>
              <p className="text-orange-100 max-w-3xl text-lg leading-relaxed">
                Unlock powerful AI tools to boost your YouTube success. Optimize
                with thumbnails, SEO keywords, analytics, and performance
                insights—all in one place!
              </p>
            </div>
          </div>

          {/* AI Tools Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Tools
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toolCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={index}
                    className={cn(
                      "group rounded-2xl p-8 relative overflow-hidden h-48 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer",
                      card.color,
                      card.darkColor,
                      "shadow-lg hover:shadow-xl"
                    )}>
                    {/* Background decorations */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>

                    <div className={cn("flex-1 relative z-10", card.textColor)}>
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-white transition-colors duration-300">
                        {card.title}
                      </h3>
                      {card.subtitle && (
                        <h4 className="text-xl font-semibold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                          {card.subtitle}
                        </h4>
                      )}
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-0 self-start backdrop-blur-sm font-semibold px-6 py-2 rounded-xl transition-all duration-300 group-hover:bg-white/40 group-hover:scale-105 relative z-10">
                      {card.buttonText}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    2.5M+
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Videos Analyzed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    98%
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Accuracy Rate
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    50K+
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Active Users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
