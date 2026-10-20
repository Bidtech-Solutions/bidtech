'use client';

import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-white border-t border-cocoa/10">
      <div className="shell">
        <Reveal>
          <div className="bg-cream/60 rounded-3xl p-6 sm:p-10 md:p-12 border border-cocoa/10 text-center relative overflow-hidden shadow-sm">
            <div className="max-w-xl mx-auto space-y-4">
              <span className="eyebrow block text-xs">
                {t.cta.eyebrow}
              </span>

              <h2 className="heading text-2xl sm:text-3xl md:text-4xl text-ink leading-tight">
                {t.cta.title}
              </h2>

              <p className="text-cocoa/80 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                {t.cta.desc}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/kontak"
                  className="w-full sm:w-auto px-7 py-3 bg-ember text-cream rounded-full font-semibold text-xs transition-all duration-300 hover:bg-ember/90 hover:-translate-y-0.5 shadow-sm"
                >
                  {t.cta.button}
                </Link>

                <a
                  href="tel:082376680987"
                  className="w-full sm:w-auto px-7 py-3 border border-cocoa/20 text-ink rounded-full font-semibold text-xs transition-all duration-300 hover:bg-cocoa/5"
                >
                  {t.cta.call} (0823-7668-0987)
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
