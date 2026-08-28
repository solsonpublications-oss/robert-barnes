import type { Metadata } from "next";
import { Fraunces, Literata, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Art of Poetry — R. Ray Barnes",
  description:
    "Four volumes, one voice. A life written in verse by R. Ray Barnes — a love letter told in four parts: to romance, to grief, to jazz, and to the faith that carries a heart through all of it.",
  keywords: [
    "R. Ray Barnes",
    "The Art of Poetry",
    "poetry",
    "love poems",
    "Butterfly Thoughts",
    "Thoughts Dancing From Heart To Mind",
    "Thoughts From The Heart",
    "Love Life The Creator & Me",
  ],
  authors: [{ name: "R. Ray Barnes" }],
  icons: {
    icon: "/images/author-portrait.png",
  },
  openGraph: {
    title: "The Art of Poetry — R. Ray Barnes",
    description:
      "Four volumes, one voice. A life written in verse by R. Ray Barnes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Art of Poetry — R. Ray Barnes",
    description:
      "Four volumes, one voice. A life written in verse by R. Ray Barnes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${literata.variable} ${caveat.variable} ${geistMono.variable} antialiased bg-background text-foreground grain ambient-bg`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
