import { connectMongoDb } from "@/server/database/db";
import { ServiceModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const service = await req.json();
    const createdService = await ServiceModel.create(service);

    return NextResponse.json(
      { message: "Үйлчилгээ амжилттай үүсгэгдлээ.", createdService },
      { status: 201 }
    );
  } catch (error) {
    console.error("Үйлчилгээ үүсгэх үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Үйлчилгээ үүсгэх үед алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const serviceData = await ServiceModel.find().populate("category");

    return NextResponse.json(
      {
        message: "Үйлчилгээний мэдээлэл амжилттай олдлоо.",
        data: serviceData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Үйлчилгээний мэдээлэл авах үед алдаа гарлаа:", err);

    return NextResponse.json(
      {
        message: "Үйлчилгээний мэдээлэл авах үед алдаа гарлаа:",
        error: err instanceof Error ? err.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
