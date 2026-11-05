"use client";

import { HeroSection } from "@/components/home/sections/hero/hero-section";
import { ServicesCarouselSection } from "@/components/home/sections/services-carousel-section";
import { FeaturedSolutionsSection } from "@/components/home/sections/featured-solutions-section";
import { MitraSection } from "@/components/home/sections/mitra-section";
import { ContactSection } from "@/components/home/sections/contact-section";

export default function Home() {
  return (
    <main className="landing-shell relative overflow-hidden bg-white">
      <HeroSection />
      <ServicesCarouselSection />
      <FeaturedSolutionsSection />
      <MitraSection />
      <ContactSection />
    </main>
  );
}
