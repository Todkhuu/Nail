"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useCategory } from "@/app/_context/CategoryContext";
import { useState } from "react";

type Props = {
  activeCategory: string;
  setActiveCategory: (activeCategory: string) => void;
};

export const CategoryTabs = ({ activeCategory, setActiveCategory }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { categories } = useCategory();

  const currentCategory = categories?.find(
    (cat) => cat._id === selectedCategory
  );
  return (
    <>
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
              variant={activeCategory === category._id ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(category._id!);
                setSelectedCategory(category._id!);
              }}
              className={`rounded-full px-6 py-2 transition-all duration-300 mb-2 ${
                activeCategory === category._id
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
          <p className="text-sm text-gray-600">{currentCategory.description}</p>
        </div>
      )}
    </>
  );
};
