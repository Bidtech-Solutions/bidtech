'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { useLanguage } from '@/context/LanguageContext';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  category: 'head-chef' | 'line-cook' | 'prep-station' | 'service-team';
  categoryLabel: string;
  categoryLabelEn: string;
  image: string;
  badge?: string;
  badgeEn?: string;
  bio: string;
  bioEn: string;
  experience: string;
  experienceEn: string;
  specialty: string;
  specialtyEn: string;
}

const ALL_TEAM_MEMBERS: TeamMember[] = [
  // --- KATEGORI 1: Staff Head Chef ---
  {
    id: '1',
    name: 'Chef Aris Budiman',
    role: 'Kepala Koki Eksekutif',
    roleEn: 'Executive Head Chef',
    category: 'head-chef',
    categoryLabel: 'Staff Head Chef',
    categoryLabelEn: 'Head Chef Brigade',
    image: '/assets/staff/staff%201.webp',
    badge: 'Founder & Chef',
    badgeEn: 'Founder & Chef',
    bio: 'Pendiri sekaligus pengarah kuliner utama dengan pengalaman lebih dari 12 tahun di restoran internasional.',
    bioEn: 'Founder and culinary director with over 12 years of fine dining leadership across international kitchens.',
    experience: '12+ Tahun',
    experienceEn: '12+ Years',
    specialty: 'Executive Culinary & Fine Dining',
    specialtyEn: 'Executive Culinary & Fine Dining',
  },
  {
    id: '2',
    name: 'Chef Hendra Wijaya',
    role: 'Senior Executive Chef',
    roleEn: 'Senior Executive Chef',
    category: 'head-chef',
    categoryLabel: 'Staff Head Chef',
    categoryLabelEn: 'Head Chef Brigade',
    image: '/assets/staff/staff%202.webp',
    bio: 'Ahli dalam mengkurasi menu musiman dan memimpin operasional dapur secara menyeluruh.',
    bioEn: 'Expert in seasonal tasting curation and orchestrating high-precision kitchen brigades.',
    experience: '10 Tahun',
    experienceEn: '10 Years',
    specialty: 'Modern European & Asian Fusion',
    specialtyEn: 'Modern European & Asian Fusion',
  },
  {
    id: '3',
    name: 'Chef Sarah Alatas',
    role: 'Co-Head Chef & R&D',
    roleEn: 'Co-Head Chef & R&D',
    category: 'head-chef',
    categoryLabel: 'Staff Head Chef',
    categoryLabelEn: 'Head Chef Brigade',
    image: '/assets/staff/staff%203.webp',
    bio: 'Fokus pada inovasi menu baru dan riset cita rasa autentik Nusantara berpadu modern.',
    bioEn: 'Focuses on menu innovation and harmonizing authentic Indonesian heritage with modern cuisine.',
    experience: '9 Tahun',
    experienceEn: '9 Years',
    specialty: 'Recipe Development & Fusion',
    specialtyEn: 'Recipe Development & Fusion',
  },
  {
    id: '4',
    name: 'Chef Maya Lestari',
    role: 'Executive Sous Chef',
    roleEn: 'Executive Sous Chef',
    category: 'head-chef',
    categoryLabel: 'Staff Head Chef',
    categoryLabelEn: 'Head Chef Brigade',
    image: '/assets/staff/staff%204.webp',
    bio: 'Mengawasi kualitas seluruh hidangan yang keluar dari dapur utama setiap harinya.',
    bioEn: 'Oversees daily kitchen execution, food consistency, and culinary quality control.',
    experience: '11 Tahun',
    experienceEn: '11 Years',
    specialty: 'Kitchen Operations & Quality',
    specialtyEn: 'Kitchen Operations & Quality',
  },

  // --- KATEGORI 2: Staff Line Cook ---
  {
    id: '5',
    name: 'Chef Arya Saputra',
    role: 'Koki Lini Utama (Pastri)',
    roleEn: 'Lead Pastry Line Cook',
    category: 'line-cook',
    categoryLabel: 'Staff Line Cook',
    categoryLabelEn: 'Line Cook Brigade',
    image: '/assets/staff/staff%205.webp',
    bio: 'Bertanggung jawab atas kesempurnaan lini pembuatan makanan penutup dan pastri harian.',
    bioEn: 'Leads the dessert and artisanal pastry station with artistic precision.',
    experience: '8 Tahun',
    experienceEn: '8 Years',
    specialty: 'Artisan Pastry & Baking',
    specialtyEn: 'Artisan Pastry & Baking',
  },
  {
    id: '6',
    name: 'Chef Budi Santoso',
    role: 'Spesialis Grill & Daging',
    roleEn: 'Grill & Steak Specialist',
    category: 'line-cook',
    categoryLabel: 'Staff Line Cook',
    categoryLabelEn: 'Line Cook Brigade',
    image: '/assets/staff/staff%2010.webp',
    bio: 'Spesialis dalam teknik pemanggangan tingkat presisi tinggi untuk menjaga keempukan daging.',
    bioEn: 'Master of fire and charcoal, searing premium cuts to optimal tenderness.',
    experience: '7 Tahun',
    experienceEn: '7 Years',
    specialty: 'Grill Master & Steaks',
    specialtyEn: 'Grill Master & Steaks',
  },
  {
    id: '7',
    name: 'Chef Aldi Permana',
    role: 'Koki Lini Masak Panas',
    roleEn: 'Hot Kitchen Line Cook',
    category: 'line-cook',
    categoryLabel: 'Staff Line Cook',
    categoryLabelEn: 'Line Cook Brigade',
    image: '/assets/staff/staff%207.webp',
    bio: 'Menangani hidangan utama dengan kecepatan dan konsistensi rasa yang luar biasa.',
    bioEn: 'Executes hot main courses swiftly under high-volume pressure.',
    experience: '6 Tahun',
    experienceEn: '6 Years',
    specialty: 'Hot Kitchen & Main Course',
    specialtyEn: 'Hot Kitchen & Main Course',
  },
  {
    id: '8',
    name: 'Chef Dika Pratama',
    role: 'Line Cook Sauté & Sauce',
    roleEn: 'Line Cook Sauté & Sauce',
    category: 'line-cook',
    categoryLabel: 'Staff Line Cook',
    categoryLabelEn: 'Line Cook Brigade',
    image: '/assets/staff/staff%208.webp',
    bio: 'Pakar racikan saus pendamping hidangan utama yang memperkuat cita rasa.',
    bioEn: 'Sauce craftsman ensuring perfect emulsion, reductions, and savoriness.',
    experience: '5 Tahun',
    experienceEn: '5 Years',
    specialty: 'Sauce Crafting & Sauté',
    specialtyEn: 'Sauce Crafting & Sauté',
  },

  // --- KATEGORI 3: Staff Prep Station ---
  {
    id: '9',
    name: 'Sinta Rahmawati',
    role: 'Kepala Bagian Bahan & Logistik',
    roleEn: 'Head of Ingredient Sourcing',
    category: 'prep-station',
    categoryLabel: 'Staff Prep Station',
    categoryLabelEn: 'Prep Station Brigade',
    image: '/assets/staff/staff%209.webp',
    bio: 'Memastikan seluruh bahan organik dan bumbu segar pilihan langsung dari petani lokal.',
    bioEn: 'Sources seasonal organic vegetables and spices directly from partnered local growers.',
    experience: '5 Tahun',
    experienceEn: '5 Years',
    specialty: 'Ingredient Sourcing & QC',
    specialtyEn: 'Ingredient Sourcing & QC',
  },
  {
    id: '10',
    name: 'Agus Setiawan',
    role: 'Staf Prep & Mise en Place',
    roleEn: 'Prep Cook & Mise en Place',
    category: 'prep-station',
    categoryLabel: 'Staff Prep Station',
    categoryLabelEn: 'Prep Station Brigade',
    image: '/assets/staff/staff%206.webp',
    bio: 'Ahli dalam persiapan pemotongan bahan baku secara higienis dan terstandarisasi.',
    bioEn: 'Specializes in knife work, standardized butchery, and vegetable prep.',
    experience: '4 Tahun',
    experienceEn: '4 Years',
    specialty: 'Precision Cutting & Prep',
    specialtyEn: 'Precision Cutting & Prep',
  },
  {
    id: '11',
    name: 'Fajar Nugroho',
    role: 'Staf Kontrol Kebersihan Dapur',
    roleEn: 'Kitchen Hygiene Lead',
    category: 'prep-station',
    categoryLabel: 'Staff Prep Station',
    categoryLabelEn: 'Prep Station Brigade',
    image: '/assets/staff/staff%2011.webp',
    bio: 'Menjaga standar sterilitas dan kebersihan stasiun kerja dapur sesuai protokol kesehatan.',
    bioEn: 'Ensures strict kitchen sanitization and food safety compliance at all times.',
    experience: '5 Tahun',
    experienceEn: '5 Years',
    specialty: 'Food Safety & Sanitation',
    specialtyEn: 'Food Safety & Sanitation',
  },
  {
    id: '12',
    name: 'Rizky Ramadhan',
    role: 'Prep Station Assistant',
    roleEn: 'Prep Station Assistant',
    category: 'prep-station',
    categoryLabel: 'Staff Prep Station',
    categoryLabelEn: 'Prep Station Brigade',
    image: '/assets/staff/staff%2012.webp',
    bio: 'Menyiapkan bumbu dasar dan bahan mentah sebelum jam operasional dapur dimulai.',
    bioEn: 'Prepares aromatics, slow-simmered stocks, and fresh marinades daily.',
    experience: '3 Tahun',
    experienceEn: '3 Years',
    specialty: 'Vegetable Prep & Spices',
    specialtyEn: 'Vegetable Prep & Spices',
  },

  // --- KATEGORI 4: Staff Service Team ---
  {
    id: '13',
    name: 'Ratna Kusuma',
    role: 'Manajer Restoran & Layanan',
    roleEn: 'Restaurant General Manager',
    category: 'service-team',
    categoryLabel: 'Staff Service Team',
    categoryLabelEn: 'Hospitality Service',
    image: '/assets/staff/staff%2013.webp',
    bio: 'Memimpin tim depan (front-of-house) untuk memberikan pengalaman pelayanan hospitality terbaik.',
    bioEn: 'Leads our front-of-house team delivering genuine, high-touch hospitality.',
    experience: '9 Tahun',
    experienceEn: '9 Years',
    specialty: 'Guest Relations & Management',
    specialtyEn: 'Guest Relations & Management',
  },
  {
    id: '14',
    name: 'Bayu Saputro',
    role: 'Kepala Pelayan (Head Waiter)',
    roleEn: 'Head Waiter',
    category: 'service-team',
    categoryLabel: 'Staff Service Team',
    categoryLabelEn: 'Hospitality Service',
    image: '/assets/staff/staff%2014.webp',
    bio: 'Siap menyambut tamu dengan kehangatan serta memberikan rekomendasi menu spesial.',
    bioEn: 'Welcomes dining guests warmly and provides guided tableside recommendations.',
    experience: '5 Tahun',
    experienceEn: '5 Years',
    specialty: 'VIP Table Service',
    specialtyEn: 'VIP Table Service',
  },
  {
    id: '15',
    name: 'Kartika Putri',
    role: 'Staf Hubungan Tamu',
    roleEn: 'Guest Relations Officer',
    category: 'service-team',
    categoryLabel: 'Staff Service Team',
    categoryLabelEn: 'Hospitality Service',
    image: '/assets/staff/staff%2015.webp',
    bio: 'Menangani reservasi khusus dan memastikan kenyamanan tamu selama berada di Chef Table.',
    bioEn: 'Coordinates private dining bookings and attends to guest personal preferences.',
    experience: '4 Tahun',
    experienceEn: '4 Years',
    specialty: 'Event Hosting & Hospitality',
    specialtyEn: 'Event Hosting & Hospitality',
  },
  {
    id: '16',
    name: 'Dimas Anggara',
    role: 'Professional Bartender & Server',
    roleEn: 'Bartender & Floor Server',
    category: 'service-team',
    categoryLabel: 'Staff Service Team',
    categoryLabelEn: 'Hospitality Service',
    image: '/assets/staff/staff%2016.webp',
    bio: 'Meracik minuman segar pendamping hidangan serta memberikan pelayanan meja yang ramah.',
    bioEn: 'Crafts fresh botanic mocktails and curated beverages paired with each dish.',
    experience: '5 Tahun',
    experienceEn: '5 Years',
    specialty: 'Beverage Crafting & FOH',
    specialtyEn: 'Beverage Crafting & FOH',
  },
];

