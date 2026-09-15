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
  metadataBase: new URL("https://robert-barnes.space-z.ai"),
  title: "The Art of Poetry — R. Ray Barnes",
  description:
    "Emmy-winning author and producer R. Ray Barnes — five volumes, one voice. A life written in verse: a love letter told in five parts, plus Queen Pin and companion works on faith, reflection, and family history.",
  keywords: [
    "R. Ray Barnes",
    "The Art of Poetry",
    "poetry",
    "love poems",
    "Butterfly Thoughts",
    "Thoughts Dancing From Heart To Mind",
    "Thoughts From The Heart",
    "Love Life The Creator & Me",
    "A Spectrum Of Thoughts",
    "One: An Easy Guide To Understanding God Spirit & Love",
    "Go Sit In A Corner And Think",
    "Queen Pin",
    "Yvonne Barnes",
    "Motown Records Bowlerettes",
    "Emmy winning author",
    "music producer",
    "jazz poetry",
    "faith poetry",
    "contemporary poetry",
  ],
  authors: [{ name: "R. Ray Barnes" }],
  creator: "R. Ray Barnes",
  publisher: "R. Ray Barnes Productions",
  icons: {
    icon: "/images/author-portrait.png",
    apple: "/images/author-portrait.png",
  },
  openGraph: {
    title: "The Art of Poetry — R. Ray Barnes",
    description:
      "Emmy-winning author and producer R. Ray Barnes — five volumes, one voice. A life written in verse: a love letter told in five parts, plus Queen Pin and companion works on faith, reflection, and family history.",
    type: "website",
    siteName: "The Art of Poetry",
    locale: "en_US",
    url: "https://robert-barnes.space-z.ai/",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1344,
        height: 768,
        alt: "The Art of Poetry — R. Ray Barnes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Art of Poetry — R. Ray Barnes",
    description:
      "Emmy-winning author and producer R. Ray Barnes — five volumes, one voice. A life written in verse.",
    images: ["/images/og-preview.png"],
    creator: "@rraybarnes",
  },
  manifest: "/manifest.webmanifest",
  category: "literature",
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
