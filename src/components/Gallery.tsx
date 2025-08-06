"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useService } from "@/app/_context/ServiceContext";
import { useCategory } from "@/app/_context/CategoryContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { services } = useService();
  const { categories } = useCategory();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const currentCategory = categories?.find(
    (cat) => cat._id === selectedCategory
  );

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const filteredItems =
    activeCategory === "all"
      ? services || []
      : services?.filter(
          (item) =>
            (typeof item.category === "string"
              ? item.category
              : item.category.name) === activeCategory
        ) || [];

  const featuredItems = services?.filter((item) => item.feature === true) || [];

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl font-light text-gray-800 mb-4">Миний Ажил</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Френч маникюраас эхлээд нарийн хийцтэй урлагийн бүтээлүүд хүртэл
            миний бүтээлүүдтэй танилцаарай
          </p>
        </motion.div>

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
            {featuredItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={index}
                  onClick={() => handleToggle(index)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: false }}
                >
                  <Image
                    src={item?.image || "/placeholder.svg"}
                    alt={item?.title || "service image"}
                    width={400}
                    height={500}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="bg-rose-500 text-xs px-2 py-1 rounded-full inline-block mb-2">
                      ОНЦЛОХ
                    </div>
                    <h4 className="font-semibold text-lg mb-1">
                      {item?.title}
                    </h4>
                    <p className="text-sm opacity-90 capitalize">
                      {typeof item?.category === "string"
                        ? item.category
                        : item?.category?.name}
                    </p>
                  </div>

                  {/* Hover/Active overlay */}
                  <div
                    className={`absolute inset-0 bg-black/60 text-white transition-opacity duration-500 flex flex-col justify-end items-end text-center p-6 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <p className="text-sm">
                      Хугацаа: <b>{item?.duration} мин</b>
                    </p>
                    {item?.price && (
                      <p className="text-sm mt-2">
                        Үнэ: <b>{item.price}₮</b>
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
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
          {categories?.map((category, index) => {
            return (
              <Button
                key={index}
                variant={
                  activeCategory === category.name ? "default" : "outline"
                }
                onClick={() => {
                  setActiveCategory(category.name);
                  setSelectedCategory(category._id!);
                }}
                className={`rounded-full px-6 py-2 transition-all duration-300 mb-2 ${
                  activeCategory === category.name
                    ? "bg-rose-500 hover:bg-rose-600 text-white"
                    : "border-rose-200 text-rose-600 hover:bg-rose-50"
                }`}
              >
                {category.name}
              </Button>
            );
          })}
        </motion.div>

        {currentCategory && (
          <div className="mb-4 p-4 text-center">
            <p className="text-sm text-gray-600">
              {currentCategory.description}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems?.slice(0, 3).map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                onClick={() => handleToggle(index)}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false }}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className={`absolute inset-0 bg-black/60 text-white transition-opacity duration-500 flex justify-between items-end p-4 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div>
                    <h3 className="font-semibold text-[13px]">{item.title}</h3>
                    <p className="text-[13px] opacity-90 capitalize bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full inline-block">
                      {typeof item.category === "string"
                        ? item.category
                        : item.category.name}
                    </p>
                  </div>
                  <div className="mb-2 flex flex-col items-end">
                    <p className="font-light text-[10px]">
                      Хугацаа: {item.duration} мин
                    </p>
                    <p className="font-light text-[10px] ">
                      Үнэ: {item.price} ₮
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {filteredItems?.length > 3 && (
          <div className="text-center mt-6">
            <Link
              href={`/services?category=${selectedCategory || "all"}`}
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300"
            >
              Илүү үзэх
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
