"use client";

import { getDictionary } from "@/app/locales/dictionaries";
import { MenuItem } from "@/types/menu";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useParams } from "next/navigation";
import { useRef } from "react";

interface MenuCardProps {
  item: MenuItem;
  index?: number; // برای stagger انیمیشن
  onOpenModal?: (item: MenuItem) => void;
}

export default function MenuCard({
  item,
  index = 0,
  onOpenModal,
}: MenuCardProps) {
  const params = useParams();
  const locale = (params.locale as "fa" | "en" | "ar") || "fa";
  const dict = getDictionary(locale);
  const isRtl = locale === "fa" || locale === "ar";

  // برای افکت tilt سه‌بعدی
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !item.isAvailable) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCardClick = () => {
    if (item.isAvailable && onOpenModal) onOpenModal(item);
  };

  return (
    <motion.div
      // ورود stagger شده — هر کارت کمی دیرتر از قبلی
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.9,
        ease: [0.23, 1, 0.32, 1], // easeOutExpo — طبیعی‌تر
        delay: (index % 4) * 0.08, // stagger بر اساس جای کارت در grid
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`group relative flex flex-col
         justify-between overflow-hidden 
        rounded-2xl border border-white/10 bg-[#160924]/40 
        backdrop-blur-3xl  transition-shadow duration-500 
        hover:border-amber-500/30
         hover:shadow-[0_15px_40px_rgba(245,158,11,0.12)]
        ${
          item.isAvailable
            ? "cursor-pointer"
            : "opacity-50 grayscale cursor-not-allowed"
        }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* بخش عکس */}
      <div
        className="relative aspect-4/3 w-full overflow-hidden
       rounded-xl bg-purple-950/20"
      >
        <motion.img
          src={item.image}
          alt={item.title[locale]}
          className="h-full w-full object-cover"
          // زوم نرم فقط روی عکس
          whileHover={item.isAvailable ? { scale: 1.08 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* گرادیان پایین عکس */}
        <div
          className="absolute inset-0 bg-linear-to-t
         from-black/30 via-transparent to-transparent"
        />

        {/* برچسب‌های گوشه */}
        {item.tags && item.tags.length > 0 && (
          <>
            {item.tags.includes("special") && (
              <div className="absolute top-0 left-0 z-10 
              overflow-hidden w-28 h-28">
                <div
                  className="absolute flex items-center 
                  justify-center gap-1 text-[12px] font-black
                   text-white"
                  style={{
                    background: "red",
                    width: "140px",
                    top: "22px",
                    left: "-32px",
                    transform: "rotate(-45deg)",
                    padding: "6px 0",
                    boxShadow: "0 3px 12px rgba(220,38,38,0.6)",
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>🔥</span>
                  <span className="font-bold text-[16px]">
                    {locale === "fa"
                      ? "پیشنهاد ویژه"
                      : locale === "ar"
                        ? "عرض خاص"
                        : "Special"}
                  </span>
                </div>
              </div>
            )}

            {item.tags.find((tag) => tag.startsWith("discount:")) && (
              <div className="absolute top-0 right-0 z-10 overflow-hidden w-28 h-28">
                <div
                  className="absolute flex items-center justify-center text-[12px] font-black text-white"
                  style={{
                    background: "linear-gradient(135deg, #16a34a, #14532d)",
                    width: "140px",
                    top: "22px",
                    right: "-32px",
                    transform: "rotate(45deg)",
                    padding: "6px 0",
                    boxShadow: "0 3px 12px rgba(22,163,74,0.6)",
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span className="font-bold text-[16px]">
                    {
                      item.tags
                        .find((tag) => tag.startsWith("discount:"))
                        ?.split(":")[1]
                    }
                    %
                    {locale === "fa"
                      ? " تخفیف"
                      : locale === "ar"
                        ? " خصم"
                        : " OFF"}
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {/* برچسب ناموجود */}
        {!item.isAvailable && (
          <div
            className="absolute inset-0 z-10 flex items-center
  justify-center bg-black/70 "
          >
            <span
              className="rounded-xl z-20 ring-2 ring-red-200
  bg-black/70 px-5 py-2
  font-bold text-red-200
  shadow-lg shadow-red-500/50"
            >
              {dict.unavailable}
            </span>
          </div>
        )}
      </div>

      {/* بخش اطلاعات */}
      <div className="flex flex-1 py-2 px-5 flex-col justify-between pt-2">
        <h2
          className="text-lg font-bold text-white
         transition-colors duration-300 group-hover:text-amber-400"
        >
          {item.title[locale]}
        </h2>

        {/* قیمت و دکمه */}
        <div
          className="mt-3 flex items-center justify-between
         border-t border-white/5 pt-1"
        >
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-gray-400">
              {locale === "fa"
                ? "تک نفره"
                : locale === "ar"
                  ? "فردي"
                  : "Single"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-sans text-xl font-black text-amber-400">
                {item.price.single.toLocaleString()}
              </span>
              <span className="text-xl font-medium text-gray-500">
                {locale === "fa" ? "ت" : locale === "ar" ? "T" : "T"}
              </span>
            </div>
          </div>

          {/* دکمه + با انیمیشن */}
          <motion.button
            disabled={!item.isAvailable}
            type="button"
            whileHover={item.isAvailable ? { scale: 1.12, rotate: 90 } : {}}
            whileTap={item.isAvailable ? { scale: 0.9 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 transition-colors duration-300 ${
              item.isAvailable
                ? "bg-white/5 text-white group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "text-gray-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
