"use client";
import { useStaff } from "@/app/_context/StaffContext";
import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  const { staff } = useStaff();

  return (
    <section id="about" className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              {staff?.image && (
                <Image
                  src={staff.image}
                  alt="Gerelee - Nail Artist"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-60" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-40" />
          </motion.div>

          {/* Текст хэсэг */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl font-light text-gray-800 mb-4">
                Гэрэлмаа
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full" />
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {staff?.biography?.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            {/* Cards хэсэг */}
            <motion.div
              className="grid grid-cols-2 gap-6 pt-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-4 bg-rose-50 rounded-lg">
                <div className="text-2xl font-bold text-rose-600">
                  {staff?.happyClients}+
                </div>
                <div className="text-sm text-gray-600">
                  Сэтгэл хангалуун үйлчлүүлэгч
                </div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">
                  {staff?.experience}+
                </div>
                <div className="text-sm text-gray-600">Жилийн туршлага</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
