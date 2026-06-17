
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    // چک کن یوزر از قبل وجود داره یا نه
    const existing = await User.findOne({ username });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "این نام کاربری قبلاً ثبت شده" },
        { status: 400 }
      );
    }

    // هش کردن پسورد
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json(
      {
        success: true,
        data: { id: user._id, username: user.username, role: user.role },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}