// app/[locale]/admin/components/ItemForm.tsx
"use client";
import { MenuItem } from "@/types/menu";
import MultiLangTabs from "./MultiLangInput";


interface ItemFormProps {
  initialData?: MenuItem;
  onSubmit: (formData: FormData) => void;
}

export default function ItemForm({ initialData, onSubmit }: ItemFormProps) {
  return (
    <form action={onSubmit} className="space-y-6">
      {/* عکس محصول */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">لینک تصویر</label>
        <input name="image" defaultValue={initialData?.image} className="w-full bg-white/5 p-3 rounded-lg border border-white/10" required />
      </div>

      {/* عنوان چندزبانه */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">عنوان محصول</label>
        <MultiLangTabs>
          {{
            fa: <input name="title_fa" defaultValue={initialData?.title.fa} className="w-full bg-white/5 p-3 rounded-lg border border-white/10" />,
            en: <input name="title_en" defaultValue={initialData?.title.en} className="w-full bg-white/5 p-3 rounded-lg border border-white/10" />,
            ar: <input name="title_ar" defaultValue={initialData?.title.ar} className="w-full bg-white/5 p-3 rounded-lg border border-white/10" />,
          }}
        </MultiLangTabs>
      </div>

      {/* توضیحات چندزبانه */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">توضیحات محصول</label>
        <MultiLangTabs>
          {{
            fa: <textarea name="desc_fa" defaultValue={initialData?.description.fa} className="w-full bg-white/5 p-3 rounded-lg border border-white/10 h-24" />,
            en: <textarea name="desc_en" defaultValue={initialData?.description.en} className="w-full bg-white/5 p-3 rounded-lg border border-white/10 h-24" />,
            ar: <textarea name="desc_ar" defaultValue={initialData?.description.ar} className="w-full bg-white/5 p-3 rounded-lg border border-white/10 h-24" />,
          }}
        </MultiLangTabs>
      </div>

      {/* تنظیمات فنی */}
      <div className="grid grid-cols-2 gap-4">
        <select name="category" defaultValue={initialData?.category} className="w-full bg-white/5 p-3 rounded-lg border border-white/10">
          <option value="pizza">پیتزا</option>
          <option value="burger">برگر</option>
          <option value="sandwich">ساندویچ</option>
        </select>
        
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isAvailable" defaultChecked={initialData?.isAvailable ?? true} className="w-5 h-5" />
          <span className="text-sm text-gray-400">موجود در منو</span>
        </div>
      </div>

      {/* تگ‌ها (بدون ارور) */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">تگ‌ها (با کاما جدا کنید)</label>
        <input name="tags" defaultValue={initialData?.tags ? initialData.tags.join(", ") : ""} className="w-full bg-white/5 p-3 rounded-lg border border-white/10" />
      </div>

      {/* قیمت‌ها */}
      <div className="grid grid-cols-2 gap-4">
        <input type="number" name="price_single" defaultValue={initialData?.price.single} placeholder="قیمت تک" className="p-3 bg-white/5 rounded-lg border border-white/10" required />
        <input type="number" name="price_double" defaultValue={initialData?.price.double || 0} placeholder="قیمت دوبل" className="p-3 bg-white/5 rounded-lg border border-white/10" />
      </div>

      <button type="submit" className="w-full bg-amber-500 text-black font-bold py-3 rounded-xl hover:bg-amber-400">
        {initialData ? "ذخیره تغییرات" : "افزودن محصول"}
      </button>
    </form>
  );
}