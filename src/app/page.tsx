import { About } from "@/components/About";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";

export default function Home() {
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
