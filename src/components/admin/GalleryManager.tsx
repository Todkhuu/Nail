"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Upload, Save, X } from "lucide-react";
import Image from "next/image";

interface Design {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  featured: boolean;
}

interface GalleryManagerProps {
  onContentChange: () => void;
}

export function GalleryManager({ onContentChange }: GalleryManagerProps) {
  const [designs, setDesigns] = useState<Design[]>([
    {
      id: 1,
      title: "Classic French Tips",
      category: "french",
      image: "/images/nails/french-classic.jpg",
      description:
        "Timeless white tips with nude base - perfect for any occasion",
      featured: true,
    },
    {
      id: 2,
      title: "Hand-Painted Florals",
      category: "art",
      image: "/images/nails/art-floral.jpg",
      description:
        "Delicate floral designs painted by hand for a romantic touch",
      featured: true,
    },
    {
      id: 3,
      title: "Nude Gel Polish",
      category: "gel",
      image: "/images/nails/gel-nude.jpg",
      description:
        "Natural nude gel for a polished, professional everyday look",
      featured: true,
    },
    {
      id: 4,
      title: "Modern French Twist",
      category: "french",
      image: "/images/nails/french-modern.jpg",
      description:
        "Contemporary take on French manicure with subtle color variations",
      featured: false,
    },
    {
      id: 5,
      title: "Geometric Patterns",
      category: "art",
      image: "/images/nails/art-geometric.jpg",
      description: "Modern geometric designs with clean lines and bold shapes",
      featured: false,
    },
    {
      id: 6,
      title: "Soft Pink Gel",
      category: "gel",
      image: "/images/nails/gel-pink.jpg",
      description:
        "Delicate pink gel manicure with long-lasting shine and durability",
      featured: false,
    },
    {
      id: 7,
      title: "Bridal Elegance",
      category: "bridal",
      image: "/images/nails/bridal-elegant.jpg",
      description: "Sophisticated bridal nails with subtle shimmer and pearls",
      featured: false,
    },
    {
      id: 8,
      title: "Winter Wonderland",
      category: "seasonal",
      image: "/images/nails/seasonal-winter.jpg",
      description: "Festive winter designs with snowflakes and cool tones",
      featured: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    featured: false,
  });

  const categories = [
    { value: "french", label: "French" },
    { value: "gel", label: "Gel" },
    { value: "art", label: "Nail Art" },
    { value: "seasonal", label: "Seasonal" },
    { value: "bridal", label: "Bridal" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && currentDesign) {
      setDesigns(
        designs.map((design) =>
          design.id === currentDesign.id ? { ...design, ...formData } : design
        )
      );
    } else {
      const newDesign: Design = {
        id: Date.now(),
        ...formData,
        image: formData.image || "/images/nails/french-classic.jpg",
      };
      setDesigns([...designs, newDesign]);
    }

    resetForm();
    onContentChange();
  };

  const handleEdit = (design: Design) => {
    setCurrentDesign(design);
    setFormData({
      title: design.title,
      category: design.category,
      description: design.description,
      image: design.image,
      featured: design.featured,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this design?")) {
      setDesigns(designs.filter((design) => design.id !== id));
      onContentChange();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      image: "",
      featured: false,
    });
    setCurrentDesign(null);
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const toggleFeatured = (id: number) => {
    setDesigns(
      designs.map((design) =>
        design.id === id ? { ...design, featured: !design.featured } : design
      )
    );
    onContentChange();
  };

  const getCategoryStats = () => {
    return categories.map((cat) => ({
      ...cat,
      count: designs.filter((design) => design.category === cat.value).length,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            Gallery Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your nail design portfolio ({designs.length} designs)
          </p>
        </div>
      </div>

      {/* Category Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {getCategoryStats().map((cat) => (
          <div
            key={cat.value}
            className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-rose-600">{cat.count}</div>
            <div className="text-sm text-gray-600">{cat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {isEditing ? "Edit Design" : "Add New Design"}
              </CardTitle>
              <CardDescription>
                {isEditing
                  ? "Update the design details"
                  : "Add a new nail design to your portfolio"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Design title"
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
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Design description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="border-rose-200 focus:border-rose-400"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image</Label>
                  {formData.image && (
                    <div className="aspect-square rounded-lg overflow-hidden border border-rose-200 mb-2">
                      <Image
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
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
                      document.getElementById("design-image-upload")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    id="design-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded border-rose-200"
                  />
                  <Label htmlFor="featured" className="text-sm">
                    Feature this design
                  </Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-rose-500 hover:bg-rose-600"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Update Design" : "Add Design"}
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

        {/* Designs Grid */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Portfolio Designs</CardTitle>
              <CardDescription>
                Manage your nail design portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {designs.map((design) => (
                  <div
                    key={design.id}
                    className="border border-rose-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square mb-3 overflow-hidden rounded-lg relative">
                      <Image
                        src={design.image || "/placeholder.svg"}
                        alt={design.title}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                      {design.featured && (
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
                          {design.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {
                            categories.find(
                              (cat) => cat.value === design.category
                            )?.label
                          }
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {design.description}
                      </p>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(design)}
                          className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleFeatured(design.id)}
                          className={`flex-1 ${
                            design.featured
                              ? "border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {design.featured ? "Unfeature" : "Feature"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(design.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {designs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Plus className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No designs yet. Add your first design to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
