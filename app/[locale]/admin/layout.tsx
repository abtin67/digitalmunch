import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0f071a]">
      <AdminSidebar />
      
      {/* محتوای اصلی */}
      <main className="flex-1 p-8">
       <AdminHeader />
        {children}
      </main>
    </div>
  );
}