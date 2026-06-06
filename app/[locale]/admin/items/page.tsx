"use client";

// app/[locale]/admin/items/page.tsx
import { mockMenuItems } from "@/data/mockMenu";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminItemsPage() {
  const params = useParams();
  const locale = params.locale;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">مدیریت محصولات</h1>

        <Link
          href={`/${locale}/admin/items/new`}
          className="bg-amber-500 text-black px-4 py-2 rounded-lg font-bold"
        >
          + افزودن محصول جدید
        </Link>
      </div>

      <div className="bg-[#160924] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-sm">
            <tr>
              <th className="p-4">تصویر</th>
              <th className="p-4">نام (فارسی)</th>
              <th className="p-4">دسته‌بندی</th>
              <th className="p-4">قیمت (تک)</th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {mockMenuItems.map((item) => (
              <tr
                key={item.id}
                className="text-white hover:bg-white/5 transition-colors"
              >
                <td className="p-4">
                  <img
                    src={item.image}
                    alt={item.title.fa}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="p-4 font-medium">{item.title.fa}</td>
                <td className="p-4 text-gray-400 capitalize">
                  {item.category}
                </td>
                <td className="p-4">
                  {item.price.single.toLocaleString()} تومان
                </td>
                <td className="p-4 text-center space-x-2">
                  <Link
                    href={`/fa/admin/items/${item.id}/edit`}
                    className="text-blue-400 hover:text-blue-300 font-bold"
                  >
                    ویرایش
                  </Link>
                  <button className="text-red-400 hover:text-red-300">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
