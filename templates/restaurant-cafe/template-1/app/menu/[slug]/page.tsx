'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';
import { MENU_ITEMS, formatPrice } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';

export default function DetailProdukPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t, isEn } = useLanguage();

  const [qty, setQty] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['standar']);

  const item = MENU_ITEMS.find((m) => m.slug === slug) || MENU_ITEMS[0];

  const EXTRA_OPTIONS: Record<
    string,
    {
      titleId: string;
      titleEn: string;
      options: { id: string; nameId: string; nameEn: string; price: number }[];
    }
  > = {
    Burger: {
      titleId: 'Pilih Saus Pendamping',
      titleEn: 'Select Accompanying Sauce',
      options: [
        { id: 'standar', nameId: 'Saus Rahasia Khas', nameEn: 'Secret Signature Sauce', price: 0 },
        { id: 'keju', nameId: 'Saus Keju Cheddar Leleh', nameEn: 'Melted Cheddar Sauce', price: 10000 },
        { id: 'tartar', nameId: 'Saus Tartar Herbal', nameEn: 'Herbed Tartar Sauce', price: 8000 },
        { id: 'pedas', nameId: 'Saus Pedas Khas', nameEn: 'Fiery House Sauce', price: 8000 },
      ],
    },
    Taco: {
      titleId: 'Pilih Saus Pendamping',
      titleEn: 'Select Accompanying Sauce',
      options: [
        { id: 'standar', nameId: 'Salsa Segar', nameEn: 'Fresh Citrus Salsa', price: 0 },
        { id: 'keju', nameId: 'Saus Keju Krim', nameEn: 'Creamy Queso Sauce', price: 10000 },
        { id: 'pedas', nameId: 'Saus Cabai Api', nameEn: 'Fire Roasted Chili', price: 8000 },
        { id: 'krim', nameId: 'Krim Asam Segar', nameEn: 'Cultured Sour Cream', price: 8000 },
      ],
    },
    Wrap: {
      titleId: 'Pilih Saus Pendamping',
      titleEn: 'Select Accompanying Sauce',
      options: [
        { id: 'standar', nameId: 'Saus Rumahan', nameEn: 'House Herb Dressing', price: 0 },
        { id: 'mayones', nameId: 'Mayones Bawang Putih', nameEn: 'Garlic Aioli', price: 8000 },
        { id: 'yogurt', nameId: 'Saus Yogurt Herbal', nameEn: 'Herbed Greek Yogurt', price: 10000 },
        { id: 'pedas', nameId: 'Saus Sambal Lembut', nameEn: 'Sweet Mild Chili', price: 8000 },
      ],
    },
    Minuman: {
      titleId: 'Tambahan & Penyesuaian',
      titleEn: 'Customization & Add-ons',
      options: [
        { id: 'standar', nameId: 'Penyajian Standar', nameEn: 'Standard Serving', price: 0 },
        { id: 'gula', nameId: 'Tambah Tingkat Manis', nameEn: 'Extra Sweetness', price: 3000 },
        { id: 'es', nameId: 'Ekstra Es Batu', nameEn: 'Extra Crisp Ice', price: 3000 },
        { id: 'ukuran', nameId: 'Ukuran Besar (+20%)', nameEn: 'Large Cup (+20%)', price: 8000 },
      ],
    },
  };

  const categoryKey = item.category || 'Burger';
  const currentExtras = EXTRA_OPTIONS[categoryKey] || EXTRA_OPTIONS['Burger'];

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => {
      if (id === 'standar') return ['standar'];
      const filtered = prev.filter((x) => x !== 'standar');
      if (filtered.includes(id)) {
        const next = filtered.filter((x) => x !== id);
        return next.length === 0 ? ['standar'] : next;
      } else {
        return [...filtered, id];
      }
    });
  };

  const extrasTotal = selectedExtras.reduce((acc, id) => {
    const opt = currentExtras.options.find((o) => o.id === id);
    return acc + (opt ? opt.price : 0);
  }, 0);

  const totalPrice = (item.price + extrasTotal) * qty;

  const itemName = isEn ? item.nameEn : item.name;
  const itemDesc = isEn ? item.descriptionEn : item.description;

  const handleOrderWhatsApp = () => {
    const extraNames = selectedExtras
      .map((id) => {
        const opt = currentExtras.options.find((o) => o.id === id);
        return opt ? (isEn ? opt.nameEn : opt.nameId) : id;
      })
      .join(', ');

    const text = isEn
      ? `Hello Chef's Table! I would like to order: ${itemName} (${qty} portion(s)). Options: ${extraNames}. Total: ${formatPrice(totalPrice)}.`
      : `Halo Chef's Table! Saya ingin memesan: ${itemName} sebanyak ${qty} porsi. Tambahan: ${extraNames}. Total estimasi: ${formatPrice(totalPrice)}.`;

    window.open(`https://wa.me/6282376680987?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <Header />
      <main className="bg-white text-cocoa min-h-screen pt-32 md:pt-40 pb-20">
        <div className="shell max-w-5xl">
          <Reveal>
            <div className="mb-8">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cocoa/70 hover:text-ember transition-colors"
              >
                ← {t.menuDetail.back}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
              {/* Product Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-cream/60 border border-cocoa/10 shadow-lg">
                <Image
                  src={item.image}
                  alt={itemName}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <span className="eyebrow text-xs text-ember font-bold tracking-widest uppercase">
                    {item.category}
                  </span>
                  <h1 className="heading text-3xl sm:text-4xl font-extrabold text-ink mt-1 mb-2">
                    {itemName}
                  </h1>
                  <p className="text-xl sm:text-2xl font-black text-ember">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="space-y-2 border-t border-b border-cocoa/10 py-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cocoa/70">
                    {t.menuDetail.descriptionTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-cocoa/90 font-light">
                    {itemDesc}
                  </p>
                </div>

                {/* Extras / Sauces */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cocoa/80">
                    {isEn ? currentExtras.titleEn : currentExtras.titleId}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentExtras.options.map((opt) => {
                      const isSelected = selectedExtras.includes(opt.id);
                      const optName = isEn ? opt.nameEn : opt.nameId;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleExtra(opt.id)}
                          className={`px-3 py-2.5 rounded-xl border text-xs text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-ember bg-ember/5 text-ember font-bold'
                              : 'border-cocoa/15 bg-white text-cocoa/80 hover:border-cocoa/40'
                          }`}
                        >
                          <span>{optName}</span>
                          {opt.price > 0 && (
                            <span className="text-[11px] opacity-80">
                              +{formatPrice(opt.price)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity & Summary */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 bg-cream/70 border border-cocoa/15 rounded-full px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded-full bg-white text-ink font-bold grid place-items-center shadow-xs cursor-pointer hover:bg-ember hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm w-6 text-center">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      className="w-7 h-7 rounded-full bg-white text-ink font-bold grid place-items-center shadow-xs cursor-pointer hover:bg-ember hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-cocoa/60 block">
                      {t.menuDetail.estimatedTotal}
                    </span>
                    <span className="text-2xl font-black text-ink">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleOrderWhatsApp}
                  className="w-full py-4 rounded-full bg-ember hover:bg-ember-dark text-cream font-bold text-sm tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  {t.menuDetail.orderWaBtn}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
