import { connectMongoDb } from "@/server/database/db";
import { CategoryModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  try {
    await connectMongoDb();

    const categoriesWithCount = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $project: {
          _id: "$_id",
          categoryName: "$categoryName",
          count: { $size: "$foods" },
          foods: "$foods",
        },
      },
    ]);

    const formattedResponse = categoriesWithCount.map((category) => ({
      _id: category._id.toString(),
      categoryName: category.categoryName,
      count: category.count,
      foods:
        category.foods?.map((food: any) => ({
          _id: food._id.toString(),
          foodName: food.foodName,
          image: food.image,
          price: food.price,
          ingredients: food.ingredients,
        })) || [],
    }));

    return NextResponse.json(formattedResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching food categories:", error);

    return NextResponse.json(
      {
        message: "An error occurred while fetching food categories.",
        error: error instanceof Error ? error.message : "Unknown error.",
      },
      { status: 500 }
    );
  }
}
