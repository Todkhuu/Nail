import { NextRequest, NextResponse } from "next/server";
import { StaffModel } from "@/server/models/staff.model";
import { connectMongoDb } from "@/server/database/db";

export async function GET() {
  try {
    await connectMongoDb();
    const staff = await StaffModel.find();
    return NextResponse.json({ staff }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDb();
    const staff = await req.json();

    if (!staff._id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const putStaff = await StaffModel.findByIdAndUpdate(
      staff._id,
      { ...staff },
      {
        new: true,
      }
    );
    if (!putStaff) {
      return NextResponse.json({ message: "Staff not found" }, { status: 404 });
    }

    return NextResponse.json({ putStaff }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