export default function TeamPage() {
  const { t, isEn } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'head-chef' | 'line-cook' | 'prep-station' | 'service-team'
  >('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMember]);

  // ESC key listener
  useEffect(() => {
    if (!selectedMember) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember]);

  const filteredMembers = ALL_TEAM_MEMBERS.filter((m) =>
    activeFilter === 'all' ? true : m.category === activeFilter
  );

  return (
    <>
      <Header />
      <main className="bg-white text-cocoa min-h-screen">

        {/* HERO SECTION */}
        <section className="section pt-36 md:pt-44 pb-12 bg-white border-b border-cocoa/10">
          <div className="shell text-center max-w-3xl mx-auto">
            <p className="eyebrow mb-3 text-ember tracking-widest text-xs uppercase font-bold">
              {isEn ? 'AUTHENTIC GASTRONOMY' : 'GASTRONOMI AUTENTIK'}
            </p>
            <h1 className="heading text-4xl sm:text-6xl mb-6 text-ink font-extrabold">
              {isEn ? 'Meet Our Creative Team' : 'Temui Tim Kreatif Kami'}
            </h1>
            <p className="text-base sm:text-lg text-cocoa/80 leading-relaxed font-light">
              {isEn
                ? 'Behind every culinary masterpiece and heartwarming ambiance at Chef Table are dedicated artisans crafting perfection for you.'
                : 'Di balik kelezatan hidangan dan kehangatan suasana Chef Table, ada talenta-talenta hebat yang selalu bekerja penuh dedikasi untuk Anda.'}
            </p>
          </div>
        </section>

        {/* MAIN SECTION */}
        <section className="section bg-white pt-10 pb-20">
          <div className="shell space-y-10">

            {/* TAB KATEGORI FILTER */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                {isEn ? 'All Team' : 'Semua'} ({ALL_TEAM_MEMBERS.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('head-chef')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'head-chef'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                {isEn ? 'Head Chef' : 'Staff Head Chef'} (4)
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('line-cook')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'line-cook'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                {isEn ? 'Line Cook' : 'Staff Line Cook'} (4)
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('prep-station')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'prep-station'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                {isEn ? 'Prep Station' : 'Staff Prep Station'} (4)
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('service-team')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'service-team'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                {isEn ? 'Service Team' : 'Staff Service Team'} (4)
              </button>
            </div>

            {/* GRID STAFF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredMembers.map((member) => {
                const role = isEn ? member.roleEn : member.role;
                const categoryLabel = isEn ? member.categoryLabelEn : member.categoryLabel;

                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="group bg-white rounded-3xl overflow-hidden border border-cocoa/15 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    {/* Foto Aspect 4/5 */}
                    <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
                      {member.badge && (
                        <div className="absolute top-3 left-3 z-10 bg-ember text-cream text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                          {isEn ? (member.badgeEn || member.badge) : member.badge}
                        </div>
                      )}
                      
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        priority
                        unoptimized
                        className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Informasi Ringkas */}
                    <div className="p-5 text-center flex-1 flex flex-col justify-between">
                      <div>
                        <p className="eyebrow mb-1 text-[10px] text-ember uppercase tracking-wider font-semibold">
                          {categoryLabel}
                        </p>
                        <h3 className="heading text-lg mb-1 group-hover:text-ember transition-colors font-bold text-ink">
                          {member.name}
                        </h3>
                        <p className="text-cocoa/70 text-xs font-medium">{role}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-cocoa/10">
                        <span className="text-xs font-semibold text-ember group-hover:underline inline-flex items-center gap-1">
                          {isEn ? 'View Profile Details' : 'Lihat Selengkapnya'} &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* MODAL POPUP LIHAT SELENGKAPNYA */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-cocoa/10 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                aria-label="Tutup Profil"
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors text-xs font-bold cursor-pointer"
              >
                ✕
              </button>

              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center"
                />
                {selectedMember.badge && (
                  <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-ember text-cream text-xs font-bold shadow-md">
                    {isEn ? (selectedMember.badgeEn || selectedMember.badge) : selectedMember.badge}
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="eyebrow mb-1 text-ember text-xs font-bold uppercase tracking-wider">
                    {isEn ? selectedMember.categoryLabelEn : selectedMember.categoryLabel}
                  </p>
                  <h3 className="heading text-2xl font-extrabold text-ink mb-0.5">
                    {selectedMember.name}
                  </h3>
                  <p className="text-cocoa/80 text-sm font-semibold">
                    {isEn ? selectedMember.roleEn : selectedMember.role}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-cocoa/60">
                    {isEn ? 'About' : 'Biografi'}
                  </p>
                  <p className="text-cocoa/85 text-sm leading-relaxed">
                    {isEn ? selectedMember.bioEn : selectedMember.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cocoa/10">
                  <div className="bg-cream/50 p-3 rounded-2xl border border-cocoa/10">
                    <p className="eyebrow text-[10px] text-cocoa/60 font-semibold uppercase tracking-wider">
                      {isEn ? 'Experience' : 'Pengalaman'}
                    </p>
                    <p className="heading text-sm font-bold text-ink mt-0.5">
                      {isEn ? selectedMember.experienceEn : selectedMember.experience}
                    </p>
                  </div>
                  <div className="bg-cream/50 p-3 rounded-2xl border border-cocoa/10">
                    <p className="eyebrow text-[10px] text-cocoa/60 font-semibold uppercase tracking-wider">
                      {isEn ? 'Specialty' : 'Spesialisasi'}
                    </p>
                    <p className="heading text-sm font-bold text-ink mt-0.5">
                      {isEn ? selectedMember.specialtyEn : selectedMember.specialty}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="w-full mt-3 py-3 bg-ember text-cream font-semibold text-sm rounded-full hover:bg-ember-dark transition-colors cursor-pointer shadow-sm"
                >
                  {isEn ? 'Close Profile' : 'Tutup Profil'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CALL TO ACTION */}
        <CTA />

      </main>
      <Footer />
    </>
  );
}
