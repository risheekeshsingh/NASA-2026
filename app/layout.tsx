import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { GravityProvider } from "@/context/GravityContext";
import { SpaceFireBackground } from "@/components/background/SpaceFireBackground";
import { NavProgress } from "@/components/NavProgress";

import { PWARegistration } from "@/components/PWARegistration";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlameLens | Microgravity Fire Safety & Combustion Intelligence",
  description:
    "Interactive AI-powered dashboard synthesizing decades of NASA microgravity combustion data into actionable fire safety insights for Moon and Mars exploration habitats.",
  keywords: [
    "microgravity combustion",
    "space fire safety",
    "NASA Space Apps Challenge",
    "flame in freefall",
    "FlameLens",
    "Artemis habitat safety",
    "cool flames",
    "zero gravity physics",
    "Saffire",
    "FLEX-2",
  ],
  authors: [{ name: "FlameLens Space Apps Team" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "FlameLens | Microgravity Fire Safety & Combustion Intelligence",
    description:
      "Interactive AI-powered dashboard synthesizing decades of NASA microgravity combustion data into actionable fire safety insights for Moon and Mars exploration habitats.",
    url: "https://flamelens.vercel.app",
    siteName: "FlameLens",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlameLens | Microgravity Fire Safety & Combustion Intelligence",
    description:
      "Decades of NASA microgravity combustion data synthesized into actionable fire-safety insights for Moon and Mars exploration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-[#04060f] ${publicSans.variable} ${sourceSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-transparent text-[#D5D9E2] flex flex-col min-h-screen antialiased selection:bg-ember-500/30 selection:text-ember-200 relative">
        {/* Navigation Instant Feedback Progress Bar */}
        <NavProgress />

        {/* Skip to Content Accessibility Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ember-500 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Problem-statement animated background ("Fire in Freefall") */}
        <SpaceFireBackground />

        <LanguageProvider>
          <BookmarkProvider>
            <GravityProvider>
              {/* Sticky Glassmorphism Header */}
              <Navbar />

              {/* Main Content Area */}
              <main
                id="main-content"
                className="flex-1 flex flex-col relative z-10 focus:outline-none"
                tabIndex={-1}
              >
                <ErrorBoundary>{children}</ErrorBoundary>
              </main>

              {/* Footer with Mandatory Disclaimer */}
              <Footer />

              {/* PWA Service Worker Registration */}
              <PWARegistration />
            </GravityProvider>
          </BookmarkProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
