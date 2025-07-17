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
  price: number;
  category: CategoryType;
  duration: number;
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
  about: string;
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
  }[]; // ✅ зөв бүтэц
  phone: string;
  location: string;
  instagram: string;
  createdAt: Date;
  updatedAt: Date;
}
