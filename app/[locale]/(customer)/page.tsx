"use client";

import { getDictionary } from "@/app/locales/dictionaries";
import { mockMenuItems } from "@/data/mockMenu";
import { MenuItem } from "@/types/menu";
import { use, useState } from "react";
import SearchBar from "./components/SearchBar";
import CategoryBar from "./components/CategoryBar";
import MenuCard from "./components/MenuCard";
import MenuModal from "./components/MenuModal";
import Header from "./components/Header";

interface Props {
  params: Promise<{ locale: string }>;
}

export default function CustomerMenuPage({ params }: Props) {
  const resolvedParams = use(params);
  const locale = (resolvedParams.locale as "fa" | "en" | "ar") || "fa";
  const dict = getDictionary(locale);

  const [activeCategory, setActiveCategory] = useState("combo");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const filterItems = mockMenuItems.filter((item) => {
    const matchesCategory = item.category === activeCategory;

    const query = searchQuery.toLocaleLowerCase();
    const titleText = (item.title?.[locale] || "").toLowerCase();
    const descText = (item.description?.[locale] || "").toLowerCase();

    const matchesSearch = titleText.includes(query) || descText.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen px-1 pt-2 md:px-8 bg-[#2a1044] pb-24 text-white">
      <Header />
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="mx-auto max-w-7xl px-4 pt-1 sm:pt-4">
        {filterItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
            {filterItems.map((item, i) => (
              <MenuCard
                key={item.id}
                item={item}
                index={i}
                onOpenModal={setSelectedItem}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex h-40 items-center justify-center rounded-4xl border border-dashed border-white/10
                    bg-[#160924]/20 text-sm text-gray-400"
          >
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
