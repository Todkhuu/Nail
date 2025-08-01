"use client";
import { useStaff } from "@/app/_context/StaffContext";
import { Button } from "@/components/ui/button";
import { Instagram, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  const { staff } = useStaff();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(${staff?.bgImage})`,
          }}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 via-pink-100/70 to-purple-100/80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-5xl md:text-7xl font-light text-gray-800 mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {staff?.name}
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            Маникюр артист
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            {staff?.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              <Link href={`tel:${staff?.phone}`}>Цаг захиалах</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
            >
              <Instagram className="mr-2 h-5 w-5" />
              <Link
                href={`${staff?.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram хуудсыг дагах
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
