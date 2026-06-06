"use client";
import { usePathname, useRouter } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // گرفتن عنوان صفحه بر اساس مسیر
  const getPageTitle = () => {
    if (pathname.includes("/items/new")) return "افزودن محصول جدید";
    if (pathname.includes("/items")) return "مدیریت منو";
    if (pathname.includes("/orders")) return "سفارش‌ها";
    return "داشبورد";
  };

  return (
    <header className="flex justify-between items-center bg-[#160924] border-b border-white/10 px-8 py-4 mb-8 rounded-2xl">
      <h2 className="text-xl font-bold text-white">{getPageTitle()}</h2>
      
      <div className="flex items-center gap-4">
        {/* نشانگر وضعیت */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          آنلاین
        </div>
        
        {/* دکمه خروج */}
        <button 
          onClick={() => console.log("Logout clicked")}
          className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500/20 transition-all"
        >
          خروج
        </button>
      </div>
    </header>
  );
}