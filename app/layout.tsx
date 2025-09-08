import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default:
      "TubeViral AI - AI-Powered YouTube Analytics & Video Ad Generation",
    template: "%s | TubeViral AI",
  },
  description:
    "Transform your content creation with AI-powered YouTube Analytics, thumbnail generation, video ads creation, and trending keyword analysis. Boost your channel growth with TubeViral AI.",
  keywords: [
    "AI",
    "SaaS",
    "YouTube Analytics",
    "Video Ads",
    "Thumbnail Generator",
    "Content Creation",
    "YouTube SEO",
    "Video Marketing",
    "AI Tools",
  ],
  authors: [{ name: "TubeViral AI" }],
  creator: "TubeViral AI",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "TubeViral AI - AI-Powered YouTube Analytics",
    description: "Transform your content creation with AI-powered tools.",
    siteName: "TubeViral AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "TubeViral AI - AI-Powered YouTube Analytics",
    description: "Transform your content creation with AI-powered tools.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />

        {/* Viewport for mobile optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
