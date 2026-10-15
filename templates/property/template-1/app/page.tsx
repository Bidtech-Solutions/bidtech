"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Craftsmanship from "@/components/sections/Craftsmanship";
import AboutUs from "@/components/sections/AboutUs";
import SignatureProps from "@/components/sections/SignatureProps";
import GlobalLocations from "@/components/sections/GlobalLocations";
import ContactBanner from "@/components/sections/ContactBanner";
import Footer from "@/components/layout/Footer";
import BlueprintModal from "@/components/ui/BlueprintModal";
import Toast from "@/components/ui/Toast";
import { type PropertyItem } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme, isLight } = useTheme();
  const [blueprintOpen, setBlueprintOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);
  const [toast, setToast] = useState<{
    isOpen: boolean;
    message: string;
    subMessage?: string;
  }>({
    isOpen: false,
    message: "",
    subMessage: "",
  });

  const handleOpenBlueprint = (prop?: PropertyItem) => {
    setSelectedProperty(prop || null);
    setBlueprintOpen(true);
  };

  const handleCloseBlueprint = () => {
    setBlueprintOpen(false);
  };

  const handleRequestDossier = () => {
    setBlueprintOpen(false);
    setToast({
      isOpen: true,
      message:
        lang === "en"
          ? "Architectural Dossier generated. Dispatched to your private portal."
          : "Dossier Arsitektur berhasil dibuat. Diteruskan ke portal privat Anda.",
      subMessage:
        lang === "en"
          ? "Confidential spatial documentation and technical drawings transmission initiated."
          : "Dokumen teknis dan denah arsitektur rahasia sedang dalam proses pengiriman.",
    });
  };

  const handleTriggerToast = (message: string, subMessage?: string) => {
    setToast({
      isOpen: true,
      message,
      subMessage,
    });
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isLight ? "bg-architect-light text-[#0A0A0A]" : "bg-architect-dark text-white"
      } selection:bg-amber-400 selection:text-black`}
    >
      {/* 1. Header & Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        heroTheme={theme}
        onToggleHeroTheme={toggleTheme}
        hideNav={blueprintOpen}
      />

      <main className="w-full">
        {/* 2. Hero Section */}
        <Hero
          lang={lang}
          onOpenBlueprint={() => handleOpenBlueprint()}
          heroTheme={theme}
          onToggleHeroTheme={toggleTheme}
        />

        {/* 3. Brand Philosophy & Organic Pebble Collage Section */}
        <Philosophy lang={lang} />

        {/* 4. Craftsmanship Gallery Section */}
        <Craftsmanship
          lang={lang}
          onOpenBlueprint={() => handleOpenBlueprint()}
        />

        {/* 5. About Us / Architecture Feature (Split Screen) */}
        <AboutUs lang={lang} />

        {/* 6. Properties Showcase Section (Dark Mode Canvas) */}
        <SignatureProps
          lang={lang}
          onOpenPropertyModal={(prop) => handleOpenBlueprint(prop)}
        />

        {/* 7. Interactive Locations / Global Presence Section */}
        <GlobalLocations lang={lang} />

        {/* 8. Contact / Vision CTA Twilight Banner */}
        <ContactBanner
          lang={lang}
          onTriggerToast={handleTriggerToast}
        />
      </main>

      {/* 9. Comprehensive Swiss Grid Footer */}
      <Footer lang={lang} />

      {/* Floorplan & Architectural Blueprint Modal */}
      <BlueprintModal
        isOpen={blueprintOpen}
        property={selectedProperty}
        onClose={handleCloseBlueprint}
        onRequestDossier={handleRequestDossier}
        lang={lang}
      />

      {/* Alert Notification Toast */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        subMessage={toast.subMessage}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
