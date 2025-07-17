"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Upload, Save, X } from "lucide-react";
import Image from "next/image";

interface BeforeAfter {
  id: number;
  title: string;
  before: string;
  after: string;
  description: string;
  category: string;
  duration: string;
  technique: string;
}

interface BeforeAfterEditorProps {
  onContentChange: () => void;
}

export function BeforeAfterEditor({ onContentChange }: BeforeAfterEditorProps) {
  const [transformations, setTransformations] = useState<BeforeAfter[]>([
    {
      id: 1,
      title: "French Manicure Transformation",
      before: "/images/before-after/before-1.jpg",
      after: "/images/before-after/after-1.jpg",
      description:
        "Classic French tips with gel overlay for long-lasting elegance",
      category: "French Manicure",
      duration: "45 minutes",
      technique: "Gel application with precision tip work",
    },
    {
      id: 2,
      title: "Nail Art Creation",
      before: "/images/before-after/before-2.jpg",
      after: "/images/before-after/after-2.jpg",
      description: "Hand-painted floral design with intricate detailing",
      category: "Nail Art",
      duration: "90 minutes",
      technique: "Hand-painting with fine brushes and acrylic paints",
    },
    {
      id: 3,
      title: "Gel Extension & Design",
      before: "/images/before-after/before-3.jpg",
      after: "/images/before-after/after-3.jpg",
      description: "Length extension with artistic geometric patterns",
      category: "Gel Extensions",
      duration: "120 minutes",
      technique: "Gel extension with geometric nail art overlay",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTransformation, setCurrentTransformation] =
    useState<BeforeAfter | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    before: "",
    after: "",
    description: "",
    category: "",
    duration: "",
    technique: "",
  });

  const categories = [
    { value: "french", label: "French Manicure" },
    { value: "gel", label: "Gel Extensions" },
    { value: "art", label: "Nail Art" },
    { value: "repair", label: "Nail Repair" },
    { value: "bridal", label: "Bridal" },
    { value: "seasonal", label: "Seasonal" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && currentTransformation) {
      setTransformations(
        transformations.map((item) =>
          item.id === currentTransformation.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newTransformation: BeforeAfter = {
        id: Date.now(),
        ...formData,
        before: formData.before || "/images/before-after/before-1.jpg",
        after: formData.after || "/images/before-after/after-1.jpg",
      };
      setTransformations([...transformations, newTransformation]);
    }

    resetForm();
    onContentChange();
  };

  const handleEdit = (transformation: BeforeAfter) => {
    setCurrentTransformation(transformation);
    setFormData({
      title: transformation.title,
      before: transformation.before,
      after: transformation.after,
      description: transformation.description,
      category: transformation.category,
      duration: transformation.duration,
      technique: transformation.technique,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this transformation?")) {
      setTransformations(transformations.filter((item) => item.id !== id));
      onContentChange();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      before: "",
      after: "",
      description: "",
      category: "",
      duration: "",
      technique: "",
    });
    setCurrentTransformation(null);
    setIsEditing(false);
  };

  const handleImageUpload = (
    type: "before" | "after",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [type]: imageUrl }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            Before & After Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your transformation showcase ({transformations.length}{" "}
            transformations)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {isEditing ? "Edit Transformation" : "Add New Transformation"}
              </CardTitle>
              <CardDescription>
                {isEditing
                  ? "Update the transformation details"
                  : "Add a new before & after transformation"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Transformation title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="border-rose-200 focus:border-rose-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger className="border-rose-200 focus:border-rose-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.label}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="45 minutes"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Transformation description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="border-rose-200 focus:border-rose-400"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technique">Technique</Label>
                  <Textarea
                    id="technique"
                    placeholder="Technique used for this transformation"
                    value={formData.technique}
                    onChange={(e) =>
                      setFormData({ ...formData, technique: e.target.value })
                    }
                    className="border-rose-200 focus:border-rose-400"
                    rows={2}
                  />
                </div>

                {/* Before Image */}
                <div className="space-y-2">
                  <Label>Before Image</Label>
                  {formData.before && (
                    <div className="aspect-square rounded-lg overflow-hidden border border-rose-200 mb-2">
                      <Image
                        src={formData.before || "/placeholder.svg"}
                        alt="Before preview"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
                    onClick={() =>
                      document.getElementById("before-image-upload")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Before Image
                  </Button>
                  <input
                    id="before-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload("before", e)}
                  />
                </div>

                {/* After Image */}
                <div className="space-y-2">
                  <Label>After Image</Label>
                  {formData.after && (
                    <div className="aspect-square rounded-lg overflow-hidden border border-rose-200 mb-2">
                      <Image
                        src={formData.after || "/placeholder.svg"}
                        alt="After preview"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
                    onClick={() =>
                      document.getElementById("after-image-upload")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload After Image
                  </Button>
                  <input
                    id="after-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload("after", e)}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-rose-500 hover:bg-rose-600"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Update" : "Add"} Transformation
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="border-gray-200 bg-transparent"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Transformations List */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Before & After Transformations</CardTitle>
              <CardDescription>
                Manage your transformation showcase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {transformations.map((transformation) => (
                  <div
                    key={transformation.id}
                    className="border border-rose-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Before Image */}
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-500">BEFORE</Label>
                        <div className="aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={transformation.before || "/placeholder.svg"}
                            alt="Before"
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      {/* After Image */}
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-500">AFTER</Label>
                        <div className="aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={transformation.after || "/placeholder.svg"}
                            alt="After"
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {transformation.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {transformation.duration}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-800 mb-1">
                            {transformation.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {transformation.description}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(transformation)}
                            className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(transformation.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {transformations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Plus className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>
                    No transformations yet. Add your first before & after
                    showcase!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
