"use client";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  categoryTitle: string;
  search: string;
  setSearch: (search: string) => void;
};

export const HeroService = ({ categoryTitle, search, setSearch }: Props) => {
  const router = useRouter();
  return (
    <section className="bg-gradient-to-br from-pink-50 to-rose-100 py-16 ">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center relative ">
          <Button
            variant={"secondary"}
            onClick={() => router.back()}
            className="absolute top-0 left-0 md:left-10 text-rose-600 text-sm md:text-base font-medium"
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-3xl font-semibold mb-6 text-rose-700 text-center">
            {categoryTitle}
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            Таны гоо сайхан, хэв маягт нийцсэн мэргэжлийн үйлчилгээнүүдийг
            танилцуулж байна
          </p>
          <div className="mt-6 w-full max-w-md">
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
          </div>
        </div>
      </div>
    </section>
  );
};
