import { mockMenuItems } from "@/data/mockMenu";
import { notFound } from "next/navigation";
import ItemForm from "../../../components/ItemCard";

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = mockMenuItems.find((i) => i.id === id);
  if (!item) notFound();

  async function updateItemAction(formData: FormData) {
    "use server";
    console.log("ویرایش محصول با ID:", id);
    console.log("دیتای جدید:", Object.fromEntries(formData));
  }

  return (
    <div className="min-h-screen bg-[#0e0618] px-4 py-6 sm:px-6 lg:px-8" dir="rtl">
      <div className="mx-auto max-w-2xl">

        {/* هدر صفحه */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">ویرایش آیتم</h1>
            <p className="text-xs text-white/30">{item.title.fa}</p>
          </div>
        </div>

        {/* فرم */}
        <div className="rounded-2xl border border-white/8 bg-[#160924] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <ItemForm initialData={item} onSubmit={updateItemAction} />
        </div>

      </div>
    </div>
  );
}