"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ArrowUpRight, 
  Check, 
  CreditCard, 
  HelpCircle, 
  PauseCircle, 
  ShieldCheck, 
  X, 
  Zap 
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const perkIcons = [PauseCircle, ShieldCheck, CreditCard, Zap];

export default function MembershipPage() {
  const { t, locale } = useLanguage();
  const mp = t.membershipPage;
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const [activePlanIdx, setActivePlanIdx] = useState(2);
  const planScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = planScrollRef.current;
      if (container && window.innerWidth < 768) {
        const featuredIndex = mp.plans.findIndex((p) => p.featured);
        const targetIdx = featuredIndex >= 0 ? featuredIndex : 2;
        const targetChild = container.children[targetIdx] as HTMLElement;
        if (targetChild) {
          const left =
            targetChild.getBoundingClientRect().left -
            container.getBoundingClientRect().left +
            container.scrollLeft -
            (container.clientWidth - targetChild.clientWidth) / 2;
          container.scrollTo({ left, behavior: "auto" });
        }
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [mp.plans]);

  const handlePlanScroll = () => {
    if (!planScrollRef.current) return;
    const { scrollLeft, clientWidth } = planScrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActivePlanIdx(Math.min(Math.max(index, 0), mp.plans.length - 1));
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main>
        <PageHero
          image="/images/pages/hero-membership.webp"
          imageAlt={mp.title}
          eyebrow={mp.eyebrow}
          title={mp.title}
          description={mp.description}
          badge={mp.badge}
          stats={mp.stats as any}
        />

        {/* Pricing Tiers */}
        <section className="section-space bg-[#0b0b0b] text-white">
          <Container>
            {/* Billing Cycle Switcher */}
            <Reveal>
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={[
                      "rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300",
                      billingCycle === "monthly"
                        ? "bg-[var(--color-primary)] text-white shadow-lg"
                        : "text-white/60 hover:text-white",
                    ].join(" ")}
                  >
                    {mp.toggleMonthly}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle("yearly")}
                    className={[
                      "flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300",
                      billingCycle === "yearly"
                        ? "bg-[var(--color-primary)] text-white shadow-lg"
                        : "text-white/60 hover:text-white",
                    ].join(" ")}
                  >
                    <span>{mp.toggleYearly}</span>
                    <span className="rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[9px] font-extrabold uppercase text-white">
                      {mp.yearlyDiscount}
                    </span>
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Plans Grid */}
            <div
              ref={planScrollRef}
              onScroll={handlePlanScroll}
              className="mt-10 sm:mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:items-stretch md:overflow-visible md:p-0"
            >
              {mp.plans.map((plan, index) => {
                const planUrl = createWhatsAppUrl(
                  locale === "en"
                    ? `Hello Admin ${siteConfig.brand.name}, I want to join the ${plan.name} package (${billingCycle}). Please guide me through registration.`
                    : `Halo Admin ${siteConfig.brand.name}, saya ingin mendaftar paket Membership ${plan.name} (${billingCycle === "yearly" ? "Tahunan" : "Bulanan"}). Mohon panduan registrasinya.`
                );

                return (
                  <Reveal
                    key={plan.name}
                    delay={index * 0.08}
                    className="h-full w-[85vw] max-w-[340px] snap-center shrink-0 md:w-auto md:max-w-none md:shrink"
                  >
                    <article
                      className={[
                        "flex h-full flex-col justify-between rounded-[2rem] border p-7 transition-all duration-300 sm:p-8",
                        plan.featured
                          ? "border-[var(--color-primary)] bg-white/10 shadow-2xl lg:-translate-y-4"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20",
                      ].join(" ")}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            {plan.badge}
                          </span>
                        </div>

                        <h3 className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                          {plan.name}
                        </h3>

                        <p className="mt-2 text-xs leading-relaxed text-white/60">
                          {plan.desc}
                        </p>

                        <div className="mt-6 border-y border-white/10 py-5">
                          <span className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                            {plan.price}
                          </span>
                          <span className="ml-1 text-xs uppercase tracking-wider text-white/50">
                            {billingCycle === "yearly" && plan.period === "/Bulan" ? mp.perYear : plan.period}
                          </span>
                        </div>

                        <ul className="mt-6 space-y-3">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5 text-xs text-white/80">
                              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white mt-0.5">
                                <Check size={10} strokeWidth={3} />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4">
                        <a
                          href={planUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={[
                            "group/btn flex w-full items-center justify-between rounded-full py-4 px-6 text-xs font-bold uppercase tracking-[0.14em] transition-all",
                            plan.featured
                              ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
                              : "bg-white/10 text-white hover:bg-white hover:text-black",
                          ].join(" ")}
                        >
                          <span>{plan.cta}</span>
                          <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </a>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {/* Mobile slide indicator dots */}
            <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
              {mp.plans.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => {
                    const container = planScrollRef.current;
                    if (!container) return;
                    const child = container.children[i] as HTMLElement;
                    if (child) {
                      const left =
                        child.getBoundingClientRect().left -
                        container.getBoundingClientRect().left +
                        container.scrollLeft -
                        (container.clientWidth - child.clientWidth) / 2;
                      container.scrollTo({ left, behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activePlanIdx === i
                      ? "w-6 bg-[var(--color-primary)]"
                      : "w-1.5 bg-white/30"
                  )}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Feature Comparison Table */}
        <section className="section-space bg-[#f4f2ee]">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={mp.comparisonEyebrow}
                title={mp.comparisonTitle}
                description={mp.comparisonDesc}
                align="center"
              />
            </Reveal>

            <div className="mt-10 sm:mt-14">
            <p className="mb-3 flex items-center justify-end gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-black/40 lg:hidden">
              <span>{locale === "en" ? "← Swipe horizontally to view full table →" : "← Geser ke samping untuk tabel lengkap →"}</span>
            </p>
            <div className="w-full max-w-full overflow-x-auto rounded-2xl sm:rounded-[2rem] border border-black/10 bg-white p-4 sm:p-6 lg:p-10 shadow-sm overscroll-x-contain">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-black/10 pb-4">
                    <th className="py-4 font-heading text-xs font-bold uppercase tracking-[0.16em] text-black/50">
                      {mp.featureCol}
                    </th>
                    <th className="py-4 text-center font-heading text-base font-bold uppercase text-[#0b0b0b]">
                      Day Pass
                    </th>
                    <th className="py-4 text-center font-heading text-base font-bold uppercase text-[#0b0b0b]">
                      Basic
                    </th>
                    <th className="py-4 text-center font-heading text-base font-bold uppercase text-[var(--color-primary)]">
                      Pro
                    </th>
                    <th className="py-4 text-center font-heading text-base font-bold uppercase text-[#0b0b0b]">
                      Elite
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {mp.comparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-[#f4f2ee]/50">
                      <td className="py-4 font-medium text-black/80">{row.feature}</td>
                      <td className="py-4 text-center">
                        {typeof row.day === "boolean" ? (
                          row.day ? (
                            <Check size={18} className="mx-auto text-[var(--color-primary)]" />
                          ) : (
                            <X size={18} className="mx-auto text-black/25" />
                          )
                        ) : (
                          <span className="text-xs font-semibold text-black/60">{row.day}</span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {typeof row.basic === "boolean" ? (
                          row.basic ? (
                            <Check size={18} className="mx-auto text-[var(--color-primary)]" />
                          ) : (
                            <X size={18} className="mx-auto text-black/25" />
                          )
                        ) : (
                          <span className="text-xs font-semibold text-black/60">{row.basic}</span>
                        )}
                      </td>
                      <td className="py-4 text-center bg-[var(--color-primary)]/[0.04]">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <Check size={18} className="mx-auto text-[var(--color-primary)]" />
                          ) : (
                            <X size={18} className="mx-auto text-black/25" />
                          )
                        ) : (
                          <span className="text-xs font-bold text-[var(--color-primary)]">{row.pro}</span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {typeof row.elite === "boolean" ? (
                          row.elite ? (
                            <Check size={18} className="mx-auto text-[var(--color-primary)]" />
                          ) : (
                            <X size={18} className="mx-auto text-black/25" />
                          )
                        ) : (
                          <span className="text-xs font-semibold text-black/60">{row.elite}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table></div></div></Container>
        </section>

        {/* Perks & Guarantees */}
        <section className="section-space bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={mp.perksEyebrow}
                title={mp.perksTitle}
                description={mp.perksDesc}
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mp.perks.map((perk, idx) => {
                const Icon = perkIcons[idx % perkIcons.length];
                return (
                  <Reveal key={perk.title} delay={idx * 0.08}>
                    <div className="h-full rounded-[1.5rem] border border-black/10 bg-[#f4f2ee] p-7 transition-all hover:border-[var(--color-primary)] hover:bg-white hover:shadow-lg">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0b0b0b] text-[var(--color-primary)]">
                        <Icon size={22} />
                      </div>
                      <h4 className="mt-6 font-heading text-lg font-bold uppercase text-[#0b0b0b]">
                        {perk.title}
                      </h4>
                      <p className="mt-3 text-xs leading-relaxed text-black/65 sm:text-sm">
                        {perk.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Guarantee Box */}
            <Reveal delay={0.2}>
              <div className="mt-12 rounded-[2rem] border border-[var(--color-primary)]/30 bg-[#0b0b0b] p-8 text-white sm:p-12">
                <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                  <div>
                    <span className="rounded-full bg-[var(--color-primary)]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      {mp.guaranteeBadge}
                    </span>
                    <h3 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                      {mp.guaranteeTitle}
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/70 sm:text-sm">
                      {mp.guaranteeDesc}
                    </p>
                  </div>

                  <a
                    href={createWhatsAppUrl(locale === "en" ? "Hello IRONFORCE, I have a question regarding the 14-day money-back guarantee." : "Halo IRONFORCE, saya ingin konsultasi seputar jaminan keanggotaan.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-primary-hover)]"
                  >
                    <span>{locale === "en" ? "Consult Guarantee" : "Konsultasi Jaminan"}</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Membership FAQ */}
        <section className="section-space bg-[#f4f2ee]">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={mp.faqsEyebrow}
                title={mp.faqsTitle}
                description={mp.faqsDesc}
                align="center"
              />
            </Reveal>

            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {mp.faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.06}>
                  <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-7 shadow-xs">
                    <h4 className="font-heading text-base font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-lg">
                      {faq.q}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-black/70">
                      {faq.a}
                    </p>
                  </div>
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
