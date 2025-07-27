"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useService } from "@/app/_context/ServiceContext";
import { CategoryType } from "@/app/utils/types";
import { useStaff } from "@/app/_context/StaffContext";

export function BeforeAfterSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const { services } = useService();
  const { staff } = useStaff();

  const filteredServices = services?.filter(
    (item) => item.beforeImage && item.image
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredServices!.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredServices!.length) % filteredServices!.length
    );
    setSliderPosition(50);
  };

  const currentItem = filteredServices?.[currentIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const updatePosition = (clientX: number) => {
      const newPosition = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    };

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    updatePosition(e.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
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
                  src={currentItem?.beforeImage || "/placeholder.svg"}
                  alt={`Before - ${currentItem?.title}`}
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
                  src={currentItem?.image || "/placeholder.svg"}
                  alt={`After - ${currentItem?.title}`}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
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
                      {(currentItem?.category as CategoryType)?.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      • {currentItem?.duration} мин
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {currentItem?.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {currentItem?.description}
                  </p>
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
                {filteredServices?.map((_, index) => (
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
              <Link href={`tel:${staff?.phone}`}>Цаг захиалах</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
