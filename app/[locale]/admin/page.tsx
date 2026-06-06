// app/[locale]/admin/page.tsx
export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white">داشبورد ادمین مانچ باکس</h1>
      <p className="text-gray-400 mt-2">خوش آمدید! از منوی سایدبار برای مدیریت استفاده کنید.</p>
      
      {/* اینجا بعداً نمودارها یا خلاصه وضعیت سفارش‌ها رو اضافه می‌کنیم */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
          <h3 className="text-gray-400">تعداد محصولات</h3>
          <p className="text-4xl font-black text-amber-500 mt-2">+۴۸</p>
        </div>
        <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
          <h3 className="text-gray-400">تعداد کمبو</h3>
          <p className="text-4xl font-black text-amber-500 mt-2">۴</p>
        </div>
        <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
          <h3 className="text-gray-400">تعداد پیتزا</h3>
          <p className="text-4xl font-black text-amber-500 mt-2">۲۱</p>
        </div>
        <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
          <h3 className="text-gray-400">تعداد پاستا</h3>
          <p className="text-4xl font-black text-amber-500 mt-2">۴</p>
        </div>
        <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
          <h3 className="text-gray-400">تعداد ساندویچ</h3>
          <p className="text-4xl font-black text-amber-500 mt-2">۱۰</p>
        </div>
        <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
          <h3 className="text-gray-400">تعداد برگر</h3>
          <p className="text-4xl font-black text-amber-500 mt-2">۶</p>
        </div>
        <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
          <h3 className="text-gray-400">تعداد پیش غذا</h3>
          <p className="text-4xl font-black text-amber-500 mt-2">۷</p>
        </div>
      </div>
    </div>
  );
}