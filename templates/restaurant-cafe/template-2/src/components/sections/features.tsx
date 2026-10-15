"use client";

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Utensils, Clock, Leaf } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

export function Features() {
  const { t, language } = useLanguage();

  const features = useMemo(() => [
    {
      title: language === "en" ? 'Chef-Driven Menu' : 'Menu Olahan Koki',
      description: language === "en"
        ? 'Every dish is crafted from scratch using traditional techniques and modern twists.'
        : 'Setiap menu dimasak dari awal menggunakan teknik tradisional dengan sentuhan rasa modern.',
      icon: <Utensils className="h-6 w-6 text-brand-500" />,
    },
    {
      title: language === "en" ? 'Fast Casual' : 'Cepat & Berkualitas',
      description: language === "en"
        ? 'We believe great food shouldn’t mean a long wait. Get your favorites in under 15 minutes.'
        : 'Makanan lezat tidak harus menunggu lama. Nikmati hidangan favorit Anda dalam waktu di bawah 15 menit.',
      icon: <Clock className="h-6 w-6 text-brand-500" />,
    },
    {
      title: language === "en" ? 'Locally Sourced' : 'Bahan Lokal Segar',
      description: language === "en"
        ? 'We partner with local farms and artisans to ensure the freshest ingredients every day.'
        : 'Kami bermitra dengan petani lokal untuk memastikan pasokan bahan terbaik dan paling segar setiap hari.',
      icon: <Leaf className="h-6 w-6 text-brand-500" />,
    },
  ], [language]);

  return (
    <section id="story" className="relative w-full bg-white dark:bg-[#121215] pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12 scroll-mt-20">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <p className="text-eyebrow mb-2 sm:mb-4">
            {t("Mengapa Memilih Kami", "Why choose us")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4 text-foreground leading-tight">
            {t("Kualitas Tanpa Kompromi", "Quality without compromise")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty">
            {t(
              "Kami meniadakan suasana kaku, namun tetap menjaga disiplin serta kesempurnaan teknik kuliner.",
              "We're stripping away the white tablecloths, but keeping the culinary rigor."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="h-full bg-neutral-50 dark:bg-card border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl">
                <CardHeader className="p-5 sm:p-6">
                  <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-brand-500/10 flex items-center justify-center mb-3 sm:mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-1.5 sm:mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
