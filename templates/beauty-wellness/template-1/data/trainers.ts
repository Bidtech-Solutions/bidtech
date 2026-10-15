export type Trainer = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  /** Ringkasan sertifikasi untuk kartu di halaman daftar trainer */
  certifications: string;
  certificationList: string[];
  experience: string;
  image: string;
  imagePosition?: string;
  quote: string;
  tags: string[];
  branch: string;
  bio: string[];
  stats: { value: string; label: string }[];
  focus: { title: string; desc: string }[];
  idealFor: string[];
  achievements: string[];
  schedule: { day: string; time: string; branch: string }[];
  gallery: string[];
};

const facilityImages = {
  weight: "/images/facilities/weight-area.webp",
  functional: "/images/facilities/functional.webp",
  recovery: "/images/facilities/area-recovery.webp",
  locker: "/images/facilities/locker-room.webp",
};

export const trainerPositionMap: Record<string, string> = {
  "sarah-jenkins": "84% 38%",
  "marcus-vance": "50% 30%",
  "david-tan": "50% 16%",
  "amanda-wijaya": "50% 15%",
};

export const trainers: Trainer[] = [
  {
    slug: "sarah-jenkins",
    name: "Sarah Jenkins",
    imagePosition: "84% 46%",
    role: "Head Strength & Conditioning Coach",
    specialty: "Powerlifting & Athletic Performance",
    certifications: "CSCS · USA Weightlifting Level 2 · Precision Nutrition",
    certificationList: [
      "CSCS - Certified Strength & Conditioning Specialist (NSCA)",
      "USA Weightlifting Level 2 Coach",
      "Precision Nutrition Level 1",
      "First Aid & CPR/AED Certified",
    ],
    experience: "9+ Tahun Pengalaman",
    image: "/images/trainers/sarah-jenkins.webp",
    quote:
      "Kekuatan bukan hanya soal berapa kilogram beban di barbel, tapi bagaimana mental Anda mengatasi keraguan diri.",
    tags: ["Powerlifting", "Olympic Lifts", "Athletic Conditioning", "Nutrition"],
    branch: "Kemang Flagship",
    bio: [
      "Sarah memulai karier sebagai atlet angkat besi nasional sebelum beralih menjadi pelatih. Ia memimpin tim strength & conditioning IRONFORCE dan merancang standar program latihan beban di seluruh cabang.",
      "Pendekatannya sederhana: teknik dulu, beban kemudian. Setiap klien mendapat asesmen gerak, target angka yang realistis, dan progres mingguan yang terukur, dari pemula yang baru memegang barbel sampai atlet yang menyiapkan kompetisi.",
    ],
    stats: [
      { value: "9+", label: "Tahun Pengalaman" },
      { value: "1.800+", label: "Sesi Terlaksana" },
      { value: "35", label: "Atlet Kompetisi" },
      { value: "4.9 / 5", label: "Rating Klien" },
    ],
    focus: [
      {
        title: "Dasar Angkat Beban",
        desc: "Squat, bench press, dan deadlift dengan teknik yang benar dari nol, lengkap dengan koreksi di setiap set.",
      },
      {
        title: "Program Powerlifting",
        desc: "Periodisasi 8-12 minggu untuk menaikkan total angkatan, termasuk persiapan meet dan strategi attempt.",
      },
      {
        title: "Athletic Performance",
        desc: "Latihan power, kecepatan, dan kondisi fisik untuk pelari, pemain bola, dan atlet amatir lainnya.",
      },
    ],
    idealFor: [
      "Pemula yang ingin belajar teknik angkat beban dengan aman",
      "Lifter yang stagnan dan ingin menembus plateau",
      "Atlet amatir yang menyiapkan kompetisi",
      "Wanita yang ingin lebih kuat tanpa takut terlihat 'besar'",
    ],
    achievements: [
      "Juara 2 Kejuaraan Angkat Besi Nasional kelas 64 kg",
      "Pelatih tim juara Powerlifting Community Games 2023",
      "Merancang kurikulum Strength Foundation IRONFORCE",
    ],
    schedule: [
      { day: "Senin - Rabu", time: "06.00 - 14.00", branch: "Kemang Flagship" },
      { day: "Kamis - Jumat", time: "13.00 - 21.00", branch: "Cideng" },
      { day: "Sabtu", time: "08.00 - 14.00", branch: "Kemang Flagship" },
    ],
    gallery: [facilityImages.weight, facilityImages.functional, facilityImages.recovery],
  },
  {
    slug: "marcus-vance",
    name: "Marcus Vance",
    imagePosition: "center 35%",
    role: "Master Trainer & Hypertrophy Lead",
    specialty: "Body Recomposition & Muscle Growth",
    certifications: "NASM-CPT · FMS Level 2 · Biomechanics Specialist",
    certificationList: [
      "NASM-CPT - Certified Personal Trainer",
      "FMS Level 2 - Functional Movement Screen",
      "Biomechanics Specialist Certificate",
      "Sports Nutrition Fundamentals",
    ],
    experience: "11+ Tahun Pengalaman",
    image: "/images/trainers/marcus-vance.webp",
    quote:
      "Setiap repetisi harus memiliki tujuan. Presisi teknik yang tepat adalah kunci pertumbuhan otot tanpa cedera.",
    tags: ["Hypertrophy", "Bodybuilding", "Biomechanics", "Fat Loss"],
    branch: "Kemang Flagship",
    bio: [
      "Marcus adalah master trainer dengan lebih dari satu dekade pengalaman membentuk fisik klien, dari eksekutif sibuk sampai kompetitor bodybuilding. Ia memimpin pengembangan program hypertrophy dan body recomposition di IRONFORCE.",
      "Ia dikenal teliti soal biomekanika: sudut sendi, tempo gerak, dan pemilihan alat disesuaikan dengan struktur tubuh masing-masing klien, sehingga otot tumbuh maksimal dan risiko cedera tetap rendah.",
    ],
    stats: [
      { value: "11+", label: "Tahun Pengalaman" },
      { value: "2.600+", label: "Sesi Terlaksana" },
      { value: "140+", label: "Transformasi Klien" },
      { value: "4.9 / 5", label: "Rating Klien" },
    ],
    focus: [
      {
        title: "Hypertrophy Training",
        desc: "Program split terstruktur dengan volume dan intensitas yang diatur ulang tiap fase untuk pertumbuhan otot konsisten.",
      },
      {
        title: "Body Recomposition",
        desc: "Menurunkan lemak sambil mempertahankan, bahkan menambah, massa otot lewat latihan dan target makronutrisi.",
      },
      {
        title: "Koreksi Biomekanika",
        desc: "Analisis teknik gerakan utama dan penyesuaian variasi latihan agar tepat sasaran otot dan aman untuk sendi.",
      },
    ],
    idealFor: [
      "Anda yang ingin membangun otot dan terlihat lebih atletis",
      "Pekerja kantoran dengan waktu latihan terbatas",
      "Anda yang ingin turun lemak tanpa kehilangan massa otot",
      "Lifter intermediate yang butuh program lebih spesifik",
    ],
    achievements: [
      "Membimbing 140+ klien menuntaskan program transformasi 12 minggu",
      "Master Trainer of the Year IRONFORCE 2022",
      "Pembicara workshop Biomechanics for Lifters",
    ],
    schedule: [
      { day: "Senin - Kamis", time: "07.00 - 15.00", branch: "Kemang Flagship" },
      { day: "Jumat", time: "14.00 - 21.00", branch: "Green Lake" },
      { day: "Sabtu - Minggu", time: "09.00 - 15.00", branch: "Kemang Flagship" },
    ],
    gallery: [facilityImages.weight, facilityImages.recovery, facilityImages.locker],
  },
  {
    slug: "david-tan",
    name: "David Tan",
    imagePosition: "center 20%",
    role: "Senior Mobility & Posture Specialist",
    specialty: "Injury Prevention & Core Stabilization",
    certifications: "ACE-CPT · EXOS Performance Specialist · Kinesio Taping",
    certificationList: [
      "ACE-CPT - Certified Personal Trainer",
      "EXOS Performance Specialist",
      "Kinesio Taping Practitioner (KTA)",
      "Corrective Exercise Specialist",
    ],
    experience: "7+ Tahun Pengalaman",
    image: "/images/trainers/david-tan.webp",
    quote:
      "Sebelum Anda mengangkat beban berat, pastikan fondasi gerak dan postur tulang belakang Anda kokoh.",
    tags: ["Mobility", "Posture Rehab", "Functional Training", "Core Strength"],
    branch: "Sunter",
    bio: [
      "David berfokus membantu orang kembali bergerak tanpa nyeri. Ia banyak menangani klien dengan keluhan punggung bawah, leher kaku, dan bahu akibat duduk lama, lalu membangun kekuatannya secara bertahap.",
      "Sesi bersama David selalu dimulai dengan asesmen postur dan mobilitas. Dari sana ia menyusun kombinasi latihan koreksi, penguatan core, dan latihan fungsional yang bisa Anda lanjutkan sendiri di rumah.",
    ],
    stats: [
      { value: "7+", label: "Tahun Pengalaman" },
      { value: "1.400+", label: "Sesi Terlaksana" },
      { value: "90%", label: "Klien Bebas Nyeri" },
      { value: "4.8 / 5", label: "Rating Klien" },
    ],
    focus: [
      {
        title: "Posture & Spine Rehab",
        desc: "Program koreksi postur untuk nyeri punggung bawah, leher, dan bahu akibat pekerjaan duduk.",
      },
      {
        title: "Mobility & Flexibility",
        desc: "Peningkatan rentang gerak sendi pinggul, bahu, dan tulang belakang agar gerakan angkat beban lebih aman.",
      },
      {
        title: "Core & Functional Strength",
        desc: "Penguatan core dan pola gerak harian supaya tubuh stabil, seimbang, dan tahan cedera.",
      },
    ],
    idealFor: [
      "Pekerja kantoran dengan nyeri punggung atau leher",
      "Anda yang pulih dari cedera dan ingin kembali berlatih",
      "Lifter yang ingin memperbaiki mobilitas dan teknik",
      "Lansia aktif yang ingin menjaga kemandirian gerak",
    ],
    achievements: [
      "Menangani 300+ klien dengan keluhan postur dan nyeri kronis",
      "Menyusun modul Desk-Worker Mobility IRONFORCE",
      "Mitra rujukan fisioterapis rekanan cabang Sunter",
    ],
    schedule: [
      { day: "Senin - Jumat", time: "08.00 - 16.00", branch: "Sunter" },
      { day: "Selasa & Kamis", time: "17.00 - 21.00", branch: "Greenville" },
      { day: "Sabtu", time: "09.00 - 13.00", branch: "Sunter" },
    ],
    gallery: [facilityImages.functional, facilityImages.recovery, facilityImages.weight],
  },
  {
    slug: "amanda-wijaya",
    name: "Amanda Wijaya",
    imagePosition: "center 18%",
    role: "Lead HIIT & Fat Loss Transformation Coach",
    specialty: "High-Intensity Conditioning & Lifestyle Habits",
    certifications: "ISSA-CPT · CrossFit Level 1 · Behavioral Change Specialist",
    certificationList: [
      "ISSA-CPT - Certified Personal Trainer",
      "CrossFit Level 1 Trainer",
      "Behavioral Change Specialist",
      "Group Fitness Instructor Certificate",
    ],
    experience: "8+ Tahun Pengalaman",
    image: "/images/trainers/amanda-wijaya.webp",
    quote:
      "Konsistensi kecil yang Anda lakukan setiap hari akan menjadi transformasi luar biasa dalam 90 hari.",
    tags: ["HIIT", "Fat Loss", "Metabolic Conditioning", "Habit Coaching"],
    branch: "Green Lake",
    bio: [
      "Amanda memimpin program HIIT dan fat loss di IRONFORCE. Ia sendiri pernah menurunkan berat badan 20 kg, jadi ia paham betul tantangan mental dan kebiasaan yang dihadapi kliennya.",
      "Selain latihan yang efisien dan menyenangkan, Amanda menekankan pembentukan kebiasaan: pola tidur, makan, dan aktivitas harian. Hasilnya, perubahan bukan hanya terlihat di cermin tapi juga bertahan lama.",
    ],
    stats: [
      { value: "8+", label: "Tahun Pengalaman" },
      { value: "2.100+", label: "Sesi Terlaksana" },
      { value: "-12 kg", label: "Rata-rata Klien / 90 Hari" },
      { value: "4.9 / 5", label: "Rating Klien" },
    ],
    focus: [
      {
        title: "HIIT & Metabolic Conditioning",
        desc: "Sesi 45-60 menit padat dan terukur untuk membakar kalori maksimal dan meningkatkan stamina.",
      },
      {
        title: "Fat Loss Program",
        desc: "Kombinasi latihan beban, kardio, dan panduan nutrisi sederhana untuk penurunan lemak yang berkelanjutan.",
      },
      {
        title: "Habit Coaching",
        desc: "Check-in mingguan untuk membangun rutinitas tidur, makan, dan aktivitas yang konsisten.",
      },
    ],
    idealFor: [
      "Anda yang ingin menurunkan berat badan secara sehat",
      "Pemula yang butuh motivasi dan pendamping konsisten",
      "Ibu-ibu dan wanita aktif dengan waktu terbatas",
      "Anda yang bosan latihan monoton dan ingin variasi",
    ],
    achievements: [
      "Mendampingi 200+ klien menurunkan berat badan 10 kg atau lebih",
      "Coach program IRONFORCE Challenge 90 Hari",
      "Narasumber seminar Healthy Habits for Busy Moms",
    ],
    schedule: [
      { day: "Senin - Rabu", time: "09.00 - 17.00", branch: "Green Lake" },
      { day: "Kamis - Jumat", time: "15.00 - 21.00", branch: "Karawaci" },
      { day: "Sabtu - Minggu", time: "07.00 - 12.00", branch: "Green Lake" },
    ],
    gallery: [facilityImages.functional, facilityImages.weight, facilityImages.locker],
  },
];

export function getTrainerBySlug(slug: string) {
  return trainers.find((trainer) => trainer.slug === slug);
}
