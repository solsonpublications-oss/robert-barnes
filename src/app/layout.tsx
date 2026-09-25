import type { Metadata, Viewport } from "next";
import { Fraunces, Literata, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { StructuredData } from "@/components/poetry/structured-data";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#150d1a" },
    { media: "(prefers-color-scheme: light)", color: "#f5ece0" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://robert-barnes.space-z.ai"),
  title: {
    default: "The Art of Poetry — R. Ray Barnes",
    template: "%s — The Art of Poetry",
  },
  description:
    "Emmy-winning author and producer R. Ray Barnes — five volumes, one voice. A life written in verse: a love letter told in five parts, plus Queen Pin and companion works on faith, reflection, and family history.",
  keywords: [
    "R. Ray Barnes",
    "Robert Ray Barnes",
    "Robert Barnes",
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
    "2019 Michigan Regional Emmy Award",
    "Left Behind In Vietnam",
    "Eclipse Award winner",
    "Carroll Braxton",
    "Montford Point Marine",
    "music producer",
    "R. Ray Barnes Productions",
    "Berry Gordy Motown",
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    title: "The Art of Poetry",
    statusBarStyle: "black-translucent",
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
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "The Art of Poetry — Emmy-winning author and poet R. Ray Barnes, with his five poetry volumes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Art of Poetry — R. Ray Barnes",
    description:
      "Emmy-winning author and producer R. Ray Barnes — five volumes, one voice. A life written in verse.",
    images: ["/api/og"],
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
      </head>
      <body
        className={`${fraunces.variable} ${literata.variable} ${caveat.variable} ${geistMono.variable} antialiased bg-background text-foreground grain ambient-bg`}
      >
        <StructuredData />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
