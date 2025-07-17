"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const beforeAfterData = [
  {
    id: 1,
    title: "Франц Маникюр Өөрчлөлт",
    before:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1745402705/Download_Single_continuous_line_drawing_like_a_princess__Side_view_photo_of_young_relaxed_woman_washing_hair_in_hair_salon._Hair_style_beauty_concept_1_ia8vye.jpg",
    after:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1752784658/BF027514-7FF0-4183-9090-1213D7C829DE_d23apg.jpg",
    description:
      "Гел суурьтай классик Франц маникюр — удаан тогтоцтой, дэгжин загвар",
    category: "Франц Маникюр",
    duration: "45 минут",
    technique: "Гел будаг, үзүүрийг нарийн тэгшлэх техник",
  },
  {
    id: 2,
    title: "Урлагийн Маникюр",
    before:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1745402940/Download_Single_continuous_line_drawing_confident_young_woman_is_looking_at_her_reflection__Glowing_beauty_with_new_hairstyle_at_salon._Hair_style_concept_afuzoo.jpg",
    after:
      "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1741924022/roulnisicgpuipeiw7x1.avif",
    description:
      "Цэцгэн хийцтэй, гараар зурсан хумсны урлаг — нарийн хийц, гоёлын мэдрэмжтэй",
    category: "Nail Art (Хумсны урлаг)",
    duration: "90 минут",
    technique: "Нарийн бийр, акрил будаг ашиглан гараар зурсан дизайн",
  },
];

export function BeforeAfterSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterData.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + beforeAfterData.length) % beforeAfterData.length
    );
    setSliderPosition(50);
  };

  const currentItem = beforeAfterData[currentIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const updatePosition = (clientX: number) => {
      const newPosition = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    };

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    updatePosition(e.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const updatePosition = (clientX: number) => {
      const newPosition = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    updatePosition(e.touches[0].clientX);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-800 mb-4">
            Өмнө & Дараа
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Энгийн хумсаас мэргэжлийн, гайхамшигт загвар хүртэл хэрхэн
            өөрчлөгдөж байгааг үзээрэй
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Image Comparison Container */}
            <div
              className="relative aspect-[16/10] overflow-hidden cursor-ew-resize select-none"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <Image
                  src={currentItem.before || "/placeholder.svg"}
                  alt={`Before - ${currentItem.title}`}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* After Image with Clip Path */}
              <div
                className="absolute inset-0 overflow-hidden transition-all duration-100"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={currentItem.after || "/placeholder.svg"}
                  alt={`After - ${currentItem.title}`}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Slider Handle */}
              <div
                className={`absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 flex items-center justify-center transition-all duration-100 ${
                  isDragging ? "cursor-grabbing" : "cursor-ew-resize"
                }`}
                style={{
                  left: `${sliderPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2">
                  <div className="flex space-x-0.5">
                    <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
                    <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Before/After Labels */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                ӨМНӨ
              </div>
              <div className="absolute top-4 right-4 bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                ДАРАА
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                className="absolute z-10 left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                className="absolute z-10 right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
                      {currentItem.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      • {currentItem.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {currentItem.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {currentItem.description}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Ашигласан техник:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {currentItem.technique}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Progress Indicator */}
                  <div className="flex justify-end w-[100%]">
                    <span className="text-sm text-rose-600">
                      {Math.round(sliderPosition)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full transition-all duration-100"
                      style={{ width: `${sliderPosition}%` }}
                    />
                  </div>

                  {/* Instructions */}
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <p className="text-sm text-rose-700">
                      <strong>💡 Зөвлөмж:</strong> Зураг дээр дарж эсвэл
                      слайдерийг чирж өмнөх ба дараах ялгааг хараарай!
                    </p>
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-3 mt-8">
                {beforeAfterData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSliderPosition(50);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-rose-500 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-light text-gray-800 mb-4">
            Та өөрчлөлтөд бэлэн үү?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Хувийн арчилгаа болон урлагийн нарийн хийцтэй, мэргэжлийн үйлчилгээг
            мэдэр!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Link href="tel:+976-9549-7021">Цаг захиалах</Link>
            </Button>
            <Button
              variant="outline"
              className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 rounded-full bg-transparent"
            >
              Бүтэн Галерейг Харах
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
