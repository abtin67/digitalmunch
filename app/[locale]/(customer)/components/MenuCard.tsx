import { getDictionary } from "@/app/locales/dictionaries";
import { MenuItem } from "@/types/menu";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";

interface MenuCardProps {
  item: MenuItem;
  onOpenModal?: (item: MenuItem) => void; // تابعی که از کامپوننت والد برای باز کردن مدال می‌آید
}

export default function MenuCard({ item, onOpenModal }: MenuCardProps) {
  const params = useParams();
  const locale = (params.locale as "fa" | "en" | "ar") || "fa";

  const dict = getDictionary(locale);
  const isRtl = locale === "fa" || locale === "ar";

  // هندل کردن کلیک روی کارت یا دکمه
  const handleCardClick = () => {
    if (item.isAvailable && onOpenModal) {
      onOpenModal(item);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -220 }} // از سمت چپ (بغل) شروع کنه
      whileInView={{ opacity: 1, x: 0 }} // وقتی رسید به دید کاربر، ظاهر شه
      viewport={{ once: true, margin: "-90px" }} // وقتی ۵۰ پیکسل از کارت وارد صفحه شد، انیمیشن شروع شه
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={handleCardClick}
      className={`group relative flex flex-col
           justify-between overflow-hidden rounded-[2.2rem]
            border border-white/5 bg-[#160924]/40 
            backdrop-blur-3xl p-3 transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_15px_40px_rgba(245,158,11,0.12)]
           ${
             item.isAvailable
               ? "cursor-pointer hover:-translate-y-1.5"
               : "opacity-50 grayscale-40 cursor-not-allowed"
           }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* بخش عکس محصول */}
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
       
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative aspect-4/3 w-full overflow-hidden rounded-[1.6rem] bg-purple-950/20"
      >
        <img
          src={item.image}
          alt={item.title[locale]}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

        {/* برچسب ناموجود */}
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[3px]">
            <span className="rounded-xl bg-red-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-red-500/20">
              {dict.unavailable}
            </span>
          </div>
        )}
      </motion.div>

      {/* بخش توضیحات */}
      <div className="flex flex-1 flex-col justify-between pt-4 px-2">
        <div>
          <h2 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
            {item.title[locale]}
          </h2>
        </div>

        {/* بخش قیمت و دکمه باز کردن مدال */}
        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-gray-300">
              {locale === "fa" ? "تک نفره" : "single"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-sans text-xl font-black text-amber-400">
                {item.price.single.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-gray-400">
                {locale === "fa" ? "تومان" : "T"}
              </span>
            </div>
          </div>

          {/* دکمه تعاملی باز کردن مدال */}
          <button
            disabled={!item.isAvailable}
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 transition-all duration-300 ${
              item.isAvailable
                ? "bg-white/5 text-white group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95"
                : "text-gray-600"
            }`}
          >
            {/* آیکون پلاس */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
