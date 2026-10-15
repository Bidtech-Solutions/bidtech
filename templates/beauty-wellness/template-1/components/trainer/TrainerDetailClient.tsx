"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Check,
  Clock,
  Dumbbell,
  Flame,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { TrainerContactForm } from "@/components/trainer/TrainerContactForm";
import { siteConfig } from "@/data/site";
import { Trainer, trainerPositionMap } from "@/data/trainers";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/context/LanguageContext";

const focusIcons = [Dumbbell, Target, Flame];

interface TrainerDetailClientProps {
  trainer: Trainer;
  otherTrainers: Trainer[];
}

const localizedTrainersEn: Record<string, {
  quote: string;
  bio: string[];
  schedule: { day: string; time: string; branch: string }[];
  idealFor: string[];
  focus: { title: string; desc: string }[];
  achievements: string[];
}> = {
  "sarah-jenkins": {
    quote: "True strength isn't just about weight on the barbell—it's how your mindset shatters self-doubt.",
    bio: [
      "Sarah Jenkins is our Head Strength & Conditioning Coach with over 9 years of competitive lifting and coaching experience. Certified by the NSCA and USA Weightlifting, she has trained hundreds of athletes ranging from powerlifting medalists to dedicated fitness enthusiasts.",
      "Her coaching philosophy centers on biomechanical precision, progressive overload, and establishing bulletproof mental toughness that carries over into all areas of life."
    ],
    schedule: [
      { day: "Monday - Wednesday", time: "06:00 - 14:00", branch: "Kemang Flagship" },
      { day: "Thursday - Friday", time: "13:00 - 21:00", branch: "Cideng" },
      { day: "Saturday", time: "08:00 - 14:00", branch: "Kemang Flagship" }
    ],
    idealFor: [
      "Powerlifting & competitive strength athletes",
      "Correcting squat, bench, and deadlift biomechanics",
      "Overcoming strength plateaus with periodized programming",
      "Building lean, dense athletic muscle mass"
    ],
    focus: [
      { title: "Olympic Lifting Technique", desc: "Granular breakdown of bar paths, leg drive, and bracing mechanics." },
      { title: "Scientific Periodization", desc: "Systematic 8-12 week progression schemes designed for continuous personal records." },
      { title: "Mental Conditioning", desc: "Cultivating unshakeable confidence under heavy barbell loads." }
    ],
    achievements: [
      "NSCA Coach of the Year Nominee 2022",
      "Coached 14 National Powerlifting Podium Finishers",
      "1,500+ Hours of 1-on-1 Athlete Mentorship",
      "Lead Strength Educator for IRONFORCE Academy"
    ]
  },
  "marcus-vance": {
    quote: "Hypertrophy without functional biomechanics is just vanity. Train for performance and aesthetics will naturally follow.",
    bio: [
      "Marcus Vance brings over 11 years of elite bodybuilding and functional hypertrophy coaching to IRONFORCE. A NASM Master Trainer, he specializes in muscle recruitment optimization and sustainable physique transformations.",
      "His systematic protocols have helped executives, busy parents, and physique competitors add significant lean mass while dramatically dropping body fat."
    ],
    schedule: [
      { day: "Monday - Thursday", time: "07:00 - 15:00", branch: "Kemang Flagship" },
      { day: "Friday", time: "14:00 - 21:00", branch: "Green Lake" },
      { day: "Saturday - Sunday", time: "09:00 - 15:00", branch: "Kemang Flagship" }
    ],
    idealFor: [
      "Targeted muscle growth and hypertrophy",
      "Body recomposition (losing fat while gaining muscle)",
      "Joint-friendly lifting protocols for longevity",
      "Nutritional periodization for bulking and cutting"
    ],
    focus: [
      { title: "Hypertrophy Mechanics", desc: "Optimizing tension curves and range of motion for targeted muscle recruitment." },
      { title: "Volume & Fatigue Management", desc: "Balancing training stress with recovery to prevent overtraining and burnout." },
      { title: "Nutritional Blueprints", desc: "Precision macronutrient planning aligned with training demands." }
    ],
    achievements: [
      "NASM Master Trainer Certification 2020",
      "Over 120+ Complete Physique Transformations",
      "Published Author on Progressive Overload Strategies",
      "Head of Physique Conditioning at IRONFORCE"
    ]
  },
  "david-tan": {
    quote: "Move well before you move heavy. Longevity and pain-free mobility are the foundations of all great athletics.",
    bio: [
      "David Tan is a Senior Mobility & Posture Specialist with 7+ years of experience in corrective exercise, joint rehabilitation, and functional movement screening.",
      "He specializes in helping corporate desk workers and post-injury athletes eliminate chronic pain, restore pelvic alignment, and build resilient spinal stability."
    ],
    schedule: [
      { day: "Monday - Friday", time: "08:00 - 16:00", branch: "Sunter" },
      { day: "Tuesday & Thursday", time: "17:00 - 21:00", branch: "Greenville" },
      { day: "Saturday", time: "09:00 - 13:00", branch: "Sunter" }
    ],
    idealFor: [
      "Desk workers suffering from chronic back, neck, or shoulder pain",
      "Posture correction and anterior pelvic tilt rehabilitation",
      "Improving mobility for deeper, safer squats and lunges",
      "Active recovery and injury prevention"
    ],
    focus: [
      { title: "Postural Realignment", desc: "Systematic release of tight muscles and strengthening of dormant stabilizers." },
      { title: "Joint Mobility Drills", desc: "Unlocking functional range of motion in hips, thoracic spine, and ankles." },
      { title: "Core Architecture", desc: "Building true 360-degree abdominal and lumbar stability." }
    ],
    achievements: [
      "FMS Level 2 Certified Movement Specialist",
      "Assisted 200+ Clients in Becoming Completely Pain-Free",
      "Physical Therapy & Biomechanics Consultant",
      "Best Recovery Specialist Award 2023"
    ]
  },
  "amanda-wijaya": {
    quote: "Fitness isn't a punishment for what you ate; it's a celebration of what your body is capable of achieving.",
    bio: [
      "Amanda Wijaya is our Lead HIIT & Fat Loss Transformation Coach with 8 years of high-energy group and private coaching background. Certified by ACE and Precision Nutrition.",
      "She inspires members—especially women new to strength training—to embrace barbell movements, accelerate metabolic conditioning, and develop an empowering relationship with fitness."
    ],
    schedule: [
      { day: "Monday - Wednesday", time: "09:00 - 17:00", branch: "Green Lake" },
      { day: "Thursday - Friday", time: "15:00 - 21:00", branch: "Karawaci" },
      { day: "Saturday - Sunday", time: "07:00 - 12:00", branch: "Green Lake" }
    ],
    idealFor: [
      "Accelerated metabolic fat loss and conditioning",
      "Women looking to build confidence with free weights",
      "High-energy functional circuit training",
      "Sustainable lifestyle and intuitive nutrition guidance"
    ],
    focus: [
      { title: "Metabolic HIIT Conditioning", desc: "High-yield interval sessions that ignite post-exercise calorie burn." },
      { title: "Female Biomechanics & Glutes", desc: "Targeted hip thrust, deadlift, and squat programming." },
      { title: "Habit Transformation", desc: "Long-term mindset coaching to make healthy habits second nature." }
    ],
    achievements: [
      "ACE Certified Personal Trainer & Nutrition Coach",
      "Top Transformation Coach of the Year 2023",
      "Created the signature 'Iron-Fit Women' Program",
      "Guided Over 80 Members to Double-Digit Body Fat Drops"
    ]
  }
};

