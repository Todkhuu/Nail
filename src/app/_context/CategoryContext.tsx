"use client";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CategoryType } from "@/app/utils/types";

type CategoryContextType = {
  categoriess: CategoryType[] | null;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[] | null>>;
  getCategories: () => void;
};

export const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoriess, setCategories] = useState<CategoryType[] | null>(null);

  const getCategories = async () => {
    try {
      // setLoading(true);
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error).toString());
      console.log("error in context", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categoriess, setCategories, getCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);
