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
import { LogOut } from "lucide-react";
import {
  AboutEditor,
  ContactEditor,
  GalleryManager,
  HeroEditor,
} from "@/components/admin";
import { AdminHeader } from "@/components/admin/Header";

type ActiveSection = "hero" | "about" | "gallery" | "contact";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("hero");

  const handleLogout = () => {
    window.location.href = "/admin";
  };

  const sections = [
    {
      id: "hero" as const,
      label: "Гол хэсэг",
      description: "Арын зураг, нэр, тайлбар",
    },
    {
      id: "about" as const,
      label: "Танилцуулга хэсэг",
      description: "Профайл зураг, намтар",
    },
    {
      id: "gallery" as const,
      label: "Галерей",
      description: "Хумсны загварын жагсаалт",
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
            <AdminHeader />
            <div className="flex items-center space-x-4">
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
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Удирдлагын хэсгүүд</CardTitle>
                <CardDescription>Вэбсайтaa удирдаарай</CardDescription>
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
          <div className="lg:col-span-3">
            {activeSection === "hero" && <HeroEditor />}
            {activeSection === "about" && <AboutEditor />}
            {activeSection === "gallery" && <GalleryManager />}
            {activeSection === "contact" && <ContactEditor />}
          </div>
        </div>
      </div>
    </div>
  );
}
