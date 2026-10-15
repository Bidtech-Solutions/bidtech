"use client";

import { useMemo } from "react";
import {
  ChefHat,
  Clock,
  Cookie,
  Flame,
  Heart,
  Leaf,
  Quote,
  Recycle,
  ScrollText,
  Utensils,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import {
  storyImages,
} from "@/lib/restaurant-data";
import {
  getLocalizedStoryStats,
  getLocalizedStoryTimeline,
  getLocalizedStoryValues,
  getLocalizedStoryTeam,
} from "@/lib/i18n-data";
import {
  CtaBanner,
  PageHero,
  Reveal,
  SectionHeading,
} from "@/components/pages/shared";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const valueIcons: Record<string, LucideIcon> = {
  utensils: Utensils,
  clock: Clock,
  leaf: Leaf,
  wheat: Wheat,
  recycle: Recycle,
  heart: Heart,
};

const teamIcons: Record<string, LucideIcon> = {
  chef: ChefHat,
  flame: Flame,
  pasta: Wheat,
  sweet: Cookie,
};

export function StoryView() {
  const { t, language } = useLanguage();

  const storyStats = useMemo(() => getLocalizedStoryStats(language), [language]);
  const storyTimeline = useMemo(() => getLocalizedStoryTimeline(language), [language]);
  const storyValues = useMemo(() => getLocalizedStoryValues(language), [language]);
  const storyTeam = useMemo(() => getLocalizedStoryTeam(language), [language]);

  return (
    <>
      <PageHero
        crumb={t("Cerita Kami", "Story")}
        eyebrow={t("Kisah Perjalanan", "Our Story")}
        icon={<ScrollText className="size-3.5" />}
        before={t("Makanan lebih baik untuk", "Better food for")}
        highlight="MORE"
        after={t("semua orang", "people")}
        description={t(
          "Selama lebih dari satu dekade, kami meniadakan suasana kaku taplak meja putih namun tetap mempertahankan kesempurnaan teknik kuliner, agar hidangan istimewa terasa hangat dan dapat dinikmati semua orang.",
          "For over a decade, we've been stripping away the white tablecloths while keeping the culinary rigor, so great food feels welcoming, not intimidating."
        )}
      />

      {/* Origin */}
      <section
        id="story"
        className="relative w-full bg-white dark:bg-[#121215] py-12 sm:py-16 md:py-24 overflow-hidden scroll-mt-20"
      >
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-0 w-[600px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none"
        />
        <div className="container-app relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
            <Reveal>
              <div className="relative">
                <div className="h-[320px] sm:h-[440px] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl">
                  <img
                    src={storyImages.oven}
                    alt="Pizza fresh from our wood-fired oven"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-2 sm:-right-6 w-36 sm:w-48 h-36 sm:h-48 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-[#121215]">
                  <img
                    src={storyImages.pasta}
                    alt="Hand-rolled pasta"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-eyebrow mb-2 sm:mb-4">
                {t("Awal Mula", "Where it began")}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground text-balance mb-4 leading-tight">
                {t("Satu tungku, satu keyakinan", "One oven, one belief")}
              </h2>
              <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t(
                    "Deny Restaurant berawal dari satu oven kayu bakar dan sebuah cita-cita sederhana: makanan berkualitas yang kami cintai harus dapat dinikmati semua kalangan, bukan hanya untuk perayaan tertentu.",
                    "Deny Restaurant began with a single wood-fired oven and a simple idea: the food we love should be within reach of everyone, not saved for special occasions."
                  )}
                </p>
                <p>
                  {t(
                    "Maka kami memasak seperti kami ingin menikmatinya sendiri. Adonan pizza yang difermentasi dingin 48 jam, pasta telur segar digilas tangan tiap pagi, dan burger yang di-smash di atas wajan besi super panas — disajikan hangat, cepat, dan penuh rasa hormat.",
                    "So we cook the way we always wanted to eat. Dough that rests for 48 hours, pasta rolled by hand every morning, and burgers smashed on a screaming-hot griddle, all served fast, warm and without fuss."
                  )}
                </p>
              </div>

              <figure className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-2xl bg-brand-500/10 relative">
                <Quote className="absolute top-4 right-4 size-8 text-brand-500/30" />
                <blockquote className="font-display font-bold text-lg sm:text-xl text-foreground leading-snug">
                  &ldquo;{t("Makanan istimewa tidak harus menunggu lama atau menguras kantong.", "Great food shouldn’t mean a long wait or a short budget.")}&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  {t("Dapur Deny Restaurant", "The Deny Restaurant kitchen")}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative w-full bg-gradient-brand text-white py-10 sm:py-14 overflow-hidden">
        <div className="container-app">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto text-center">
            {storyStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <p className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm uppercase tracking-widest text-white/80 font-semibold">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative w-full bg-background py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="container-app">
          <SectionHeading
            eyebrow={t("Tonggak Sejarah", "Milestones")}
            title={t("Satu dekade, piring demi piring", "A decade, one plate at a time")}
            description={t(
              "Momen-momen yang membentuk dapur yang Anda nikmati hari ini.",
              "The moments that shaped the kitchen you eat in today."
            )}
          />

          <ol className="relative max-w-4xl mx-auto">
            <span
              aria-hidden="true"
              className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-brand-500/40 to-transparent"
            />
            {storyTimeline.map((event, i) => {
              const right = i % 2 === 0;
              return (
                <li
                  key={event.year}
                  className="relative pl-12 md:pl-0 pb-8 sm:pb-12 last:pb-0 md:grid md:grid-cols-2 md:gap-16"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 size-4 rounded-full bg-brand-500 ring-4 ring-background shadow-glow"
                  />
                  <Reveal
                    delay={0.05}
                    className={cn(
                      right ? "md:col-start-1 md:text-right" : "md:col-start-2",
                    )}
                  >
                    <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-card shadow-sm hover:shadow-md transition-shadow">
                      <span className="font-display font-black text-2xl sm:text-3xl text-gradient-brand">
                        {event.year}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold mt-1 mb-1.5">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {event.text}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="relative w-full bg-white dark:bg-[#121215] py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="container-app">
          <SectionHeading
            eyebrow={t("Mengapa Memilih Kami", "Why choose us")}
            title={t("Kualitas Tanpa Kompromi", "Quality without compromise")}
            description={t(
              "Kami meniadakan suasana kaku, namun tetap menjaga disiplin serta kesempurnaan teknik kuliner.",
              "We're stripping away the white tablecloths, but keeping the culinary rigor."
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {storyValues.map((value, i) => {
              const Icon = valueIcons[value.icon];
              return (
                <Reveal key={value.title} delay={(i % 3) * 0.1}>
                  <div className="h-full p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-card shadow-sm hover:shadow-md transition-shadow">
                    <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-brand-500/10 flex items-center justify-center mb-3 sm:mb-4">
                      <Icon className="h-6 w-6 text-brand-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative w-full bg-background pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8 md:pb-10 overflow-hidden">
        <div className="container-app">
          <SectionHeading
            eyebrow={t("Kru Dapur", "The kitchen crew")}
            title={t("Orang-orang di Balik Meja Saji", "The people behind the pass")}
            description={t(
              "Tim solid yang menaruh perhatian mendalam pada setiap piring yang keluar dari dapur.",
              "A small team that cares a lot about every plate leaving the kitchen."
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {storyTeam.map((member, i) => {
              const Icon = teamIcons[member.icon];
              return (
                <Reveal key={member.role} delay={i * 0.08}>
                  <div className="group h-full p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                    <div className="mx-auto size-14 sm:size-16 rounded-full bg-gradient-brand flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-6 sm:size-7 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-1.5">
                      {member.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {member.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <CtaBanner
              title={t("Datang lapar, pulang bahagia.", "Come hungry, leave happy.")}
              description={t(
                "Tarik kursi Anda dan rasakan seperti apa buah dari sepuluh tahun dedikasi rasa kami.",
                "Pull up a chair and taste what ten years of obsession looks like."
              )}
              primary={{ label: t("Jelajahi Seluruh Menu", "Explore Full Menu"), href: "/menu" }}
              secondary={{ label: t("Kenali Staf Kami", "Meet Our Staff"), href: "/staff" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
