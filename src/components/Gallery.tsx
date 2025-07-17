"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const categories = [
  { id: "all", label: "Бүх ажил" },
  { id: "french", label: "Френч" },
  { id: "gel", label: "Гель" },
  { id: "art", label: "Nail Урлаг" },
  { id: "seasonal", label: "Улирлын" },
  { id: "bridal", label: "Bridal" },
];

const galleryItems = [
  {
    id: 1,
    category: "french",
    image:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1741923889/h0hsrvkhkge69no20sck.webp",
    title: "Сонгодог Френч Хумс",
    description: "Цагаан үзүүртэй, ямар ч үед тохиромжтой nude суурь",
  },
  {
    id: 5,
    category: "gel",
    image:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1741923695/sbxpdq00totbd92oshrc.webp",
    title: "Nude Гель Лак",
    description: "Өдөр тутмын хэрэгцээнд тохирсон байгалийн өнгө",
  },
  {
    id: 9,
    category: "art",
    image:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1741923540/lwbpduwbxll4crbhepp4.webp",
    title: "Hand-Painted Florals",
    description: "Романтик уур амьсгалтай нарийн хийцтэй цэцгэн зураг",
  },
  {
    id: 15,
    category: "seasonal",
    image:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1741924122/nxfeh5dzqn4u8ggz3fz7.avif",
    title: "Winter Wonderland",
    description: "Цасан ширхэг, сэрүүн өнгө бүхий баярын загварууд",
  },
  {
    id: 17,
    category: "bridal",
    image:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1741924022/roulnisicgpuipeiw7x1.avif",
    title: "Bridal Elegance",
    description: "Нарийн гялалзсан эффект ба сувдтай хуримын хийц",
  },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<
    (typeof galleryItems)[0] | null
  >(null);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const featuredItems = [
    galleryItems.find((item) => item.category === "french") || galleryItems[0],
    galleryItems.find((item) => item.category === "art") || galleryItems[1],
    galleryItems.find((item) => item.category === "gel") || galleryItems[2],
  ];

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
            {featuredItems.map((item) => (
              <div
                key={`featured-${item.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                onClick={() => setLightboxImage(item)}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={500}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="bg-rose-500 text-xs px-2 py-1 rounded-full inline-block mb-2">
                    ОНЦЛОХ
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm opacity-90 capitalize">
                    {item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-rose-500 hover:bg-rose-600 text-white"
                  : "border-rose-200 text-rose-600 hover:bg-rose-50"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => setLightboxImage(item)}
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
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-rose-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <Image
                src={lightboxImage.image || "/placeholder.svg"}
                alt={lightboxImage.title}
                width={800}
                height={800}
                className="object-contain max-h-[80vh] rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
                <h3 className="text-xl font-semibold mb-2">
                  {lightboxImage.title}
                </h3>
                <p className="text-sm opacity-90 mb-2">
                  {lightboxImage.description}
                </p>
                <span className="text-xs bg-rose-500 px-2 py-1 rounded-full capitalize">
                  {lightboxImage.category}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
