export type CategoryType = {
  _id: string;
  name: string;
};

export type ServiceType = {
  _id?: string;
  title: string;
  description: string;
  image: string;
  beforeImage?: string;
  category: string | CategoryType;
  feature?: boolean;
  price: string;
  duration: string;
};

export type StaffType = {
  _id?: string;
  email: string;
  name?: string;
  experience?: string;
  happyClients: string;
  description: string;
  about?: string;
  biography?: string;
  image?: string;
  bgImage?: string;
  profession?: string;
  availableTimes?: {
    day:
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday";
    slots: { start: string; end: string }[];
  }[];
  phone?: string;
  location?: string;
  instagram?: string;
  igHandle?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
