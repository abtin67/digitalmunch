import dbConnect from "@/lib/db";
import Item from "@/models/item";
import "@/models/Category";
import jalali from "jalaali-js"
import { NextRequest, NextResponse } from "next/server";

function jalaliToGregorian(jalaliDate: string): Date | null {
  if (!jalaliDate || jalaliDate.trim() === "") return null;

  const normalized = jalaliDate
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .trim();

  const parts = normalized.split("/");
  if (parts.length !== 3) return null;

  const [jy, jm, jd] = parts.map(Number);
  if (!jy || !jm || !jd) return null;

  try {
    const { gy, gm, gd } = jalali.toGregorian(jy, jm, jd);
    return new Date(gy, gm - 1, gd);
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    await dbConnect();

    const items = await Item.find()
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const data = {
      category: body.category,
      image: body.image || "",
      isAvailable: body.isAvailable ?? true,
      tags: body.tags || [],

      title: {
        fa: body.title?.fa || "",
        en: body.title?.en || "",
        ar: body.title?.ar || "",
      },

      description: {
        fa: body.description?.fa || "",
        en: body.description?.en || "",
        ar: body.description?.ar || "",
      },

      price: {
        single: Number(body.price?.single) || 0,
        double: Number(body.price?.double) || 0,
        discountedSingle: body.price?.discountedSingle
          ? Number(body.price.discountedSingle)
          : null,
        discountedDouble: body.price?.discountedDouble
          ? Number(body.price.discountedDouble)
          : null,
      },

      offer: {
        isSpecial: body.offer?.isSpecial ?? false,
        discountPercent: Number(body.offer?.discountPercent) || 0,
        expiresAt: body.expires_at
          ? jalaliToGregorian(body.expires_at)
          : null,
      },
    };

    const newItem = await Item.create(data);

    return NextResponse.json(
      { success: true, data: newItem },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}