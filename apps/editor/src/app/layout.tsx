import type { Metadata } from "next";
import "./globals.css";
import { primaryFont } from "@repo/fonts";

export const metadata: Metadata = {
  title: "Resume Editor - Build Your Professional Resume",
  description: "Create and edit professional resumes with our intuitive editor",

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
      </head>
      <body className={`${primaryFont.variable} antialiased min-h-screen`} style={{ touchAction: 'pan-y pinch-zoom' }}>
        {children}
      </body>
    </html>
  );
}
