import { ReactNode } from "react";

// 1. تغییر تایپ برای پذیرش Promise
interface LocaleLayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>; // اینجا را به Promise تغییر دادیم
}

// 2. تابع را async کنید
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    
    // 3. مقدار params را await کنید
    const { locale } = await params;
    
    const isRtl = locale === 'fa' || locale === 'ar';

    return (
        <div lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
            {children}
        </div>
    );
}