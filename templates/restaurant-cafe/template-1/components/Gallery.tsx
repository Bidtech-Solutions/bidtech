'use client';
import Image from 'next/image';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GALLERY_FILTERS, GALLERY_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { duration, ease, spring } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';
import { useLanguage } from '@/context/LanguageContext';

// type GalleryFilter

type GalleryItem = (typeof GALLERY_ITEMS)[number];

const cardLayout = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
];

const imagePosition = [
  'object-[48%_52%]',
  'object-[50%_50%]',
  'object-[50%_56%]',
  'object-[48%_50%]',
];

const flightPath = [
  { from: 'translate3d(-34vw, -110px, 0) rotate(-8deg) scale(0.96)', delay: 0 },
  { from: 'translate3d(30vw, -130px, 0) rotate(7deg) scale(0.95)', delay: 0.08 },
  { from: 'translate3d(-28vw, 120px, 0) rotate(9deg) scale(0.96)', delay: 0.16 },
  { from: 'translate3d(32vw, 110px, 0) rotate(-7deg) scale(0.95)', delay: 0.24 },
];

export default function Gallery() {
  const reduce = useReducedMotion();
  const { isEn } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('Food');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [originItemId, setOriginItemId] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const filteredItems = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  const selectedItem = useMemo(() => 
    selectedIndex !== null && filteredItems[selectedIndex] 
      ? filteredItems[selectedIndex] 
      : null,
    [selectedIndex, filteredItems]
  );

  const closeGallery = useCallback(() => {
    setSelectedIndex(null);
    setOriginItemId(null); // ✅ Bersihkan saat tutup
  }, []);

  const chooseFilter = (filter: string) => {
    setActiveFilter(filter);
    setSelectedIndex(null);
    setOriginItemId(null);
    setDirection(1);
  };

  const openGallery = useCallback((index: number) => {
    const item = filteredItems[index];
    if (!item) return;
    setOriginItemId(item.id); // ✅ Set dulu sebelum index
    setSelectedIndex(index);
    setDirection(1);
  }, [filteredItems]);

  const moveGallery = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      setSelectedIndex((current) => {
        if (current === null) return current;
        const nextIndex = (current + step + filteredItems.length) % filteredItems.length;
        const nextItem = filteredItems[nextIndex];
        if (nextItem) setOriginItemId(nextItem.id); // ✅ Update origin
        return nextIndex;
      });
    },
    [filteredItems],
  );

  // ✅ Kunci scroll saat dialog terbuka
  useEffect(() => {
    if (!selectedItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedItem]);

  // ✅ Tombol keyboard
  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowRight') moveGallery(1);
      if (event.key === 'ArrowLeft') moveGallery(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeGallery, moveGallery, selectedItem]);

  return (
    <section id="galeri" className="section overflow-hidden bg-[#fffdf8]">
      <div className="shell">
        <div className="mb-10 grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Koleksi Menu</p>
            </Reveal>
            <SplitWords
              as="h2"
              text="Galeri"
              className="heading text-3xl sm:text-4xl lg:text-5xl"
            />
          </div>
          <Reveal delay={0.12}>
            <LayoutGroup id="gallery-filter-tabs">
              <div
                role="tablist"
                aria-label="Filter kategori galeri"
                className="-mx-5 flex min-w-0 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:justify-end md:overflow-visible md:px-0"
              >
                {GALLERY_FILTERS.map((filterItem: any) => {
                  const key = typeof filterItem === 'string' ? filterItem : filterItem.key;
                  const label = typeof filterItem === 'string' ? filterItem : (isEn ? filterItem.labelEn : filterItem.labelId);
                  const active = key === activeFilter;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => chooseFilter(key)}
                      className={cn(
                        'relative h-8 shrink-0 rounded-full px-6 text-xs font-bold transition-colors duration-300 ease-smooth',
                        active ? 'text-cream' : 'text-cocoa hover:text-ember',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-gallery-filter"
                          className="absolute inset-0 rounded-full bg-ember shadow-[0_14px_28px_rgba(170,48,21,0.2)]"
                          transition={spring.soft}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        <LayoutGroup id="gallery-viewer">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={activeFilter}
                initial={reduce ? false : 'hidden'}
                whileInView={reduce ? undefined : 'show'}
                exit={reduce ? undefined : {
                  opacity: 0,
                  transform: 'translate3d(0, 18px, 0) scale(0.98)',
                  transition: { duration: duration.fast, ease: ease.inOut },
                }}
                viewport={{ once: true, amount: 0.25 }}
                className="grid gap-4 md:h-[430px] md:grid-cols-12 md:grid-rows-2"
              >
                {filteredItems.map((item, index) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={index}
                    reduce={Boolean(reduce)}
                    onOpen={() => openGallery(index)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="gallery-empty"
                initial={reduce ? false : { opacity: 0, transform: 'translate3d(0, 18px, 0)' }}
                animate={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: duration.base, ease: ease.out }}
                className="grid min-h-[24rem] place-items-center rounded-xl border border-blush/45 bg-cream/60 px-6 text-center"
              >
                <p className="max-w-sm text-sm font-semibold text-cocoa">
                  Galeri untuk kategori ini sedang disiapkan.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ✅ Tampilkan dialog HANYA saat keduanya ada — cek ketat */}
          <AnimatePresence onExitComplete={() => setOriginItemId(null)}>
            {selectedItem && originItemId && (
              <GalleryDialog
                item={selectedItem}
                originItemId={originItemId}
                total={filteredItems.length}
                index={selectedIndex ?? 0}
                direction={direction}
                reduce={Boolean(reduce)}
                onClose={closeGallery}
                onNext={() => moveGallery(1)}
                onPrevious={() => moveGallery(-1)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  index,
  reduce,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  reduce: boolean;
  onOpen: () => void;
}) {
  const path = flightPath[index % flightPath.length];
  const [introComplete, setIntroComplete] = useState(reduce);

  return (
    <motion.button
      type="button"
      aria-label={`Lihat foto ${item.title}`}
      variants={reduce ? undefined : {
        hidden: { opacity: 0, transform: path.from },
        show: {
          opacity: 1,
          transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
          transition: { duration: duration.slow, delay: path.delay, ease: ease.out },
        },
      }}
      onAnimationStart={(def) => { if (def === 'show') setIntroComplete(false); }}
      onAnimationComplete={(def) => { if (def === 'show') setIntroComplete(true); }}
      onClick={onOpen}
      whileHover={reduce || !introComplete ? undefined : 
        { transform: 'translate3d(0, -6px, 0) rotate(0deg) scale(1.01)' }
      }
      transition={spring.soft}
      className={cn(
        'relative min-h-[190px] overflow-hidden rounded-xl border border-white/55 bg-ink text-left outline-none cursor-pointer',
        introComplete && 'group',
        'shadow-[0_24px_60px_rgba(89,65,60,0.13)] will-change-transform md:min-h-0',
        'aspect-[1.62/1] md:aspect-auto',
        'focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-cream',
        cardLayout[index % cardLayout.length],
      )}
    >
      <motion.span
        layoutId={`gallery-image-${item.id}`}
        className="absolute inset-0 overflow-hidden rounded-xl"
        transition={spring.soft}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={index < 4}
          quality={82}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn(
            'object-cover transition-transform duration-700 ease-smooth group-hover:scale-105',
            imagePosition[index % imagePosition.length],
          )}
        />
      </motion.span>
      {item.moreCount && (
        <div className="absolute inset-0 grid place-items-center rounded-xl bg-ink/50">
          <span className="text-4xl font-extrabold tracking-tight text-cream sm:text-5xl">
            {item.moreCount}
          </span>
        </div>
      )}
    </motion.button>
  );
}

function GalleryDialog({
  item,
  originItemId,
  total,
  index,
  direction,
  reduce,
  onClose,
  onNext,
  onPrevious,
}: {
  item: GalleryItem;
  originItemId: string;
  total: number;
  index: number;
  direction: 1 | -1;
  reduce: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const orbitVariants = {
    enter: (travelDir: 1 | -1) => ({
      opacity: 0,
      transform: travelDir === 1
        ? 'translate3d(34%, 9%, 0) rotate(5deg) scale(0.96)'
        : 'translate3d(-34%, 9%, 0) rotate(-5deg) scale(0.96)',
    }),
    center: { opacity: 1, transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)' },
    exit: (travelDir: 1 | -1) => ({
      opacity: 0,
      transform: travelDir === 1
        ? 'translate3d(-34%, -9%, 0) rotate(-5deg) scale(0.96)'
        : 'translate3d(34%, -9%, 0) rotate(5deg) scale(0.96)',
    }),
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-dialog-title"
      className="fixed inset-0 z-[70] grid place-items-center bg-[#140f0d]/88 px-4 py-6 backdrop-blur-xl sm:px-6"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: duration.fast, ease: ease.out }}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-6xl flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Judul & Tombol Tutup */}
        <div className="flex items-start justify-between gap-4 text-cream">
          <div className="min-w-0">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cream/60">
              {item.category}
            </p>
            <h3 id="gallery-dialog-title" className="line-clamp-2 text-xl font-extrabold sm:text-2xl">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Tutup galeri"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/20 bg-cream/10 text-2xl leading-none text-cream transition-colors duration-300 hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/70"
          >
            ×
          </button>
        </div>

        {/* Gambar Utama + Navigasi */}
        <div className="relative grid min-h-[54dvh] place-items-center">
          <ViewerButton label="Foto sebelumnya" direction="left" onClick={onPrevious} />
          <ViewerButton label="Foto berikutnya" direction="right" onClick={onNext} />
          
          {/* ✅ layoutId dipastikan sama persis dengan kartu */}
          <motion.div
            layoutId={`gallery-image-${originItemId}`}
            className="relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            transition={{ ...spring.soft, layout: { duration: 0.4 } }}
          >
            <div className="relative aspect-[16/10] max-h-[72dvh] w-full overflow-hidden bg-[#211916]">
              <AnimatePresence custom={direction} mode="wait" initial={false}>
                <motion.div
                  key={item.id}
                  custom={direction}
                  variants={orbitVariants}
                  initial={reduce ? false : 'enter'}
                  animate={reduce ? undefined : 'center'}
                  exit={reduce ? undefined : 'exit'}
                  transition={{ duration: duration.base, ease: ease.inOut }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority // ✅ Selalu dimuat cepat
                    quality={90}
                    sizes="(min-width: 1024px) 80vw, 92vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Penomoran */}
        <div className="mx-auto flex items-center gap-4 text-xs font-bold text-cream/70">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-12 bg-cream/30" />
          <span>{String(total).padStart(2, '0')}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ViewerButton({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/20 bg-cream/10 text-3xl leading-none text-cream backdrop-blur-xl transition-colors duration-300 hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/70',
        direction === 'left' ? 'left-2 sm:-left-4 lg:-left-14' : 'right-2 sm:-right-4 lg:-right-14',
      )}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
}