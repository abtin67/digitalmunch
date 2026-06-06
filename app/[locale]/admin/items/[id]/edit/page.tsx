import { mockMenuItems } from "@/data/mockMenu";

import { notFound } from "next/navigation";
import ItemForm from "../../../components/ItemCard";

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("آیدی دریافتی:",id);
  // ۱. پیدا کردنِ محصول از بینِ داده‌هایِ فعلی (بعداً این رو از دیتابیس می‌خونیم)
  const item = mockMenuItems.find((i) => i.id === id);

  if (!item) notFound(); // اگر محصول نبود، صفحه 404 نشون بده

  async function updateItemAction(formData: FormData) {
    "use server";
    // اینجا لاجیکِ آپدیتِ دیتابیس رو می‌نویسیم
    console.log("ویرایش محصول با ID:",id);
    console.log("دیتای جدید:", Object.fromEntries(formData));
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">
        ویرایش: {item.title.fa}
      </h1>

      <div className="bg-[#160924] p-6 rounded-2xl border border-white/10">
        <ItemForm initialData={item} onSubmit={updateItemAction} />
      </div>
    </div>
  );
}
