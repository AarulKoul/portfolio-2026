import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aarul Koul — Software Engineer",
  description:
    "Software Development Engineer in Pune, India. Building SaaS platforms with Next.js, React, and TypeScript — with a data engineer's habit of measuring everything. Vol. 01 of the engineering record.",
  openGraph: {
    title: "Aarul Koul — Software Engineer",
    description:
      "An engineering journal: SaaS platforms in Next.js, million-row datasets, and interfaces set with editorial care.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-bone">{children}</body>
    </html>
  );
}
