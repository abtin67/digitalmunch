// app/[locale]/admin/components/ItemForm.tsx
"use client";
import { MenuItem } from "@/types/menu";
import MultiLangTabs from "./MultiLangInput";
import { useState, useRef } from "react";

interface ItemFormProps {
  initialData?: MenuItem;
  onSubmit: (formData: FormData) => void;
}

const inputClass =
  "w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all duration-200 text-sm";

const labelClass =
  "block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2";

export default function ItemForm({ initialData, onSubmit }: ItemFormProps) {
  const [preview, setPreview] = useState<string | null>(initialData?.image ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <form action={onSubmit} className="space-y-5" dir="rtl">

      {/* آپلود تصویر */}
      <div>
        <label className={labelClass}>تصویر محصول</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden
            ${isDragging
              ? "border-amber-500 bg-amber-500/10"
              : "border-white/10 bg-white/5 hover:border-amber-500/40 hover:bg-white/8"
            }`}
        >
          {preview ? (
            <div className="relative h-48 w-full">
              <img src={preview} alt="پیش‌نمایش" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-xs text-white/80">تغییر تصویر</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 18h16.5M12 3v9m0 0l-3-3m3 3l3-3" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/50">
                  برای آپلود کلیک کنید
                  <span className="text-white/25"> یا فایل را اینجا بکشید</span>
                </p>
                <p className="text-xs text-white/20 mt-1">PNG، JPG، WEBP تا ۵ مگابایت</p>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview && (
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="mt-2 flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            حذف تصویر
          </button>
        )}
      </div>

      {/* عنوان چندزبانه */}
      <div>
        <label className={labelClass}>عنوان محصول</label>
        <MultiLangTabs>
          {{
            fa: <input name="title_fa" defaultValue={initialData?.title.fa} placeholder="نام فارسی" className={inputClass} />,
            en: <input name="title_en" defaultValue={initialData?.title.en} placeholder="English name" className={inputClass} />,
            ar: <input name="title_ar" defaultValue={initialData?.title.ar} placeholder="الاسم بالعربي" className={inputClass} />,
          }}
        </MultiLangTabs>
      </div>

      {/* توضیحات چندزبانه */}
      <div>
        <label className={labelClass}>توضیحات محصول</label>
        <MultiLangTabs>
          {{
            fa: <textarea name="desc_fa" defaultValue={initialData?.description.fa} placeholder="توضیحات فارسی..." className={`${inputClass} h-24 resize-none`} />,
            en: <textarea name="desc_en" defaultValue={initialData?.description.en} placeholder="English description..." className={`${inputClass} h-24 resize-none`} />,
            ar: <textarea name="desc_ar" defaultValue={initialData?.description.ar} placeholder="الوصف بالعربي..." className={`${inputClass} h-24 resize-none`} />,
          }}
        </MultiLangTabs>
      </div>

      {/* قیمت‌ها */}
      <div>
        <label className={labelClass}>قیمت (تومان)</label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input type="number" name="price_single" defaultValue={initialData?.price.single} placeholder="تک نفره" className={inputClass} required />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/20">تک</span>
          </div>
          <div className="relative">
            <input type="number" name="price_double" defaultValue={initialData?.price.double || 0} placeholder="دو نفره" className={inputClass} />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/20">دو</span>
          </div>
        </div>
      </div>

      {/* دسته‌بندی و وضعیت */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>دسته‌بندی</label>
          <select name="category" defaultValue={initialData?.category} className={`${inputClass} cursor-pointer`}>
            <option value="pizza">🍕 پیتزا</option>
            <option value="burger">🍔 برگر</option>
            <option value="sandwich">🥪 ساندویچ</option>
            <option value="pasta">🍝 پاستا</option>
            <option value="combo">📦 کمبو</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>وضعیت</label>
          <label className="flex items-center justify-between w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 cursor-pointer group hover:border-amber-500/30 transition-all duration-200">
            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">موجود در منو</span>
            <input type="checkbox" name="isAvailable" defaultChecked={initialData?.isAvailable ?? true} className="sr-only peer" />
            <div className="relative w-11 h-6 bg-white/10 peer-checked:bg-amber-500 rounded-full transition-all duration-300 after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-5" />
          </label>
        </div>
      </div>

      {/* تگ‌ها */}
      <div>
        <label className={labelClass}>تگ‌ها</label>
        <input name="tags" defaultValue={initialData?.tags ? initialData.tags.join(", ") : ""} placeholder="تند، پرفروش، جدید..." className={inputClass} />
        <p className="mt-1.5 text-xs text-white/20">با کاما جدا کنید</p>
      </div>

      {/* دکمه ذخیره */}
      <button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-black font-bold py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_28px_rgba(245,158,11,0.35)]"
      >
        {initialData ? "ذخیره تغییرات" : "افزودن محصول"}
      </button>
    </form>
  );
}