"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  cat: { _id: string; count: number };
  getCategories: () => void;
};

export const DeleteCategory = ({ cat, getCategories }: Props) => {
  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`/api/categories?id=${id}`);
      toast.success("Категори амжилттай устгагдлаа");
      getCategories();
    } catch {
      toast.error("Категори устгахад алдаа гарлаа");
    }
  };
  return (
    <div>
      <Button
        variant="destructive"
        onClick={() => {
          if (cat.count > 0) {
            toast.error("Категориг устгах боломжгүй");
            return;
          }
          deleteCategory(cat._id);
        }}
      >
        Устгах
      </Button>
    </div>
  );
};
