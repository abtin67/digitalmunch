import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET (){
    try{
        await dbConnect();

        const categories = await Category.find().sort({createdAt:1})
        return NextResponse.json({success:true, data:categories})
    }catch(error){
        return NextResponse.json(
            {success:false, error:String(error)},
            {status:500}
        )
    }
}


export async function POST(req:NextRequest){
    try{
        await dbConnect()

        const body = await req.json()

        const category = await Category.create({
            name:body.name,
            icon: body.icon || "",
        })

        return NextResponse.json(
            {success:true, data:category},
            {status:201}
        )
    }catch(error){
        return NextResponse.json(
            {success:false, error:String(error)},
            {status:500}
        )
    }
}