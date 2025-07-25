import { connectMongoDb } from "@/server/database/db";
import { StaffModel } from "@/server/models";
import { compareSync } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email болон password шаардлагатай", error: true },
        { status: 400 }
      );
    }

    const user = await StaffModel.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгч бүртгэлгүй байна", error: true },
        { status: 404 }
      );
    }

    const isCorrect = compareSync(password, user.password);
    if (!isCorrect) {
      return NextResponse.json(
        { message: "Нууц үг буруу байна", error: true },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Амжилттай нэвтэрлээ",
    });
  } catch (error) {
    console.error("Нэвтрэхэд алдаа гарлааr:", error);
    return NextResponse.json(
      {
        message: "Нэвтрэхэд алдаа гарлаа",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
