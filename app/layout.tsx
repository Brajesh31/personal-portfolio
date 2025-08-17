import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SciFiNavbarWrapper } from "@/components/SciFiNavbarWrapper"
import { AudioProvider } from "@/components/AudioContext"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BRAJESH KUMAR | FULL-STACK & MERN-STACK DEVELOPER",
  description: "Portfolio of Brajesh Kumar, a full stack developer specializing in MERN, Next.js, and modern web technologies.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://etech-community.com/",
    title: "Brajesh Kumar | Full Stack Developer",
    description: "Portfolio of Brajesh Kumar, a full stack developer specializing in MERN and Next.js",
    siteName: "Brajesh Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brajesh Kumar | Full Stack Developer",
    description: "Portfolio of Brajesh Kumar, a full stack developer specializing in MERN and Next.js",
    creator: "@lord_Brajesh",
  },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        {/* Example favicon (keep .ico or .png as per your actual favicon file in /public) */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange forcedTheme="dark">
        <AudioProvider>
          {/* Global Sci-Fi Navbar */}
          <div className="fixed top-5 left-5 right-5 z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <SciFiNavbarWrapper />
            </div>
          </div>

          {/* Main Content */}
          {children}

          {/* Global Footer */}
          <Footer />

          {/* Vercel Speed Insights */}
          <SpeedInsights />

          {/* Custom Cursor removed */}
        </AudioProvider>
      </ThemeProvider>
      </body>
      </html>
  )
}
