import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { GlobalSchema } from "@/components/SchemaMarkup";
import { primaryFont } from "@repo/fonts";
import { ENV } from "./env";

// Base URL configuration
const baseUrl = ENV.BASE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  // Canonical URL (Critical for SEO)
  alternates: {
    canonical: '/',
  },

  // Basic Metadata
  title: {
    default: "Free Resume Builder | Create Professional, ATS-Friendly Resumes Online",
    template: "%s | ProfResume"
  },
  description: "Build beautiful, ATS-optimized resumes with our 100% free resume builder. 20+ professional templates, AI-powered tools, unlimited downloads. No credit card required, no watermarks.",
  keywords: [
    "free resume builder",
    "resume builder",
    "professional resume",
    "ATS-friendly resume",
    "resume templates",
    "CV builder",
    "resume maker",
    "online resume builder",
    "resume AI",
    "resume optimizer",
    "ATS resume checker",
    "resume creator",
    "best resume builder",
    "professional resume service"
  ],
  authors: [{ name: "ProfResume Team" }],
  creator: "ProfResume",
  publisher: "ProfResume",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Professional Resume Builder | Create ATS-Friendly Resumes",
    description: "Build beautiful, ATS-optimized resumes with AI-powered tools. Choose from 20+ templates and download as PDF instantly.",
    siteName: "ProfResume",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "ProfResume - Professional Resume Builder",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Professional Resume Builder | ProfResume",
    description: "Build ATS-friendly resumes in minutes. 20+ templates, AI feedback, instant PDF download.",
    images: ['/og-image.png'],
    creator: "@profresume",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional
  category: "technology",
  classification: "Resume Builder Software",

  // Verification (for Google Search Console)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },

  // Icons (Next.js App Router best practice)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/icon-192.png',
    apple: '/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-adsense-account" content="ca-pub-3262304083143736"></meta>
      </head>
      <body className={`${primaryFont.variable} antialiased min-h-screen flex flex-col`}>
        <GlobalSchema />
        <Navigation />
        <main className="flex-1 mt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
