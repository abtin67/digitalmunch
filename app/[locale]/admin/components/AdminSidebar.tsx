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

const OrderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const navItems: NavItem[] = [
  { label: "داشبورد", href: "/fa/admin", icon: <DashIcon /> },
  { label: "مدیریت منو", href: "/fa/admin/items", icon: <MenuIcon /> },
  { label: "سفارش‌ها", href: "/fa/admin/orders", icon: <OrderIcon /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/fa/admin"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <>
      {/* ── دسکتاپ: سایدبار ── */}
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

      {/* ── موبایل: bottom navigation ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-[#160924]/95 backdrop-blur-xl border-t border-white/8 px-2 pb-safe"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        dir="rtl"
      >
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl transition-all duration-200 ${
                active ? "text-amber-400" : "text-white/30 hover:text-white/60"
              }`}
            >
              <span className={`transition-transform duration-200 ${active ? "scale-110" : ""}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-medium">{item.label}</span>
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