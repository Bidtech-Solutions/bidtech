'use client';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { useMemo, useState } from 'react';
import { MENU_FILTERS, MENU_ITEMS, formatPrice } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { fadeUp, spring, staggerParent } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';
import { useLanguage } from '@/context/LanguageContext';

const C_PRIMARY = '#9E3B2B';
const PAGE_SIZE = 4;

export default function Menu() {
  const reduce = useReducedMotion();
  const { t, isEn } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'Semua') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const visibleItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function chooseFilter(filterKey: string) {
    setActiveFilter(filterKey);
    setPage(1);
  }

  return (
    <section id="menu" className="py-10 bg-[#fffdf8]">
      <div className="shell">
        {/* Judul & Filter */}
        <div className="mb-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Reveal>
              <p className="eyebrow mb-2 font-medium tracking-widest text-sm" style={{ color: C_PRIMARY }}>
                {t.homeMenu.eyebrow}
              </p>
            </Reveal>
            <SplitWords
              as="h2"
              text={t.homeMenu.title}
              className="heading text-3xl sm:text-4xl font-bold text-gray-900"
            />
          </div>
          <Reveal delay={0.12}>
            <LayoutGroup id="menu-filter-tabs">
              <div
                role="tablist"
                aria-label="Filter kategori menu"
                className="flex flex-wrap gap-2.5 justify-start md:justify-end"
              >
                {MENU_FILTERS.map((f) => {
                  const active = f.key === activeFilter;
                  const label = isEn ? f.labelEn : f.labelId;
                  return (
                    <button
                      key={f.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => chooseFilter(f.key)}
                      className={cn(
                        'relative h-9 px-5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                        active
                          ? 'text-white shadow-lg'
                          : 'bg-transparent text-gray-600 hover:text-gray-900'
                      )}
                      style={active ? { backgroundColor: C_PRIMARY, boxShadow: `0 10px 15px -3px ${C_PRIMARY}20` } : {}}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-menu-filter"
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: C_PRIMARY }}
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

        {/* Grid Kartu Menu */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${page}-${isEn}`}
            variants={reduce ? undefined : staggerParent(0.08)}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'show'}
            exit={
              reduce
                ? undefined
                : { opacity: 0, y: 8, transition: { duration: 0.2 } }
            }
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleItems.length > 0 ? (
              visibleItems.map((item) => (
                <MenuCard key={item.slug} item={item} isEn={isEn} reduce={Boolean(reduce)} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                {isEn ? 'No dishes available in this category.' : 'Belum ada menu untuk kategori ini.'}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Paginasi */}
        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-2">
            <PaginationButton
              label={isEn ? "Previous page" : "Halaman sebelumnya"}
              disabled={page === 1}
              onClick={() => setPage((c) => Math.max(1, c - 1))}
            >
              &lsaquo;
            </PaginationButton>
            {pages.map((n) => (
              <PaginationButton
                key={n}
                label={isEn ? `Page ${n}` : `Halaman ${n}`}
                active={n === page}
                onClick={() => setPage(n)}
              >
                {n}
              </PaginationButton>
            ))}
            <PaginationButton
              label={isEn ? "Next page" : "Halaman berikutnya"}
              disabled={page === totalPages}
              onClick={() => setPage((c) => Math.min(totalPages, c + 1))}
            >
              &rsaquo;
            </PaginationButton>
          </nav>
        )}
      </div>
    </section>
  );
}

function MenuCard({ item, isEn, reduce }: { item: any; isEn: boolean; reduce: boolean }) {
  const name = isEn ? item.nameEn : item.name;
  const description = isEn ? item.descriptionEn : item.description;
  const badge = isEn ? (item.badgeEn || item.badge) : item.badge;

  return (
    <Link href={`/menu/${item.slug}`} className="block cursor-pointer">
      <motion.article
        layout
        variants={reduce ? undefined : fadeUp}
        whileHover={reduce ? undefined : { y: -4 }}
        transition={spring.soft}
        className="group bg-white rounded-2xl overflow-hidden border border-[#f8e7e0] transition-all duration-300 hover:shadow-md"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#fff3ed]">
          <Image
            src={item.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {badge && (
            <span
              className="absolute right-3 top-3 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm"
              style={{ backgroundColor: C_PRIMARY }}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-base mb-1 text-gray-900 group-hover:text-[#9E3B2B] transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">
            {description}
          </p>
          <div className="w-full py-2 border border-[#f0d9cf] rounded-full text-center group-hover:border-[#9E3B2B]/30 transition-colors">
            <span className="font-semibold text-sm text-gray-900">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function PaginationButton({
  children,
  label,
  active = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer',
        active
          ? 'bg-[#9E3B2B] text-white shadow-sm'
          : disabled
            ? 'cursor-not-allowed opacity-30 text-gray-400'
            : 'border border-[#f0d9cf] bg-white text-gray-700 hover:border-[#9E3B2B] hover:text-[#9E3B2B]'
      )}
    >
      {children}
    </button>
  );
}
