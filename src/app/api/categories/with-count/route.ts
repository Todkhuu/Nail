import { connectMongoDb } from "@/server/database/db";
import { CategoryModel } from "@/server/models";
import { NextResponse } from "next/server";

connectMongoDb();

export async function GET() {
  try {
    const serviceCategoriesWithCount = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "category",
          as: "services",
        },
      },
      {
        $project: {
          _id: "$_id",
          name: "$name",
          description: "$description",
          count: { $size: "$services" },
        },
      },
    ]);

    const formattedResponse = serviceCategoriesWithCount.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
      description: category.description,
      count: category.count,
    }));

    return NextResponse.json(formattedResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching service categories:", error);

    return NextResponse.json(
      {
        message: "An error occurred while fetching food categories",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
