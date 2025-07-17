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
import { Upload, Eye, Save } from "lucide-react";
import Image from "next/image";

interface HeroEditorProps {
  onContentChange: () => void;
}

export function HeroEditor({ onContentChange }: HeroEditorProps) {
  const [heroData, setHeroData] = useState({
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
    artistName: "Elena Rose",
    tagline: "Professional Nail Artist",
    description:
      "Creating beautiful, artistic nail designs with precision and care. Specializing in French manicures, gel applications, and custom nail art.",
    primaryButtonText: "Book Appointment",
    secondaryButtonText: "Follow on Instagram",
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setHeroData((prev) => ({ ...prev, [field]: value }));
    onContentChange();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server and get back a URL
      const imageUrl = URL.createObjectURL(file);
      handleInputChange("backgroundImage", imageUrl);
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    alert("Hero section saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            Hero Section Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Customize your homepage hero section
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? "Edit Mode" : "Preview"}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('${heroData.backgroundImage}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 via-pink-100/70 to-purple-100/80" />
              <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6 tracking-wide">
                  {heroData.artistName}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
                  {heroData.tagline}
                </p>
                <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {heroData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full">
                    {heroData.primaryButtonText}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 rounded-full bg-transparent"
                  >
                    {heroData.secondaryButtonText}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Background Image */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Background Image</CardTitle>
              <CardDescription>
                Upload or change the hero background image
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-dashed border-rose-200">
                <Image
                  src={heroData.backgroundImage || "/placeholder.svg"}
                  alt="Hero background"
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
                  onClick={() =>
                    document.getElementById("hero-image-upload")?.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Image
                </Button>
                <input
                  id="hero-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </CardContent>
          </Card>

          {/* Text Content */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Text Content</CardTitle>
              <CardDescription>
                Edit the hero section text content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="artist-name">Artist Name</Label>
                <Input
                  id="artist-name"
                  value={heroData.artistName}
                  onChange={(e) =>
                    handleInputChange("artistName", e.target.value)
                  }
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={heroData.tagline}
                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={heroData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="border-rose-200 focus:border-rose-400"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Button Settings */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Button Settings</CardTitle>
              <CardDescription>
                Customize the call-to-action buttons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-button">Primary Button Text</Label>
                  <Input
                    id="primary-button"
                    value={heroData.primaryButtonText}
                    onChange={(e) =>
                      handleInputChange("primaryButtonText", e.target.value)
                    }
                    className="border-rose-200 focus:border-rose-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-button">
                    Secondary Button Text
                  </Label>
                  <Input
                    id="secondary-button"
                    value={heroData.secondaryButtonText}
                    onChange={(e) =>
                      handleInputChange("secondaryButtonText", e.target.value)
                    }
                    className="border-rose-200 focus:border-rose-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
