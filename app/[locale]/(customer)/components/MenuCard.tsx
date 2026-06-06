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
        duration: 0.90,
        ease: [0.23, 1, 0.32, 1], // easeOutExpo — طبیعی‌تر
        delay: (index % 4) * 0.08, // stagger بر اساس جای کارت در grid
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`group relative flex flex-col justify-between overflow-hidden 
        rounded-[2.2rem] border border-white/5 bg-[#160924]/40 
        backdrop-blur-3xl p-3 transition-shadow duration-500 
        hover:border-amber-500/30 hover:shadow-[0_15px_40px_rgba(245,158,11,0.12)]
        ${
          item.isAvailable
            ? "cursor-pointer"
            : "opacity-50 grayscale cursor-not-allowed"
        }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* بخش عکس */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.6rem] bg-purple-950/20">
        <motion.img
          src={item.image}
          alt={item.title[locale]}
          className="h-full w-full object-cover"
          // زوم نرم فقط روی عکس
          whileHover={item.isAvailable ? { scale: 1.08 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* گرادیان پایین عکس */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

        {/* برچسب ناموجود */}
        {!item.isAvailable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[3px]"
          >
            <span className="rounded-xl bg-red-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-red-500/20">
              {dict.unavailable}
            </span>
          </motion.div>
        )}
      </div>

      {/* بخش اطلاعات */}
      <div className="flex flex-1 flex-col justify-between pt-4 px-2">
        <h2 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
          {item.title[locale]}
        </h2>

        {/* قیمت و دکمه */}
        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-gray-400">
              {locale === "fa" ? "تک نفره" : locale === "ar" ? "فردي" : "Single"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-sans text-xl font-black text-amber-400">
                {item.price.single.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-gray-500">
                {locale === "fa" ? "تومان" : locale === "ar" ? "ت" : "T"}
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