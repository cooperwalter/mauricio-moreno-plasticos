import type { Metadata } from "next";
import { DM_Serif_Display, DM_Serif_Text, Inter, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import {
  BUSINESS_HOURS,
  BUSINESS_PHONE_E164,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — CDMX`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Mayoreo de plásticos en CDMX`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Mayoreo de plásticos en CDMX`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  category: "shopping",
};

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Store",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  telephone: BUSINESS_PHONE_E164,
  priceRange: "$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad de México",
    addressRegion: "CDMX",
    addressCountry: "MX",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Ciudad de México" },
  openingHoursSpecification: BUSINESS_HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [`https://wa.me/${BUSINESS_PHONE_E164.replace("+", "")}`],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${dmSerifDisplay.variable} ${dmSerifText.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          // JSON-LD must be serialized into the script body. Content is a
          // static, hand-authored object — no untrusted input reaches this.
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <Analytics />
      </body>
    </html>
  );
}
