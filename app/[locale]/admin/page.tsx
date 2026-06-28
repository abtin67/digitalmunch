"use client";

import { useEffect, useState } from "react";

interface DashboardStats {
  totalItems: number;
  totalCategories: number;
  unavailableItems: number;
  lastItem: { title: { fa: string }; createdAt: string } | null;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [itemsRes, catsRes] = await Promise.all([
          fetch("/api/items"),
          fetch("/api/categories"),
        ]);
        const itemsData = await itemsRes.json();
        const catsData = await catsRes.json();

        if (itemsData.success && catsData.success) {
          const items = itemsData.data;
          const sortedItems = [...items].sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setStats({
            totalItems: items.length,
            totalCategories: catsData.data.length,
            unavailableItems: items.filter((i: any) => !i.isAvailable).length,
            lastItem: sortedItems[0] ?? null,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = stats
    ? [
        {
          label: "کل محصولات",
          value: stats.totalItems,
          icon: "🍽️",
          color: "text-amber-400",
        },
        {
          label: "دسته‌بندی‌ها",
          value: stats.totalCategories,
          icon: "📂",
          color: "text-blue-400",
        },
        {
          label: "ناموجود",
          value: stats.unavailableItems,
          icon: "⛔",
          color: "text-red-400",
        },
      ]
    : [];

  return (
    <div className="p-6 md:p-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">داشبورد</h1>
        <p className="text-white/30 text-sm mt-1">خلاصه وضعیت منو</p>
      </div>

      {loading ? (
        <div className="text-white/30 text-sm">در حال بارگذاری...</div>
      ) : (
        <>
          {/* کارت‌های آمار */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {cards.map((card) => (
              <div
                key={card.label}
                className="bg-[#160924] border border-white/8 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/40 text-sm">{card.label}</span>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <p className={`text-4xl font-black ${card.color}`}>
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* آخرین آیتم اضافه شده */}
          {stats?.lastItem && (
            <div className="bg-[#160924] border border-white/8 rounded-2xl p-6">
              <h2 className="text-white/40 text-sm mb-3">
                آخرین محصول اضافه شده
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-white font-bold">{stats.lastItem.title.fa}</p>
                <span className="text-white/25 text-xs">
                  {new Date(stats.lastItem.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}