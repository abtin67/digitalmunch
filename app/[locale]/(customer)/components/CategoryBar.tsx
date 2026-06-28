"use client";

import { useRef } from "react";

interface CategoryBarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: {
    _id: string;
    name: { fa: string; en: string; ar: string };
    icon?: string;
  }[];
  locale: "fa" | "en" | "ar";
}

export default function CategoryBar({
  activeCategory,
  setActiveCategory,
  categories,
  locale,
}: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    container.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

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
    <div className="sticky mx-auto mt-3 max-w-7xl my-3 top-4 left-0 w-full px-3 z-50">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex items-center gap-2 p-3 mx-4 rounded-4xl scrollbar-none bg-[#370e57]/10 backdrop-blur-xl border border-white/5 shadow-lg overflow-x-auto transition-all duration-700"
        style={{
          direction: locale === "fa" || locale === "ar" ? "rtl" : "ltr",
        }}
      >
        <div className="inline-flex items-center  gap-2 px-1">
          {categories.map((cat, index) => {
            const isActive = activeCategory === cat._id;
            return (
              <button
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id, index)}
                className={`snap-start shrink-0 flex items-center justify-center gap-2 border border-white/10 rounded-full px-3 py-1.5 sm:px-4 transition-all duration-500
                  ${
                    isActive
                      ? "bg-amber-500 backdrop-blur-xl text-black shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      : "bg-[#160924]/60 backdrop-blur-xl text-gray-400 border-white/4 hover:text-white"
                  }`}
              >
                {cat.icon &&
                  (cat.icon.startsWith("http") || cat.icon.startsWith("/") ? (
                    <img
                      src={cat.icon}
                      alt={cat._id}
                      draggable="false"
                      className="object-cover shrink-0 w-6 h-6 sm:w-6 sm:h-6 pointer-events-none"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <span className="text-xl pointer-events-none">
                      {cat.icon}
                    </span>
                  ))}
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
