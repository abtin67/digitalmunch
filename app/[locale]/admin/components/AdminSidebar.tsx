"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// اینترفیسِ منوها
interface MenuItem {
  label: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { label: "داشبورد", href: "/fa/admin", icon: "📊" },
  { label: "مدیریت منو", href: "/fa/admin/items", icon: "🍔" },
  { label: "سفارش‌ها", href: "/admin/orders", icon: "📋" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-55 bg-[#160924] border-r border-white/10 h-screen p-6 flex flex-col">
      <h1 className="text-xl font-black text-amber-500 mb-10 tracking-widest">MUNCHBOX</h1>
      
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          // چک کردن اینکه آیا این صفحه فعال است یا خیر
          const isActive = pathname === item.href || (item.href !== '/fa/admin' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-amber-500 text-black font-bold" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* بخش پایین سایدبار */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <p className="text-xs text-gray-500">پنل مدیریت مانچ باکس</p>
      </div>
    </aside>
  );
}