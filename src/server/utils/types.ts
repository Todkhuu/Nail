import { Schema } from "mongoose";

export interface CategoryType {
  _id: Schema.Types.ObjectId;
  name: string;
  services: ServiceType;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceType {
  _id: Schema.Types.ObjectId;
  title: string;
  price: string;
  category: CategoryType;
  duration: string;
  description: string;
  image: string;
  feature: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffType {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  experience: number;
  biography: string;
  description: string;
  image: string;
  bgImage: string;
  profession: string;
  category: CategoryType;
  services: ServiceType;
  availableTimes: {
    day:
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday";
    slots: {
      start: string;
      end: string;
    }[];
  }[];
  phone: string;
  location: string;
  instagram: string;
  createdAt: Date;
  updatedAt: Date;
}
