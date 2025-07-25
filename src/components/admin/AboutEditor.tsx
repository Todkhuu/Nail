"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";
import axios from "axios";
import { useStaff } from "@/app/_context/StaffContext";
import CloudinaryUpload from "./about/CloudinaryUpload";
import { Input } from "../ui/input";
import { AboutHeader } from "./about/Header";

const formSchema = z.object({
  image: z.string(),
  biography: z.string().min(1, { message: "Танилцуулгаа оруулна уу." }),
  happyClients: z
    .string()
    .min(1, { message: "Сэтгэл хангалуун үйлчлүүлэгчдийн тоог оруулна уу." }),
  experience: z
    .string()
    .min(1, { message: "Ажлын туршлагын хугацааг оруулна уу." }),
});

export function AboutEditor() {
  const [file, setFile] = useState<File>();
  const { staff, getStaff } = useStaff();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: staff?.image || "",
      biography: staff?.biography || "",
      happyClients: staff?.happyClients || "",
      experience: staff?.experience || "",
    },
  });

  React.useEffect(() => {
    if (staff) {
      form.reset({
        image: staff.image || "",
        biography: staff.biography || "",
        happyClients: staff.happyClients || "",
        experience: staff.experience || "",
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
      let imageUrl = staff?.image;
      if (file) {
        const uploaded = await handleUpload();
        if (!uploaded) return;
        imageUrl = uploaded;
      }
      await axios.put("/api/staff", {
        _id: staff?._id,
        ...data,
        image: imageUrl,
      });
      toast.success("Танилцуулга хэсгийг амжилттай шинэчиллээ");
      form.reset();
      setFile(undefined);
      getStaff();
    } catch (error) {
      toast.error("Танилцуулга хэсгийг шинэчлэхэд алдаа гарлаа");
      console.error(error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateStaff(values);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <AboutHeader />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Профайлын зураг</CardTitle>
                <CardDescription>
                  Профайлын зургийг оруулах эсвэл өөрчлөх
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
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
                <CardTitle>Танилцуулга</CardTitle>
                <CardDescription>
                  Өөрийн талаар товч тайлбар оруулна уу
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="biography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Танилцуулга</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Танилцуулга..."
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
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm lg:col-span-2">
              <CardHeader>
                <CardTitle>Статистик</CardTitle>
                <CardDescription>Үзүүлэлтүүдийн тоог шинэчлэх</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="happyClients"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Сэтгэл хангалуун үйлчлүүлэгчид (тоогоор)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Сэтгэл хангалуун үйлчлүүлэгчид..."
                              {...field}
                              className="border-rose-200 focus:border-rose-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ажлын туршлага (жилээр)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ажлын туршлага..."
                              {...field}
                              className="border-rose-200 focus:border-rose-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
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
