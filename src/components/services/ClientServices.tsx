"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useService } from "@/app/_context/ServiceContext";
import { useCategory } from "@/app/_context/CategoryContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  cyrillicToLatinMap,
  latinToCyrillicMap,
  transliterate,
} from "@/lib/transliteration";
import { HeroService } from "./Hero";

export default function ClientServices() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");

  const { services, isLoading } = useService();
  const { categories } = useCategory();
  const [filteredServices, setFilteredServices] = useState(services || []);
  const [categoryTitle, setCategoryTitle] = useState("Бүх Үйлчилгээ");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const matchedCategory =
      categoryQuery === "all" || !categoryQuery
        ? null
        : categories?.find((cat) => cat._id === categoryQuery);

    setCategoryTitle(
      categoryQuery === "all" || !categoryQuery
        ? "Бүх Үйлчилгээ"
        : matchedCategory?.name || "Үйлчилгээ"
    );

    const filtered = services?.filter((service) => {
      const matchCategory =
        categoryQuery === "all" || !categoryQuery
          ? true
          : typeof service.category === "string"
          ? service.category === matchedCategory?.name
          : service.category.name === matchedCategory?.name;

      const serviceName = service.description.toLowerCase();
      const searchText = search.toLowerCase();

      const serviceLatin = transliterate(serviceName, cyrillicToLatinMap);
      const serviceCyrillic = transliterate(serviceName, latinToCyrillicMap);

      const searchLatin = transliterate(searchText, cyrillicToLatinMap);
      const searchCyrillic = transliterate(searchText, latinToCyrillicMap);

      const matchSearch =
        serviceName.includes(searchText) ||
        serviceLatin.includes(searchText) ||
        serviceCyrillic.includes(searchText) ||
        serviceName.includes(searchLatin) ||
        serviceName.includes(searchCyrillic);

      return matchCategory && matchSearch;
    });

    setFilteredServices(filtered || []);
  }, [categoryQuery, services, categories, search]);

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
    <section>
      <div>
        <HeroService
          categoryTitle={categoryTitle}
          search={search}
          setSearch={setSearch}
        />
        <div className="py-8 sm:py-14 md:py-16 min-h-screen max-w-7xl mx-auto px-4">
          {filteredServices?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 group cursor-pointer"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false }}
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
      </div>
    </section>
  );
}
