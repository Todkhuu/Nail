"use client";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

type Props = {
  categoryTitle: string;
  search: string;
  setSearch: (search: string) => void;
};

export const HeroService = ({ categoryTitle, search, setSearch }: Props) => {
  const router = useRouter();
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-pink-50 to-rose-100 py-16"
    >
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center relative">
          <Button
            variant={"secondary"}
            onClick={() => router.back()}
            className="absolute top-0 left-0 md:left-10 text-rose-600 text-sm md:text-base font-medium"
          >
            <ChevronLeft />
          </Button>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-semibold mb-6 text-rose-700 text-center"
          >
            {categoryTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-[700px] text-gray-500 md:text-xl"
          >
            Таны гоо сайхан, хэв маягт нийцсэн мэргэжлийн үйлчилгээнүүдийг
            танилцуулж байна
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 w-full max-w-md"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Үйлчилгээ хайх..."
                className="w-full pl-10 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
