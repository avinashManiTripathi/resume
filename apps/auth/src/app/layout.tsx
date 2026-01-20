import type { Metadata } from "next";
import "./globals.css";
import { primaryFont } from "@repo/fonts";

export const metadata: Metadata = {
  title: "Resume Builder - Sign In",
  description: "Sign in to create your professional resume with AI-powered optimization",

  // Icons (Next.js App Router best practice)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/icon-192.png',
    apple: '/apple-touch-icon.png',
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
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${primaryFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
