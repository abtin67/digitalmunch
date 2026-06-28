import dbConnect from "@/lib/db";
import item from "@/models/item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    const { id } = await params;

    const itemOne = await item.findById(id).populate("category");

    if (!itemOne) {
      return NextResponse.json(
        {
          success: false,
          message: "Item not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: itemOne,
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();
    console.log(body);
    const updatedItem = await item
      .findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .populate("category");

    if (!updatedItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Item not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedItem,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    const { id } = await params;

    const deletedItem = await item.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Item not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedItem,
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
