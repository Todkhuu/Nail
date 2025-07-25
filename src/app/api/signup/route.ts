import { NextRequest, NextResponse } from "next/server";
import { StaffModel } from "@/server/models/staff.model";
import bcrypt from "bcryptjs";
import { connectMongoDb } from "@/server/database/db";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDb();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    const existing = await StaffModel.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await StaffModel.create({ email, password: hashedPassword });

    return NextResponse.json(
      {
        message: "Signup successful",
        user: { email: user.email, _id: user._id },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
