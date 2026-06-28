import CustomerMenuClient from "./CustomerMenuClient";


interface Props {
  params: Promise<{ locale: string }>;
}

export default async function CustomerMenuPage({ params }: Props) {
  const { locale } = await params;

  const [itemsRes, catsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`, { cache: "no-store" }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, { cache: "no-store" }),
  ]);

  const itemsData = await itemsRes.json();
  const catsData = await catsRes.json();

  const items = itemsData.success ? itemsData.data : [];
  const categories = catsData.success ? catsData.data : [];

  return (
    <CustomerMenuClient
      locale={locale as "fa" | "en" | "ar"}
      initialItems={items}
      initialCategories={categories}
    />
  );
}