"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles, Shield, Leaf, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/ui/SubpageHero";
import ContactBanner from "@/components/sections/ContactBanner";
import { ATELIER_TEAM, KPI_METRICS } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function AboutUsPage() {
  const { lang } = useLanguage();
  const { isLight } = useTheme();

  const pillars = [
    {
      num: "01",
      icon: Compass,
      title: lang === "en" ? "Radical Materiality" : "Kejujuran Materialitas",
      desc:
        lang === "en"
          ? "We reject synthetic facades. Every surface is sculpted from honest natural stone, board-formed architectural concrete, and hand-patinated bronze that ages with dignified patina."
          : "Kami menolak material sintetis buatan. Setiap bidang dipahat dari batu alam murni, beton arsitektural cetak papan, dan perunggu tempa tangan yang menua dengan anggun.",
    },
    {
      num: "02",
      icon: Shield,
      title: lang === "en" ? "Monolithic Volumes" : "Volume Monolitik Kuat",
      desc:
        lang === "en"
          ? "Daring structural post-tensioned cantilevers and massive geometric masses create poetic dialogues between light, shadow, and negative atmospheric space."
          : "Struktur kantilever pasca-tarik yang berani dan massa geometris masif menciptakan dialog puitis antara cahaya alami, bayangan dramatis, dan ruang lapang.",
    },
    {
      num: "03",
      icon: Leaf,
      title: lang === "en" ? "Sustainable Longevity" : "Keberlanjutan Abadi",
      desc:
        lang === "en"
          ? "Engineered for centuries, not decades. Integrated geothermal temperature exchange, deep solar overhangs, and biophilic courtyards establish net-zero resilience."
          : "Dirancang bertahan selama berabad-abad. Integrasi pertukaran suhu geotermal, teritisan penahan surya, dan pelataran biofilik menjamin ketahanan masa depan.",
    },
  ];

  const milestones = [
    {
      year: "2014",
      title: lang === "en" ? "Atelier Founded in Zurich" : "Pendirian Atelier di Zurich",
      location: "Zurich, Switzerland",
      desc:
        lang === "en"
          ? "Established by James Sander following ETH Zurich doctoral research into monolithic stone cantilevers."
          : "Didirikan oleh James Sander menyusul riset doktoral ETH Zurich tentang kantilever batu monolitik.",
    },
    {
      year: "2018",
      title: lang === "en" ? "Expansion to Middle East" : "Ekspansi ke Timur Tengah",
      location: "DIFC, Dubai",
      desc:
        lang === "en"
          ? "Completed inaugural private island villa on Palm Jumeirah, winning the Arabian Property Architecture Award."
          : "Menyelesaikan vila pulau privat perdana di Palm Jumeirah dan memenangkan penghargaan arsitektur bergengsi.",
    },
    {
      year: "2021",
      title: lang === "en" ? "Pritzker Honor Nomination" : "Nominasi Kehormatan Pritzker",
      location: "Geneva / Basel",
      desc:
        lang === "en"
          ? "Celebrated for alpine cliff dwelling Seraphina Villa, cited for zero-excavation hillside integration."
          : "Diakui secara internasional atas vila tebing Alpen Seraphina dengan teknologi integrasi lereng ramah lingkungan.",
    },
    {
      year: "2024",
      title: lang === "en" ? "Southeast Asia Desks Opened" : "Pembukaan Kantor Asia Tenggara",
      location: "Singapore & Jakarta",
      desc:
        lang === "en"
          ? "Inaugurated dedicated private client lounges in Marina Bay Singapore and SCBD Jakarta."
          : "Meresmikan lounge konsultasi privat di Marina Bay Singapura dan SCBD Jakarta.",
    },
  ];

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isLight ? "bg-architect-light text-neutral-900" : "bg-architect-dark text-white"
      }`}
    >
      <Navbar />

      <main className="w-full">
        {/* Subpage Hero (Matching Landing Page Hero Form) */}
        <SubpageHero
          darkImage="/images/about.webp"
          lightImage="/images/hero-light.webp"
          subheadEn="ATELIER MANIFESTO & ORIGINS"
          subheadId="MANIFESTO & SEJARAH ATELIER"
          titlePrimary="DENN"
          titleSecondary="ATELIER"
          taglineEn="ARCHITECTURAL PURITY & MONOLITHIC SPACES"
          taglineId="KEMURNIAN ARSITEKTUR & RUANG MONOLITIK"
          descriptionEn="Born in Zurich and practiced globally, Denn House sculpts monumental residential sanctuaries defined by structural daring, honest materiality, and generational permanence."
          descriptionId="Lahir di Zurich dan berkarya di panggung dunia, Denn House merancang suaka hunian monumental yang didefinisikan oleh keberanian struktural dan keanggunan abadi lintas generasi."
          metricNumber="10+"
          metricLabelEn="Years of continuous spatial innovation & Pritzker-cited commissions."
          metricLabelId="Tahun inovasi spasial berkelanjutan & karya berstandar dunia."
          ctaTextEn="EXPLORE MANIFESTO"
          ctaTextId="JELAJAHI MANIFESTO"
          ctaHref="#manifesto"
          breadcrumbs={[
            {
              labelEn: "About Us",
              labelId: "Tentang Kami",
            },
          ]}
        />

        {/* Narrative & Founder Vision Section */}
        <section id="manifesto" className="py-20 sm:py-28 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Visual */}
            <div className="lg:col-span-6 relative">
              <div
                className={`relative aspect-[4/5] rounded-3xl overflow-hidden border shadow-2xl ${
                  isLight ? "border-neutral-200 bg-neutral-100" : "border-neutral-800 bg-neutral-900"
                }`}
              >
                <Image
                  src="/images/about.webp"
                  alt="Denn House Architectural Atelier"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                {/* Floating Quote Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 space-y-2 text-white">
                  <p className="font-serif italic text-sm sm:text-base text-neutral-200">
                    {lang === "en"
                      ? '"We do not build to decorate the landscape; we sculpt the mass until the landscape feels complete."'
                      : '"Kami tidak membangun untuk menghias lanskap; kami memahat massa hingga lanskap tersebut terasa utuh."'}
                  </p>
                  <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                    — JAMES SANDER, FOUNDING PRINCIPAL
                  </div>
                </div>
              </div>

              {/* Decorative Accent Card */}
              <div
                className={`absolute -top-6 -right-6 hidden sm:block p-4 rounded-2xl backdrop-blur-md border shadow-xl ${
                  isLight
                    ? "bg-white/90 border-neutral-200 text-neutral-900"
                    : "bg-neutral-900/90 border-white/10 text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-500 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase font-mono">SWISS SIA CERTIFIED</div>
                    <div className={`text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                      ETH Zurich Architectural Standard
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Architectural Narrative */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                  {lang === "en" ? "GENESIS & DISCIPLINE" : "SEJARAH & DISIPLIN"}
                </span>
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  {lang === "en" ? "SCULPTED FOR GENERATIONS" : "DIPAHAT UNTUK LINTAS GENERASI"}
                </h2>
              </div>

              <div
                className={`space-y-4 text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-neutral-700" : "text-neutral-300"
                }`}
              >
                <p>
                  {lang === "en"
                    ? "Founded by James Sander, Denn House emerged from a radical philosophical refusal of commercial luxury trends. Where others apply ephemeral surface ornament, our atelier treats architecture as geological intervention."
                    : "Didirikan oleh James Sander, Denn House lahir dari penolakan terhadap tren kemewahan komersial yang instan. Ketika pihak lain mengandalkan ornamen luaran, atelier kami memandang arsitektur sebagai intervensi geologis yang kokoh."}
                </p>
                <p>
                  {lang === "en"
                    ? "Every residence begins with deep study of solar trajectories, indigenous geology, and structural limits. By uniting Swiss engineering tolerances with raw tactile materiality, our monolithic homes are designed to outlast modern civilization."
                    : "Setiap hunian diawali dari telaah mendalam atas lintasan matahari, geologi setempat, dan batas kemampuan struktur. Menyatukan presisi rekayasa Swiss dengan kejujuran material alam, hunian kami dirancang abadi melintasi zaman."}
                </p>
              </div>

              {/* KPI Grid */}
              <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${isLight ? "border-neutral-200" : "border-neutral-800"}`}>
                {KPI_METRICS.slice(0, 4).map((kpi, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className={`text-2xl sm:text-3xl font-black font-mono ${isLight ? "text-neutral-900" : "text-white"}`}>
                      {kpi.value}
                    </div>
                    <div className={`text-xs ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                      {lang === "en" ? kpi.label : kpi.labelId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Design Pillars */}
        <section
          className={`py-20 sm:py-28 border-y transition-colors duration-500 ${
            isLight
              ? "bg-neutral-100/80 border-neutral-200"
              : "bg-[#0E0E0E]/80 border-neutral-900"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                {lang === "en" ? "CORE TENETS" : "PILAR UTAMA"}
              </span>
              <h2
                className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {lang === "en" ? "THE THREE PILLARS" : "TIGA PILAR DESAIN"}
              </h2>
              <p className={`text-xs sm:text-sm ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                {lang === "en"
                  ? "Every blueprint, cantilever calculation, and stone slab selection adheres to our inviolable tri-pillar doctrine."
                  : "Setiap denah, perhitungan kantilever, dan seleksi batu alam mengacu teguh pada doktrin tiga pilar kami."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className={`p-8 rounded-3xl border transition-all duration-300 space-y-5 flex flex-col justify-between shadow-lg ${
                      isLight
                        ? "bg-white border-neutral-200 hover:border-neutral-300"
                        : "bg-[#141414] border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-amber-500 border ${
                            isLight
                              ? "bg-amber-50 border-amber-200/50"
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span
                          className={`text-xl font-black font-mono ${
                            isLight ? "text-neutral-300" : "text-neutral-700"
                          }`}
                        >
                          {pillar.num}
                        </span>
                      </div>

                      <h3
                        className={`text-xl font-bold uppercase tracking-tight ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        {pillar.title}
                      </h3>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        {pillar.desc}
                      </p>
                    </div>

                    <div
                      className={`pt-4 border-t text-[10px] font-mono uppercase tracking-widest ${
                        isLight
                          ? "border-neutral-100 text-neutral-400"
                          : "border-neutral-800/60 text-neutral-500"
                      }`}
                    >
                      DENN ARCHITECTURAL STANDARD
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The Atelier Leadership Team */}
        <section className="py-20 sm:py-28 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                {lang === "en" ? "HUMAN MASTERY" : "KUALITAS TALENTA"}
              </span>
              <h2
                className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {lang === "en" ? "ATELIER PRINCIPALS" : "PIMPINAN ATELIER"}
              </h2>
            </div>
            <p className={`text-xs sm:text-sm max-w-md ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
              {lang === "en"
                ? "Led by award-winning Swiss structural engineers, interior classicists, and sustainability scientists."
                : "Dipimpin oleh insinyur struktur Swiss berprestasi, pakar interior klasik, dan ilmuwan arsitektur berkelanjutan."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ATELIER_TEAM.map((member, i) => (
              <div
                key={i}
                className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-lg ${
                  isLight
                    ? "bg-white border-neutral-200 hover:border-neutral-300"
                    : "bg-[#111111] border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white uppercase">
                    {member.credentials}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3
                      className={`text-lg font-bold uppercase tracking-tight ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-amber-500 uppercase">
                      {lang === "en" ? member.role : member.roleId}
                    </p>
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      isLight ? "text-neutral-600" : "text-neutral-400"
                    }`}
                  >
                    {lang === "en" ? member.bio.en : member.bio.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Milestones Timeline */}
        <section
          className={`py-20 sm:py-28 border-t transition-colors duration-500 ${
            isLight
              ? "bg-neutral-100/50 border-neutral-200"
              : "bg-[#0A0A0A] border-neutral-900"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                {lang === "en" ? "CHRONICLES" : "LINIMASA"}
              </span>
              <h2
                className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {lang === "en" ? "DECADE OF MASTERY" : "SATU DEKADE MAESTRO"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 space-y-4 relative ${
                    isLight
                      ? "bg-white border-neutral-200 shadow-md"
                      : "bg-[#111111] border-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-amber-500">
                      {m.year}
                    </span>
                    <span className={`text-[10px] font-mono ${isLight ? "text-neutral-400" : "text-neutral-500"}`}>
                      CHRONO 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-bold uppercase tracking-tight ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      {m.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">{m.location}</p>
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      isLight ? "text-neutral-600" : "text-neutral-400"
                    }`}
                  >
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Twilight Vision & Contact CTA Banner */}
        <ContactBanner />
      </main>

      <Footer />
    </div>
  );
}
