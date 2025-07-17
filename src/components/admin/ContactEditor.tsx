"use client";

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
import { Eye, Save, Phone, Instagram, Clock, MapPin } from "lucide-react";

interface ContactEditorProps {
  onContentChange: () => void;
}

export function ContactEditor({ onContentChange }: ContactEditorProps) {
  const [contactData, setContactData] = useState({
    phone: "(555) 123-4567",
    instagram: "@elenarose_nails",
    instagramUrl: "https://instagram.com/elenarose_nails",
    address: "123 Beauty Lane\nDowntown, NY 10001",
    hours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "Closed",
    },
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
    onContentChange();
  };

  const handleHoursChange = (day: string, value: string) => {
    setContactData((prev) => ({
      ...prev,
      hours: { ...prev.hours, [day]: value },
    }));
    onContentChange();
  };

  const handleSave = () => {
    alert("Contact information saved successfully!");
  };

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            Contact Information Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your contact details and business hours
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Instagram */}
              <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Instagram</h3>
                <p className="text-gray-600 mb-4">{contactData.instagram}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
                >
                  Follow Me
                </Button>
              </div>

              {/* Phone */}
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600 mb-4">{contactData.phone}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                >
                  Call Now
                </Button>
              </div>

              {/* Hours */}
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-rose-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Hours</h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>Mon-Fri: {contactData.hours.monday}</p>
                  <p>Sat: {contactData.hours.saturday}</p>
                  <p>Sun: {contactData.hours.sunday}</p>
                </div>
              </div>

              {/* Location */}
              <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                <p className="text-gray-600 mb-4 text-sm whitespace-pre-line">
                  {contactData.address}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Details */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>Update your contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={contactData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border-rose-200 focus:border-rose-400"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input
                  id="instagram"
                  value={contactData.instagram}
                  onChange={(e) =>
                    handleInputChange("instagram", e.target.value)
                  }
                  className="border-rose-200 focus:border-rose-400"
                  placeholder="@yourusername"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram-url">Instagram URL</Label>
                <Input
                  id="instagram-url"
                  value={contactData.instagramUrl}
                  onChange={(e) =>
                    handleInputChange("instagramUrl", e.target.value)
                  }
                  className="border-rose-200 focus:border-rose-400"
                  placeholder="https://instagram.com/yourusername"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <textarea
                  id="address"
                  value={contactData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-3 py-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                  rows={3}
                  placeholder="123 Beauty Lane&#10;Downtown, NY 10001"
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                Set your working hours for each day
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {days.map((day) => (
                <div key={day.key} className="flex items-center space-x-4">
                  <Label className="w-20 text-sm font-medium">
                    {day.label}
                  </Label>
                  <Input
                    value={
                      contactData.hours[
                        day.key as keyof typeof contactData.hours
                      ]
                    }
                    onChange={(e) => handleHoursChange(day.key, e.target.value)}
                    className="flex-1 border-rose-200 focus:border-rose-400"
                    placeholder="9:00 AM - 5:00 PM or Closed"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
