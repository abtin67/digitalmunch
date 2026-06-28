"use client";

import { getDictionary } from "@/app/locales/dictionaries";
import { MenuItem } from "@/types/menu";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface MenuModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: MenuModalProps) {
  const params = useParams();
  const locale = (params?.locale as "fa" | "en" | "ar") || "fa";
  const dict = getDictionary(locale);
  const isRtl = locale === "fa" || locale === "ar";

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [item]);

  if (!item) return null;

  const hasDiscount = (item.price.discountedSingle ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm bg-black/60"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#160924] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        {/* عکس */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title[locale]}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160924] via-[#160924]/20 to-transparent" />

          {/* دکمه بستن */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white border border-white/10 hover:bg-red-500/30 transition-all text-sm"
          >
            ✕
          </button>

          {/* badge پیشنهاد ویژه */}
          {item.offer?.isSpecial && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-red-500 px-3 py-1 rounded-full text-white text-xs font-bold">
              <span>🔥</span>
              {locale === "fa" ? "پیشنهاد ویژه" : locale === "ar" ? "عرض خاص" : "Special"}
            </div>
          )}

          {/* badge تخفیف */}
          {(item.offer?.discountPercent ?? 0) > 0 && (
            <div className="absolute bottom-4 right-4 bg-green-500 px-3 py-1 rounded-full text-white text-xs font-bold">
              {item.offer?.discountPercent}%
              {locale === "fa" ? " تخفیف" : locale === "ar" ? " خصم" : " OFF"}
            </div>
          )}
        </div>

        {/* محتوا */}
        <div className="p-5" dir={isRtl ? "rtl" : "ltr"}>
          <h2 className="text-xl font-black text-white">{item.title[locale]}</h2>

          {item.description?.[locale] && (
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              {item.description[locale]}
            </p>
          )}

          {/* قیمت‌ها */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/8 pt-4">
            {/* تک نفره */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/8 py-3 px-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase mb-1">
                {dict.single}
              </span>
              {hasDiscount ? (
                <>
                  <span className="text-xs text-gray-600 line-through">
                    {item.price.single.toLocaleString()}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-sans text-lg font-black text-amber-400">
                      {item.price.discountedSingle?.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      {locale === "fa" ? "ت" : "T"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="font-sans text-lg font-black text-white">
                    {item.price.single.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {locale === "fa" ? "ت" : "T"}
                  </span>
                </div>
              )}
            </div>

            {/* دو نفره */}
            {item.price.double ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/8 py-3 px-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase mb-1">
                  {dict.double}
                </span>
                {(item.price.discountedDouble ?? 0) > 0 ? (
                  <>
                    <span className="text-xs text-gray-600 line-through">
                      {item.price.double.toLocaleString()}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-sans text-lg font-black text-amber-400">
                        {item.price.discountedDouble?.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {locale === "fa" ? "ت" : "T"}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="font-sans text-lg font-black text-white">
                      {item.price.double.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      {locale === "fa" ? "ت" : "T"}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/10">
                <span className="font-mono text-[10px] tracking-widest text-gray-600 uppercase">
                  Munch Box
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}