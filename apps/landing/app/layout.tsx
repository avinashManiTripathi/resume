import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Resume Builder - Create Professional Resumes in Minutes",
  description: "Build beautiful, ATS-friendly resumes with our easy-to-use resume builder. Choose from professional templates and download as PDF instantly.",
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
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={`${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-1 mt-[70px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
