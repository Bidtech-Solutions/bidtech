import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SolutionCard } from "@/components/home/components/solution-card";
import { SplitText } from "@/components/react-bits/split-text";
import { FEATURED_SOLUTIONS_DATA } from "@/lib/data/featured-solutions";

const WHATSAPP_NUMBER = "628217601455";

const COPY = {
  id: {
    metaTitle: "Produk & Solusi Digital",
    metaDescription:
      "Portofolio produk dan solusi digital BidTech: website, aplikasi Android & iOS, serta sistem bisnis untuk properti, wisata, organisasi, komunitas, dan UMKM.",
    eyebrow: "Portofolio",
    titleLead: "Produk & Solusi",
    titleHighlight: "Unggulan Kami",
    subtitle:
      "Kumpulan solusi digital yang telah kami bangun bersama klien, dirancang presisi dan terbukti menghasilkan dampak bisnis nyata.",
    ctaTitle: "Punya ide proyek untuk bisnis Anda?",
    ctaButton: "Konsultasi via WhatsApp",
    waMessage: "Halo Bidtech, saya ingin konsultasi solusi digital untuk bisnis saya.",
  },
  en: {
    metaTitle: "Digital Products & Solutions",
    metaDescription:
      "BidTech's portfolio of digital products and solutions: websites, Android & iOS apps, and business systems for property, travel, organizations, communities, and SMEs.",
    eyebrow: "Portfolio",
    titleLead: "Our Featured",
    titleHighlight: "Products & Solutions",
    subtitle:
      "A collection of digital solutions we have built with our clients, precision-designed and proven to deliver real business impact.",
    ctaTitle: "Have a project idea for your business?",
    ctaButton: "Consult via WhatsApp",
    waMessage: "Hi Bidtech, I'd like to consult about a digital solution for my business.",
  },
} as const;

function toLang(value: string): "id" | "en" {
  return value === "en" ? "en" : "id";
}

export function generateStaticParams() {
  return [{ lang: "id" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return {
    title: COPY[lang].metaTitle,
    description: COPY[lang].metaDescription,
    alternates: {
      canonical: `/${lang}/solusi`,
      languages: {
        "id-ID": "https://bidtech.co.id/id/solusi",
        "en-US": "https://bidtech.co.id/en/solusi",
      },
    },
  };
}

export default async function SolusiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = toLang((await params).lang);
  const copy = COPY[lang];
  const isEn = lang === "en";
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(copy.waMessage)}`;

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-emerald-50/30 py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-gradient-to-br from-[#45a02e]/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 size-96 rounded-full bg-gradient-to-tr from-[#a3e635]/12 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <span className="inline-flex items-center rounded-full border border-[#45a02e]/25 bg-[#f0f9ea] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#3d8f28]">
            {copy.eyebrow}
          </span>
          <SplitText
            as="h1"
            className="mt-4 font-[family-name:var(--font-plus-jakarta),sans-serif] text-3xl font-bold leading-tight tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[44px]"
            segments={[
              { text: copy.titleLead },
              {
                text: copy.titleHighlight,
                className: "bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent",
              },
            ]}
          />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">{copy.subtitle}</p>
        </div>

        {/* Grid semua solusi */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FEATURED_SOLUTIONS_DATA.map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 120} y={24} className="h-full">
              <SolutionCard item={item} isEn={isEn} priority={index < 3} />
            </Reveal>
          ))}
        </div>

        {/* CTA penutup */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16">
          <p className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-lg font-bold text-slate-900 sm:text-xl">
            {copy.ctaTitle}
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#45a02e] px-6 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(69,160,46,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#388e22]"
          >
            <MessageCircle className="size-4" />
            {copy.ctaButton}
          </a>
        </div>
      </div>
    </main>
  );
}
