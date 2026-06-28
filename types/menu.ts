export interface MultilingualText{
    fa:string;
    en:string;
    ar:string;
}

export interface ItemPrice {
  single: number;
  double: number;
  discountedSingle?: number | null; // اضافه شد
  discountedDouble?: number | null; // اضافه شد
}

export interface ItemOffer {
  isSpecial: boolean;
  discountPercent: number;
  expiresAt?: string | Date | null;
}

export interface Category {
  _id: string;
  name: MultilingualText;
}

export interface MenuItem {
  _id: string;
  title: MultilingualText;
  description: MultilingualText;
  price: ItemPrice;
  offer?: ItemOffer;
  category: string | Category;
  image: string;
  isAvailable: boolean;
  tags: string[];
}