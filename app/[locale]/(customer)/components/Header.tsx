"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const params = useParams();
  const locale = (params.locale as "fa" | "en" | "ar") || "fa";

  return (
    <header className=" top-4 left-0 right-0 z-50 px-4">
      <nav
        className="mx-auto max-w-7xl flex items-center justify-between 
        px-3 py-2 rounded-3xl bg-purple-900/45 backdrop-blur-2xl 
        border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        {/* لوگو با بوردر چرخان */}
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14
           flex items-center justify-center">
            {/* بوردر چرخان */}
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                background:
                  "conic-gradient(from 0deg, #f59e0b 0%, #f59e0b 35%, transparent 35%, transparent 65%, #a855f7 65%, #a855f7 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "2px",
                animationDuration: "3s",
                animationTimingFunction: "linear",
              }}
            />
            {/* لوگو */}
            <div className="relative h-12 w-12 rounded-full overflow-hidden z-10">
              <img
                src="/logo-munch.jpg"
                alt="Munch Box Logo"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <h1 className="hidden sm:block font-black text-lg tracking-tighter text-white">
            MUNCH<span className="text-amber-400">BOX</span>
          </h1>
        </div>

        {/* سوئیچر زبان */}
        <div className="flex items-center bg-black/30 p-1 
        rounded-2xl border border-white/10">
          {(["ar", "en", "fa"] as const).map((lang) => (
            <Link
              key={lang}
              href={`${lang}`}
              className={`px-3 py-1.5 text-[13px] font-bold uppercase rounded-xl transition-all duration-300 ${
                locale === lang
                  ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]"
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