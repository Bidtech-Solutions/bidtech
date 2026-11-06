import Link from "next/link";
import { ArrowLeft, MessageCircle, Settings, Wrench } from "lucide-react";

type Lang = "id" | "en";

const WHATSAPP_NUMBER = "628217601455";

const COPY = {
  id: {
    badge: "Segera Hadir",
    back: "Kembali ke Beranda",
    whatsapp: "Konsultasi via WhatsApp",
    waMessage: "Halo Bidtech, saya ingin konsultasi solusi digital untuk bisnis saya.",
  },
  en: {
    badge: "Coming Soon",
    back: "Back to Home",
    whatsapp: "Consult via WhatsApp",
    waMessage: "Hi Bidtech, I'd like to consult about a digital solution for my business.",
  },
} as const;

interface ComingSoonProps {
  lang: Lang;
  title: string;
  description: string;
}

/**
 * Tampilan sementara untuk halaman yang belum siap (maintenance / segera hadir).
 * Ganti isi page.tsx terkait dengan halaman asli setelah siap.
 */
export function ComingSoon({ lang, title, description }: ComingSoonProps) {
  const copy = COPY[lang];
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(copy.waMessage)}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white">
      {/* Glow lembut di belakang konten */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(95,201,74,0.18),_transparent_70%)] blur-2xl sm:size-[560px]"
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
        {/* Ikon maintenance: roda gigi berputar pelan + kunci pas */}
        <div className="relative flex size-28 items-center justify-center rounded-full border border-[#45a02e]/20 bg-white shadow-[0_12px_40px_rgba(69,160,46,0.18)] sm:size-32">
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#edf8eb] to-white" />
          <Settings
            aria-hidden
            className="relative size-14 text-[#45a02e] animate-[spin_12s_linear_infinite] motion-reduce:animate-none sm:size-16"
            strokeWidth={1.6}
          />
          <span className="absolute -bottom-1 -right-1 flex size-11 items-center justify-center rounded-full bg-[#45a02e] text-white shadow-[0_6px_16px_rgba(69,160,46,0.35)] ring-4 ring-white sm:size-12">
            <Wrench aria-hidden className="size-5 sm:size-6" />
          </span>
        </div>

        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#45a02e]/25 bg-[#f0f9ea] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#3d8f28]">
          <span className="size-1.5 rounded-full bg-[#45a02e] animate-pulse motion-reduce:animate-none" />
          {copy.badge}
        </span>

        <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl font-bold tracking-[-0.025em] text-slate-900 sm:text-4xl">
          {title}
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#45a02e] px-6 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(69,160,46,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#388e22] sm:w-auto"
          >
            <MessageCircle className="size-4" />
            {copy.whatsapp}
          </a>
          <Link
            href={`/${lang}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-[#45a02e]/50 hover:text-[#45a02e] sm:w-auto"
          >
            <ArrowLeft className="size-4" />
            {copy.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
