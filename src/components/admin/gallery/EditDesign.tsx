"use client";
import { Edit } from "lucide-react";
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

type Props = {
  service: ServiceType;
};

export const EditDesign = ({ service }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: service.title,
      description: service.description,
      image: service.image,
      category:
        typeof service.category === "string"
          ? service.category
          : service.category._id,
      price: service.price,
      duration: service.duration,
    },
  });
  const { categoriess } = useCategory();
  const { getService } = useService();

  const updateDesign = async (data: z.infer<typeof formSchema>) => {
    try {
      let imageUrl = service.image;
      if (file) {
        const uploaded = await handleUpload();
        if (!uploaded) return;
        imageUrl = uploaded;
      }
      await axios.put("/api/services", {
        _id: service._id,
        ...data,
        image: imageUrl,
      });
      form.reset();
      setFile(undefined);
      setIsOpen(false);
      getService();
    } catch (error) {
      console.error("Үйлчилгээ шинэчлэхэд алдаа гарлаа:", error);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateDesign(values);
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

  // Toggles the 'feature' property of the service
  const editFeature = async (featureValue: boolean) => {
    try {
      await axios.put("/api/services", {
        _id: service._id,
        feature: featureValue,
      });
      getService();
    } catch (error) {
      console.error("Feature update error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-md border-[1px] py-1 px-2">
          <Edit className="mr-1 h-3 w-3" />
          <p className="text-[14px]">Засах</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Дизайн засах</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex justify-between flex-wrap gap-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Гарчиг</FormLabel>
                      <FormControl>
                        <Input
                          className="w-60"
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
                    <FormItem>
                      <FormLabel>Категори</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-46">
                            <SelectValue placeholder="Категори сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriess?.map((category, index) => (
                              <SelectItem key={index} value={category._id}>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Зураг</FormLabel>
                    <FormControl>
                      <CloudinaryUpload
                        handleFile={handleFile}
                        defaultImage={service.image}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
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
              <Button type="submit">Засах</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
