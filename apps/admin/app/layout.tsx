import type { Metadata } from "next";
import "./globals.css";
import { AdminSidebar } from "@/components/AdminSidebar";
import { primaryFont } from "@repo/fonts";

export const metadata: Metadata = {
  title: "ProfResume Admin - Manage Users & Templates",
  description: "Admin panel for managing users and resume templates",
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
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 w-full md:ml-64 overflow-x-hidden">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
