import { connectMongoDb } from "@/server/database/db";
import { CategoryModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const category = await CategoryModel.findById(id).populate("services");
      return NextResponse.json(
        { message: "Ангилал амжилттай олдлоо.", category },
        { status: 200 }
      );
    } else {
      const allCategory = await CategoryModel.find().populate("services");
      return NextResponse.json(
        { message: "Бүх ангиллууд амжилттай уншигдлаа.", data: allCategory },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Ангилал унших үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ангилал унших үед алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    const newCategory = await CategoryModel.create({
      name,
    });

    return NextResponse.json(
      { message: "Ангилал амжилттай нэмэгдлээ.", newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ангилал үүсгэх үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ангилал үүсгэх үед алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Ангилал олдсонгүй" },
        { status: 400 }
      );
    }

    const category = await CategoryModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Ангилал амжилттай устгагдлаа.", category },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ангилал устгах үед алдаа гарлаа:", error);
    return NextResponse.json(
      {
        message: "Ангилал устгах үед алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { name } = await req.json();

    const category = await CategoryModel.findByIdAndUpdate(id, { name });
    return NextResponse.json(
      { message: "Ангилал амжилттай шинэчлэгдлээ.", category },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ангилал шинэчлэх үед алдаа гарлаа:", error);
  }
}
