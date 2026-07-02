import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aarul Koul — Software Engineer",
  description:
    "Frontend engineer in Pune, India — building SaaS platforms with Next.js, React, and TypeScript, with a data engineer's reflexes. Currently SDE at Borderline Genius.",
  openGraph: {
    title: "Aarul Koul — Software Engineer",
    description:
      "Frontend engineer building SaaS in Next.js — design-grade on the surface, engineering-grade underneath.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f0ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}
