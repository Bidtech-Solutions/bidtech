'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';
import { MENU_ITEMS, formatPrice } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';

export default function MenuPage() {
  const { t, isEn } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('semua');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { key: 'semua', label: isEn ? 'All' : 'Semua' },
    { key: 'burger', label: 'Burger' },
    { key: 'taco', label: 'Taco' },
    { key: 'wrap', label: 'Wrap' },
    { key: 'minuman', label: isEn ? 'Beverages' : 'Minuman' },
  ];

  const filteredItems = activeCategory === 'semua'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((i) => i.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <Header />
      <main className="bg-white text-cocoa min-h-screen">
        <section className="section pt-32 md:pt-44 pb-16 bg-white">
          <div className="shell">
            <div className="mb-10 text-center md:text-left">
              <Reveal>
                <p className="eyebrow mb-2 font-medium tracking-widest text-sm text-ember">
                  {t.menuPage.eyebrow}
                </p>
                <h1 className="heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {t.menuPage.title}
                </h1>
                <p className="text-sm sm:text-base text-cocoa/70 max-w-xl font-light">
                  {t.menuPage.subtitle}
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              {/* SIDEBAR KATEGORI */}
              <aside className="w-full md:w-52 flex-shrink-0 md:sticky md:top-28">
                <Reveal>
                  {/* Mobile Dropdown Button */}
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex md:hidden w-full items-center justify-between px-5 py-3.5 bg-cream rounded-2xl border border-cocoa/15 text-sm font-semibold text-ink shadow-sm cursor-pointer"
                  >
                    <span>
                      {t.menuPage.categoryFilterTitle}: {categories.find((c) => c.key === activeCategory)?.label}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* List Kategori */}
                  <div
                    className={`mt-2 md:mt-0 flex flex-col gap-1.5 ${
                      isMobileMenuOpen ? 'block' : 'hidden md:flex'
                    } bg-cream/70 md:bg-transparent p-3 md:p-0 rounded-2xl border md:border-0 border-cocoa/10`}
                  >
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.key;
                      return (
                        <button
                          key={cat.key}
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat.key);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-ember text-cream shadow-sm font-bold'
                              : 'text-cocoa/80 hover:bg-cocoa/5 hover:text-ink'
                          }`}
                        >
                          <span>{cat.label}</span>
                          {isActive && <span className="text-xs">●</span>}
                        </button>
                      );
                    })}
                  </div>
                </Reveal>
              </aside>

              {/* GRID MENU ITEMS */}
              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => {
                    const name = isEn ? item.nameEn : item.name;
                    const description = isEn ? item.descriptionEn : item.description;
                    const badge = isEn ? (item.badgeEn || item.badge) : item.badge;

                    return (
                      <div
                        key={item.slug}
                        className="bg-white rounded-2xl overflow-hidden border border-cocoa/10 hover:border-ember/30 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative aspect-[4/3] overflow-hidden bg-cream/50">
                            <Image
                              src={item.image}
                              alt={name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {badge && (
                              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ember text-cream text-[11px] font-bold shadow">
                                {badge}
                              </span>
                            )}
                          </div>

                          <div className="p-5">
                            <h3 className="font-bold text-lg text-ink mb-1 group-hover:text-ember transition-colors">
                              {name}
                            </h3>
                            <p className="text-xs sm:text-sm text-cocoa/70 line-clamp-2 leading-relaxed mb-4">
                              {description}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 pt-0 border-t border-cocoa/5 mt-auto flex items-center justify-between">
                          <span className="font-bold text-base text-ink">
                            {formatPrice(item.price)}
                          </span>

                          <Link
                            href={`/menu/${item.slug}`}
                            className="px-4 py-2 rounded-full bg-cocoa/5 hover:bg-ember hover:text-cream text-ink text-xs font-semibold transition-all duration-200"
                          >
                            {t.menuPage.viewDetail}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
