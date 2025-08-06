"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useService } from "@/app/_context/ServiceContext";
import { useCategory } from "@/app/_context/CategoryContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ClientServices() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");

  const { services, isLoading } = useService();
  const { categories } = useCategory();

  const [filteredServices, setFilteredServices] = useState(services || []);

  useEffect(() => {
    if (categoryQuery === "all" || !categoryQuery) {
      setFilteredServices(services || []);
    } else {
      const matchedCategory = categories?.find(
        (cat) => cat._id === categoryQuery
      );

      if (matchedCategory) {
        const filtered = services?.filter((service) => {
          if (typeof service.category === "string") {
            return service.category === matchedCategory.name;
          } else {
            return service.category.name === matchedCategory.name;
          }
        });

        setFilteredServices(filtered || []);
      }
    }
  }, [categoryQuery, services, categories]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-16 min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center mb-10 text-rose-700">
          Бүх Үйлчилгээ
        </h1>

        {filteredServices?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((item, index) => (
              <motion.div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white flex flex-col justify-end">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm">
                    {typeof item.category === "string"
                      ? item.category
                      : item.category.name}
                  </p>
                  <div className="flex justify-between mt-2 text-xs">
                    <p>Хугацаа: {item.duration} мин</p>
                    <p>Үнэ: {item.price}₮</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Үйлчилгээ олдсонгүй...</p>
        )}
      </div>
    </section>
  );
}
