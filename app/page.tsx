'use client'


import React, { useState } from 'react'



const munchCategories =[
  {id:'combo',name_fa:'پکیج کمبو',name_en:'Combo Deals',name_ar:'وجبات کومبو'},
  {id:'pizza' ,name_fa:'پیتزا', name_en:'pizza' , name_ar:'البیتزا'},
  {id:'burger' ,name_fa:'برگر', name_en:'burger' , name_ar:'برجر'},
  {id:'pasta' ,name_fa:'پاستا', name_en:'pasta' , name_ar:'باستا'}
];

const munchItems =[
  {
    id:'c1',
    categoryId:'combo',
    price:380000,
    image:'/images/Category1.png',
    isAvailable:true,
    name_fa:'کمبو پکیج 1',
    name_en:'Combo Package 1',
    name_ar:'کومبو بکج 1',
    desc_fa:'یک عدد پیتزا تک نفره + دو تکه مرغ سوخاری + سیب زمینی + نوشابه',
    desc_en:'1 Single pizza + 2pce Fried Chicken + Fries + Soda',
    desc_ar:'بیتزا شخص واحد + قطعتین دباج + بطاطس + کولا',
  },
  {
    id:'c2',
    categoryId:'combo',
    price:450000,
    image:"/images/Category2.png",
    isAvailable:true,
    name_fa:'کمبو پکیج 2',
    name_en:'Combo Package 2',
    name_ar:'کومبو بکج 2',
    desc_fa:'2 تکه مرغ سوخاری + سیب زمینی + نان بروچ + نوشابه',
    desc_en:'2pce Fried Chicken + Fries + Brooch Bread + Soda',
    desc_ar:'لحم بقری وصلصه الثوم وفطر وجبنه موزارلا',
  },
  {
    id:'p1',
    categoryId:'pizza',
    price:380000,
    image:'/images/Category4.png',
    isAvailable:false,
    name_fa:'برگر کلاسیک',
    name_en:'Classic Burger',
    name_ar:'برجر کلاسیک',
    desc_fa:'180 گرم گوشت خالص وکاهو و گوجه و سس مخصثوص',
    desc_en:'180g pure beef lettuce , tomato,spcial sauce',
    desc_ar:'180 جرام لحم بقری صافی وخس و طماطم و صلصه خاصه',
  }
]


const translations = {
  en:{
    title:'MunchBox Menu',
    pizza:"BBQ Chicken Pizza",
    pizzaDesc:'Grilled Chicken , BBQ Sauce , mozzarella cheese',
    price1:'$12.99',
    price2:'$8.99',
    price:'$15.99'
  },
  fa:{
    title:'منوی مانچ باکس',
    pizza:'پیتزا مرغ باربیکیو',
    pizzaDesc:'مرغ گریل شده و سس باربیکیو و پنیر مزارلا',
     price1:'380000',
    price2:'260000',
    price:'490000'
  },
  ar:{
    title:'قایمه متنش بوکس',
    pizza:'بیتزا دجاج باربکیو',
    pizzaDesc:'دجاج مشوی و صلصه باربکیو و جبنه موزاریلا',
     price1:'$12.99',
    price2:'$8.99',
    price:'$15.99'
  }
}


const MenuPage: React.FC =()=> {

  
  


  return (
   <div>

   </div>

   )
}

export default MenuPage