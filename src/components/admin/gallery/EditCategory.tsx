"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
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

const formSchema = z.object({
  name: z.string().min(1, { message: "Категорийн нэрийг заавал оруулна уу" }),
});

export const EditCategory = ({
  getCategoryStats,
  getCategories,
}: {
  getCategoryStats: () => {
    _id: string;
    name: string;
    count: number;
  }[];
  getCategories: () => void;
}) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

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

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`/api/categories?id=${id}`);
      toast.success("Категори амжилттай устгагдлаа");
      getCategories();
    } catch (error) {
      toast.error("Категори устгахад алдаа гарлаа");
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    editCategory(editId || "", values.name);
  }

  return (
    <>
      {getCategoryStats()?.map((cat, index) => (
        <Popover key={index}>
          <PopoverTrigger onClick={() => setEditId(cat._id)}>
            <div
              key={cat._id}
              className="bg-white/60 backdrop-blur-sm rounded-lg p-2 border-0 flex hover:bg-white/90 gap-2 items-center"
            >
              <div className="text-sm text-gray-600">{cat.name}</div>
              <div className="text-xs font-bold text-rose-600">{cat.count}</div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-26">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger>
                <div className="text-sm text-gray-600">Засварлах</div>
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
                    <div className="flex justify-end mt-4">
                      <Button type="submit">Засварлах</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <DeleteCategory cat={cat} deleteCategory={deleteCategory} />
          </PopoverContent>
        </Popover>
      ))}
    </>
  );
};
