export interface MultilingualText{
    fa:string;
    en:string;
    ar:string;
}

export interface ItemPrice {
    single: number;
    double?:number;
}

export interface MenuItem{
    id:string;
    slug: string;
    title: MultilingualText;
    description: MultilingualText;
    price: ItemPrice;
    image: string;
    category: string;
    isAvailable: boolean;
    tags?:string[];
}