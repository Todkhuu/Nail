"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DeleteCategory } from "./DeleteCategory";
import { CategoryType, ServiceType } from "@/app/utils/types";

const formSchema = z.object({
  name: z.string().min(1, { message: "Категорийн нэрийг заавал оруулна уу" }),
});

type Props = {
  categories: CategoryType[];
  services: ServiceType[];
  getCategories: () => void;
};

export const EditCategory = ({
  categories,
  services,
  getCategories,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const getCategoryStats = () => {
    return categories?.map((cat) => ({
      ...cat,
      count: services?.filter((service) => {
        const categoryId =
          typeof service.category === "string"
            ? service.category
            : service.category._id;
        return categoryId === cat._id;
      }).length,
    }));
  };

  const editCategory = async (id: string, value: string) => {
    setIsOpen(false);
    try {
      await axios.put(`/api/categories?id=${id}`, {
        name: value,
      });
      toast.success("Категори амжилттай шинэчлэгдлээ");
      getCategories();
    } catch (error) {
      toast.error("Категори шинэчлэхэд алдаа гарлаа");
      console.log(error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    editCategory(editingCategoryId, values.name);
  }

  return (
    <>
      {getCategoryStats()?.map((cat, index) => (
        <Dialog open={isOpen} onOpenChange={setIsOpen} key={index}>
          <DialogTrigger
            onClick={() => {
              setEditingCategoryId(cat._id);
              form.setValue("name", cat.name);
            }}
          >
            <div
              key={cat._id}
              className="bg-white/60 backdrop-blur-sm rounded-lg p-2 border-0 flex hover:bg-white/90 gap-2 items-center"
            >
              <div className="text-sm text-gray-600">{cat.name}</div>
              <div className="text-xs font-bold text-rose-600">{cat.count}</div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogHeader>Категорийн нэр солих</DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категорийн нэр</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button type="submit">Засварлах</Button>
                  <DeleteCategory cat={cat} getCategories={getCategories} />
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};
