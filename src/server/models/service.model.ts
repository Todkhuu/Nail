import { model, Model, models, Schema } from "mongoose";
import { ServiceType } from "../utils";

const ServiceSchema: Schema = new Schema<ServiceType>(
  {
    title: { type: String, required: true },
    price: { type: Number },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    feature: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ServiceModel: Model<ServiceType> =
  models["Services"] || model<ServiceType>("Services", ServiceSchema);
