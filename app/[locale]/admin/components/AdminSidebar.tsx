"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
  </svg>
);

const DashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);


const CategoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0v6a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-6m-19.5 0h19.5M3.75 6.75A2.25 2.25 0 016 4.5h2.25a2.25 2.25 0 012.25 2.25M3.75 6.75v3M9.75 6.75v3" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.397-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7.665 7.665 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const navItems: NavItem[] = [
  { label: "داشبورد", href: "/fa/admin", icon: <DashIcon /> },
  { label: "مدیریت منو", href: "/fa/admin/items", icon: <MenuIcon /> },
  { label: "دسته بندی", href: "/fa/admin/categories", icon: <CategoryIcon /> },
  { label: "تنظیمات", href: "/fa/admin/settings", icon: <SettingsIcon /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/fa/admin"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <>
      {/* دسکتاپ: سایدبار */}
      <aside className="hidden lg:flex w-56 bg-[#160924] border-l border-white/8 h-screen p-5 flex-col shrink-0" dir="rtl">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
            <span className="text-amber-400 text-xs font-black">M</span>
          </div>
          <h1 className="text-base font-black text-amber-400 tracking-widest">MUNCHBOX</h1>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  active
                    ? "bg-amber-500 text-black font-bold shadow-[0_0_16px_rgba(245,158,11,0.25)]"
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={active ? "text-black" : "text-white/30"}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-5 border-t border-white/8">
          <p className="text-[11px] text-white/20">پنل مدیریت مانچ باکس</p>
        </div>
      </aside>

      {/* موبایل: bottom navigation */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-[#160924]/95 backdrop-blur-xl border-t border-white/8 px-1 pb-safe overflow-x-auto"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        dir="rtl"
      >
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl transition-all duration-200 shrink-0 ${
                active ? "text-amber-400" : "text-white/30 hover:text-white/60"
              }`}
            >
              <span className={`transition-transform duration-200 ${active ? "scale-110" : ""}`}>
                {item.icon}
              </span>
              <span className="text-[9px] font-medium whitespace-nowrap">{item.label}</span>
              {active && (
                <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}