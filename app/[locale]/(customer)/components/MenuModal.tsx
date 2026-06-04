"use client";

import { getDictionary } from "@/app/locales/dictionaries";
import { MenuItem } from "@/types/menu";
import { useParams } from "next/navigation";
import { useEffect } from "react";

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
    <div className="fixed inset-0 z50 flex  items-center justify-center p-4 backdrop-blur-sm bg-black/60 transition-all duration-300">

      <div className="absolute inset-0" onClick={onClose}>

        <div className="relative m-auto w-full mt-5 md:max-w-2xl overflow-hidden rounded-2xl border border-white/8 bg-[#160924]/80 p-5 shadow-[0_0_50px_rgba(245,158,11,0.1)]">
          <button
          onClick={onClose}
          className={`absolute top-4 z-10 flex h-8 w-8 items-center justify-center
            rounded-full bg-black/40 text-gray-400 border border-white/10
            hover:text-white transition-colors ${isRtl?'left-4':'ring-4'}`}
          >
            X
          </button>

          <div className="relative aspect-16/10 w-full overflow-hidden rounded-4xl bg-purple-950/20">

          <img src={item.image} alt={item.title[locale]}
          className="h-full w-full object-cover" />

          <div className="absolute inset-0 bg-linear-to-t from-[#160924] via-transparent to-transparent"></div>

          </div>

          <div className="mt-5 px-1 text-right"
          style={{direction:isRtl?'rtl':'ltr'}}>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white">{item.title[locale]}</h2>
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold">
                  {locale === 'en'?'Ingredints':
                  locale === 'ar'?
                'المکونات':"ترکیبات اصلی"}
                </span>
                <p className="mt-1 5 text-sm text-gray-300 leading-relaxed">
                  {item.description[locale]}
                </p>
              </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
                    <div className="flex flex-col items-center justify-center
                    rounded-2xl bg-white/5  border border-white/7 py-3">
                      <span className="text-[16px] font-medium text-gray-400 uppercase tracking-wider">{dect.single}</span>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-sans text-lg font-black text-white">{item.price.single.toLocaleString()}</span>
                        <span className="text-sm text-gray-400">T</span>
                      </div>
                    </div>

                    {item.price.double ?(
                      <div className="flex flex-col items-center justify-center
                    rounded-2xl bg-white/5  border border-white/7 py-3">
                      <span className="text-[16px] font-medium text-gray-400 uppercase tracking-wider">{dect.double}</span>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-sans text-lg font-black text-white">{item.price.double.toLocaleString()}</span>
                        <span className="text-sm text-gray-400">T</span>
                      </div>
                    </div>
                    ):(
                      <div className="flex items-center justify-center rounded-2xl bg-white/1 border
                      border-dashed border-white/4">
                        <span className="font-mono text-[14px] tracking-widest text-gray-600 uppercase">Munch Box</span>
                      </div>
                    )}
          </div>
         
        </div>

      </div>

    </div>
  );
}
