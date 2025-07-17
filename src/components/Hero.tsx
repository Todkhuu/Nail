import { Button } from "@/components/ui/button";
import { Instagram, Phone } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('https://res.cloudinary.com/ds6kxgjh0/image/upload/v1745403534/Continuous_one_line_drawing_hand_use_serum_dropper_cosmetic_products_anti-aging_for_facial_and_skin_care__Skin_care_concept_mbgjd1.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 via-pink-100/70 to-purple-100/80" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6 tracking-wide">
          Гэрэлмаа
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
          Маникюр артист
        </p>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
          Хамгийн нарийн хийцтэй, урлагийн мэдрэмжтэй маникюр бүтээлүүдийг урлаж
          байна. Франц маникюр, гел түрхлэг болон захиалгат хийцтэй хумсны
          урлалаар мэргэшсэн.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <Phone className="mr-2 h-5 w-5" />
            <Link href="tel:+976-9549-7021">Цаг захиалах</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
          >
            <Instagram className="mr-2 h-5 w-5" />
            <Link
              href=" https://www.instagram.com/_gegiinee_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram хуудсыг дагах
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
