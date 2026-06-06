'use client'

import { MultilingualText } from "@/types/menu"
import { button } from "framer-motion/client"
import { ReactNode, useState } from "react"

interface MultiLangTabsProps {
    children: {
        fa: ReactNode
        en: ReactNode
        ar: ReactNode
    }
}

export default function MultiLangTabs ({children}:MultiLangTabsProps){

    const [activeTab , setActiveTab]=useState<keyof MultilingualText>('fa');

    const tabs :(keyof MultilingualText)[]=['fa','en','ar'];
    
    return(
        <div className="bg-[#160924]/50 border border-white/10 rounded-2xl p-5">
            <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
            {
                tabs.map((lang)=>(
                    <button
                    key={lang}
                    type="button"
                    onClick={()=>setActiveTab(lang)}
                    className={`px-4 py-1 rounded-lg text-sm font-bold transition-all ${
                        activeTab === lang
                        ?'bg-amber-500 text-black'
                        :'text-gray-400 hover:text-white'
                    }`}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))
            }

            </div>
            <div className="min-h-25">
                {children[activeTab]}
            </div>
        </div>
    )
}