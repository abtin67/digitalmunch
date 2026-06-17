
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function PUT(req: NextRequest) {
  try {
    // چک کن لاگین هست
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیرمجاز" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { currentPassword, newPassword } = await req.json();

    // validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: "همه فیلدها الزامی است" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "پسورد جدید باید حداقل ۶ کاراکتر باشد" },
        { status: 400 }
      );
    }

    // پیدا کردن یوزر
    const user = await User.findOne({ username: session.user?.name });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "کاربر پیدا نشد" },
        { status: 404 }
      );
    }

    // چک کردن پسورد فعلی
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "پسورد فعلی اشتباه است" },
        { status: 400 }
      );
    }

    // هش و ذخیره پسورد جدید
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "پسورد با موفقیت تغییر کرد",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}