"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname.includes("/admin/login");
  const isSettingsPage = pathname.includes("/admin/settings");

  if (isLoginPage || isSettingsPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#0f071a]">
      <AdminSidebar />
      <main className="flex-1 w-full p-4 sm:p-8 pb-24 lg:pb-8">
        <AdminHeader />
        {children}
      </main>
    </div>
  );
}