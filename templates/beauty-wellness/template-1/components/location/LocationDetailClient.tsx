"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Car,
  Check,
  Clock,
  Compass,
  Dumbbell,
  Flame,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { LocationBranchDetail } from "@/data/locations";
import { trainers, trainerPositionMap } from "@/data/trainers";
import { createWhatsAppUrl } from "@/lib/whatsapp";

interface LocationDetailClientProps {
  branch: LocationBranchDetail;
  otherBranches: LocationBranchDetail[];
}

export function LocationDetailClient({ branch, otherBranches }: LocationDetailClientProps) {
  const { locale } = useLanguage();
  const isEn = locale === "en";

  // Coaches assigned to this branch
  const branchTrainers = trainers.filter((t) => branch.trainerSlugs.includes(t.slug));

  // WhatsApp URL

  const askAdminUrl = createWhatsAppUrl(
    isEn
      ? `Hello ${siteConfig.brand.name} Admin, I have a question regarding the ${branch.name} club (facilities/membership).`
      : `Halo Admin ${siteConfig.brand.name}, saya ingin bertanya mengenai fasilitas dan membership di cabang ${branch.name}.`
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="w-full max-w-full overflow-x-hidden bg-[#f4f2ee]">
        {/* Branch Hero & Header */}
        <section className="relative isolate overflow-hidden bg-[#0b0b0b] pb-12 pt-28 text-white sm:pb-16 sm:pt-36 md:pt-40">
          <div aria-hidden="true" className="pointer-events-none absolute -left-48 bottom-0 size-[420px] rounded-full bg-[var(--color-primary)]/15 blur-[150px]" />
          
          <Container className="px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <Reveal>
              <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                <Link
                  href="/lokasi"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-primary)]"
                >
                  <ArrowLeft size={14} />
                  <span>{isEn ? "All Locations" : "Semua Cabang"}</span>
                </Link>
                <span className="text-white/20">/</span>
                <span className="text-[var(--color-primary)] truncate max-w-[200px] sm:max-w-none">
                  {branch.city}
                </span>
              </div>
            </Reveal>

            {/* Title & Badges */}
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <Reveal delay={0.05}>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-[var(--color-primary)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                      {branch.city}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold text-white/80 backdrop-blur-md">
                      {isEn ? branch.highlightEn : branch.highlight}
                    </span>
                  </div>

                  <h1 className="mt-4 font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {branch.name}
                  </h1>

                  <p className="mt-4 flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-white/70 max-w-2xl">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                    <span>{branch.address}</span>
                  </p>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/80 max-w-3xl">
                    {isEn ? branch.descriptionEn : branch.description}
                  </p>
                </div>
              </Reveal>

              {/* Primary Action Button */}
              <Reveal delay={0.1}>
                <div className="flex justify-end">
                  {/* Chat Admin Button */}
                  <a
                    href={askAdminUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[var(--color-primary-hover)] hover:scale-105"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <MessageCircle size={16} />
                      <span>{isEn ? "Ask Questions? Chat Admin" : "Ada Pertanyaan? Chat Admin"}</span>
                    </span>
                    <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Main Photo & Key Metrics Bar - situated completely on the light/white background with zero overlap onto black */}
        <section className="py-8 sm:py-12 bg-[#f4f2ee]">
          <Container className="px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="overflow-hidden rounded-2xl sm:rounded-[2rem] border border-black/10 bg-white shadow-xl">
                {/* Large Main Photo */}
                <div className="relative h-64 sm:h-96 lg:h-[460px] w-full overflow-hidden bg-black">
                  <Image
                    src={branch.image}
                    alt={branch.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 1200px, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Photo floating tags */}
                  <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-6 flex flex-wrap items-center justify-between gap-3 text-white">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)] sm:text-xs">
                        {isEn ? "Exclusive Branch Facility" : "Fasilitas Eksklusif Cabang"}
                      </span>
                      <h2 className="mt-0.5 font-heading text-xl sm:text-3xl font-bold uppercase tracking-tight">
                        {branch.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/20">
                        <Clock size={14} className="text-[var(--color-primary)]" />
                        <span>{branch.hours}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4 Stats Grid Bar */}
                <div className="grid grid-cols-2 divide-y divide-black/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0 border-t border-black/10 bg-white">
                  <div className="p-4 sm:p-6 text-center">
                    <span className="block font-heading text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
                      {branch.sqm}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-black/60 uppercase tracking-wider">
                      {isEn ? "Total Club Area" : "Luas Area Gym"}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 text-center">
                    <span className="block font-heading text-2xl sm:text-3xl font-extrabold text-[#0b0b0b]">
                      {branch.racksCount}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-black/60 uppercase tracking-wider">
                      {isEn ? "Olympic Lifting" : "Platform & Rack"}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 text-center">
                    <span className="block font-heading text-lg sm:text-xl font-bold text-[#0b0b0b] truncate">
                      {branch.hours.split("(")[0]}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-black/60 uppercase tracking-wider">
                      {isEn ? "Operational Hours" : "Jam Operasional"}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 text-center">
                    <span className="block font-heading text-sm sm:text-base font-bold text-[#0b0b0b] line-clamp-1">
                      {isEn ? branch.parkingInfoEn : branch.parkingInfo}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-black/60 uppercase tracking-wider">
                      {isEn ? "Parking Facility" : "Fasilitas Parkir"}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Section: Training Zones in this branch */}
        <section className="section-space">
          <Container className="px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow={isEn ? "Branch Zones" : "Zona Latihan Cabang"}
                title={isEn ? "World-Class Training Arenas." : "Zona Latihan Tanpa Kompromi."}
                description={
                  isEn
                    ? `Explore the dedicated training environments custom-engineered at ${branch.name}.`
                    : `Jelajahi setiap sudut area latihan yang dirancang khusus di ${branch.name} untuk performa terbaik Anda.`
                }
              />
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {branch.zones.map((zone, idx) => (
                <Reveal key={zone.title} delay={idx * 0.08}>
                  <div className="group overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-xl flex flex-col h-full">
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
                      <Image
                        src={zone.image}
                        alt={zone.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute left-4 bottom-3">
                        <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] backdrop-blur-md border border-white/10">
                          {isEn ? `Zone 0${idx + 1}` : `Zona 0${idx + 1}`}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-heading text-lg font-bold uppercase text-[#0b0b0b]">
                          {isEn ? zone.titleEn : zone.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-black/70">
                          {isEn ? zone.descEn : zone.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Section: Full Amenities & Features Checklist */}
        <section className="section-space bg-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              {/* Left Column: Heading & Description */}
              <div className="lg:col-span-5">
                <Reveal>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                    <ShieldCheck size={14} />
                    <span>{isEn ? "Full Specifications" : "Kelengkapan Cabang"}</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#0b0b0b]">
                    {isEn ? "Facilities & Amenities Available Here." : "Fasilitas & Amenitas di Cabang Ini."}
                  </h2>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-black/70">
                    {isEn
                      ? "Every facility at this club meets strict international athletic standards, sanitization schedules, and member security protocols."
                      : "Seluruh sarana latihan di cabang ini memenuhi standar atletik internasional, protokol sanitasi harian, dan privasi penuh bagi para member."}
                  </p>

                  <div className="mt-8 space-y-3 rounded-2xl bg-[#f4f2ee] p-5 text-xs text-black/80">
                    <div className="flex items-center gap-2.5">
                      <Clock size={16} className="text-[var(--color-primary)] shrink-0" />
                      <div>
                        <strong className="block text-[#0b0b0b]">{isEn ? "Schedule:" : "Jam Operasional:"}</strong>
                        <span>{branch.hours}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-2 border-t border-black/10">
                      <Phone size={16} className="text-[var(--color-primary)] shrink-0" />
                      <div>
                        <strong className="block text-[#0b0b0b]">{isEn ? "Branch Hotline:" : "Kontak Cabang:"}</strong>
                        <a href={`tel:${branch.phone}`} className="hover:text-[var(--color-primary)]">
                          {branch.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-2 border-t border-black/10">
                      <Car size={16} className="text-[var(--color-primary)] shrink-0" />
                      <div>
                        <strong className="block text-[#0b0b0b]">{isEn ? "Parking:" : "Parkir:"}</strong>
                        <span>{isEn ? branch.parkingInfoEn : branch.parkingInfo}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Amenities Grid */}
              <div className="lg:col-span-7">
                <Reveal delay={0.1}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {branch.facilities.map((facility) => (
                      <div
                        key={facility}
                        className="flex items-start gap-3 rounded-xl border border-black/10 bg-[#f4f2ee] p-3.5 sm:p-4 transition-colors hover:border-[var(--color-primary)] hover:bg-white"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white mt-0.5">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-black/85 leading-snug">
                          {facility}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Nearby Landmarks */}
                  <div className="mt-8 rounded-2xl border border-black/10 p-5 bg-white">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">
                      {isEn ? "Nearby Landmarks & Access Points:" : "Patokan Lokasi & Akses Terdekat:"}
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                      {branch.nearbyLandmarks.map((lm) => (
                        <li key={lm} className="flex items-center gap-2 text-xs font-medium text-black/70">
                          <span className="size-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                          <span>{lm}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* Section: Coaches on duty at this branch */}
        {branchTrainers.length > 0 && (
          <section className="section-space bg-[#f4f2ee]">
            <Container className="px-4 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading
                  eyebrow={isEn ? "Branch Mentors" : "Pelatih di Cabang Ini"}
                  title={isEn ? "Train with Certified Head Coaches." : "Mentor Bersertifikasi di Cabang Ini."}
                  description={
                    isEn
                      ? `Our master trainers operate regularly at ${branch.name}. Book 1-on-1 private coaching sessions.`
                      : `Master coach kami bertugas mendampingi member di ${branch.name}. Anda dapat memesan sesi konsultasi dan latihan privat.`
                  }
                />
              </Reveal>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                {branchTrainers.map((coach, idx) => (
                  <Reveal key={coach.slug} delay={idx * 0.08}>
                    <article className="group overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-xl">
                      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black">
                        <Image
                          src={coach.image}
                          alt={coach.name}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          style={{ objectPosition: trainerPositionMap[coach.slug] || "center 25%" }}
                          className="object-cover grayscale-[15%] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                        
                        <div className="absolute inset-x-4 bottom-3 text-white">
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                            {coach.specialty}
                          </span>
                          <h4 className="mt-0.5 font-heading text-xl font-bold uppercase text-white">
                            {coach.name}
                          </h4>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <p className="text-xs font-semibold text-black/75">
                          {coach.role}
                        </p>
                        
                        <p className="mt-2 text-xs italic text-black/60 line-clamp-2">
                          &ldquo;{coach.quote}&rdquo;
                        </p>

                        <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                          <Link
                            href={`/trainer/${coach.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] hover:underline"
                          >
                            <span>{isEn ? "View Profile & Schedule" : "Lihat Profil & Jadwal"}</span>
                            <ArrowUpRight size={14} />
                          </Link>

                          <Link
                            href={`/trainer/${coach.slug}`}
                            className="flex size-8 items-center justify-center rounded-full bg-[#0b0b0b] text-white transition-colors group-hover:bg-[var(--color-primary)]"
                          >
                            <ArrowUpRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Section: "Ada Pertanyaan? Chat Admin Disini" / Contact & Tour Booking Box */}
        <section className="section-space bg-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-primary)]/30 bg-[#0b0b0b] p-6 sm:p-10 lg:p-14 text-white shadow-2xl">
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[var(--color-primary)]/20 blur-[100px]" />

                <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      <Sparkles size={14} />
                      <span>{isEn ? "Live Admin Support" : "Layanan Chat Admin Aktif"}</span>
                    </span>

                    <h2 className="mt-4 font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white">
                      {isEn
                        ? `Have Questions About ${branch.name}?`
                        : `Ada Pertanyaan Seputar Cabang ${branch.name}?`}
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/75 max-w-xl">
                      {isEn
                        ? "Chat directly with our club administrators. Get verified details on monthly memberships, free gym trial passes, parking guidelines, and personal trainer bookings."
                        : "Hubungi admin cabang kami langsung melalui WhatsApp. Dapatkan info paket membership, klaim sesi coba gym gratis (free trial), informasi parkir, dan konsultasi pelatih."}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/70">
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-[var(--color-primary)]" />
                        <span>{isEn ? "Fast response in < 5 mins" : "Respon cepat < 5 menit"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className="text-[var(--color-primary)]" />
                        <span>{branch.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    {/* Main WhatsApp Admin Chat */}
                    <a
                      href={askAdminUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-full bg-[var(--color-primary)] px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:bg-[var(--color-primary-hover)]"
                    >
                      <span className="flex items-center gap-2.5">
                        <MessageCircle size={18} />
                        <span>{isEn ? "Chat Admin on WhatsApp" : "Chat Admin di Sini via WhatsApp"}</span>
                      </span>
                      <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    {/* Google Maps Button */}
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
                    >
                      <span className="flex items-center gap-2.5">
                        <Compass size={17} className="text-[var(--color-primary)] group-hover:text-black" />
                        <span>{isEn ? "Open in Google Maps" : "Buka Petunjuk Arah Maps"}</span>
                      </span>
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    {/* Phone Call Button */}
                    <a
                      href={`tel:${branch.phone}`}
                      className="group flex items-center justify-between rounded-full border border-white/15 bg-black/40 px-6 py-3 text-xs font-semibold tracking-wider text-white/80 transition-all hover:border-[var(--color-primary)] hover:text-white"
                    >
                      <span className="flex items-center gap-2.5">
                        <Phone size={15} className="text-[var(--color-primary)]" />
                        <span>{isEn ? `Call Reception: ${branch.phone}` : `Telepon Resepsionis: ${branch.phone}`}</span>
                      </span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Section: Other Branches */}
        <section className="section-space bg-[#f4f2ee]">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <Reveal>
                <SectionHeading
                  eyebrow={isEn ? "Other Locations" : "Jaringan Lainnya"}
                  title={isEn ? "Explore Other IRONFORCE Clubs." : "Lihat Cabang IRONFORCE Lainnya."}
                  description={
                    isEn
                      ? "Your membership grants unrestricted access to all our locations across the city."
                      : "Satu keanggotaan IRONFORCE memberikan kebebasan berlatih di seluruh cabang kami."
                  }
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Link
                  href="/lokasi"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary)] hover:underline sm:text-sm"
                >
                  <span>{isEn ? "View All 6 Branches" : "Lihat Semua 6 Cabang"}</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherBranches.map((other, idx) => (
                <Reveal key={other.slug} delay={idx * 0.08}>
                  <article className="group overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-xl flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black">
                        <Image
                          src={other.image}
                          alt={other.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                        
                        <div className="absolute left-3.5 top-3.5">
                          <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/20">
                            {other.city}
                          </span>
                        </div>

                        <div className="absolute inset-x-4 bottom-3 text-white">
                          <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-white">
                            {other.name}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <p className="flex items-start gap-2 text-xs text-black/70">
                          <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                          <span className="line-clamp-2">{other.address}</span>
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-black/60">
                          <Clock size={13} className="text-[var(--color-primary)]" />
                          <span className="font-medium">{other.hours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0">
                      <Link
                        href={`/lokasi/${other.slug}`}
                        className="group/btn flex w-full items-center justify-between rounded-full border border-black/15 bg-[#f4f2ee] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0b0b0b] transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                      >
                        <span>{isEn ? "Branch Details" : "Detail Lokasi"}</span>
                        <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <ConversionCTA />
      </main>

      <Footer />
    </>
  );
}
