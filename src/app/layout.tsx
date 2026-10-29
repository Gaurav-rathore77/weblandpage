import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { preload } from "react-dom";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const siteTitle = siteConfig.title;
const siteDescription = siteConfig.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Weblign",
  authors: [{ name: "Weblign", url: siteConfig.mainUrl }],
  creator: "Weblign",
  publisher: "Weblign",
  category: "Web Development",
  keywords: [
    "website development India",
    "website design India",
    "business website development",
    "landing page development",
    "meta ads landing page",
    "custom web application development",
    "responsive website design",
    "website redesign",
    "Weblign",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Weblign | Websites Built to Turn Clicks Into Enquiries",
    description:
      "Fast, mobile-first business websites and landing pages built to turn ad clicks into enquiries. Transparent pricing from ₹9,999.",
    url: siteConfig.url,
    siteName: "Weblign",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Weblign — websites built to turn clicks into enquiries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weblign | Websites Built to Turn Clicks Into Enquiries",
    description:
      "Fast, mobile-first websites and landing pages built to turn ad clicks into enquiries. Transparent pricing from ₹9,999.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Weblign — websites built to turn clicks into enquiries",
      },
    ],
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
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preload("/hero-bg-alt-1440.webp", {
    as: "image",
    fetchPriority: "high",
    imageSrcSet:
      "/hero-bg-alt-960.webp 960w, /hero-bg-alt-1440.webp 1440w, /hero-bg-alt.webp 1920w",
    imageSizes: "100vw",
  });

  return (
    <html lang="en-IN" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
