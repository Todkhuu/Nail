import { model, Model, models, Schema } from "mongoose";
import { CategoryType } from "../utils/types";

const CategorySchema: Schema = new Schema<CategoryType>(
  {
    name: { type: String, required: true },
    services: {
      type: [Schema.Types.ObjectId],
      ref: "Services",
    },
  },
  { timestamps: true }
);

export const CategoryModel: Model<CategoryType> =
  models["Categories"] || model<CategoryType>("Categories", CategorySchema);
