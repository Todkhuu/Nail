"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useService } from "@/app/_context/ServiceContext";
import { useCategory } from "@/app/_context/CategoryContext";
import { AddDesign } from "./gallery/AddDesign";
import { AddCategory } from "./gallery/AddCategory";

interface GalleryManagerProps {
  onContentChange: () => void;
}

export function GalleryManager({ onContentChange }: GalleryManagerProps) {
  const { services } = useService();
  const { categoriess, getCategories } = useCategory();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            Галерей удирдлага
          </h1>
          <p className="text-gray-600 mt-2">
            Хумсны загварын галерей удирдах ({categoriess?.length} загвар)
          </p>
        </div>
      </div>

      <AddCategory
        categoriess={categoriess || []}
        services={services || []}
        getCategories={getCategories}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Галерейн загварын жагсаалт</CardTitle>
              <AddDesign />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services?.map((service, index) => (
                  <div
                    key={index}
                    className="border border-rose-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square mb-3 overflow-hidden rounded-lg relative">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                      {service?.feature == true && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-rose-500 text-white text-xs">
                            FEATURED
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">
                          {service.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {
                            categoriess?.find(
                              (cat) =>
                                cat._id ===
                                (typeof service.category === "string"
                                  ? service.category
                                  : service.category._id)
                            )?.name
                          }
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`flex-1 ${
                            service?.feature
                              ? "border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {service?.feature ? "Unfeature" : "Feature"}
                        </Button>
                        <Button
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {services?.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Plus className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>Загвар оруулаагүй байна</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