const statLabelsMap: Record<string, string> = {
  "Pengalaman": "Experience",
  "Klien Dilatih": "Athletes Coached",
  "Rating Kepuasan": "Rating Score",
  "Home Base": "Home Base",
};

export function TrainerDetailClient({ trainer, otherTrainers }: TrainerDetailClientProps) {
  const { t, locale } = useLanguage();
  const td = t.trainerDetailPage;
  const firstName = trainer.name.split(" ")[0];

  const enOverride = locale === "en" ? localizedTrainersEn[trainer.slug] : null;

  const quote = enOverride?.quote || trainer.quote;
  const bio = enOverride?.bio || trainer.bio;
  const schedule = enOverride?.schedule || trainer.schedule;
  const idealFor = enOverride?.idealFor || trainer.idealFor;
  const focus = enOverride?.focus || trainer.focus;
  const achievements = enOverride?.achievements || trainer.achievements;

  const waBookingUrl = createWhatsAppUrl(
    locale === "en"
      ? `Hello Admin ${siteConfig.brand.name}, I would like to book a private training session with Coach ${trainer.name}.`
      : `Halo Admin ${siteConfig.brand.name}, saya ingin konsultasi dan booking sesi latihan privat bersama Coach ${trainer.name}.`
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main>
        {/* Hero detail */}
        <section className="relative isolate overflow-hidden bg-[#0b0b0b] pb-12 pt-28 text-white sm:pb-20 sm:pt-36 md:pb-28 md:pt-44">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-48 bottom-0 size-[420px] rounded-full bg-[var(--color-primary)]/15 blur-[140px]"
          />

          <Container>
            <div className="relative z-10">
              {/* Breadcrumb */}
              <Reveal>
                <div className="mb-8 flex items-center gap-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[var(--color-primary)]"
                  >
                    <ArrowLeft size={14} />
                    {t.nav.breadcrumbHome}
                  </Link>
                  <span className="text-white/20">/</span>
                  <Link
                    href="/trainer"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[var(--color-primary)]"
                  >
                    {td.breadcrumbTrainer}
                  </Link>
                  <span className="text-white/20">/</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    {trainer.name}
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                {/* Left: Bio & badges */}
                <Reveal delay={0.05}>
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] backdrop-blur-sm">
                      <ShieldCheck size={14} />
                      {td.certifiedBadge}
                    </div>

                    <h1 className="font-heading text-[clamp(1.9rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em] sm:tracking-[-0.05em] break-words text-white">
                      {trainer.name}
                    </h1>

                    <p className="mt-3 text-base font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)] sm:text-lg">
                      {trainer.role} — {trainer.specialty}
                    </p>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
                      &ldquo;{quote}&rdquo;
                    </p>

                    {/* Stats pills */}
                    <div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-6 sm:grid-cols-4">
                      {trainer.stats.map((stat, i) => {
                        const localizedLabel = locale === "en" ? (statLabelsMap[stat.label] || stat.label) : stat.label;
                        return (
                          <div key={i}>
                            <div className="font-heading text-2xl font-bold text-white sm:text-3xl">
                              {stat.value}
                            </div>
                            <div className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                              {localizedLabel}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href={waBookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all hover:bg-[var(--color-primary-hover)] sm:text-sm"
                      >
                        {td.bookSession} {firstName}
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>

                      <a
                        href="#kenalan"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white/10 sm:text-sm"
                      >
                        <MessageCircle size={15} />
                        {td.sendMessage}
                      </a>
                    </div>
                  </div>
                </Reveal>

                {/* Right: Portrait photo + Location Card Below (Never blocks the photo) */}
                <Reveal delay={0.1}>
                  <div className="mx-auto w-full max-w-[280px] sm:max-w-md">
                    {/* Clean photo without any overlay blocking the trainer */}
                    <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        priority
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        style={{ objectPosition: trainerPositionMap[trainer.slug] || "center 25%" }}
                        className="object-cover"
                      />
                    </div>

                    {/* Location card placed neatly BELOW the photo */}
                    <div className="mt-3.5 flex items-center justify-between rounded-xl sm:rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 sm:p-4 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <span className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                          <MapPin size={15} />
                        </span>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                            {td.baseLocationLabel}
                          </p>
                          <p className="text-xs sm:text-sm font-bold text-white">
                            {trainer.branch}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* About & Certifications */}
        <section className="section-space bg-[#f4f2ee]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <SectionHeading
                    eyebrow={td.aboutTitle}
                    title={`${td.aboutSubtitle} ${firstName}.`}
                    description={bio[0] || ""}
                  />

                  {bio.length > 1 && (
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-black/70 sm:text-base">
                      {bio.slice(1).map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-xl">
                      {td.certTitle}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {trainer.certificationList.map((cert) => (
                        <li
                          key={cert}
                          className="flex items-center gap-3 text-xs font-semibold text-black/80 sm:text-sm"
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                            <Check size={14} strokeWidth={2.5} />
                          </span>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={0.1}>
                  <div className="rounded-[1.75rem] border border-black/10 bg-[#0b0b0b] p-6 text-white sm:p-8">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                      {td.idealTitle}
                    </span>
                    <ul className="mt-6 space-y-4">
                      {idealFor.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--color-primary)]">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className="text-xs leading-relaxed text-white/80 sm:text-sm">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* Training Focus */}
        <section className="section-space bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={td.focusEyebrow}
                title={`${td.focusTitle} ${firstName}.`}
                description={`${td.focusDesc} ${firstName}.`}
              />
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {focus.map((focusItem, idx) => {
                const Icon = focusIcons[idx % focusIcons.length];
                return (
                  <Reveal key={focusItem.title} delay={idx * 0.08}>
                    <div className="group h-full rounded-[1.75rem] border border-black/10 bg-[#f4f2ee] p-7 transition-all duration-300 hover:border-[var(--color-primary)] hover:bg-white hover:shadow-lg sm:p-8">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0b0b0b] text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                        <Icon size={22} />
                      </div>
                      <h3 className="mt-6 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b]">
                        {focusItem.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-black/65">
                        {focusItem.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Schedule & Achievements */}
        <section className="section-space bg-[#ebe8e1]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <SectionHeading
                  eyebrow={td.scheduleEyebrow}
                  title={td.scheduleTitle}
                  description={td.scheduleDesc}
                />

                <ul className="mt-10 space-y-3">
                  {schedule.map((slot) => (
                    <li
                      key={slot.day}
                      className="flex flex-col justify-between gap-2 rounded-[1.25rem] border border-black/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                          <Clock size={16} />
                        </span>
                        <div>
                          <p className="font-heading text-base font-bold uppercase tracking-tight text-[#0b0b0b]">
                            {slot.day}
                          </p>
                          <p className="text-xs text-black/60">{slot.time}</p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold text-black/70 sm:self-auto">
                        <MapPin size={12} className="text-[var(--color-primary)]" />
                        {slot.branch}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <SectionHeading
                  eyebrow={td.achieveEyebrow}
                  title={td.achieveTitle}
                  description={td.achieveDesc}
                />

                <ul className="mt-10 space-y-4">
                  {achievements.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 rounded-[1.25rem] border border-black/10 bg-white p-5 shadow-sm"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        {item.toLowerCase().includes("juara") ||
                        item.toLowerCase().includes("winner") ||
                        item.toLowerCase().includes("of the year") ? (
                          <Trophy size={18} />
                        ) : (
                          <Award size={18} />
                        )}
                      </span>
                      <p className="pt-1.5 text-sm font-medium leading-6 text-black/75">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Gallery */}
        <section className="section-space bg-[#f4f2ee]">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={td.galleryEyebrow}
                title={td.galleryTitle}
                description={td.galleryDesc}
              />
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {trainer.gallery.map((src, index) => (
                <Reveal key={src} delay={index * 0.08}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-black/10 bg-black">
                    <Image
                      src={src}
                      alt={`${td.galleryEyebrow} Coach ${trainer.name} ${index + 1}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Kenalan / Komentar form */}
        <section
          id="kenalan"
          className="section-space scroll-mt-24 bg-[#0b0b0b] text-white"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
              <Reveal>
                <SectionHeading
                  light
                  eyebrow={td.contactEyebrow}
                  title={`${td.contactTitle} ${firstName}?`}
                  description={td.contactDesc}
                />

                <div className="mt-10 flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-white/15">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold uppercase tracking-tight">
                      {trainer.name}
                    </p>
                    <p className="mt-0.5 text-xs text-white/60">{trainer.role}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-primary)]">
                      <MapPin size={12} />
                      {trainer.branch}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <TrainerContactForm trainerName={trainer.name} />
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Other trainers */}
        <section className="section-space bg-[#f4f2ee]">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <Reveal>
                <SectionHeading
                  eyebrow={td.otherEyebrow}
                  title={td.otherTitle}
                  description={td.otherDesc}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Link
                  href="/trainer"
                  className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary)] sm:text-sm"
                >
                  {td.viewAllTrainers}
                  <span className="flex size-9 items-center justify-center rounded-full border border-[var(--color-primary)]/30 transition-transform group-hover:translate-x-1">
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {otherTrainers.map((other, index) => (
                <Reveal key={other.slug} delay={index * 0.08}>
                  <Link
                    href={`/trainer/${other.slug}`}
                    className="group block overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-sm transition-all duration-500 hover:border-[var(--color-primary)] hover:shadow-xl"
                  >
                    <div className="relative h-40 sm:h-52 md:h-60 overflow-hidden bg-black">
                      <Image
                        src={other.image}
                        alt={other.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        style={{ objectPosition: trainerPositionMap[other.slug] || "center 25%" }}
                      className="object-cover grayscale-[15%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                      <div className="absolute inset-x-5 bottom-5 text-white">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                          {other.specialty}
                        </span>
                        <h3 className="mt-1 font-heading text-2xl font-bold uppercase tracking-tight">
                          {other.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-5">
                      <p className="text-xs font-medium text-black/60">
                        {other.role}
                      </p>
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-white transition-colors group-hover:bg-[var(--color-primary)]">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
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
