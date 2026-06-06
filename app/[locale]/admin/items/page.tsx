"use client";

import { mockMenuItems } from "@/data/mockMenu";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const categories = [
  { value: "all", label: "همه", emoji: "🍽️" },
  { value: "burger", label: "برگر", emoji: "🍔" },
  { value: "pizza", label: "پیتزا", emoji: "🍕" },
  { value: "sandwich", label: "ساندویچ", emoji: "🥪" },
  { value: "pasta", label: "پاستا", emoji: "🍝" },
  { value: "combo", label: "کمبو", emoji: "📦" },
  { value: "salad", label: "سالاد", emoji: "🥗" },
  { value: "drink", label: "نوشیدنی", emoji: "🥤" },
  { value: "dessert", label: "دسر", emoji: "🍰" },
];

const categoryLabel: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.value, c.label])
);

export default function AdminItemsPage() {
  const params = useParams();
  const locale = params.locale;
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = mockMenuItems.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.title.fa.includes(search) || item.title.en.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0e0618] p-4 sm:p-6" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-5">

        {/* هدر */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">مدیریت محصولات</h1>
            <p className="text-xs text-white/25 mt-0.5">
              {filtered.length} از {mockMenuItems.length} آیتم
            </p>
          </div>
          <Link
            href={`/${locale}/admin/items/new`}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-black px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="hidden sm:inline">افزودن محصول</span>
            <span className="sm:hidden">جدید</span>
          </Link>
        </div>

        {/* سرچ */}
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در محصولات..."
            className="w-full bg-[#160924] border border-white/8 rounded-xl px-4 py-2.5 pr-11 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
          />
        </div>

        {/* فیلتر دسته‌بندی */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => {
            const count = cat.value === "all"
              ? mockMenuItems.length
              : mockMenuItems.filter((i) => i.category === cat.value).length;
            if (count === 0 && cat.value !== "all") return null;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  activeCategory === cat.value
                    ? "bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    : "bg-[#160924] border border-white/8 text-white/40 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  activeCategory === cat.value ? "bg-black/20 text-black/60" : "bg-white/5 text-white/25"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── دسکتاپ: جدول ── */}
        <div className="hidden sm:block bg-[#160924] border border-white/8 rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-4xl">🔍</span>
              <p className="text-sm text-white/30">آیتمی یافت نشد</p>
            </div>
          ) : (
            <table className="w-full" dir="rtl">
              <thead className="bg-white/3 text-white/25 text-[11px] uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="px-5 py-3.5 text-right font-medium">محصول</th>
                  <th className="px-5 py-3.5 text-right font-medium">دسته</th>
                  <th className="px-5 py-3.5 text-right font-medium">قیمت</th>
                  <th className="px-5 py-3.5 text-right font-medium">وضعیت</th>
                  <th className="px-5 py-3.5 text-center font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/2 transition-colors">
                    {/* محصول */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title.fa}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/8 shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{item.title.fa}</p>
                          <p className="text-[11px] text-white/25">{item.title.en}</p>
                        </div>
                      </div>
                    </td>
                    {/* دسته */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-white/40">
                        {categories.find(c => c.value === item.category)?.emoji} {categoryLabel[item.category] ?? item.category}
                      </span>
                    </td>
                    {/* قیمت */}
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-amber-400 font-bold">{item.price.single.toLocaleString()}</span>
                      <span className="text-[11px] text-white/20 mr-1">ت</span>
                    </td>
                    {/* وضعیت */}
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg font-medium ${
                        item.isAvailable
                          ? "bg-green-500/10 text-green-400 border border-green-500/15"
                          : "bg-red-500/10 text-red-400 border border-red-500/15"
                      }`}>
                        {item.isAvailable ? "● موجود" : "● ناموجود"}
                      </span>
                    </td>
                    {/* عملیات */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/${locale}/admin/items/${item.id}/edit`}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/15 hover:bg-blue-500/20 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                          </svg>
                          ویرایش
                        </Link>
                        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/15 hover:bg-red-500/20 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── موبایل: کارت ── */}
        <div className="sm:hidden space-y-2.5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 bg-[#160924] rounded-2xl border border-white/8">
              <span className="text-4xl">🔍</span>
              <p className="text-sm text-white/30">آیتمی یافت نشد</p>
            </div>
          ) : filtered.map((item) => (
            <div key={item.id} className="bg-[#160924] border border-white/8 rounded-2xl p-4 flex items-center gap-3.5">
              <img
                src={item.image}
                alt={item.title.fa}
                className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-white/8"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-white truncate">{item.title.fa}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md shrink-0 font-medium ${
                    item.isAvailable ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                  }`}>
                    {item.isAvailable ? "موجود" : "ناموجود"}
                  </span>
                </div>
                <p className="text-[11px] text-white/25 mt-0.5">
                  {categories.find(c => c.value === item.category)?.emoji} {categoryLabel[item.category] ?? item.category}
                </p>
                <p className="text-sm text-amber-400 font-bold mt-1">
                  {item.price.single.toLocaleString()}
                  <span className="text-xs text-white/20 font-normal mr-1">تومان</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  href={`/${locale}/admin/items/${item.id}/edit`}
                  className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/15 hover:bg-blue-500/20 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                  </svg>
                </Link>
                <button className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/15 hover:bg-red-500/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
