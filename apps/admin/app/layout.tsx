import type { Metadata } from "next";
import "./globals.css";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminAuthProvider } from "@/components/AdminAuthProvider";
import { primaryFont } from "@repo/fonts";

export const metadata: Metadata = {
  title: "Hirecta Admin - Manage Users & Templates",
  description: "Admin panel for managing users and resume templates",

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
      <body className={`${primaryFont.variable} antialiased bg-gray-50 min-h-screen`}>
        <AdminAuthProvider>
          <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 w-full md:ml-64 overflow-x-hidden">
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
