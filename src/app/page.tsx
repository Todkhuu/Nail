"use client";
import {
  About,
  BeforeAfterSlider,
  Contact,
  Gallery,
  Hero,
  Navigation,
} from "@/components";
import { useStaff } from "./_context/StaffContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isLoading } = useStaff();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
        </motion.div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Navigation />
      <Hero />
      <About />
      <BeforeAfterSlider />
      <Gallery />
      <Contact />
    </main>
  );
}
