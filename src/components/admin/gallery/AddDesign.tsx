"use client";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCategory } from "@/app/_context/CategoryContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CloudinaryUpload from "../CloudinaryUpload";
import axios from "axios";
import { useService } from "@/app/_context/ServiceContext";
import { ServiceType } from "@/app/utils/types";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Гарчиг хамгийн багадаа 2 тэмдэгт байх ёстой." })
    .max(100, { message: "Гарчиг хамгийн ихдээ 100 тэмдэгт байх ёстой." }),
  description: z
    .string()
    .min(2, { message: "Тайлбар хамгийн багадаа 2 тэмдэгт байх ёстой." })
    .max(500, { message: "Тайлбар хамгийн ихдээ 500 тэмдэгт байх ёстой." }),
  image: z.string(),
  category: z.string().min(2, { message: "Категори сонгоно уу." }).max(50),
  price: z
    .string()
    .min(1, { message: "Үнэ заавал оруулна." })
    .max(10, { message: "Үнэ хамгийн ихдээ 10 оронтой байх ёстой." }),
  duration: z
    .string()
    .min(1, { message: "Хугацаа заавал оруулна." })
    .max(3, { message: "Хугацаа хамгийн ихдээ 3 оронтой байх ёстой." }),
});

export const AddDesign = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
      price: "",
      duration: "",
    },
  });
  const { categories } = useCategory();
  const { getService } = useService();

  const addDesign = async (data: ServiceType) => {
    try {
      const imageUrl = await handleUpload();
      console.log("image", imageUrl);
      if (!imageUrl) return;
      await axios.post("/api/services", {
        ...data,
        image: imageUrl,
      });
      form.reset();
      setFile(undefined);
      setIsOpen(false);
      form.reset();
      getService();
      toast.success("Дизайн амжилттай нэмэгдлээ");
    } catch (error) {
      console.error("Үйлчилгээ үүсгэх үед алдаа гарлаа:", error);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    addDesign(values);
  }

  const handleUpload = async () => {
    const PRESET_NAME = "food-delivery-app";
    const CLOUDINARY_NAME = "ds6kxgjh0";
    if (!file) {
      toast("Зураг сонгоно уу.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("api_key", CLOUDINARY_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error(err);
      toast("Файл байршуулахад алдаа гарлаа.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="bg-rose-500 hover:bg-rose-600 text-sm text-white flex items-center gap-2 p-2 rounded-md">
        <Plus className="mr-2 h-4 w-4" />
        Дизайн нэмэх
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-5">Дизайн нэмэх</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Гарчиг</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full sm:w-60"
                        placeholder="Минимал загвар"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Категори</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full sm:w-46">
                          <SelectValue placeholder="Категори сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category, index) => (
                            <SelectItem key={index} value={category._id!}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тайлбар</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Загварын талаар тайлбар оруулах"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Зураг</FormLabel>
                  <FormControl>
                    <CloudinaryUpload onFileSelect={handleFile} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Үнэ (₮)</FormLabel>
                    <FormControl>
                      <Input placeholder="30000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Хугацаа (минут)</FormLabel>
                    <FormControl>
                      <Input placeholder="60" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Илгээх</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
