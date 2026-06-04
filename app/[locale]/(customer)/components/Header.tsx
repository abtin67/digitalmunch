"use client";

import { useParams } from "next/navigation";

import Link from "next/link";

export default function Header() {
  const params = useParams();
  const locale = (params.locale as "fa" | "en" | "ar") || "fa";
  const isRtl = locale === "fa" || locale === "ar";

  return (
    <header className="relative w-full bg-[#421764] border-b border-white/6 overflow-hidden">
      

      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40.5 bg-purple-600/400 blur-[80px] rounded-full pointer-events-none"></div>
        <div
          className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between"
          style={{ direction: isRtl ? "rtl" : "ltr" }}
        >
          <div className=" flex items-center gap-3">
            {/* <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#e1ff00] border-2 border-[#b00b8] shadow-[0_0_15px_rgba(255,255,0,0,0.3)] shrink-0 select-none">
                <span className="font-black text-black tracking-tighter text-[11px] transform -rotate-12">
                    munch
                    <span className="text-[#b000b8]">BOX</span>
                </span>
                <div className="absolute bottom-0 right-1 w-4 h-2 bg-white/40 rounded-full blur-[1px]"></div>
            </div> */}
            <img src="/logo-munch.jpg" alt="logo" width={50} height={40} className="h-14 w-14 rounded-full overflow-hidden object-cover" />

            <div className="hidden sm:flex flex-col ">
                {locale === 'fa'?(
                    <h1 className="font-black text-xl text-white tracking-wide drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">مانچ باکس</h1>
                ) : (
                    <h1 className="font-sans text-xl font-black text-[#a4ac6b] tracking-wider uppercase  drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]">
                        MUNCH
                        <span className="text-white">BOX</span>
                    </h1>
                )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-full border border-white/4">
                {[
                    {code:'fa',label:'FA'},
                    {code:'en',label:'EN'},
                    {code:'ar',label:'AR'},

                ].map((lang)=>{
                    const isActiv = locale === lang.code
                    return(
                        <Link
                        key={lang.code}
                        href={`/${lang.code}`}
                        className={`px-4 py-1 text-[12px] font-black rounded-full transition-all duration-300 ${
                            isActiv
                            ?'bg-amber-500 text-black shadow-[0_0_10px_rgba(255,255,0,0.2)]'
                            :'text-gray-400 hover:text-white'
                        }`}
                        >
                        {lang.label}
                        </Link>
                    )
                })}
          </div>
        </div>
     
    </header>
  );
}
