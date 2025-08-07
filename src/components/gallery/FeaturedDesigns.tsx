"use client";
import { ServiceType } from "@/app/utils/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Props = {
  services: ServiceType[] | null;
};

export const FeaturedDesigns = ({ services }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const featuredItems = services?.filter((item) => item.feature === true) || [];

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };
  return (
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
                <h4 className="font-semibold text-lg mb-1">{item?.title}</h4>
                <p className="text-sm opacity-90 capitalize">
                  {typeof item?.category === "string"
                    ? item.category
                    : item?.category?.name}
                </p>
              </div>

              {/* Hover/Active overlay */}
              <div
                className={`absolute inset-0 bg-black/60 text-white transition-opacity duration-500 flex flex-col justify-end items-end text-center p-6 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
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
  );
};
