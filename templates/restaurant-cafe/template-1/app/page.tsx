'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header /> 
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
