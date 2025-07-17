"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Home, Save } from "lucide-react";
import Link from "next/link";
import {
  AboutEditor,
  BeforeAfterEditor,
  ContactEditor,
  GalleryManager,
  HeroEditor,
} from "@/components/admin";

type ActiveSection = "hero" | "about" | "before-after" | "gallery" | "contact";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("hero");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleLogout = () => {
    window.location.href = "/admin";
  };

  const handleSaveAll = () => {
    // In a real app, this would save all changes to a database
    setHasUnsavedChanges(false);
    alert("All changes saved successfully!");
  };

  const sections = [
    {
      id: "hero" as const,
      label: "Hero Section",
      description: "Background, name, tagline",
    },
    {
      id: "about" as const,
      label: "About Section",
      description: "Profile photo, biography",
    },
    {
      id: "before-after" as const,
      label: "Before & After",
      description: "Transformation showcase",
    },
    {
      id: "gallery" as const,
      label: "Gallery",
      description: "Manage nail designs",
    },
    {
      id: "contact" as const,
      label: "Contact Info",
      description: "Phone, Instagram, hours",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-rose-600">
                Elena Rose
              </Link>
              <Badge variant="secondary" className="bg-rose-100 text-rose-700">
                Content Management
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              {hasUnsavedChanges && (
                <Button
                  onClick={handleSaveAll}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save All Changes
                </Button>
              )}
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
                >
                  <Home className="mr-2 h-4 w-4" />
                  View Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Content Sections</CardTitle>
                <CardDescription>Manage your website content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className={`w-full justify-start text-left h-auto p-3 ${
                      activeSection === section.id
                        ? "bg-rose-500 hover:bg-rose-600 text-white"
                        : "hover:bg-rose-50 text-gray-700"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div>
                      <div className="font-medium">{section.label}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {section.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeSection === "hero" && (
              <HeroEditor onContentChange={() => setHasUnsavedChanges(true)} />
            )}
            {activeSection === "about" && (
              <AboutEditor onContentChange={() => setHasUnsavedChanges(true)} />
            )}
            {activeSection === "before-after" && (
              <BeforeAfterEditor
                onContentChange={() => setHasUnsavedChanges(true)}
              />
            )}
            {activeSection === "gallery" && (
              <GalleryManager
                onContentChange={() => setHasUnsavedChanges(true)}
              />
            )}
            {activeSection === "contact" && (
              <ContactEditor
                onContentChange={() => setHasUnsavedChanges(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
