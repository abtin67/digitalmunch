"use client";

import { useState } from "react";
import { MenuItem } from "@/types/menu";
import SearchBar from "./components/SearchBar";
import CategoryBar from "./components/CategoryBar";
import MenuCard from "./components/MenuCard";
import MenuModal from "./components/MenuModal";
import Header from "./components/Header";
import GradientBackground from "./components/GradientBackground";

interface Category {
  _id: string;
  name: { fa: string; en: string; ar: string };
  icon?: string;
}

interface Props {
  locale: "fa" | "en" | "ar";
  initialItems: MenuItem[];
  initialCategories: Category[];
}

export default function CustomerMenuClient({ locale, initialItems, initialCategories }: Props) {
  const [activeCategory, setActiveCategory] = useState(
    initialCategories[0]?._id || ""
  );
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filterItems = initialItems.filter((item) => {
    const matchesCategory =
      typeof item.category === "string"
        ? item.category === activeCategory
        : item.category?._id === activeCategory;

    const query = searchQuery.toLocaleLowerCase();
    const titleText = (item.title?.[locale] || "").toLowerCase();
    const descText = (item.description?.[locale] || "").toLowerCase();
    const matchesSearch = titleText.includes(query) || descText.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen relative px-1 pt-2 md:px-8 pb-24 text-white">
      <GradientBackground />
      <Header />
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={initialCategories}
        locale={locale}
      />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="mx-auto max-w-7xl px-4 pt-1 sm:pt-4">
        {filterItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterItems.map((item, i) => (
              <MenuCard
                key={item._id}
                item={item}
                index={i}
                onOpenModal={setSelectedItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-4xl border border-dashed border-white/10 bg-[#160924]/20 text-sm text-gray-400">
            {locale === "en"
              ? "No items found."
              : locale === "ar"
                ? "لاتوجد عناصر في هذا التصنیف"
                : "آیتمی در این دسته بندی یافت نشد"}
          </div>
        )}
      </div>

      <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  );
}