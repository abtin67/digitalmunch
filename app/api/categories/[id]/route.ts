import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

// UPDATE
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    const updateData: Record<string, string> = {};

    if (body.name?.fa) {
      updateData["name.fa"] = body.name.fa;
    }

    if (body.name?.ar) {
      updateData["name.ar"] = body.name.ar;
    }

    if (body.name?.en) {
      updateData["name.en"] = body.name.en;
    }
    
    if (body.icon !== undefined) {
      updateData["icon"] = body.icon;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 },
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    const { id } = await params;

    console.log(id);

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedCategory,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 },
    );
  }
}
