import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Promo from "@/components/sections/Promo";
import About from "@/components/sections/About";
import Testimonial from "@/components/sections/Testimonial";
import Location from "@/components/sections/Location";
import CTA from "@/app/cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <Hero />
      <ProductGrid />
      <WhyChooseUs />
      <Promo />
      <About />
      <Testimonial />
      <Location />
      <CTA />
      <Footer />
    </main>
  );
}
