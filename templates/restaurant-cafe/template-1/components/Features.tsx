'use client';

import { motion } from 'motion/react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';
import { PILLARS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function Features() {
  const { t, isEn } = useLanguage();

  return (
    <section className="section bg-cream">
      <div className="shell">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">
              {isEn ? 'WHY CHEF’S TABLE' : 'Mengapa Kami'}
            </p>
          </Reveal>
          <SplitWords
            as="h2"
            text={isEn ? 'Crafted with intent, served with pride' : 'Dibuat dengan niat, disajikan dengan bangga'}
            className="heading text-3xl sm:text-4xl lg:text-5xl"
          />
        </div>

        <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.12}>
          {PILLARS.map((pillar, i) => {
            const title = isEn ? pillar.titleEn : pillar.title;
            const description = isEn ? pillar.descriptionEn : pillar.description;
            return (
              <StaggerItem key={pillar.title}>
                <PillarCard index={i} title={title} description={description} />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function PillarCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border border-blush/60 bg-ember-soft p-8',
        'transition-colors duration-500 ease-smooth hover:border-ember/40',
      )}
    >
      <motion.span
        aria-hidden
        className="absolute -right-2 -top-6 text-[7rem] font-extrabold leading-none text-ember/[0.07]"
        whileHover={{ x: -6 }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <div className="relative">
        <span className="mb-6 inline-grid h-11 w-11 place-items-center rounded-full bg-ember text-sm font-bold text-cream">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className="mb-3 text-lg font-bold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-cocoa/80">{description}</p>
      </div>

      <span
        className={cn(
          'absolute inset-x-8 bottom-0 h-[2px] origin-left scale-x-0 bg-ember',
          'transition-transform duration-500 ease-smooth group-hover:scale-x-100',
        )}
      />
    </motion.article>
  );
}
