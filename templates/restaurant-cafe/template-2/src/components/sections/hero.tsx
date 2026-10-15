"use client";

import { FloatingFoodHero } from '@/components/ui/hero-section'
import { useLanguage } from '@/components/providers/language-provider'

const heroImages = [
  {
    src: 'https://b.zmtcdn.com/data/o2_assets/110a09a9d81f0e5305041c1b507d0f391743058910.png',
    alt: 'A delicious cheeseburger',
    className:
      'w-40 sm:w-56 md:w-64 lg:w-72 top-10 left-4 sm:left-10 md:top-20 md:left-20 animate-float',
  },
  {
    src: 'https://b.zmtcdn.com/data/o2_assets/b4f62434088b0ddfa9b370991f58ca601743060218.png',
    alt: 'A bamboo steamer with dumplings',
    className:
      'w-28 sm:w-36 md:w-48 top-10 right-4 sm:right-10 md:top-16 md:right-16 animate-float',
  },
  {
    src: 'https://b.zmtcdn.com/data/o2_assets/316495f4ba2a9c9d9aa97fed9fe61cf71743059024.png',
    alt: 'A slice of pizza',
    className:
      'w-32 sm:w-40 md:w-56 bottom-8 right-5 sm:right-10 md:bottom-16 md:right-20 animate-float',
  },
  {
    src: 'https://b.zmtcdn.com/data/o2_assets/70b50e1a48a82437bfa2bed925b862701742892555.png',
    alt: 'A basil leaf',
    className: 'w-8 sm:w-12 top-1/4 left-1/3 animate-float',
  },
  {
    src: 'https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png',
    alt: 'A slice of tomato',
    className: 'w-8 sm:w-10 top-1/2 right-1/4 animate-float',
  },
  {
    src: 'https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png',
    alt: 'A slice of tomato',
    className: 'w-8 sm:w-10 top-3/4 left-1/4 animate-float',
  },
]

export function Hero() {
  const { t } = useLanguage();

  return (
    <FloatingFoodHero
      title={t("Makanan Lebih Baik untuk Semua", "Better food for more people")}
      description={t(
        "Selama lebih dari satu dekade, kami memudahkan pelanggan menemukan cita rasa baru yang autentik dan dimasak segar dari bahan terbaik.",
        "For over a decade, we've enabled our customers to discover new tastes, delivered right to their doorstep."
      )}
      images={heroImages}
    />
  )
}
