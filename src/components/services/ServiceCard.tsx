"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ServiceType } from "@/app/utils/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ServiceCard({ item }: { item: ServiceType }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 group cursor-pointer"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white flex flex-col justify-end">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm">
              {typeof item.category === "string"
                ? item.category
                : item.category.name}
            </p>
            <div className="flex justify-between mt-2 text-xs">
              <p>Хугацаа: {item.duration} мин</p>
              <p>Үнэ: {item.price}₮</p>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="w-full p-0 rounded-3xl shadow-2xl bg-white overflow-hidden border-none mx-1">
        <div className="w-full h-72 md:h-96 relative">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="px-4 md:px-4 space-y-2 text-gray-800">
          <div className="flex flex-col">
            <div className="text-[18px] text-left md:text-[20px] font-bold text-rose-500">
              {item.title}
            </div>
            <div className="text-[14px] text-left text-gray-500 md:text-base font-semibold ">
              {typeof item.category === "string"
                ? item.category
                : item.category.name}
            </div>
          </div>

          <div className="grid grid-cols-2 text-gray-700 text-sm md:text-base">
            <div className="flex items-center gap-1">
              <p className="text-gray-400 font-light text-[10px] md:text-sm">
                Хугацаа:
              </p>
              <p className="font-medium text-[11px] md:text-[15px]">
                {item.duration} мин
              </p>
            </div>
            <div className="flex items-center gap-1">
              <h4 className="text-gray-400 font-light text-[10px] md:text-sm">
                Үнэ:
              </h4>
              <p className="font-medium text-[11px] md:text-[15px] text-rose-600">
                {item.price}₮
              </p>
            </div>
          </div>
        </div>
        <DialogTitle></DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
