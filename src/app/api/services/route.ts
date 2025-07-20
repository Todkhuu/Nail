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

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDb();
    const service = await req.json();

    if (!service._id) {
      return NextResponse.json(
        { success: false, message: "ID шаардлагатай." },
        { status: 400 }
      );
    }

    const updatedJob = await ServiceModel.findByIdAndUpdate(
      service._id,
      { ...service },
      { new: true }
    );

    if (!updatedJob) {
      return NextResponse.json(
        { success: false, message: "Үйлчилгээ олдсонгүй." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedJob,
      message: "Үйлчилгээг амжилттай шинэчиллээ.",
    });
  } catch (error) {
    console.error("Үйлчилгээ шинэчлэхэд алдаа гарлаа:", error);
    return NextResponse.json(
      { success: false, message: "Үйлчилгээг шинэчлэхэд алдаа гарлаа." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectMongoDb();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deletedJob = await ServiceModel.findByIdAndDelete(id);

    if (!deletedJob) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Job deletion error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting job" },
      { status: 500 }
    );
  }
}
