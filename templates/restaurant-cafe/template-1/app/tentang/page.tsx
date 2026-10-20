'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function TentangPage() {
  const { t, isEn } = useLanguage();

  return (
    <>
      <Header />
      <main className="bg-white text-cocoa min-h-screen">
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[580px] md:min-h-[640px] flex items-center bg-cocoa overflow-hidden pt-32 md:pt-40 pb-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/gallery/interior-main-dining.webp"
              alt="Dining atmosphere"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
          </div>

          <div className="shell relative z-10 w-full">
            <Reveal>
              <div className="max-w-xl md:max-w-2xl flex flex-col space-y-6">
                <p className="eyebrow text-ember tracking-widest uppercase text-xs sm:text-sm font-semibold">
                  {t.tentang.heroEyebrow}
                </p>

                <h1 className="heading text-3xl sm:text-5xl md:text-6xl text-white font-extrabold leading-[1.2] md:leading-[1.22]">
                  {t.tentang.heroTitle1} <br />
                  <span className="text-white/90">{t.tentang.heroTitle2}</span>
                </h1>

                <p className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-lg pt-2">
                  {t.tentang.heroDesc}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 NILAI UTAMA */}
        <section className="py-20 bg-[#FEF6F3]">
          <div className="shell">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-4 md:px-10">
              <Reveal delay={0.1}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border border-ember flex items-center justify-center text-ember mb-5 bg-transparent">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="heading text-lg mb-3">{t.tentang.value1Title}</h3>
                  <p className="text-sm text-cocoa/70 leading-relaxed">
                    {t.tentang.value1Desc}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border border-ember flex items-center justify-center text-ember mb-5 bg-transparent">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="heading text-lg mb-3">{t.tentang.value2Title}</h3>
                  <p className="text-sm text-cocoa/70 leading-relaxed">
                    {t.tentang.value2Desc}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border border-ember flex items-center justify-center text-ember mb-5 bg-transparent">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="heading text-lg mb-3">{t.tentang.value3Title}</h3>
                  <p className="text-sm text-cocoa/70 leading-relaxed">
                    {t.tentang.value3Desc}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CERITA KAMI */}
        <section className="py-24 bg-white">
          <div className="shell">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <Reveal>
                  <p className="eyebrow mb-3">{t.tentang.storyEyebrow}</p>
                  
                  <h2 className="heading text-3xl md:text-4xl mb-6 leading-tight">
                    {t.tentang.storyTitle}
                  </h2>
                  <div className="space-y-5 text-cocoa/80 text-base leading-relaxed">
                    <p>{t.tentang.storyP1}</p>
                    <p>{t.tentang.storyP2}</p>
                  </div>
                </Reveal>
              </div>

              {/* Grid Gambar */}
              <div className="order-1 lg:order-2">
                <Reveal>
                  <div className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src="/assets/gallery/interior-open-kitchen.webp"
                        alt="Kitchen"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grid grid-rows-2 gap-4 h-full">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
                        <Image
                          src="/assets/gallery/interior-bar-counter.webp"
                          alt="Bar counter"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md bg-cocoa/5">
                        <Image
                          src="/assets/gallery/interior-corner-table.webp"
                          alt="Corner table"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* MENGAPA MEMILIH KAMI / KOMITMEN */}
        <section className="py-20 bg-white border-t border-cocoa/10">
          <div className="shell text-center">
            <Reveal>
              <h2 className="heading text-3xl mb-12">
                {isEn ? 'Our Unwavering Commitment to You' : 'Komitmen Kami Kepada Anda'}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <Reveal delay={0.1}>
                <div className="h-full flex flex-col bg-white border border-cocoa/10 rounded-2xl p-8 text-left shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#FEF6F3] rounded-full flex items-center justify-center text-ember mb-6">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>
                  <h3 className="heading text-lg mb-2">
                    {isEn ? 'Uncompromised Standards' : 'Standar Kualitas'}
                  </h3>
                  <p className="text-sm text-cocoa/70 leading-relaxed">
                    {isEn
                      ? 'We never serve anything that we wouldn’t proudly enjoy serving to our own family.'
                      : 'Kami tidak akan menghidangkan sesuatu yang kami sendiri tidak ingin memakannya.'}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="h-full flex flex-col bg-white border border-cocoa/10 rounded-2xl p-8 text-left shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#FEF6F3] rounded-full flex items-center justify-center text-ember mb-6">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"/></svg>
                  </div>
                  <h3 className="heading text-lg mb-2">
                    {isEn ? 'Kitchen Hygiene' : 'Kebersihan Dapur'}
                  </h3>
                  <p className="text-sm text-cocoa/70 leading-relaxed">
                    {isEn
                      ? 'Strict culinary sanitation maintained rigorously from raw preparation to table service.'
                      : 'Menjaga higienitas tingkat tinggi dari tahap persiapan bahan hingga makanan tiba di meja Anda.'}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="h-full flex flex-col bg-white border border-cocoa/10 rounded-2xl p-8 text-left shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#FEF6F3] rounded-full flex items-center justify-center text-ember mb-6">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>
                  </div>
                  <h3 className="heading text-lg mb-2">
                    {isEn ? 'Heartfelt Service' : 'Layanan Ramah'}
                  </h3>
                  <p className="text-sm text-cocoa/70 leading-relaxed">
                    {isEn
                      ? 'Every guest is family. We are committed to welcoming you with warmth, smiles, and attention.'
                      : 'Setiap tamu adalah bagian dari keluarga kami. Kami berkomitmen memberikan senyuman dan pelayanan terbaik.'}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
