"use client";

import { useParams } from "next/navigation";
import { useRef } from "react";

interface CategoryBarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryBar({
  activeCategory,
  setActiveCategory,
}: CategoryBarProps) {
  const params = useParams();
  const locale = (params?.locale as "fa" | "en" | "ar") || "fa";
  const isRtl = locale === "fa" || locale === "ar";

  const categories = [
    {
      id: "combo",
      name: { fa: "کمبو", en: "Combo", ar: "کامبو" },
      iconEntiry: "/drink.png",
    },
    {
      id: "pizza",
      name: { fa: "پیتزا", en: "pizza", ar: "بیتزا" },
      iconEntiry: "/pizza.png",
    },
    {
      id: "pasta",
      name: { fa: "پاستا", en: "Pasta", ar: "باستا" },
      iconEntiry: "/spaghetti.png",
    },
    {
      id: "sandwich",
      name: { fa: "ساندویچ", en: "Sandwich", ar: "ساندویش" },
      iconEntiry: "/sandwich.png",
    },
    {
      id: "burger",
      name: { fa: "برگر", en: "Burger", ar: "برغر" },
      iconEntiry: "/cheese-burger.png",
    },
    {
      id: "fries",
      name: { fa: "پیش غذا", en: "Appetizers", ar: "المقبلات" },
      iconEntiry: "/breadstick.png",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (catId: string, index: number) => {
    setActiveCategory(catId);

    const container = scrollRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll("button");
    const target = buttons[index] as HTMLElement;

    if (!target) return;

    const containerWhidth = container.offsetWidth;
    const targetLeft = target.offsetLeft;
    const targetWhidth = target.offsetWidth;

    const scrollTo = targetLeft - containerWhidth / 2 + targetWhidth / 2;

    container.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });

    
  };

  const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
      isDown.current = true;
      startX.current = e.pageX - scrollRef.current!.offsetLeft;
      scrollLeft.current = scrollRef.current!.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown.current = false;
    };
    const handleMouseUp = () => {
      isDown.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current!.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      scrollRef.current!.scrollLeft = scrollLeft.current - walk;
    };

  return (
    <div className="sticky top-0 left-0 w-full bg-gradient-to-b from-slate-950 via-purple-950 to-purple-950/80  backdrop-blur-3xl shadow-md z-50">
      <div
        ref={scrollRef}
        
        className="flex-1 overflow-x-auto overflow-y-scroll scroll-smooth whitespace-nowrap"
        style={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        <div className="inline-flex  items-center">
        {categories.map((cat, index) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`snap-start shrink-0 flex items-center gap-2 rounded-full px-6 py-2 transition-all duration-500
                                ${
                                  isActive
                                    ? "bg-amber-500 backdrop-blur-2xl text-black shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                                    : "bg-[#160924]/60 backdrop-blur-3xl text-gray-400 border-white/4 hover:text-white"
                                }
                                `}
            >
              <img
                src={cat.iconEntiry}
                alt="icon"
                className="object-cover shrink-0"
                width={30}
                height={30}
              />
              <span className="text-[18px] sm:text-md">{cat.name[locale]}</span>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}
