"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useService } from "@/app/_context/ServiceContext";
import { useCategory } from "@/app/_context/CategoryContext";
import {
  cyrillicToLatinMap,
  latinToCyrillicMap,
  transliterate,
} from "@/lib/transliteration";
import { HeroService } from "./Hero";
import ServicesGrid from "./ServicesGrid";

export default function ClientServices() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");

  const { services } = useService();
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

  return (
    <section>
      <div>
        <HeroService
          categoryTitle={categoryTitle}
          search={search}
          setSearch={setSearch}
        />
        <ServicesGrid services={filteredServices} />
      </div>
    </section>
  );
}
