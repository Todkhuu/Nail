"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStaff } from "@/app/_context/StaffContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CloudinaryUpload from "./CloudinaryUpload";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  bgImage: z.string(),
  name: z.string().min(1, { message: "Нэрийг заавал оруулна уу." }),
  description: z.string().min(1, { message: "Тайлбар заавал шаардлагатай." }),
});

export function HeroEditor() {
  const [file, setFile] = useState<File>();
  const { staff, getStaff } = useStaff();
  console.log("staff", staff);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bgImage: staff?.bgImage || "",
      name: staff?.name || "",
      description: staff?.description || "",
    },
  });

  React.useEffect(() => {
    if (staff) {
      form.reset({
        bgImage: staff.bgImage || "",
        name: staff.name || "",
        description: staff.description || "",
      });
    }
  }, [staff]);

  const handleFile = (file: File) => {
    setFile(file);
  };

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

  const updateStaff = async (data: z.infer<typeof formSchema>) => {
    try {
      let imageUrl = staff?.bgImage;
      if (file) {
        const uploaded = await handleUpload();
        if (!uploaded) return;
        imageUrl = uploaded;
      }
      await axios.put("/api/staff", {
        _id: staff?._id,
        ...data,
        bgImage: imageUrl,
      });
      toast.success("Гол хэсгийг амжилттай шинэчиллээ");
      form.reset();
      setFile(undefined);
      getStaff();
    } catch (error) {
      toast.error("Гол хэсгийг шинэчлэхэд алдаа гарлаа");
      console.error(error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateStaff(values);
    console.log(values);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            Нүүр хуудасны гол хэсэг засварлах
          </h1>
          <p className="text-gray-600 mt-2">
            Өөрийн нүүр хуудасны гол хэсгийг өөрчилнө үү
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Арын зураг</CardTitle>
                <CardDescription>
                  Арын зургийг шинэчлэх эсвэл солих
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="bgImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Зураг</FormLabel>
                      <FormControl>
                        <CloudinaryUpload
                          handleFile={handleFile}
                          defaultImage={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Текст агуулга</CardTitle>
                <CardDescription>
                  Гол хэсгийн текстийн агуулгыг өөрчлөх
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Артистын нэр</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-rose-200 focus:border-rose-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тайлбар</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-rose-200 focus:border-rose-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="w-[100%] flex justify-end mt-4">
            <Button
              variant={"outline"}
              type="submit"
              className="border-rose-200 focus:border-rose-400"
            >
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
