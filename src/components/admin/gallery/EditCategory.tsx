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
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/app/_context/CategoryContext";

const formSchema = z.object({
  name: z.string().min(1, { message: "Категорийн нэрийг заавал оруулна уу" }),
  description: z
    .string()
    .min(1, { message: "Категорийн тайлбарыг заавал оруулна уу" }),
});

type Props = {
  getCategories: () => void;
};

export const EditCategory = ({ getCategories }: Props) => {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const { categories } = useCategory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const editCategory = async (id: string, value: string, valueDes: string) => {
    setOpenDialogId(null);
    try {
      await axios.put(`/api/categories?id=${id}`, {
        name: value,
        description: valueDes,
      });
      toast.success("Категори амжилттай шинэчлэгдлээ");
      getCategories();
    } catch (error) {
      toast.error("Категори шинэчлэхэд алдаа гарлаа");
      console.error(error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("des", values);
    if (openDialogId) {
      editCategory(openDialogId, values.name, values.description);
    }
  }

  const handleDialogOpen = (
    categoryId: string,
    categoryName: string,
    categoryDes: string
  ) => {
    setOpenDialogId(categoryId);
    form.setValue("name", categoryName);
    form.setValue("description", categoryDes);
  };

  const handleDialogClose = () => {
    setOpenDialogId(null);
    form.reset();
  };

  return (
    <>
      {categories?.map((cat) => (
        <Dialog
          key={cat._id}
          open={openDialogId === cat._id}
          onOpenChange={(open) => {
            if (open) {
              handleDialogOpen(cat._id!, cat.name, cat.description!);
            } else {
              handleDialogClose();
            }
          }}
        >
          <DialogTrigger asChild>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 border-0 flex hover:bg-white/90 gap-2 items-center cursor-pointer">
              <div className="text-sm text-gray-600">{cat.name}</div>
              <div className="text-xs font-bold text-rose-600">{cat.count}</div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Категорийн нэр солих</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категорийн тайлбар</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button type="submit">Засварлах</Button>
                  <DeleteCategory
                    cat={cat}
                    getCategories={() => {
                      getCategories();
                    }}
                  />
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};
