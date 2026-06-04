import { MenuItem } from "@/types/menu";

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    slug: "Chicken and mushroom",
    category: "pizza",
    image: "/images/pizza-chicke-mushroom.jpg",
    tags: ["Rest Beef"],
    isAvailable: true,
    title: {
      fa: "پیتزا رست بیف",
      en: "Beef Roast Pizza",
      ar: "بیتزا لحم بقری مشوی",
    },
    description: {
      fa: "سس مخصوص و رست بیف و قارچ و فلفل دلمه ای و پنیر نیونسیون",
      en: "Special sauce , roast beef , mushroom , bell pepper , neoncyn cheese",
      ar: "صلصه خاصه و لحم بقری مشوی و فطر و فلفل حلو و جبنه نیونسیون",
    },
    price: {
      single: 438,
      double: 698,
    },
  },
  {
    id: "3",
    slug: "beef-roast-pizza",
    category: "pizza",
    image: "/images/Roast-Beef.jpg",
    tags: ["Rest Beef"],
    isAvailable: true,
    title: {
      fa: "پیتزا رست بیف",
      en: "Beef Roast Pizza",
      ar: "بیتزا لحم بقری مشوی",
    },
    description: {
      fa: "سس مخصوص و رست بیف و قارچ و فلفل دلمه ای و پنیر نیونسیون",
      en: "Special sauce , roast beef , mushroom , bell pepper , neoncyn cheese",
      ar: "صلصه خاصه و لحم بقری مشوی و فطر و فلفل حلو و جبنه نیونسیون",
    },
    price: {
      single: 598,
      double: 895,
    },
  },
  {
    id: "4",
    slug: "margherita",
    category: "pizza",
    image: "/images/margherita.jpg",
    tags: ["Rest Beef"],
    isAvailable: true,
    title: {
      fa: "مارگاریتا",
      en: "Margherita",
      ar: "بیتزا لحم بقری مشوی",
    },
    description: {
      fa: "سس مخصوص و رست بیف و قارچ و فلفل دلمه ای و پنیر نیونسیون",
      en: "Special sauce , roast beef , mushroom , bell pepper , neoncyn cheese",
      ar: "صلصه خاصه و لحم بقری مشوی و فطر و فلفل حلو و جبنه نیونسیون",
    },
    price: {
      single: 298,
      double: 458,
    },
  },
  {
    id: "5",
    slug: "turkey-ham-combo",
    category: "combo",
    image: "/images/combo-turkey-hem.jpg",
    tags: ["popular", "family"],
    isAvailable: false,
    title: {
      fa: "کمبو ژامبون تنوری",
      en: "Grilled Turkey Ham Combo",
      ar: "کومبو لحم الدیك الرومي المشوي",
    },
    description: {
      fa: 'ساندویچ ژامبون تنوری + پاستا الفردو + سیب زمینی + 3عدد نوشابه',
      en: "Grilled Turkey Ham Sandwich + Alfredo Pasta + Fries + 3Sodas",
      ar: 'ساندویش لحم دیك رومي مشوي + باستا ألفریدو + بطاطس مقلیة + 3مشروبات غازیة',
    },
    price: {
      single: 1999,
      double: 2090 ,
    },
  },
  {
    id: "2",
    slug: "munch-burger",
    category: "burger",
    image: "/images/Category2.png",
    tags: ["Special"],
    isAvailable: true,
    title: {
      fa: "مانچ برگر",
      en: "Munch Burger",
      ar: "مانش برجر",
    },
    description: {
      fa: "180 گرم گوشت خالص و پنیر چدار وسس باربیکیو و کاهو و گوجه",
      en: "180g pure beef, cheddar cheese , BBQ sauce , lettuce and tomato",
      ar: "180 غرام لحم بقری خالص و جبنه شیدر و صلصه باربیکیو و خس و طماطم",
    },
    price: {
      single: 450,
    },
  },
];
