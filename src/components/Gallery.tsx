"use client";
import { useState } from "react";
import { useService } from "@/app/_context/ServiceContext";
import { GalleryHero } from "./gallery/Hero";
import { FeaturedDesigns } from "./gallery/FeaturedDesigns";
import { CategoryTabs } from "./gallery/CategoryTabs";
import { GalleryGrid } from "./gallery/GalleryGrid";

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { services } = useService();

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryHero />
        <FeaturedDesigns services={services} />
        <CategoryTabs
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <GalleryGrid activeCategory={activeCategory} services={services} />
      </div>
    </section>
  );
}
