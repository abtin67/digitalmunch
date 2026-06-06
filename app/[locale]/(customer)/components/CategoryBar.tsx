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
      iconEntity: "/drink.png",
    },
    {
      id: "pizza",
      name: { fa: "پیتزا", en: "pizza", ar: "بیتزا" },
      iconEntity: "/pizza.png",
    },
    {
      id: "pasta",
      name: { fa: "پاستا", en: "Pasta", ar: "باستا" },
      iconEntity: "/spaghetti.png",
    },
    {
      id: "sandwich",
      name: { fa: "ساندویچ", en: "Sandwich", ar: "ساندویش" },
      iconEntity: "/sandwich.png",
    },
    {
      id: "burger",
      name: { fa: "برگر", en: "Burger", ar: "برغر" },
      iconEntity: "/cheese-burger.png",
    },
    {
      id: "fries",
      name: { fa: "پیش غذا", en: "Appetizers", ar: "المقبلات" },
      iconEntity: "/breadstick.png",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  // تابع اسکرول به مرکز هنگام کلیک
  const handleCategoryClick = (catId: string, index: number) => {
    setActiveCategory(catId);

    const container = scrollRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll("button");
    const target = buttons[index] as HTMLElement;

    if (!target) return;

    const containerWidth = container.offsetWidth;
    const targetLeft = target.offsetLeft;
    const targetWidth = target.offsetWidth;

    const scrollTo = targetLeft - containerWidth / 2 + targetWidth / 2;

    container.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  // لاجیک مربوط به اسکرول با موس (درگ کردن)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (!scrollRef.current) return;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="sticky mx-auto mt-3 max-w-7xl my-3 
    top-4 left-0 w-full px-3 z-50">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex items-center gap-2 p-3 mx-4 rounded-4xl scrollbar-none bg-[#370e57]/10 backdrop-blur-xl border border-white/5 shadow-lg overflow-x-auto transition-all duration-700"
        style={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        {/* اضافه کردن gap و padding برای فاصله گرفتن از لبه‌ها */}
        <div className="inline-flex items-center gap-2 px-1">
          {categories.map((cat, index) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                // فراخوانی تابع هندلر جدید
                onClick={() => handleCategoryClick(cat.id, index)}
                className={`snap-start shrink-0 flex items-center gap-2 
                   border border-white/10 rounded-full px-2 py-1 sm:px-4  transition-all duration-500
                                ${
                                  isActive
                                    ? "bg-amber-500 backdrop-blur-xl text-black shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                                    : "bg-[#160924]/60 backdrop-blur-xl text-gray-400 border-white/4 hover:text-white"
                                }
                                `}
              >
                <img
                  src={cat.iconEntity}
                  alt={cat.id}
                  draggable="false" // جلوگیری از کشیده شدن عکس حین درگ موس
                  className="object-cover shrink-0 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none"
                  width={30}
                  height={30}
                />
                <span className="text-[16px] sm:text-md pointer-events-none">
                  {cat.name[locale]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
