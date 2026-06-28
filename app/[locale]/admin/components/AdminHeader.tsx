"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const getPageTitle = () => {
    if (pathname.includes("/items/new")) return "افزودن محصول جدید";
    if (pathname.includes("/items")) return "مدیریت منو";
    if (pathname.includes("/orders")) return "سفارش‌ها";
    return "داشبورد";
  };

  return (
    <header className="flex justify-between items-center bg-[#160924]/80 backdrop-blur-sm border border-white/8 px-5 py-3 mb-6 rounded-2xl" dir="rtl">
      <h2 className="text-base font-bold text-white">{getPageTitle()}</h2>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">آنلاین</span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: `/${locale}/admin/login` })}
          className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          خروج
        </button>
      </div>
    </header>
  );
}