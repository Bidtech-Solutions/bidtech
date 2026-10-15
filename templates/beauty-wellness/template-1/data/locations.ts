export interface LocationZone {
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  image: string;
}

export interface LocationBranchDetail {
  slug: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  schedule: {
    days: string;
    daysEn: string;
    hours: string;
  }[];
  phone: string;
  whatsapp: string;
  image: string;
  highlight: string;
  highlightEn: string;
  description: string;
  descriptionEn: string;
  mapUrl: string;
  sqm: string;
  racksCount: string;
  parkingInfo: string;
  parkingInfoEn: string;
  facilities: string[];
  zones: LocationZone[];
  trainerSlugs: string[];
  nearbyLandmarks: string[];
}

export const locationBranches: LocationBranchDetail[] = [
  {
    slug: "kemang",
    name: "Ironforce Kemang (Flagship)",
    city: "Jakarta Selatan",
    address: "Jl. Kemang Raya No. 1, Bangka, Mampang Prapatan, Jakarta Selatan 12730",
    hours: "Buka 24 Jam Nonstop (Setiap Hari)",
    schedule: [
      { days: "Senin - Jumat", daysEn: "Monday - Friday", hours: "Buka 24 Jam" },
      { days: "Sabtu - Minggu", daysEn: "Saturday - Sunday", hours: "Buka 24 Jam" },
      { days: "Hari Libur Nasional", daysEn: "Public Holidays", hours: "Tetap Buka 24 Jam" },
    ],
    phone: "+62 813-6764-825",
    whatsapp: "628136764825",
    image: "/images/locations/kemang.webp",
    highlight: "Cabang Terbesar & Buka 24 Jam",
    highlightEn: "Largest Flagship Club & Open 24/7",
    description:
      "Cabang Flagship IRONFORCE Kemang adalah pusat kebugaran 3 lantai terlengkap seluas 1.800 m². Menghadirkan peralatan angkat beban standar kompetisi internasional, area fungsional outdoor, serta sanctuary pemulihan dengan sauna Finlandia dan cold plunge es.",
    descriptionEn:
      "IRONFORCE Kemang Flagship is our premier 3-story, 1,800 m² club. Featuring competition-grade powerlifting gear, outdoor functional turf, and a recovery sanctuary equipped with Finnish saunas and 4°C cold plunges.",
    mapUrl: "https://maps.google.com/?q=Kemang+Jakarta+Selatan",
    sqm: "1.800 m²",
    racksCount: "8 Power Racks",
    parkingInfo: "Gratis Valet & Parkir Basemen Luas",
    parkingInfoEn: "Free Valet & Spacious Basement Parking",
    facilities: [
      "8 Power Racks & Olympic Platforms Eleiko",
      "Cold Plunge 4°C & Finnish Dry Sauna",
      "Ironforce Fuel Bar & Artisan Espresso Lounge",
      "30m Indoor Sled & Sprint Turf",
      "Free Valet Parking & 80+ Car Capacity",
      "Private PT Studio & Video Biomechanics Room",
      "Executive Shower Panas & Loker RFID Digital",
      "InBody 770 Medis Assessment Booth",
    ],
    zones: [
      {
        title: "Olympic & Powerlifting Zone",
        titleEn: "Olympic & Powerlifting Zone",
        desc: "8 platform kayu oak dengan calibrated plates standar IPF dan barbel Eleiko Swedia.",
        descEn: "8 competition oak platforms with IPF calibrated plates and Eleiko barbells.",
        image: "/images/facilities/weight-area.webp",
      },
      {
        title: "Functional Turf Arena",
        titleEn: "Functional Turf Arena",
        desc: "Area rumput sintetis 30 meter untuk sled push, kettlebell circuit, plyometrics, dan agility drill.",
        descEn: "30-meter indoor turf track for sled pushes, kettlebells, and metabolic conditioning.",
        image: "/images/facilities/functional.webp",
      },
      {
        title: "Cold Plunge & Sauna Sanctuary",
        titleEn: "Cold Plunge & Sauna Sanctuary",
        desc: "Terapi kontras suhu dingin 4°C dan panas 90°C untuk mempercepat recovery otot.",
        descEn: "Contrast therapy featuring 4°C cold immersion pools and 90°C Finnish dry cedar sauna.",
        image: "/images/facilities/area-recovery.webp",
      },
      {
        title: "Executive Locker & Grooming",
        titleEn: "Executive Locker & Grooming",
        desc: "Shower air panas deras, pengering rambut Dyson, loker RFID aman, dan perlengkapan mandi premium.",
        descEn: "High-pressure rain showers, Dyson hair dryers, digital RFID lockers, and luxury amenities.",
        image: "/images/facilities/locker-room.webp",
      },
    ],
    trainerSlugs: ["sarah-jenkins", "marcus-vance"],
    nearbyLandmarks: ["5 Menit dari Kemang Village", "Sebelah Akses Jalan Bangka Raya", "Dekat Pusat Kuliner Kemang"],
  },
  {
    slug: "cideng",
    name: "Ironforce Cideng",
    city: "Jakarta Pusat",
    address: "Jl. Cideng Timur No. 45, Gambir, Jakarta Pusat 10150",
    hours: "06:00 - 23:00 (Setiap Hari)",
    schedule: [
      { days: "Senin - Jumat", daysEn: "Monday - Friday", hours: "06:00 - 23:00" },
      { days: "Sabtu - Minggu", daysEn: "Saturday - Sunday", hours: "07:00 - 21:00" },
      { days: "Hari Libur Nasional", daysEn: "Public Holidays", hours: "08:00 - 20:00" },
    ],
    phone: "+62 812-3456-7891",
    whatsapp: "6281234567891",
    image: "/images/locations/cideng.webp",
    highlight: "Strategis Dekat Pusat Bisnis & Monas",
    highlightEn: "Strategic Central Business Hub near Monas",
    description:
      "Terletak strategis di jantung Jakarta Pusat, Ironforce Cideng dirancang khusus untuk profesional dan eksekutif yang membutuhkan sesi latihan intensif dan efisien sebelum atau sesudah jam kerja.",
    descriptionEn:
      "Strategically situated in the heart of Central Jakarta, Ironforce Cideng is tailored for professionals seeking high-efficiency workouts before or after office hours.",
    mapUrl: "https://maps.google.com/?q=Cideng+Jakarta+Pusat",
    sqm: "1.200 m²",
    racksCount: "6 Power Racks",
    parkingInfo: "Parkir Gedung Khusus Member",
    parkingInfoEn: "Dedicated On-site Building Parking",
    facilities: [
      "Powerlifting & Heavy Hypertrophy Zone",
      "Functional Conditioning Turf Track",
      "Executive Hot Rain Showers & Towel Service",
      "Private PT Consultation & Movement Assessment Room",
      "High-speed WiFi & Espresso Work Counter",
      "Secure Digital RFID Lockers",
    ],
    zones: [
      {
        title: "Free Weight & Heavy Dumbbell Zone",
        titleEn: "Free Weight & Heavy Dumbbell Zone",
        desc: "Dumbbell hingga 60kg, incline benches, dan squat racks lengkap tanpa antre.",
        descEn: "Dumbbells up to 60kg, adjustable benches, and ample racks without queues.",
        image: "/images/facilities/weight-area.webp",
      },
      {
        title: "Functional HIIT Turf",
        titleEn: "Functional HIIT Turf",
        desc: "Area conditioning dengan ski-erg, rowers, dan assault bikes untuk pembakaran kalori maksimal.",
        descEn: "Cardio conditioning area featuring ski-ergs, concept2 rowers, and assault bikes.",
        image: "/images/facilities/functional.webp",
      },
      {
        title: "Executive Recovery Showers",
        titleEn: "Executive Recovery Showers",
        desc: "Fasilitas mandi bersih dan wangi untuk bersiap langsung ke kantor setelah olahraga.",
        descEn: "Clean, spa-grade showers allowing effortless transition straight to business meetings.",
        image: "/images/facilities/locker-room.webp",
      },
    ],
    trainerSlugs: ["sarah-jenkins"],
    nearbyLandmarks: ["10 Menit dari Bundaran HI & Monas", "Dekat Stasiun Tanah Abang", "Akses Langsung Roxy & Tomang"],
  },
  {
    slug: "sunter",
    name: "Ironforce Sunter",
    city: "Jakarta Utara",
    address: "Jl. Danau Sunter Utara Blok G7 No. 12, Tanjung Priok, Jakarta Utara 14350",
    hours: "06:00 - 22:00 (Setiap Hari)",
    schedule: [
      { days: "Senin - Jumat", daysEn: "Monday - Friday", hours: "06:00 - 22:00" },
      { days: "Sabtu - Minggu", daysEn: "Saturday - Sunday", hours: "06:00 - 21:00" },
      { days: "Hari Libur Nasional", daysEn: "Public Holidays", hours: "08:00 - 20:00" },
    ],
    phone: "+62 812-3456-7892",
    whatsapp: "6281234567892",
    image: "/images/locations/sunter.webp",
    highlight: "Area Latihan Fungsional Terluas",
    highlightEn: "Largest Functional & Mobility Facility",
    description:
      "Ironforce Sunter memiliki zona mobilitas dan koreksi postur terluas di Jakarta Utara. Dilengkapi platform angkat beban standar kompetisi serta dry sauna kayu cedar untuk relaksasi tubuh.",
    descriptionEn:
      "Ironforce Sunter boasts the largest functional turf and posture correction zone in North Jakarta, complete with cedar wood dry saunas and competition-grade lifting platforms.",
    mapUrl: "https://maps.google.com/?q=Sunter+Jakarta+Utara",
    sqm: "1.400 m²",
    racksCount: "6 Power Racks",
    parkingInfo: "Parkir Luas Mobil & Motor Gratis",
    parkingInfoEn: "Spacious Free Car & Motorcycle Parking",
    facilities: [
      "30m Sled & Sprint Turf Track",
      "Olympic Weightlifting Platforms",
      "Cedar Wood Dry Sauna",
      "Smoothie & Protein Shake Bar",
      "Specialized Posture Rehabilitation Equipment",
      "Spacious Cardio Deck with Lake Breeze View",
    ],
    zones: [
      {
        title: "Sprint Turf & Sled Track",
        titleEn: "Sprint Turf & Sled Track",
        desc: "Jalur turf 30 meter untuk speed, power, dan sled push tanpa hambatan.",
        descEn: "Long 30m turf track dedicated for sled sprints and explosive athletic conditioning.",
        image: "/images/facilities/functional.webp",
      },
      {
        title: "Corrective Posture Studio",
        titleEn: "Corrective Posture Studio",
        desc: "Peralatan mobilitas sendi, resistance bands, dan spinal decompression benches.",
        descEn: "Joint mobility rigs, resistance bands, and spine alignment decompression gear.",
        image: "/images/facilities/weight-area.webp",
      },
      {
        title: "Cedar Wood Dry Sauna",
        titleEn: "Cedar Wood Dry Sauna",
        desc: "Sauna kayu cedar alami untuk detoksifikasi dan relaksasi sistem saraf.",
        descEn: "Natural aromatic cedar wood sauna for muscle relaxation and nervous system recharge.",
        image: "/images/facilities/area-recovery.webp",
      },
    ],
    trainerSlugs: ["david-tan"],
    nearbyLandmarks: ["Tepat di Pinggir Danau Sunter", "5 Menit dari Mall Sunter", "Akses Mudah Tol Kemayoran"],
  },
  {
    slug: "green-lake",
    name: "Ironforce Green Lake",
    city: "Tangerang",
    address: "Rukan CBD Green Lake City Blok A No. 18-20, Cipondoh, Tangerang 15147",
    hours: "06:00 - 22:00 (Setiap Hari)",
    schedule: [
      { days: "Senin - Jumat", daysEn: "Monday - Friday", hours: "06:00 - 22:00" },
      { days: "Sabtu - Minggu", daysEn: "Saturday - Sunday", hours: "07:00 - 21:00" },
      { days: "Hari Libur Nasional", daysEn: "Public Holidays", hours: "08:00 - 20:00" },
    ],
    phone: "+62 812-3456-7893",
    whatsapp: "6281234567893",
    image: "/images/locations/green-lake.webp",
    highlight: "Club Modern Bernuansa Industrial",
    highlightEn: "Modern Industrial Gym with Lake View",
    description:
      "Menggabungkan estetika industrial modern dengan jajaran lengkap mesin Hammer Strength dan cardio deck berpemandangan danau. Sangat populer di kalangan komunitas fitness Tangerang dan Jakarta Barat.",
    descriptionEn:
      "Combining sleek industrial design with state-of-the-art Hammer Strength machines and cardio decks overlooking the lake. The premier fitness destination for West Jakarta & Tangerang.",
    mapUrl: "https://maps.google.com/?q=Green+Lake+City+Tangerang",
    sqm: "1.300 m²",
    racksCount: "5 Power Racks",
    parkingInfo: "Kawasan Rukan Luas & Aman 24 Jam",
    parkingInfoEn: "Spacious CBD Parking with 24-hr Security",
    facilities: [
      "Complete Hammer Strength Iso-Lateral Line",
      "Cardio Deck with Panoramic Lake View",
      "Digital RFID Locker Rooms & Rain Showers",
      "Dedicated Mobility & Hip-Thrust Zone",
      "Fuel Bar Shake Station",
      "Complimentary InBody Fitness Tracking",
    ],
    zones: [
      {
        title: "Hammer Strength Machine Circuit",
        titleEn: "Hammer Strength Machine Circuit",
        desc: "Mesin plate-loaded presisi biomekanik untuk isolasi kontraksi otot optimal.",
        descEn: "Pure biomechanical plate-loaded machines for safe, targeted muscular overload.",
        image: "/images/facilities/weight-area.webp",
      },
      {
        title: "Lakeview Cardio Deck",
        titleEn: "Lakeview Cardio Deck",
        desc: "Stairmasters, treadmills, dan curve runners menghadap panorama danau Green Lake.",
        descEn: "Stairmasters, curve runners, and treadmills overlooking tranquil lake waters.",
        image: "/images/facilities/functional.webp",
      },
      {
        title: "Post-Workout Fuel Lounge",
        titleEn: "Post-Workout Fuel Lounge",
        desc: "Tempat santai dengan shake whey protein berkualitas tinggi dan cold brew.",
        descEn: "Relaxing recovery lounge serving cold brews and high-protein shakes.",
        image: "/images/facilities/area-recovery.webp",
      },
    ],
    trainerSlugs: ["marcus-vance", "amanda-wijaya"],
    nearbyLandmarks: ["Pusat Kawasan CBD Green Lake City", "Akses Pintu Tol Karang Tengah Barat", "Dekat Area Kuliner Green Lake"],
  },
  {
    slug: "greenville",
    name: "Ironforce Greenville",
    city: "Jakarta Barat",
    address: "Komplek Greenville Blok AY No. 5, Kebon Jeruk, Jakarta Barat 11510",
    hours: "06:00 - 22:00 (Setiap Hari)",
    schedule: [
      { days: "Senin - Jumat", daysEn: "Monday - Friday", hours: "06:00 - 22:00" },
      { days: "Sabtu - Minggu", daysEn: "Saturday - Sunday", hours: "07:00 - 21:00" },
      { days: "Hari Libur Nasional", daysEn: "Public Holidays", hours: "08:00 - 20:00" },
    ],
    phone: "+62 812-3456-7894",
    whatsapp: "6281234567894",
    image: "/images/locations/greenville.webp",
    highlight: "Komunitas Latihan yang Hangat & Nyaman",
    highlightEn: "Warm Neighborhood Atmosphere & Functional Rig",
    description:
      "Club gym premium di lingkungan perumahan Greenville yang tenang. Dikenal dengan atmosfer latihan yang bersahabat, privat, dan bimbingan coach yang sangat teliti.",
    descriptionEn:
      "A boutique premium gym set in the tranquil Greenville residential hub. Celebrated for its welcoming, private atmosphere and attentive personal coaching.",
    mapUrl: "https://maps.google.com/?q=Greenville+Jakarta+Barat",
    sqm: "1.100 m²",
    racksCount: "5 Power Racks",
    parkingInfo: "Parkir Khusus Komplek Greenville",
    parkingInfoEn: "Dedicated Free Resident & Member Parking",
    facilities: [
      "Free Weights up to 60kg",
      "Functional Cross-Training Rig & Rings",
      "Steam Room & Hot Water Showers",
      "Nutrition Consultation Booth",
      "Spinal & Mobility Care Corner",
      "Digital RFID Safe Lockers",
    ],
    zones: [
      {
        title: "Cross-Training & Rig Arena",
        titleEn: "Cross-Training & Rig Arena",
        desc: "Pull-up rig bertingkat, gymnastic rings, dan bumper plates untuk variasi gerakan atletik.",
        descEn: "Multi-station rig, gymnastic rings, and bumper plates for athletic movements.",
        image: "/images/facilities/functional.webp",
      },
      {
        title: "Strength & Hypertrophy Floor",
        titleEn: "Strength & Hypertrophy Floor",
        desc: "Benches, cables, dan free weights lengkap dengan pencahayaan nyaman.",
        descEn: "Cables, benches, and free weight dumbbells with supportive ambient lighting.",
        image: "/images/facilities/weight-area.webp",
      },
      {
        title: "Steam & Hot Shower Suite",
        titleEn: "Steam & Hot Shower Suite",
        desc: "Ruang uap hangat untuk pelemasan otot kaku setelah sesi beban berat.",
        descEn: "Warm steam therapy room for soothing tight muscles post-workout.",
        image: "/images/facilities/area-recovery.webp",
      },
    ],
    trainerSlugs: ["david-tan"],
    nearbyLandmarks: ["Dekat Central Park Mall & Mall Taman Anggrek", "Sebelah Sentra Kuliner Greenville", "Akses Cepat Tanjung Duren"],
  },
  {
    slug: "karawaci",
    name: "Ironforce Karawaci",
    city: "Tangerang",
    address: "Boulevard Palem Raya No. 88, Lippo Karawaci, Tangerang 15810",
    hours: "06:00 - 23:00 (Setiap Hari)",
    schedule: [
      { days: "Senin - Jumat", daysEn: "Monday - Friday", hours: "06:00 - 23:00" },
      { days: "Sabtu - Minggu", daysEn: "Saturday - Sunday", hours: "07:00 - 22:00" },
      { days: "Hari Libur Nasional", daysEn: "Public Holidays", hours: "08:00 - 20:00" },
    ],
    phone: "+62 812-3456-7895",
    whatsapp: "6281234567895",
    image: "/images/locations/karawaci.webp",
    highlight: "Dekat Kampus UPH & Area Supermall Karawaci",
    highlightEn: "Energetic Hub Near UPH & Supermall Karawaci",
    description:
      "Pusat kebugaran berenergi tinggi yang populer di kalangan mahasiswa, atlet muda, dan eksekutif Karawaci. Dilengkapi kolam rendam air es (ice bath), area HIIT bervolume tinggi, dan co-working lounge.",
    descriptionEn:
      "A high-energy training hub popular among university athletes and young professionals. Equipped with cold plunge ice baths, intense functional HIIT turf, and a comfortable co-working shake lounge.",
    mapUrl: "https://maps.google.com/?q=Lippo+Karawaci+Tangerang",
    sqm: "1.350 m²",
    racksCount: "6 Power Racks",
    parkingInfo: "Parkir Luas Boulevard Karawaci",
    parkingInfoEn: "Ample Boulevard Parking with Valet Option",
    facilities: [
      "Powerlifting Competition Racks",
      "HIIT & Metabolic Circuit Training Turf",
      "Ice Bath Recovery Cold Plunge Pool",
      "Spacious Co-working & Shake Lounge with WiFi",
      "Modern Shower & Private RFID Lockers",
      "Body Composition Assessment Room",
    ],
    zones: [
      {
        title: "Metabolic HIIT & Circuit Turf",
        titleEn: "Metabolic HIIT & Circuit Turf",
        desc: "Zona latihan sirkuit pembakaran kalori intensif dengan kettlebells dan plyo boxes.",
        descEn: "High-intensity calorie-burning circuit zone with kettlebells and plyometric boxes.",
        image: "/images/facilities/functional.webp",
      },
      {
        title: "Powerlifting & Barbell Floor",
        titleEn: "Powerlifting & Barbell Floor",
        desc: "Platform angkat beban dengan barbel grip knurling kompetisi dan rubber flooring.",
        descEn: "Lifting platforms with aggressive knurled barbells and dense rubber impact flooring.",
        image: "/images/facilities/weight-area.webp",
      },
      {
        title: "Ice Bath Cold Plunge",
        titleEn: "Ice Bath Cold Plunge",
        desc: "Kolam es dingin untuk regenerasi jaringan otot cepat dan meredakan peradangan.",
        descEn: "Dedicated ice bath plunge tub for fast tissue regeneration and reduced inflammation.",
        image: "/images/facilities/area-recovery.webp",
      },
    ],
    trainerSlugs: ["amanda-wijaya"],
    nearbyLandmarks: ["3 Menit dari Kampus UPH Karawaci", "Dekat Supermall Karawaci & MaxxBox", "Akses Langsung Gerbang Tol Karawaci"],
  },
];

export function getAllLocationSlugs(): string[] {
  return locationBranches.map((b) => b.slug);
}

export function getLocationBySlug(slug: string): LocationBranchDetail | undefined {
  return locationBranches.find((b) => b.slug === slug);
}
