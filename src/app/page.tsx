import {
  About,
  BeforeAfterSlider,
  Contact,
  Gallery,
  Hero,
  Navigation,
} from "@/components";

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
