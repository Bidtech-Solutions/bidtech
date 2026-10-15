"use client";

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { CardStack, type CardStackItem } from '@/components/ui/card-stack'
import { RevealText } from '@/components/ui/reveal-text'
import { DynamicTextSlider } from '@/components/ui/dynamic-text-slider'
import { useLanguage } from '@/components/providers/language-provider'

const dishImages = [
  'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 220, damping: 28 },
  },
}

const stackVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 180,
      damping: 26,
      delay: 0.4,
    },
  },
}

export function SignatureDishes() {
  const { t, language } = useLanguage();

  const dishes: CardStackItem[] = useMemo(() => [
    {
      id: 1,
      title: 'Margherita Classica',
      description: language === "en" ? 'San Marzano tomato, buffalo mozzarella, fresh basil' : 'Tomat San Marzano, keju mozzarella kerbau, daun kemangi segar',
      tag: language === "en" ? 'Signature' : 'Ikonik',
      imageSrc:
        'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 2,
      title: 'Double Smash',
      description: language === "en" ? 'Two beef patties, aged cheddar, secret sauce, brioche' : 'Dua patty daging sapi Angus, aged cheddar, saus rahasia, brioche',
      tag: language === "en" ? 'Best Seller' : 'Terlaris',
      imageSrc:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 3,
      title: 'Truffle Pepperoni',
      description: language === "en" ? 'Calabrian pepperoni, truffle oil, smoked mozzarella' : 'Pepperoni Calabria, minyak truffle, smoked mozzarella',
      tag: language === "en" ? 'Chef Pick' : 'Pilihan Koki',
      imageSrc:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 4,
      title: 'Mushroom Bacon',
      description: language === "en" ? 'Porcini, crispy bacon, gruyère, caramelized onion' : 'Jamur porcini, bacon renyah, keju gruyère, bawang karamel',
      tag: language === "en" ? 'Limited' : 'Spesial',
      imageSrc:
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 5,
      title: 'Pasta al Tartufo',
      description: language === "en" ? 'Hand-rolled tagliatelle, butter, parmigiano, black truffle' : 'Tagliatelle gulung tangan, mentega, parmigiano, truffle hitam',
      tag: language === "en" ? 'Seasonal' : 'Musiman',
      imageSrc:
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 6,
      title: 'Tiramisu della Casa',
      description: language === "en" ? 'Espresso-soaked ladyfingers, mascarpone, cocoa nibs' : 'Biskuit ladyfingers celup espresso, mascarpone, serbuk kakao',
      tag: language === "en" ? 'Sweet' : 'Manis',
      imageSrc:
        'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    },
  ], [language]);

  return (
    <section id="dishes" className="relative w-full bg-white dark:bg-[#121215] text-foreground dark:text-white py-12 sm:py-16 md:py-24 overflow-hidden scroll-mt-20">
      <div className="container-app relative">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={itemVariants} className="text-eyebrow mb-2 sm:mb-4">
            {t("Hidangan Khas", "Signature Dishes")}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground dark:text-white text-balance mb-3 sm:mb-4 leading-tight"
          >
            {t("Menu yang membuat kami", "Plates we're")}{' '}
            <DynamicTextSlider>
              <RevealText
                text="FAMOUS"
                textColor="text-foreground dark:text-white"
                overlayColor="text-brand-500"
                letterImages={dishImages}
                className="font-display"
              />
            </DynamicTextSlider>{' '}
            {t("dikenal luas", "for")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty"
          >
            {t(
              "Geser atau sentuh kartu. Enam kreasi hidangan yang membangun reputasi kami — dimasak dengan ketelitian yang sama sejak hari pertama.",
              "Drag, swipe, or tap. Six of the dishes that built our reputation — crafted with the same care since day one."
            )}
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-5xl"
          variants={stackVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <CardStack
            items={dishes}
            initialIndex={0}
            autoAdvance
            intervalMs={3200}
            pauseOnHover
            showDots
            cardWidth={460}
            cardHeight={300}
          />
        </motion.div>
      </div>
    </section>
  )
}
