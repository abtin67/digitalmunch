import { getDictionary } from "@/app/locales/dictionaries";
import { MenuItem } from "@/types/menu";
import { useParams } from "next/navigation";


interface MenuCardProps {
    item:MenuItem
}

export default function MenuCard ({item}:MenuCardProps){

    const params = useParams();
    const locale = (params.locale as 'fa'| 'en'| 'ar') || 'fa';

    const dict = getDictionary(locale);

    const isRtl = locale === 'fa' || locale === 'ar';

    return(
        <div className="group  relative flex flex-col 
        justify-between overflow-hidden rounded-[2.5rem] border border-white/0.04
         bg-[#160924]/40  p-1  transition-all duration-500 hover:border-amber-500/40 
         hover:shadow-[0_0_35px_rgba(245,158,11,0.15)]">
        <div>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.8rem] bg-purple-950/20 ">
                <img 
                src={item.image} 
                alt={item.title[locale]} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

            </div>

            <div className="my-4 px-8 md:px-12 flex items-center justify-between border-t border-white/5 pt-3" style={{direction : isRtl ? 'rtl' :'ltr'}}>
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-mono">{dict.single}</span>
                    <div className="flex items-baseline gap-0.5">
                        <span className="font-sans text-sm font-black text-white">{item.price.single.toLocaleString()}</span>
                        <span className="text-[16px] font-semibold text-gray-400">T</span>
                    </div>
                </div>
                {item.isAvailable === false && (
                    <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/20">
                        {dict.unavailable}
                    </span>
                )}
            </div>
        </div>
        </div>
    )
}