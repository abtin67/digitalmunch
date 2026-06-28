"use client";

import { useState, useRef } from "react";
import MultiLangTabs from "./MultiLangInput";
import { MenuItem } from "@/types/menu";
import { log } from "console";

interface Category {
  _id: string;
  name: { fa: string; en: string; ar: string };
}

interface ItemFormProps {
  initialData?: MenuItem;
  categories: Category[];
  onSubmit: (formData: FormData) => void;
}

const inputClass =
  "w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition text-sm";

const labelClass =
  "block text-[11px] font-bold text-white/35 uppercase tracking-widest mb-2";

export default function ItemForm({
  initialData,
  categories,
  onSubmit,
}: ItemFormProps) {
  const [preview, setPreview] = useState<string | null>(
    initialData?.image || null,
  );
  const [imageUrl, setImageUrl] = useState<string>(initialData?.image || "");console.log(imageUrl);
  
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<string>(initialData?.image || "");

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        setUploadError("خطا در آپلود تصویر");
        setPreview(null);
      }
    } catch {
      setUploadError("خطا در ارتباط با سرور");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form action={onSubmit} className="space-y-5 pb-8" dir="rtl">
      {/* IMAGE */}
      <div>
        <label className={labelClass}>تصویر محصول</label>
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className={`relative h-48 w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200
            ${uploading ? "border-amber-500/50 cursor-wait" : "border-white/10 hover:border-amber-500/40 hover:bg-white/5"}
            bg-white/3 flex flex-col items-center justify-center gap-2`}
        >
          {preview ? (
            <>
              <img
                src={preview}
                className="h-full w-full object-cover absolute inset-0"
                alt=""
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-amber-400 text-xs">
                    در حال آپلود...
                  </span>
                </div>
              )}
              {!uploading && imageUrl && (
                <div className="absolute top-2 left-2 bg-green-500/80 text-white text-[10px] px-2 py-1 rounded-lg backdrop-blur-sm">
                  ✓ آپلود شد
                </div>
              )}
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12h.008v.008H13.5V12zm-3 9.75h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21.75z"
                />
              </svg>
              <p className="text-white/30 text-xs">
                برای آپلود تصویر کلیک کنید
              </p>
              <p className="text-white/15 text-[10px]">PNG, JPG تا ۵ مگابایت</p>
            </>
          )}
        </div>

        {uploadError && (
          <p className="text-red-400 text-xs mt-1.5">{uploadError}</p>
        )}

        <input
          ref={fileRef}
          type="file"
          name="image"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <input type="hidden" name="image_url" value={imageUrl} />
      </div>

      {/* TITLE */}
      <div>
        <label className={labelClass}>عنوان محصول</label>
        <MultiLangTabs>
          {{
            fa: (
              <input
                name="title_fa"
                defaultValue={initialData?.title.fa}
                className={inputClass}
                placeholder="نام فارسی"
              />
            ),
            en: (
              <input
                name="title_en"
                defaultValue={initialData?.title.en}
                className={inputClass}
                placeholder="English name"
              />
            ),
            ar: (
              <input
                name="title_ar"
                defaultValue={initialData?.title.ar}
                className={inputClass}
                placeholder="الاسم بالعربية"
              />
            ),
          }}
        </MultiLangTabs>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className={labelClass}>توضیحات</label>
        <MultiLangTabs>
          {{
            fa: (
              <textarea
                name="description_fa"
                defaultValue={initialData?.description?.fa}
                className={inputClass}
                rows={3}
                placeholder="توضیحات فارسی"
              />
            ),
            en: (
              <textarea
                name="description_en"
                defaultValue={initialData?.description?.en}
                className={inputClass}
                rows={3}
                placeholder="English description"
              />
            ),
            ar: (
              <textarea
                name="description_ar"
                defaultValue={initialData?.description?.ar}
                className={inputClass}
                rows={3}
                placeholder="الوصف بالعربية"
              />
            ),
          }}
        </MultiLangTabs>
      </div>

      {/* CATEGORY */}
      <div>
        <label className={labelClass}>دسته‌بندی</label>
        <select
          name="category"
          defaultValue={
            typeof initialData?.category === "string"
              ? initialData.category
              : initialData?.category?._id
          }
          className={inputClass}
        >
          <option value="">انتخاب دسته‌بندی...</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name.fa}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE */}
      <div>
        <label className={labelClass}>قیمت (تومان)</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-white/25 text-[10px] mb-1.5">تک نفره</p>
            <input
              name="price_single"
              type="number"
              defaultValue={initialData?.price.single}
              className={inputClass}
              placeholder="0"
            />
          </div>
          <div>
            <p className="text-white/25 text-[10px] mb-1.5">دو نفره</p>
            <input
              name="price_double"
              type="number"
              defaultValue={initialData?.price.double}
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* DISCOUNTED PRICE */}
      <div>
        <label className={labelClass}>قیمت با تخفیف (اختیاری)</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-white/25 text-[10px] mb-1.5">تک نفره</p>
            <input
              name="discounted_single"
              type="number"
              defaultValue={initialData?.price.discountedSingle || ""}
              className={inputClass}
              placeholder="0"
            />
          </div>
          <div>
            <p className="text-white/25 text-[10px] mb-1.5">دو نفره</p>
            <input
              name="discounted_double"
              type="number"
              defaultValue={initialData?.price.discountedDouble || ""}
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* OFFER */}
      <div className="p-4 rounded-2xl border border-amber-500/15 bg-amber-500/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm font-semibold">
              پیشنهاد ویژه 🔥
            </p>
            <p className="text-white/25 text-[11px] mt-0.5">
              نمایش برچسب روی کارت محصول
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isSpecial"
              defaultChecked={initialData?.offer?.isSpecial}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full
             peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
             after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5
              after:w-5 after:transition-all peer-checked:bg-amber-500"
            ></div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-white/25 text-[10px] mb-1.5">درصد تخفیف</p>
            <input
              name="discount_percent"
              type="number"
              min={0}
              max={100}
              defaultValue={initialData?.offer?.discountPercent || 0}
              className={inputClass}
              placeholder="0"
            />
          </div>
          <div>
            <p className="text-white/25 text-[10px] mb-1.5">
              تاریخ انقضا (شمسی)
            </p>
            <input
              name="expires_at"
              type="text"
              defaultValue={
                initialData?.offer?.expiresAt
                  ? new Date(initialData.offer.expiresAt).toLocaleDateString(
                      "fa-IR",
                    )
                  : ""
              }
              className={inputClass}
              placeholder="۱۴۰۵/۰۶/۳۱"
              maxLength={10}
            />
            <p className="text-white/20 text-[10px] mt-1">فرمت: ۱۴۰۴/۰۶/۳۱</p>
          </div>
        </div>
      </div>

      {/* TAGS */}
      <div>
        <label className={labelClass}>تگ‌ها (اختیاری)</label>
        <input
          name="tags"
          defaultValue={initialData?.tags?.join(",")}
          className={inputClass}
          placeholder="special, popular, hot"
        />
        <p className="text-white/20 text-[10px] mt-1.5">با کاما جدا کنید</p>
      </div>

      {/* AVAILABLE */}
      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
        <div>
          <p className="text-white/70 text-sm font-semibold">موجود است</p>
          <p className="text-white/25 text-[11px] mt-0.5">وضعیت نمایش در منو</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="isAvailable"
            defaultChecked={initialData?.isAvailable ?? true}
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 bg-white/10 peer-focus:outline-none
           rounded-full peer peer-checked:after:translate-x-full
            peer-checked:after:border-white after:content-[''] 
            after:absolute after:top-0.5 after:left-0.5 after:bg-white
             after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
          ></div>
        </label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-2xl active:scale-95 transition-all duration-200 text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)]"
      >
        {uploading
          ? "در حال آپلود تصویر..."
          : initialData
            ? "ذخیره تغییرات"
            : "افزودن محصول"}
      </button>
    </form>
  );
}
