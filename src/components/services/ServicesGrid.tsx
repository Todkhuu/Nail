"use client";
import { ServiceType } from "@/app/utils/types";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

export default function ServicesGrid({
  services,
}: {
  services: ServiceType[];
}) {
  return (
    <div className="py-8 sm:py-14 md:py-16 min-h-screen max-w-7xl mx-auto px-4">
      {services?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((item, index) => (
            <ServiceCard key={index} item={item} />
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-600">Үйлчилгээ олдсонгүй...</p>
      )}
    </div>
  );
}
