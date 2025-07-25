import { model, Model, models, Schema } from "mongoose";
import { ServiceType } from "../utils";

const ServiceSchema: Schema = new Schema<ServiceType>(
  {
    title: { type: String, required: true },
    price: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    beforeImage: { type: String },
    feature: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ServiceModel: Model<ServiceType> =
  models["Services"] || model<ServiceType>("Services", ServiceSchema);
