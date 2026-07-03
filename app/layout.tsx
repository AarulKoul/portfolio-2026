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
    "Pixel / Pipeline — an interactive portfolio by Aarul Koul, software engineer in Pune. SaaS platforms in Next.js, million-row datasets, and interfaces that ship.",
  openGraph: {
    title: "Aarul Koul — Pixel / Pipeline",
    description:
      "An interactive engineering experience: SaaS in Next.js by trade, million-row datasets for sport.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080d",
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
      <body className="min-h-full bg-void text-fg">{children}</body>
    </html>
  );
}
