import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalmunch.vercel.app"),
  title: {
    default: "مانچ باکس | Munch Box",
    template: "%s | Munch Box",
  },
  description: "منوی دیجیتال مانچ باکس — ایرانمال تهران | Digital Menu",
  keywords: ["مانچ باکس", "منوی دیجیتال", "ایرانمال", "فست فود", "Munch Box", "digital menu"],
  authors: [{ name: "Ferydoun Aghebati", url: "https://feriweb.ir" }],
  creator: "Ferydoun Aghebati",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "مانچ باکس | Munch Box",
    description: "منوی دیجیتال مانچ باکس — ایرانمال تهران",
    url: "https://digitalmunch.vercel.app",
    siteName: "Munch Box",
    images: [
      {
        url: "/logo-munch.jpg",
        width: 800,
        height: 800,
        alt: "Munch Box Logo",
      },
    ],
    locale: "fa_IR",
    alternateLocale: ["ar_AE", "en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مانچ باکس | Munch Box",
    description: "منوی دیجیتال مانچ باکس — ایرانمال تهران",
    images: ["/logo-munch.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}