// app/[locale]/admin/items/new/page.tsx

import ItemForm from "../../components/ItemCard";


export default function NewItemPage() {
  // این تابع فعلاً فقط داده رو لاگ می‌کنه تا ساختار رو تست کنیم
  async function createItemAction(formData: any) {
    'use server';
    console.log("داده‌های جدید برای ذخیره در دیتابیس:", formData);
    // اینجا در آینده منطق ذخیره‌سازی در دیتابیس (مثلاً Prisma یا MongoDB) قرار می‌گیره
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">افزودن محصول جدید به منو</h1>
      
      <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
        <ItemForm onSubmit={createItemAction} />
      </div>
    </div>
  );
}
