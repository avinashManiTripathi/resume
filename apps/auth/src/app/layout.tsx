import type { Metadata } from "next";
import "./globals.css";
import { primaryFont } from "@repo/fonts";

export const metadata: Metadata = {
  title: "Resume Builder - Sign In",
  description: "Sign in to create your professional resume with AI-powered optimization",
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
