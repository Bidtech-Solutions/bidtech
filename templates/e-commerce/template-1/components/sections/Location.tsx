"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-gold-500" />,
      title: language === "en" ? "Store Address" : "Alamat Toko",
      details: ["Jl. Raja H. Fisabilillah No. 123", "Batam, Kepulauan Riau"],
    },
    {
      icon: <Clock className="w-5 h-5 text-gold-500" />,
      title: language === "en" ? "Opening Hours" : "Jam Buka",
      details: [language === "en" ? "Every Day 09:00 AM - 10:00 PM" : "Setiap Hari 09.00 - 22.00"],
    },
    {
      icon: <Phone className="w-5 h-5 text-gold-500" />,
      title: "WhatsApp",
      details: ["0812-3456-7890"],
      href: "https://wa.me/6281234567890",
    },
    {
      icon: <InstagramIcon className="w-5 h-5 text-gold-500" />,
      title: "Instagram",
      details: ["@kounterku.store"],
      href: "https://instagram.com/kounterku.store",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Contact info items stagger
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Map container reveal
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="kontak" className="py-20 sm:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-[13px] font-bold text-gold-500 uppercase tracking-[0.1em] mb-2 inline-block">
            {t.location.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-ink-900 tracking-[-0.03em] leading-tight">
            {language === "en" ? "Location & Contact" : "Lokasi & Kontak"}
          </h2>
        </div>

        {/* 2 Columns: Contact Info & Real Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 4 Contact Info Items */}
          <div ref={leftColRef} className="lg:col-span-4 space-y-6 sm:space-y-7">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[14px] border border-gold-300/70 bg-gold-50 flex items-center justify-center flex-shrink-0 shadow-xs">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-[17px] font-bold text-ink-900 leading-snug mb-1">
                    {item.title}
                  </h3>
                  {item.details.map((line, i) => (
                    item.href ? (
                      <a 
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-[13.5px] text-txt-500 hover:text-gold-600 block transition-colors leading-relaxed"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-xs sm:text-[13.5px] text-txt-500 leading-relaxed">
                        {line}
                      </p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Real Google Maps Embed Container */}
          <div ref={mapRef} className="lg:col-span-8">
            <div className="relative rounded-[24px] overflow-hidden border border-border/80 shadow-[0_12px_32px_rgba(0,0,0,0.06)] h-[340px] sm:h-[400px] w-full bg-[#E5E3DF] group">
              
              {/* Real Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.057393457002!2d104.048479!3d1.129841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da9772a721b04f%3A0xb3671239c0fa1ec7!2sJl.%20Raja%20H.%20Fisabilillah%2C%20Kota%20Batam%2C%20Kepulauan%20Riau!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
                title="Peta Lokasi KONTERKU Batam"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
