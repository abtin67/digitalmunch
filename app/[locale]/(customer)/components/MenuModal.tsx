"use client";

import { getDictionary } from "@/app/locales/dictionaries";
import { MenuItem } from "@/types/menu";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MenuModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: MenuModalProps) {
  const params = useParams();
  const locale = (params?.locale as "fa" | "en" | "ar") || "fa";
  const dect = getDictionary(locale);
  const isRtl = locale === "fa" || locale === "ar";

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [item]);

  if (!item) return null;

  return (
    // اصلاح z-index به z-[1000] (با براکت)
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-1000 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 transition-all duration-300"
    >
      {/* برای اینکه با کلیک روی پس‌زمینه بسته بشه */}
      <div
        
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* کانتینر اصلی */}
      <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative w-full max-w-xl overflow-hidden rounded-4xl border border-white/10 bg-[#160924]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button
          onClick={onClose}
          className={`absolute top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white border border-white/10 hover:bg-red-500/20 transition-all ${isRtl ? "left-5" : "right-5"}`}
        >
          ✕
        </button>

        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-purple-950/20">
          <img
            src={item.image}
            alt={item.title[locale]}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#160924] to-transparent" />
        </div>

        <div className="mt-5 px-1" style={{ direction: isRtl ? "rtl" : "ltr" }}>
          <h2 className="text-2xl font-black text-white">
            {item.title[locale]}
          </h2>
          <div className="mt-4">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              {locale === "en"
                ? "Ingredients"
                : locale === "ar"
                  ? "المكونات"
                  : "ترکیبات اصلی"}
            </span>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              {item.description[locale]}
            </p>
          </div>
        </div>

        {/* بخش قیمت‌ها */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/5 py-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              {dect.single}
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-sans text-lg font-black text-white">
                {item.price.single.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">T</span>
            </div>
          </div>

          {item.price.double ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/5 py-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                {dect.double}
              </span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-sans text-lg font-black text-white">
                  {item.price.double.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">T</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl bg-transparent border border-dashed border-white/10">
              <span className="font-mono text-[10px] tracking-widest text-gray-600 uppercase">
                Munch Box
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
