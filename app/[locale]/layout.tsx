// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Inter } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

// متا تگ per-locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    fa: "مانچ باکس | منوی دیجیتال",
    ar: "مانش بوكس | القائمة الرقمية",
    en: "Munch Box | Digital Menu",
  };

  const descriptions = {
    fa: "منوی دیجیتال مانچ باکس — بهترین فست‌فود ایرانمال تهران",
    ar: "قائمة مانش بوكس الرقمية — أفضل وجبات سريعة في إيران مول",
    en: "Munch Box digital menu — Best fast food at Iran Mall Tehran",
  };

  const lang = locale as "fa" | "ar" | "en";

  return {
    title: titles[lang] ?? titles.fa,
    description: descriptions[lang] ?? descriptions.fa,
    alternates: {
      canonical: `https://digitalmunch.vercel.app/${locale}/menu`,
      languages: {
        fa: "/fa",
        ar: "/ar",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isRtl = locale === "fa" || locale === "ar";

  // فونت بر اساس زبان
  const fontClass = {
    fa: vazirmatn.variable,
    ar: notoArabic.variable,
    en: inter.variable,
  }[locale] ?? vazirmatn.variable;

  return (
    <div
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${fontClass} ${inter.variable} font-sans`}
      // font-sans به CSS variable وصله — هر زبان فونت خودش رو داره
    >
      {children}
    </div>
  );
}