"use client";
import { CategoryType } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { EditCategory } from "./EditCategory";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/app/_context/CategoryContext";

const formSchema = z.object({
  name: z.string().min(1, { message: "Категорийн нэрийг заавал оруулна уу" }),
  description: z
    .string()
    .min(1, { message: "Категорийн тайлбарыг заавал оруулна уу" }),
});

export const AddCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCategories } = useCategory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const addCategory = async (value: CategoryType) => {
    await axios.post("/api/categories", value);
    getCategories();
    setIsOpen(false);
    form.reset();
    toast.success("Категори амжилттай нэмэгдлээ");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    addCategory(values);
  }

  return (
    <div className="flex items-center flex-wrap gap-4">
      <EditCategory getCategories={getCategories} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <PlusCircleIcon className="h-6 w-6 bg-rose-500 text-white rounded-full" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kатегори нэмэх</DialogTitle>
            <DialogDescription>Галарейд шинэ категори нэмэх</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="flex justify-end">
                <Button type="submit" className="w-fit">
                  Категори нэмэх
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
