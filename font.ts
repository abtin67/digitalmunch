
import localFont from "next/font/local";

export const vazirmatn = localFont({
  src: "./fonts/Vazirmatn-VariableFont_wght.ttf",
  variable: "--font-vazirmatn",
  weight: "100 900", 
  display: "swap",
});

export const notoArabic = localFont({
  src: "./fonts/NotoSansArabic-VariableFont_wdth,wght.ttf",
  variable: "--font-noto-arabic",
  weight: "100 900",
   display: "swap",
});

export const inter = localFont({
 src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
   display: "swap",
});