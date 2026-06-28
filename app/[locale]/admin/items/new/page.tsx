"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ItemForm from "../../components/ItemCard";

interface Category {
  _id: string;
  name: { fa: string; en: string; ar: string };
}

export default function NewItemPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

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
          expiresAt: formData.get("expires_at") || null,
        },
        tags: formData.get("tags")
          ? String(formData.get("tags"))
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        isAvailable: formData.get("isAvailable") === "on",
        image: formData.get("image_url") || "",
      };
      console.log("IMAGE URL:", formData.get("image_url"));
      console.log("BODY BEFORE SEND:", body);
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/${locale}/admin/items`);
      } else {
        setError(data.error || "خطایی رخ داد");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0618] flex items-center justify-center">
        <p className="text-white/30 text-sm">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl" dir="rtl">
      <h1 className="text-2xl font-bold text-white mb-6">افزودن محصول جدید</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
        <ItemForm categories={categories} onSubmit={handleSubmit} />
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
