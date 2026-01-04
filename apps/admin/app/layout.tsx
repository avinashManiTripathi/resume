import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AdminSidebar } from "@/components/AdminSidebar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ResumePro Admin - Manage Users & Templates",
  description: "Admin panel for managing users and resume templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased bg-gray-50`}>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
