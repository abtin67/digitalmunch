"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ItemForm from "../../../components/ItemCard";

interface Category {
  _id: string;
  name: { fa: string; en: string; ar: string };
}

export default function EditItemPage() {
  const params = useParams();
  const locale = params.locale as string;
  const id = params.id as string;
  const router = useRouter();

  const [item, setItem] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemRes, catsRes] = await Promise.all([
          fetch(`/api/items/${id}`),
          fetch("/api/categories"),
        ]);
        const itemData = await itemRes.json();
        const catsData = await catsRes.json();

        if (itemData.success) setItem(itemData.data);
        if (catsData.success) setCategories(catsData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    setError("");

    try {
      const body = {
        title: {
          fa: formData.get("title_fa"),
          en: formData.get("title_en"),
          ar: formData.get("title_ar"),
        },
        description: {
          fa: formData.get("description_fa") || "",
          en: formData.get("description_en") || "",
          ar: formData.get("description_ar") || "",
        },
        category: formData.get("category"),
        price: {
          single: Number(formData.get("price_single")),
          double: Number(formData.get("price_double")),
          discountedSingle: formData.get("discounted_single")
            ? Number(formData.get("discounted_single"))
            : null,
          discountedDouble: formData.get("discounted_double")
            ? Number(formData.get("discounted_double"))
            : null,
        },
        offer: {
          isSpecial: formData.get("isSpecial") === "on",
          discountPercent: Number(formData.get("discount_percent")) || 0,
        },
        expires_at: formData.get("expires_at") || null,
        tags: formData.get("tags")
          ? String(formData.get("tags"))
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        isAvailable: formData.get("isAvailable") === "on",
        image: formData.get("image_url") || item?.image || "",
      };
      console.log("IMAGE URL:", formData.get("image_url"));
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/${locale}/admin/items`);
      } else {
        setError(data.error || "خطایی رخ داد");
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0618] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0e0618] flex items-center justify-center">
        <p className="text-red-400">محصول پیدا نشد</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-white">ویرایش محصول</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
        <ItemForm
          initialData={item}
          categories={categories}
          onSubmit={handleSubmit}
        />
      </div>

      {submitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <p className="text-white text-sm bg-[#160924] px-6 py-3 rounded-xl border border-white/10">
            در حال ذخیره...
          </p>
        </div>
      )}
    </div>
  );
}
