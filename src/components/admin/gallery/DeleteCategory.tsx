"use client";

import { CategoryType } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  cat: CategoryType;
  getCategories: () => void;
};

export const DeleteCategory = ({ cat, getCategories }: Props) => {
  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`/api/categories?id=${id}`);
      toast.success("Категори амжилттай устгагдлаа");
      getCategories();
    } catch (error) {
      toast.error("Категори устгахад алдаа гарлаа");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (cat.count! > 0) {
      toast.error("Энэ категорид бүтээгдэхүүн байгаа тул устгах боломжгүй");
      return;
    }
    await deleteCategory(cat._id!);
  };

  return (
    <Button variant="destructive" onClick={handleDelete} type="button">
      Устгах
    </Button>
  );
};
