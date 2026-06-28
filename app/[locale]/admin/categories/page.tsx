"use client";

import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: { fa: string; en: string; ar: string };
  icon?: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [editForm, setEditForm] = useState({
    fa: "",
    en: "",
    ar: "",
    icon: "",
  });
  const [updating, setUpdating] = useState(false);

  // فرم
  const [fa, setFa] = useState("");
  const [en, setEn] = useState("");
  const [ar, setAr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editCat) {
      setEditForm({
        fa: editCat.name.fa,
        en: editCat.name.en,
        ar: editCat.name.ar,
        icon: editCat.icon || "",
      });
    }
  }, [editCat]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fa || !en || !ar) {
      setError("همه فیلدها الزامی است");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: { fa, en, ar } }),
      });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => [data.data, ...prev]);
        setFa("");
        setEn("");
        setAr("");
      } else {
        setError(data.error || "خطایی رخ داد");
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/categories/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => prev.filter((c) => c._id !== deleteId));
      }
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleEdit = async () => {
    if (!editCat) return;
    setUpdating(true);
    const res = await fetch(`/api/categories/${editCat._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: { fa: editForm.fa, en: editForm.en, ar: editForm.ar },
        icon: editForm.icon,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setCategories((prev) =>
        prev.map((c) => (c._id === editCat._id ? data.data : c)),
      );
      setEditCat(null);
    }
    setUpdating(false);
  };

  const iconOptions = [
    { label: "کمبو", value: "/drink.png" },
    { label: "پیتزا", value: "/pizza.png" },
    { label: "پاستا", value: "/spaghetti.png" },
    { label: "ساندویچ", value: "/sandwich.png" },
    { label: "برگر", value: "/cheese-burger.png" },
    { label: "پیش غذا", value: "/breadstick.png" },
  ];

  const inputClass =
    "w-full bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition text-sm";

  return (
    <div className="p-4 sm:p-6 max-w-2xl" dir="rtl">
      <h1 className="text-xl font-bold text-white mb-6">مدیریت دسته‌بندی‌ها</h1>

      {/* فرم افزودن */}
      <form
        onSubmit={handleAdd}
        className="bg-[#160924] border border-white/8 rounded-2xl p-5 mb-6 space-y-4"
      >
        <h2 className="text-sm font-bold text-white/60">
          افزودن دسته‌بندی جدید
        </h2>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] text-white/30 mb-1.5">فارسی</p>
            <input
              value={fa}
              onChange={(e) => setFa(e.target.value)}
              className={inputClass}
              placeholder="کمبو"
            />
          </div>
          <div>
            <p className="text-[10px] text-white/30 mb-1.5">English</p>
            <input
              value={en}
              onChange={(e) => setEn(e.target.value)}
              className={inputClass}
              placeholder="Combo"
            />
          </div>
          <div>
            <p className="text-[10px] text-white/30 mb-1.5">عربی</p>
            <input
              value={ar}
              onChange={(e) => setAr(e.target.value)}
              className={inputClass}
              placeholder="كومبو"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold py-2.5 rounded-xl text-sm transition-all"
        >
          {submitting ? "در حال ذخیره..." : "افزودن"}
        </button>
      </form>

      {/* لیست */}
      <div className="bg-[#160924] border border-white/8 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <span className="text-3xl">📂</span>
            <p className="text-white/30 text-sm">هنوز دسته‌بندی‌ای ندارید</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-white/2 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <p className="text-white text-sm font-medium">
                    {cat.name.fa}
                  </p>
                  <p className="text-white/30 text-xs">{cat.name.en}</p>
                  <p className="text-white/30 text-xs">{cat.name.ar}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditCat(cat)}
                    className="p-1.5 rounded-lg bg-white/5 text-white/40 border border-white/10 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => setDeleteId(cat._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/15 hover:bg-red-500/20 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                {editCat && (
                  <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div
                      className="w-full max-w-sm bg-[#160924] border border-white/10 rounded-2xl p-6 space-y-4"
                      dir="rtl"
                    >
                      <p className="text-white font-bold text-sm">
                        ویرایش دسته‌بندی
                      </p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-white/30 mb-1.5">
                            فارسی
                          </p>
                          <input
                            value={editForm.fa}
                            onChange={(e) =>
                              setEditForm({ ...editForm, fa: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 mb-1.5">
                            English
                          </p>
                          <input
                            value={editForm.en}
                            onChange={(e) =>
                              setEditForm({ ...editForm, en: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 mb-1.5">
                            عربی
                          </p>
                          <input
                            value={editForm.ar}
                            onChange={(e) =>
                              setEditForm({ ...editForm, ar: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 mb-1.5">
                            آیکون
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {iconOptions.map((opt) => (
                              <button
                                type="button"
                                key={opt.value}
                                onClick={() =>
                                  setEditForm({ ...editForm, icon: opt.value })
                                }
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all
          ${
            editForm.icon === opt.value
              ? "border-amber-500 bg-amber-500/10"
              : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
                              >
                                <img
                                  src={opt.value}
                                  alt={opt.label}
                                  className="w-8 h-8 object-contain"
                                />
                                <span className="text-[10px] text-white/50">
                                  {opt.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setEditCat(null)}
                          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/60 border border-white/10 hover:border-white/20 transition-colors"
                        >
                          انصراف
                        </button>
                        <button
                          onClick={handleEdit}
                          disabled={updating}
                          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 disabled:opacity-50 transition-colors"
                        >
                          {updating ? "در حال ذخیره..." : "ذخیره"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-sm bg-[#160924] border border-white/10 rounded-2xl p-6 space-y-4"
            dir="rtl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">حذف دسته‌بندی</p>
                <p className="text-white/40 text-xs mt-0.5">
                  این عمل قابل بازگشت نیست
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/60 border border-white/10 hover:border-white/20 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {deleting ? "در حال حذف..." : "حذف کن"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
