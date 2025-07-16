import { useState } from "react";
import {
  Home,
  Image,
  Search,
  Hash,
  TrendingUp,
  BarChart3,
  Zap,
  CreditCard,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  textColor: string;
  buttonText: string;
  icon?: string;
}

const toolCards: ToolCard[] = [
  {
    title: "Thumbnail",
    subtitle: "Generator",
    color: "bg-orange-500",
    textColor: "text-white",
    buttonText: "Get Started",
  },
  {
    title: "Search",
    subtitle: "Thumbnail",
    color: "bg-blue-500",
    textColor: "text-white",
    buttonText: "Get Started",
  },
  {
    title: "Content",
    subtitle: "Generator",
    color: "bg-purple-500",
    textColor: "text-white",
    buttonText: "Get Started",
  },
  {
    title: "Outlier",
    subtitle: "",
    color: "bg-green-500",
    textColor: "text-white",
    buttonText: "Get Started",
  },
  {
    title: "Trending",
    subtitle: "Keywords",
    color: "bg-blue-600",
    textColor: "text-white",
    buttonText: "Get Started",
  },
];

export default function Analytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">TubePulse</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 mb-8 text-white">
            <h1 className="text-2xl font-bold mb-2">
              AI YouTube Analytics Tools - Smarter Growth Insights!
            </h1>
            <p className="text-orange-100 max-w-3xl">
              Unlock powerful AI tools to boost your YouTube success. Optimize
              with thumbnails, SEO keywords, analytics, and performance
              insights—all in one place!
            </p>
          </div>

          {/* AI Tools Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              AI Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCards.map((card, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-xl p-6 relative overflow-hidden h-40 flex flex-col justify-between",
                    card.color
                  )}>
                  <div className={cn("flex-1", card.textColor)}>
                    <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                    {card.subtitle && (
                      <h4 className="text-xl font-bold">{card.subtitle}</h4>
                    )}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white border-0 self-start">
                    {card.buttonText}
                  </Button>

                  {/* Background decoration */}
                  <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                    <div className="w-full h-full bg-white/30 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
