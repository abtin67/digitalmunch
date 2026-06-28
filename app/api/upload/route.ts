import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // فقط ادمین می‌تونه آپلود کنه
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیرمجاز" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "فایلی انتخاب نشده" },
        { status: 400 }
      );
    }

    // تبدیل فایل به buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // آپلود به Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "munchbox",
            transformation: [
              { width: 800, height: 600, crop: "fill" },
              { quality: "auto", fetch_format: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}