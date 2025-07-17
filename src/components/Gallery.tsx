"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useService } from "@/app/_context/ServiceContext";

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { services } = useService();

  const filteredItems =
    activeCategory === "all"
      ? services
      : services?.filter((item) => item.category.name === activeCategory);

  const featuredItems = [services?.find((item) => item.feature === true)];

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-800 mb-4">Миний Ажил</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Френч маникюраас эхлээд нарийн хийцтэй урлагийн бүтээлүүд хүртэл
            миний бүтээлүүдтэй танилцаарай
          </p>
        </div>

        {/* Featured Designs Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light text-gray-700 mb-2">
              Онцлох Загварууд
            </h3>
            <p className="text-gray-500">
              Хамгийн их хандалттай, трэнд болсон хумсны хийцүүд
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredItems.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              >
                <Image
                  src={item?.image || "/placeholder.svg"}
                  alt={"item?.title"}
                  width={400}
                  height={500}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="bg-rose-500 text-xs px-2 py-1 rounded-full inline-block mb-2">
                    ОНЦЛОХ
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{item?.title}</h4>
                  <p className="text-sm opacity-90 capitalize">
                    {typeof item?.category === "string"
                      ? item.category
                      : item?.category?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-6 py-2 transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-rose-500 hover:bg-rose-600 text-white"
                : "border-rose-200 text-rose-600 hover:bg-rose-50"
            }`}
          >
            Бүх ажил
          </Button>
          {services?.map((service, index) => (
            <Button
              key={index}
              variant={
                activeCategory === service.category.name ? "default" : "outline"
              }
              onClick={() => setActiveCategory(service.category.name)}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeCategory === service.category.name
                  ? "bg-rose-500 hover:bg-rose-600 text-white"
                  : "border-rose-200 text-rose-600 hover:bg-rose-50"
              }`}
            >
              {service.category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems?.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm opacity-90 capitalize bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full inline-block">
                  {item.category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
