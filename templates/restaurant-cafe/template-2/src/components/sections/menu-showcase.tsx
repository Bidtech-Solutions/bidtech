"use client";

import { useMemo } from 'react'
import { InteractiveSelector, type SelectorOption } from '@/components/ui/interactive-selector'
import { RevealText } from '@/components/ui/reveal-text'
import { DynamicTextSlider } from '@/components/ui/dynamic-text-slider'
import { FaPizzaSlice, FaHamburger, FaIceCream, FaCoffee, FaUtensils } from 'react-icons/fa'
import { useLanguage } from '@/components/providers/language-provider'

const foodImages = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
]

export function MenuShowcase() {
  const { t, language } = useLanguage();

  const options: SelectorOption[] = useMemo(() => [
    {
      title: language === "en" ? 'Wood-Fired Pizza' : 'Pizza Tungku Api',
      description: language === "en"
        ? '48-hour proofed sourdough, San Marzano D.O.P, 90-second bake'
        : 'Adonan fermentasi dingin 48 jam, tomat San Marzano D.O.P, panggang 90 detik',
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85',
      icon: <FaPizzaSlice size={22} className="text-white" />,
    },
    {
      title: language === "en" ? 'Smash Burgers' : 'Burger Smash',
      description: language === "en"
        ? '100% grass-fed Angus, toasted brioche bun, double aged cheddar'
        : '100% daging sapi Angus, roti brioche panggang wangi, lelehan aged cheddar',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=85',
      icon: <FaHamburger size={22} className="text-white" />,
    },
    {
      title: language === "en" ? 'Pasta Bar' : 'Bar Pasta Segar',
      description: language === "en"
        ? 'Hand-rolled fresh daily, 12-hour braised Bolognese ragù'
        : 'Digilas tangan segar setiap pagi, ragù Bolognese rebus perlahan 12 jam',
      image:
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1600&q=85',
      icon: <FaUtensils size={22} className="text-white" />,
    },
    {
      title: language === "en" ? 'Sweet Endings' : 'Dolci & Pencuci Mulut',
      description: language === "en"
        ? 'Classic espresso tiramisu, pistachio cannoli, artisanal gelato'
        : 'Tiramisu espresso autentik, cannoli pistachio, gelato artisan lembut',
      image:
        'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1600&q=85',
      icon: <FaIceCream size={22} className="text-white" />,
    },
    {
      title: language === "en" ? 'Coffee & Drinks' : 'Kopi & Minuman Racikan',
      description: language === "en"
        ? 'Single-origin espresso, botanical mocktails, cold-pressed elixirs'
        : 'Espresso single-origin, mocktail botani herbal, racikan sari buah dingin',
      image:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85',
      icon: <FaCoffee size={22} className="text-white" />,
    },
  ], [language]);

  return (
    <InteractiveSelector
      id="menu"
      eyebrow={t("Menu Pilihan", "Our Menu")}
      subheading={t(
        "Lima kategori kuliner inti kami, masing-masing diracik dengan teknik presisi dan bahan pilihan tanpa kompromi. Sentuh untuk memperluas.",
        "Five core culinary categories, each crafted with obsessive technique and uncompromising ingredients. Tap to expand."
      )}
      options={options}
      heading={
        <>
          {t("Dibuat sesuai selera yang Anda", "Built around what you")}{' '}
          <DynamicTextSlider>
            <RevealText
              text="CRAVE"
              textColor="text-foreground dark:text-white"
              overlayColor="text-brand-500"
              letterImages={foodImages}
              className="font-display"
            />
          </DynamicTextSlider>
        </>
      }
    />
  )
}
