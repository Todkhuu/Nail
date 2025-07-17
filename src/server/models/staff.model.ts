import { model, Model, models, Schema } from "mongoose";
import { StaffType } from "../utils/types";

const StaffSchema: Schema = new Schema<StaffType>(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String },
    experience: { type: Number },
    about: { type: String },
    image: { type: String },
    bgImage: { type: String },
    profession: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
    services: {
      type: [Schema.Types.ObjectId],
      ref: "Services",
    },
    availableTimes: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        slots: [
          {
            start: { type: String, required: true }, // "09:00"
            end: { type: String, required: true }, // "17:00"
          },
        ],
      },
    ],
    phone: { type: String },
    location: { type: String },
    instagram: { type: String },
  },
  { timestamps: true }
);

export const StaffModel: Model<StaffType> =
  models["Staff"] || model<StaffType>("Staff", StaffSchema);
