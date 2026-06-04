"use client";

import { useParams } from "next/navigation";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  const params = useParams();
  const locale = (params?.locale as "fa" | "en" | "ar") || "fa";
  const isRtl = locale === "fa" || locale === "ar";

  const placeholder = {
    fa: "جستجوی غذای مورد نظر...",
    en: "Search for food...",
    ar: "ابحث عن طعامک المفضّل",
  };

  return (
    <div
      className="mx-auto max-w-7xl px-4 mt-6"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <div className="relative flex items-center">
        <span
          className={`absolute top-1/2 -translate-y-1/2 text-gray-500 font-mono text-2xl ps-4`}
        >
          &#128269;
        </span>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder[locale]}
          className={`w-full rounded-2xl border border-white/4 bg-[#160924] py-3.5 text-sm text-white placeholder-gray-500 transition-all duration-300
                    focus:border-amber-500/40 focus:bg-[#160924]/80 focus:outline-none focus:shadow-[0_0_20px_rgba(245,158,11,0.05)]
                    ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"}`}
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className={`absolute top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white transition-colors ${isRtl ? "left-4" : "ring-4"}`}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}
