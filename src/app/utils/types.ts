export type CategoryType = {
  _id: string;
  name: string;
};

export type ServiceType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: CategoryType;
  feature: boolean;
};
