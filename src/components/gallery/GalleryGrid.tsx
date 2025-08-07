"use client";
import { ServiceType } from "@/app/utils/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  activeCategory: string;
  services: ServiceType[] | null;
};

export const GalleryGrid = ({ activeCategory, services }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const filteredItems =
    activeCategory === "all"
      ? services || []
      : services?.filter((item) => {
          const categoryId =
            typeof item.category === "string"
              ? item.category
              : item.category._id;

          return categoryId === activeCategory;
        }) || [];
  return (
    <>
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
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
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
                  <p className="font-light text-[10px] ">Үнэ: {item.price} ₮</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {filteredItems?.length > 3 && (
        <div className="text-center mt-6">
          <Link
            href={`/services?category=${activeCategory || "all"}`}
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300"
          >
            Илүү үзэх
          </Link>
        </div>
      )}
    </>
  );
};
