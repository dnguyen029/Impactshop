import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Impact Snowboards | Premium Performance",
  description: "High-fidelity snowboarding gear synced from Shopify and managed with Sanity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-zinc-900 antialiased">
        <Header />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
