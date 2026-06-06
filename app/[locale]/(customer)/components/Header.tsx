"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const params = useParams();
  const locale = (params.locale as "fa" | "en" | "ar") || "fa";

  return (
    // فاصله از بالا و کناره‌ها برای شناور شدن
    <header className=" top-4 left-0 right-0 z-50 px-4">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-3 rounded-3xl bg-[#370e57]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        
        {/* بخش لوگو - خیلی مینیمال */}
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl overflow-hidden ring-2 ring-amber-500/20">
                <img src="/logo-munch.jpg" alt="logo" className="h-full w-full object-cover" />
            </div>
            <h1 className="hidden sm:block font-black text-lg tracking-tighter text-white">
                MUNCH<span className="text-amber-400">BOX</span>
            </h1>
        </div>

        {/* سوئیچر زبان مینیمال و شیشه‌ای */}
        <div className="flex items-center bg-black/20 p-1 rounded-2xl border border-white/5">
          {['fa', 'en', 'ar'].map((lang) => (
            <Link
              key={lang}
              href={`/${lang}`}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-xl transition-all duration-300 ${
                locale === lang
                  ? "bg-white text-purple-900 shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {lang}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}