"use client";
import { useStaff } from "@/app/_context/StaffContext";
import { Button } from "@/components/ui/button";
import { Instagram, Phone, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export function Contact() {
  const { staff } = useStaff();

  function convertDayToMongolian(day: string) {
    const days: { [key: string]: string } = {
      Monday: "Дав",
      Tuesday: "Мяг",
      Wednesday: "Лха",
      Thursday: "Пүр",
      Friday: "Ба",
      Saturday: "Бям",
      Sunday: "Ням",
    };
    return days[day] || day;
  }
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-800 mb-4">Холбогдох</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Хумсаа өөрчлөхөд бэлэн үү? Цаг авахын тулд надтай холбогдоорой.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Instagram */}
          <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Instagram className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Instagram</h3>
            <p className="text-gray-600 mb-4">{staff?.igHandle}</p>
            <Button
              variant="outline"
              size="sm"
              className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
            >
              <Link
                href={`${staff?.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram хуудсыг дагах
              </Link>
            </Button>
          </div>

          {/* Phone */}
          <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Утас</h3>
            <p className="text-gray-600 mb-4">{staff?.phone}</p>
            <Button
              variant="outline"
              size="sm"
              className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
            >
              <Link href={`tel:${staff?.phone}`}>Шууд залгах</Link>
            </Button>
          </div>

          {/* Hours */}
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-rose-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Цагийн хуваарь</h3>
            <div className="text-gray-600 text-sm space-y-1">
              {staff?.availableTimes?.map((dayObj, index) => {
                const { day, slots } = dayObj;

                // Хэрэв slots хоосон бол "Амарна" гэж харуулна
                if (slots.length === 0) {
                  return (
                    <p key={index}>{convertDayToMongolian(day)}: Амарна</p>
                  );
                }

                // Эс бөгөөс slots-оос эхний цагаар харуулна (нэг өдөрт олон slot байх магадлалтай бол loop хийж болно)
                return (
                  <p key={index}>
                    {convertDayToMongolian(day)}:{" "}
                    {slots.map((slot, i) => (
                      <span key={i}>
                        {slot.start}–{slot.end}
                        {i !== slots.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Хаяг</h3>
            <p className="text-gray-600 mb-4 text-sm">{staff?.location}</p>
            <Button
              variant="outline"
              size="sm"
              className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
            >
              <Link
                href={
                  "https://www.google.com/maps/place/De+Saron+Salon+Moriton+salbar/@47.8986269,106.8977048,20.73z/data=!4m6!3m5!1s0x5d969391396b9fd3:0xf5c52d9ca016dd3f!8m2!3d47.8985684!4d106.8977293!16s%2Fg%2F11vj8__mc4?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Газрын зураг харах
              </Link>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl">
          <h3 className="text-2xl font-light text-gray-800 mb-4">
            Цаг авахыг хүсэж байна уу?
          </h3>
          <p className="text-gray-600 mb-6">
            Ур чадвар, уран хийцтэй хумсны үйлчилгээ танд зориулагдсан
          </p>
          <Button
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <Phone className="mr-2 h-5 w-5" />
            <Link href={`tel:${staff?.phone}`}> Цаг захиалах</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
