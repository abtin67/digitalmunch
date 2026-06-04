const dictionaries = {
    fa:{
        single:'یک نفره',
        double:'دونفره',
        unavailable:'تمام شده',
        searchPlaceholder:'جستجو در بین غذاها...'
    },
    en:{
        single:'Single',
        double:'Double',
        unavailable:'Out ofStock',
        searchPlaceholder:'Search menu...'
    },
    ar:{
        single:'شخص واحد',
        double:'شخصین',
        unavailable:'نفذت الکمیة',
        searchPlaceholder:'البحث في القائمة'
    },
}

export const getDictionary = (locale : 'fa' | 'en' | 'ar')=>{
    return dictionaries[locale] || dictionaries.fa
}