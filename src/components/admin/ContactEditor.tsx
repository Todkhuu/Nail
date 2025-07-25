"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStaff } from "@/app/_context/StaffContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useEffect, useState } from "react";

const DaysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type DayType = (typeof DaysOfWeek)[number];

// Энгийн form schema
const formSchema = z.object({
  phone: z.string().min(1, "Утасны дугаар шаардлагатай"),
  igHandle: z.string().optional(),
  instagram: z.string().optional(),
  location: z.string().min(1, "Хаяг шаардлагатай"),
});

type FormData = z.infer<typeof formSchema>;

// Өдрийн нэрийг Монгол хэл рүү хөрвүүлэх
const dayTranslations: Record<DayType, string> = {
  Monday: "Даваа",
  Tuesday: "Мягмар",
  Wednesday: "Лхагва",
  Thursday: "Пүрэв",
  Friday: "Баасан",
  Saturday: "Бямба",
  Sunday: "Ням",
};

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  day: DayType;
  slots: TimeSlot[];
}

export function ContactEditor() {
  const { staff, getStaff } = useStaff();

  // Цагийн хуваарийг тусдаа state-ээр удирдах
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    DaysOfWeek.map((day) => ({
      day,
      slots: [{ start: "", end: "" }],
    }))
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      igHandle: "",
      instagram: "",
      location: "",
    },
  });

  useEffect(() => {
    if (staff) {
      form.reset({
        phone: staff.phone || "",
        igHandle: staff.igHandle || "",
        instagram: staff.instagram || "",
        location: staff.location || "",
      });

      // Цагийн хуваарь байвал ачаалах
      if (staff.availableTimes && staff.availableTimes.length > 0) {
        setSchedule(staff.availableTimes);
      }
    }
  }, [staff, form]);

  // Цагийн өөрчлөлт (энгийн хувилбар - зөвхөн эхний slot)
  const updateTimeSlot = (
    dayIndex: number,
    slotIndex: number,
    field: "start" | "end",
    value: string
  ) => {
    const newSchedule = [...schedule];
    // Хэрэв slot байхгүй бол үүсгэх
    if (!newSchedule[dayIndex].slots[0]) {
      newSchedule[dayIndex].slots[0] = { start: "", end: "" };
    }
    newSchedule[dayIndex].slots[0][field] = value;
    setSchedule(newSchedule);
  };

  async function updateContact(values: FormData) {
    try {
      // Хоосон цагийн хуваарийг арилгах
      const filteredSchedule = schedule.map((daySchedule) => ({
        ...daySchedule,
        slots: daySchedule.slots.filter((slot) => slot.start && slot.end),
      }));

      await axios.put("/api/staff", {
        _id: staff?._id,
        ...values,
        availableTimes: filteredSchedule,
      });

      await getStaff();
      toast.success("Мэдээлэл амжилттай шинэчлэгдлээ");
    } catch (err) {
      toast.error("Шинэчлэхэд алдаа гарлаа");
      console.error(err);
    }
  }

  function onSubmit(values: FormData) {
    updateContact(values);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            Холбоо барих мэдээлэл засах
          </h1>
          <p className="text-gray-600 mt-2">
            Холбоо барих мэдээлэл болон ажлын цагийг удирдах
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Холбоо барих мэдээлэл */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Холбоо барих мэдээлэл</CardTitle>
                <CardDescription>
                  Таны холбоо барих мэдээллийг шинэчлэх
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Утасны дугаар</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-rose-200 focus:border-rose-400"
                          placeholder="99123456"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="igHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Инстаграм нэр</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-rose-200 focus:border-rose-400"
                          placeholder="@yourusername"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Инстаграм холбоос</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-rose-200 focus:border-rose-400"
                          placeholder="https://instagram.com/yourusername"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Хаяг</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-rose-200 focus:border-rose-400"
                          placeholder="Улаанбаатар хот, СБД, 1-р хороо"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Ажлын цаг */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Ажлын цаг</CardTitle>
                <CardDescription>
                  Өдөр бүрийн ажлын цагийг тохируулна уу
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {schedule.map((daySchedule, dayIndex) => (
                  <div
                    key={daySchedule.day}
                    className="flex items-center gap-4"
                  >
                    <div className="w-20">
                      <h4 className="font-semibold text-gray-700 text-sm">
                        {dayTranslations[daySchedule.day]}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="text"
                        placeholder="HH:MM"
                        value={daySchedule.slots[0]?.start || ""}
                        onChange={(e) =>
                          updateTimeSlot(dayIndex, 0, "start", e.target.value)
                        }
                        className="border-gray-300 w-20 text-center"
                      />

                      <Input
                        type="text"
                        placeholder="HH:MM"
                        value={daySchedule.slots[0]?.end || ""}
                        onChange={(e) =>
                          updateTimeSlot(dayIndex, 0, "end", e.target.value)
                        }
                        className="border-gray-300 w-20 text-center"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Хадгалж байна..." : "Хадгалах"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
