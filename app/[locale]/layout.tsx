import { ReactNode } from "react";

interface LocaleLayoutProps{
    children: ReactNode;
    params: {locale: string}
}

export default function LocaleLayout({children , params}:LocaleLayoutProps){
    
    const isRtl = params.locale === 'fa' || params.locale === 'ar'
    return(
        <div lang={params.locale} dir={isRtl ? 'rtl':'ltr'}>
            {children}
        </div>
    )
}