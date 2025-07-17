"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface AboutEditorProps {
  onContentChange: () => void;
}

export function AboutEditor({ onContentChange }: AboutEditorProps) {
  const [aboutData, setAboutData] = useState({
    profileImage: "/placeholder.svg?height=500&width=500",
    biography: `With over 8 years of experience in the nail industry, I've dedicated my career to perfecting the art of nail design. My passion lies in creating unique, personalized looks that reflect each client's individual style.

I specialize in French manicures, gel applications, and intricate nail art. Every design is crafted with meticulous attention to detail, using only the highest quality products to ensure long-lasting, beautiful results.

My studio provides a relaxing, luxurious environment where you can unwind while receiving professional nail care. I believe that beautiful nails are not just an accessory, but a form of self-expression.`,
    happyClients: "500+",
    yearsExperience: "8+",
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
    onContentChange();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleInputChange("profileImage", imageUrl);
    }
  };

  const handleSave = () => {
    alert("About section saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            About Section Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile photo and biography
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
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={aboutData.profileImage || "/placeholder.svg"}
                    alt="Elena Rose - Nail Artist"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-60" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-40" />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-light text-gray-800 mb-4">
                    About Elena
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full" />
                </div>

                <div className="space-y-4 text-gray-600 leading-relaxed whitespace-pre-line">
                  {aboutData.biography}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center p-4 bg-rose-50 rounded-lg">
                    <div className="text-2xl font-bold text-rose-600">
                      {aboutData.happyClients}
                    </div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">
                      {aboutData.yearsExperience}
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Image */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>
                Upload or change your profile photo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-dashed border-rose-200 max-w-sm mx-auto">
                <Image
                  src={aboutData.profileImage || "/placeholder.svg"}
                  alt="Profile photo"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <Button
                variant="outline"
                className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
                onClick={() =>
                  document.getElementById("profile-image-upload")?.click()
                }
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Photo
              </Button>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </CardContent>
          </Card>

          {/* Biography */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Biography</CardTitle>
              <CardDescription>
                Tell your story and highlight your expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="biography">Biography Text</Label>
                <Textarea
                  id="biography"
                  value={aboutData.biography}
                  onChange={(e) =>
                    handleInputChange("biography", e.target.value)
                  }
                  className="border-rose-200 focus:border-rose-400 min-h-[300px]"
                  placeholder="Write your biography here..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Update your achievement numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="happy-clients">Happy Clients</Label>
                  <input
                    id="happy-clients"
                    type="text"
                    value={aboutData.happyClients}
                    onChange={(e) =>
                      handleInputChange("happyClients", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                    placeholder="e.g., 500+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years-experience">Years Experience</Label>
                  <input
                    id="years-experience"
                    type="text"
                    value={aboutData.yearsExperience}
                    onChange={(e) =>
                      handleInputChange("yearsExperience", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                    placeholder="e.g., 8+"
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
