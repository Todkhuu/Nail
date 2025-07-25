import { model, Model, models, Schema } from "mongoose";
import { StaffType } from "../utils/types";

const StaffSchema: Schema = new Schema<StaffType>(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String },
    experience: { type: String },
    happyClients: { type: String },
    biography: { type: String },
    description: { type: String },
    image: { type: String },
    bgImage: { type: String },
    profession: { type: String },
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
        },
        slots: [
          {
            start: { type: String },
            end: { type: String },
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
