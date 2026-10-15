"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Globe,
  Compass,
  Layers,
  ExternalLink,
  Building2,
  Phone,
  Navigation,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/ui/SubpageHero";
import ContactBanner from "@/components/sections/ContactBanner";
import { LOCATIONS_DATA, PROPERTIES_DATA } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import "leaflet/dist/leaflet.css";

interface MapHubItem {
  key: string;
  name: string;
  scope: "batam" | "global";
  tag: string;
  coords: [number, number];
  zoom: number;
  descEn: string;
  descId: string;
  hubsEn: string[];
  hubsId: string[];
  featuredPropertySlug?: string;
}

const ALL_MAP_HUBS: MapHubItem[] = [
  // --- Batam Luxury Archipelago Enclaves (From Landing Page) ---
  {
    key: "BATAM",
    name: "Batam Island",
    scope: "batam",
    tag: "KEPULAUAN RIAU, ID",
    coords: [1.115, 104.0305],
    zoom: 11,
    descEn:
      "Strategic maritime gateway neighboring Singapore, hosting world-class luxury waterfront estates, golf sanctuaries, and private marina enclaves.",
    descId:
      "Pintu gerbang maritim strategis di dekat Singapura, menghadirkan kawasan hunian tepi laut mewah, suaka golf berstandar dunia, dan marina privat.",
    hubsEn: [
      "Nongsa Coast & Marina Resorts",
      "HarbourBay Waterfront Skyline",
      "Sukajadi Championship Golf Sanctuary",
      "Batam Center Diplomatic Enclave",
      "Barelang Archipelago Oceanfront",
    ],
    hubsId: [
      "Kawasan Pesisir & Marina Nongsa",
      "Cakrawala Tepi Air HarbourBay",
      "Kawasan Golf Kejuaraan Sukajadi",
      "Kawasan Pusat Batam Center",
      "Kawasan Kepulauan Barelang",
    ],
    featuredPropertySlug: "solaria-estate",
  },
  {
    key: "NONGSA",
    name: "Nongsa Coast",
    scope: "batam",
    tag: "NORTHEAST COAST, BATAM",
    coords: [1.1856, 104.1025],
    zoom: 13,
    descEn:
      "Luxury beachfront, private deep-water marinas, and secluded architectural sanctuaries with direct skyline views of Singapore across the straits.",
    descId:
      "Pantai pasir putih eksklusif, dermaga marina kapal pesiar, dan suaka vila privat berhadapan langsung dengan cakrawala Singapura.",
    hubsEn: [
      "Nongsa Point Marina & Yacht Basin",
      "Montigo Coastal Cantilevers",
      "Palm Springs Fairway Villas",
      "Tering Bay Private Coast",
    ],
    hubsId: [
      "Dermaga Marina & Yacht Nongsa Point",
      "Vila Kantilever Pesisir Montigo",
      "Vila Lapangan Golf Palm Springs",
      "Pantai Privat Teluk Tering",
    ],
    featuredPropertySlug: "solaria-estate",
  },
  {
    key: "HARBOURBAY",
    name: "HarbourBay",
    scope: "batam",
    tag: "DOWNTOWN WATERFRONT, BATAM",
    coords: [1.1528, 103.9982],
    zoom: 14,
    descEn:
      "High-density urban waterfront featuring luxury residential towers, Michelin-starred boardwalk dining, and VIP international ferry terminal.",
    descId:
      "Kawasan tepi air perkotaan prestisius dengan menara residensial mewah, kuliner tepi dermaga, dan terminal feri internasional VIP.",
    hubsEn: [
      "Bayfront Promenade Towers",
      "Harbour Residences Horizon",
      "International VIP Ferry Terminal",
      "Sunset Boardwalk Pavilions",
    ],
    hubsId: [
      "Menara Promenade Tepi Teluk",
      "Residensi Cakrawala Harbour",
      "Terminal Feri Internasional VIP",
      "Paviliun Sunset Boardwalk",
    ],
    featuredPropertySlug: "solaria-estate",
  },
  {
    key: "SUKAJADI",
    name: "Sukajadi",
    scope: "batam",
    tag: "CENTRAL GOLF SANCTUARY, BATAM",
    coords: [1.1124, 104.0321],
    zoom: 14,
    descEn:
      "Prestige inland enclave wrapped around an 18-hole championship golf course, home to prominent private manors and lush tropical modernist gardens.",
    descId:
      "Kawasan prestisius di tengah pulau yang mengelilingi lapangan golf 18-hole internasional, rumah bagi manor privat dan taman tropis modern.",
    hubsEn: [
      "Championship 18-Hole Fairway Ring",
      "Sukajadi Hills Grand Manors",
      "The Beverly Prime Greenbelt",
      "Imperial Club Residences",
    ],
    hubsId: [
      "Lingkar Fairway 18-Hole Kejuaraan",
      "Manor Megah Perbukitan Sukajadi",
      "Kawasan Hijau Beverly Prime",
      "Residensi Klub Imperial",
    ],
    featuredPropertySlug: "sander-house",
  },
  {
    key: "BARELANG",
    name: "Barelang Islands",
    scope: "batam",
    tag: "ARCHIPELAGO OVERLOOK, BATAM",
    coords: [0.984, 104.0435],
    zoom: 12,
    descEn:
      "Six iconic cable-stayed bridges linking untouched archipelagic islands, ideal for private cliffside pavilions, eco-estates, and marine lookouts.",
    descId:
      "Rangkaian 6 jembatan ikonik yang menghubungkan gugusan pulau asri, lokasi ideal bagi paviliun tebing privat dan vila maritim ramah lingkungan.",
    hubsEn: [
      "Bridge 1 Tengku Fisabilillah Lookout",
      "Tonton Island Private Estuary",
      "Setoko Island Hillside Villas",
      "Rempang Marine Sanctuaries",
    ],
    hubsId: [
      "Pemandangan Jembatan 1 Fisabilillah",
      "Muara Privat Pulau Tonton",
      "Vila Lereng Bukit Pulau Setoko",
      "Suaka Maritim Pulau Rempang",
    ],
    featuredPropertySlug: "solaria-estate",
  },

  // --- Global Metropolitan Network ---
  {
    key: "DUBAI",
    name: "Dubai",
    scope: "global",
    tag: "UNITED ARAB EMIRATES",
    coords: [25.1856, 55.2678],
    zoom: 11,
    descEn:
      "Global capital of monolithic cantilever architecture, home to iconic private estates in Dubai Hills, Palm Jumeirah, and Emirates Hills.",
    descId:
      "Pusat arsitektur monolitik kantilever dunia, rumah bagi hunian privat termewah di Dubai Hills, Palm Jumeirah, dan Emirates Hills.",
    hubsEn: [
      "Dubai Hills Monolithic Enclave",
      "Palm Jumeirah Oceanfront Fronds",
      "Emirates Hills Private Sanctuary",
      "Downtown Dubai Sky Penthouses",
      "Jumeirah Bay Island Marina",
    ],
    hubsId: [
      "Kawasan Monolit Dubai Hills",
      "Kawasan Pesisir Palm Jumeirah",
      "Suaka Privat Emirates Hills",
      "Penthouse Angkasa Downtown Dubai",
      "Marina Pulau Jumeirah Bay",
    ],
    featuredPropertySlug: "sander-house",
  },
  {
    key: "ZURICH",
    name: "Zurich",
    scope: "global",
    tag: "SWITZERLAND",
    coords: [47.3769, 8.5417],
    zoom: 12,
    descEn:
      "The historic cradle of Swiss architecture, presenting pristine alpine hillside villas, historic urban penthouses, and private lakefront holdings.",
    descId:
      "Pusat lahirnya kemurnian arsitektur Swiss, menghadirkan vila lereng Alpen nan asri, penthouse urban bersejarah, dan kepemilikan tanah tepi danau privat.",
    hubsEn: [
      "Zurichberg Hills Panoramic Villas",
      "Bahnhofstrasse Heritage Penthouses",
      "Lake Zurich Gold Coast Estates",
      "Alpenblick Modernist Retreats",
      "Limmat Riverside Enclaves",
    ],
    hubsId: [
      "Vila Panoramik Bukit Zurichberg",
      "Penthouse Bersejarah Bahnhofstrasse",
      "Kawasan Danau Zurich Gold Coast",
      "Suaka Modernis Alpenblick",
      "Enklave Tepi Sungai Limmat",
    ],
    featuredPropertySlug: "seraphina-villa",
  },
  {
    key: "SINGAPORE",
    name: "Singapore",
    scope: "global",
    tag: "REPUBLIC OF SINGAPORE",
    coords: [1.3521, 103.8198],
    zoom: 11,
    descEn:
      "Equatorial financial and architectural capital, home to biophilic Good Class Bungalows, Sentosa oceanfront sanctuaries, and triplex sky galleries.",
    descId:
      "Pusat keuangan dan arsitektur khatulistiwa, rumah bagi Good Class Bungalow biofilik, suaka tepi laut Sentosa, dan galeri angkasa triplex.",
    hubsEn: [
      "Nassim Road Diplomatic Enclave",
      "Sentosa Cove Oceanfront Manors",
      "Cluny Hill Biophilic Reserves",
      "Orchard Boulevard Sky Triplexes",
      "Marina Bay Panoramic Penthouses",
    ],
    hubsId: [
      "Kawasan Diplomatik Nassim Road",
      "Manor Tepi Laut Sentosa Cove",
      "Cagar Biofilik Cluny Hill",
      "Triplex Angkasa Orchard Boulevard",
      "Penthouse Panoramik Marina Bay",
    ],
    featuredPropertySlug: "solaria-estate",
  },
  {
    key: "JAKARTA",
    name: "Jakarta",
    scope: "global",
    tag: "DKI JAKARTA, INDONESIA",
    coords: [-6.2088, 106.8456],
    zoom: 11,
    descEn:
      "Indonesia's bustling metropolis, showcasing heritage-infused diplomatic manors in Menteng and radical brutalist penthouses towering over the SCBD skyline.",
    descId:
      "Metropolis Indonesia yang dinamis, menampilkan manor diplomatik sarat warisan di Menteng dan penthouse brutalist megah di atas cakrawala SCBD.",
    hubsEn: [
      "Menteng Heritage Diplomatic Manors",
      "SCBD Skyline Radical Penthouses",
      "Pondok Indah Secluded Sanctuaries",
      "Kebayoran Baru Modernist Residences",
      "Mega Kuningan Executive Villas",
    ],
    hubsId: [
      "Manor Diplomatik Warisan Menteng",
      "Penthouse Radikal Cakrawala SCBD",
      "Suaka Tersembunyi Pondok Indah",
      "Residensi Modernis Kebayoran Baru",
      "Vila Eksekutif Mega Kuningan",
    ],
    featuredPropertySlug: "sander-house",
  },
];

export default function LocationsPage() {
  const { lang } = useLanguage();
  const { isLight } = useTheme();

  // Active Scope: Batam Archipelago (Landing Page Map) vs Global Network
  const [activeScope, setActiveScope] = useState<"batam" | "global">("batam");
  const [selectedKey, setSelectedKey] = useState<string>("BATAM");

  // Map Provider: Leaflet Architectural Canvas vs Google Maps Live Embed
  const [mapEngine, setMapEngine] = useState<"gis" | "google">("gis");
  const [mapTheme, setMapTheme] = useState<"light" | "dark">(isLight ? "light" : "dark");

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});

  // Synchronize tile theme with global theme
  useEffect(() => {
    setMapTheme(isLight ? "light" : "dark");
  }, [isLight]);

  // Current active hub object
  const currentHub =
    ALL_MAP_HUBS.find((h) => h.key === selectedKey) || ALL_MAP_HUBS[0];

  // List of hubs for current scope
  const visibleHubs = ALL_MAP_HUBS.filter((h) => h.scope === activeScope);

  // Switch Scope Handler
  const handleScopeChange = (scope: "batam" | "global") => {
    setActiveScope(scope);
    if (scope === "batam") {
      handleSwitchLocation("BATAM");
    } else {
      handleSwitchLocation("DUBAI");
    }
  };

  // Switch Location Handler with Smooth Leaflet FlyTo
  const handleSwitchLocation = (key: string) => {
    setSelectedKey(key);

    const targetHub = ALL_MAP_HUBS.find((h) => h.key === key) || ALL_MAP_HUBS[0];

    if (mapInstanceRef.current && mapEngine === "gis") {
      mapInstanceRef.current.flyTo(targetHub.coords, targetHub.zoom, {
        duration: 1.8,
        easeLinearity: 0.25,
      });
    }
  };

  // Initialize Interactive Leaflet Architectural Map
  useEffect(() => {
    let isMounted = true;
    let map: any = null;

    if (mapEngine !== "gis") return;
    if (!mapContainerRef.current || typeof window === "undefined") return;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clear previous map if already initialized
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }

      const initialHub =
        ALL_MAP_HUBS.find((h) => h.key === selectedKey) || ALL_MAP_HUBS[0];

      // Initialize Leaflet Map
      map = L.map(mapContainerRef.current, {
        center: initialHub.coords,
        zoom: initialHub.zoom,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false, // Prevents scroll hijacking
        touchZoom: false,
        dragging: !L.Browser.mobile,
      });

      mapInstanceRef.current = map;

      // Architectural Canvas Tile Layer (Light or Dark)
      const tileUrl =
        mapTheme === "dark"
          ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          : "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";

      L.tileLayer(tileUrl, {
        maxZoom: 16,
        attribution: "Esri, HERE, Garmin, © OpenStreetMap contributors",
      }).addTo(map);

      // Add Glowing Custom Pins for all hubs in current scope
      const hubsToPin = ALL_MAP_HUBS.filter((h) => h.scope === activeScope);

      hubsToPin.forEach((hub) => {
        const isCurrent = hub.key === selectedKey;
        const customIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
              <div class="w-5 h-5 rounded-full ${
                isCurrent ? "bg-amber-400" : "bg-black"
              } flex items-center justify-center shadow-2xl ring-2 ${
            isCurrent ? "ring-white" : "ring-amber-400/80"
          } transition-transform duration-300 group-hover:scale-125">
                <div class="w-2 h-2 rounded-full ${
                  isCurrent ? "bg-black" : "bg-amber-400"
                }"></div>
              </div>
              <div class="absolute -inset-2.5 rounded-full border-2 border-amber-400/50 animate-ping pointer-events-none"></div>
              <div class="absolute top-6 bg-black text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-white/20">
                ${hub.name.toUpperCase()}
              </div>
            </div>
          `,
          iconSize: [20, 20],
        });

        const marker = L.marker(hub.coords, { icon: customIcon }).addTo(map);

        marker.on("click", () => {
          handleSwitchLocation(hub.key);
        });

        markersRef.current[hub.key] = marker;
      });

      // Force size invalidation for sharp rendering
      map.whenReady(() => {
        if (!isMounted) return;
        setTimeout(() => {
          if (isMounted && map) {
            try {
              map.invalidateSize();
            } catch (e) {}
          }
        }, 200);
      });

      const handleResize = () => {
        if (isMounted && map) {
          try {
            map.invalidateSize();
          } catch (e) {}
        }
      };

      window.addEventListener("resize", handleResize);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, [mapEngine, mapTheme, activeScope]);

  // Google Maps Direct Search URL
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${currentHub.coords[0]},${currentHub.coords[1]}`;

  // Google Maps Iframe Embed URL
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${currentHub.coords[0]},${currentHub.coords[1]}&z=${currentHub.zoom}&output=embed`;

  // Related properties in this city
  const cityFilteredProperties = PROPERTIES_DATA.filter((p) => {
    if (activeScope === "batam") {
      return p.city.toLowerCase() === "singapore" || p.name.includes("SOLARIA");
    }
    return p.city.toLowerCase() === currentHub.name.toLowerCase();
  });

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isLight ? "bg-architect-light text-neutral-900" : "bg-architect-dark text-white"
      }`}
    >
      <Navbar />

      <main className="w-full">
        {/* Hero Section (Matching Landing Page Hero structure) */}
      <SubpageHero
        darkImage="/images/craft-3.webp"
        lightImage="/images/hero-light.webp"
        subheadEn="GEOGRAPHIC NETWORK & STRATEGIC HUBS"
        subheadId="JARINGAN GEOGRAFIS & KAWASAN STRATEGIS"
        titlePrimary="DENN"
        titleSecondary="LOCATIONS"
        taglineEn="BATAM ARCHIPELAGO • GLOBAL MONOLITHIC SANCTUARIES"
        taglineId="KEPULAUAN BATAM • SUAKA MONOLITIK GLOBAL"
        descriptionEn="Explore our interactive geographic radar spanning premier coastal sanctuaries in Batam and international architecture studios in Zurich, Dubai, Singapore, and Jakarta."
        descriptionId="Jelajahi radar geografis interaktif kami yang membentang dari suaka pesisir eksklusif di Batam hingga studio arsitektur global di Zurich, Dubai, Singapura, dan Jakarta."
        metricNumber="08+"
        metricLabelEn="prime archipelagic and metropolitan enclaves under active architectural development."
        metricLabelId="enklave kepulauan dan metropolitan utama dalam pengembangan arsitektur aktif."
        ctaTextEn="EXPLORE MAP"
        ctaTextId="JELAJAHI PETA"
        ctaHref="#interactive-locations"
        breadcrumbs={[
          {
            labelEn: "Locations",
            labelId: "Lokasi",
          },
        ]}
      />

      {/* Main Interactive Map Section (Featuring the exact Landing Page Google Maps / Leaflet radar) */}
      <section
        id="interactive-locations"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-10 overflow-hidden"
      >
        {/* Scope Selector: Batam Archipelago vs Global Network */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 dark:border-white/10 border-neutral-200">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl sm:rounded-full border bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 max-w-full">
            <button
              onClick={() => handleScopeChange("batam")}
              className={`px-3.5 sm:px-6 py-2 rounded-xl sm:rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeScope === "batam"
                  ? "bg-amber-400 text-black shadow-md"
                  : isLight
                    ? "text-neutral-600 hover:text-black"
                    : "text-neutral-400 hover:text-white"
              }`}
            >
              {lang === "en" ? "Batam (Landing Map)" : "Batam (Peta Utama)"}
            </button>
            <button
              onClick={() => handleScopeChange("global")}
              className={`px-3.5 sm:px-6 py-2 rounded-xl sm:rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeScope === "global"
                  ? "bg-amber-400 text-black shadow-md"
                  : isLight
                    ? "text-neutral-600 hover:text-black"
                    : "text-neutral-400 hover:text-white"
              }`}
            >
              {lang === "en" ? "Global Network" : "Jaringan Global"}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Map Engine Toggle: Leaflet Radar vs Google Maps Live */}
            <div className="flex items-center p-1 rounded-full border bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10">
              <button
                onClick={() => setMapEngine("gis")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  mapEngine === "gis"
                    ? "bg-black text-white dark:bg-white dark:text-black font-bold shadow-sm"
                    : isLight
                      ? "text-neutral-600 hover:text-black"
                      : "text-neutral-400 hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === "en" ? "Radar GIS" : "Radar GIS"}</span>
              </button>

              <button
                onClick={() => setMapEngine("google")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  mapEngine === "google"
                    ? "bg-black text-white dark:bg-white dark:text-black font-bold shadow-sm"
                    : isLight
                      ? "text-neutral-600 hover:text-black"
                      : "text-neutral-400 hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>Google Maps</span>
              </button>
            </div>

            {/* Direct Google Maps External Link */}
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3.5 py-1.5 rounded-full border text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                isLight
                  ? "bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100"
                  : "bg-white/5 border-white/15 text-neutral-300 hover:text-white hover:bg-white/10"
              }`}
              title="Buka titik koordinat langsung di Google Maps"
            >
              <span>{lang === "en" ? "Open Google Maps" : "Buka Google Maps"}</span>
              <ExternalLink className="w-3 h-3 text-amber-500" />
            </a>

            {/* Style Switcher (for GIS mode) */}
            {mapEngine === "gis" && (
              <button
                onClick={() =>
                  setMapTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
                className={`p-2 rounded-full border transition-all active:scale-95 cursor-pointer ${
                  isLight
                    ? "bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100 shadow-sm"
                    : "bg-white/5 border-white/15 text-white hover:bg-white/10"
                }`}
                title="Toggle Map Canvas Tone"
              >
                <Layers className="w-3.5 h-3.5 text-amber-500" />
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Interactive Layout: Matching the Landing Page Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Heading, Description, Metrics & Direct Action */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-amber-500 uppercase block">
                {lang === "en" ? "LOCATIONS • GEOGRAPHIC RADAR" : "LOKASI • RADAR GEOGRAFIS"}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1]">
                {lang === "en" ? "Where we build." : "Di mana kami membangun."}
              </h2>

              <p
                className={`text-sm leading-relaxed ${
                  isLight ? "text-neutral-600" : "text-neutral-300"
                }`}
              >
                {lang === "en"
                  ? "From Batam Island to the Indonesian archipelago and global wealth capitals. Explore our live interactive radar across prime enclaves."
                  : "Dari Pulau Batam hingga kepulauan Indonesia dan pusat metropolitan dunia. Jelajahi radar geografis interaktif kami di berbagai kawasan pilihan."}
              </p>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="#estates-directory"
                  className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  <span className="underline decoration-1 underline-offset-4">
                    {lang === "en" ? "VIEW RESIDENCES DIRECTORY" : "LIHAT DIREKTORI RESIDENSI"}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isLight
                        ? "border-neutral-300 group-hover:border-black"
                        : "border-white/20 group-hover:border-white"
                    }`}
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </div>

            {/* Metrics Counter */}
            <div
              className={`pt-6 border-t ${
                isLight ? "border-neutral-200" : "border-white/10"
              } grid grid-cols-2 gap-4`}
            >
              <div>
                <span className="text-3xl font-black tabular-numbers block text-amber-500">
                  {activeScope === "batam" ? "05" : "05"}
                </span>
                <p
                  className={`text-xs font-medium mt-1 ${
                    isLight ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  {activeScope === "batam"
                    ? lang === "en"
                      ? "Batam Coastal Enclaves"
                      : "Enklave Pesisir Batam"
                    : lang === "en"
                      ? "Global Metropolitan Hubs"
                      : "Pusat Metropolitan Global"}
                </p>
              </div>

              <div>
                <span className="text-3xl font-black tabular-numbers block">
                  100%
                </span>
                <p
                  className={`text-xs font-medium mt-1 ${
                    isLight ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  {lang === "en"
                    ? "Private Freehold Holdings"
                    : "Hak Milik Privat Terverifikasi"}
                </p>
              </div>
            </div>
          </div>

          {/* Center Column: Interactive Map Canvas (Leaflet Radar or Google Maps Embed) */}
          <div
            className={`lg:col-span-5 relative rounded-3xl overflow-hidden border shadow-2xl h-[380px] sm:h-[440px] lg:h-[480px] w-full transition-colors isolate z-0 ${
              isLight
                ? "border-neutral-200 bg-neutral-100"
                : "border-neutral-800 bg-[#0A0A0A]"
            }`}
            style={{ isolation: "isolate" }}
          >
            {/* 1. GIS Leaflet Map Mode */}
            {mapEngine === "gis" && (
              <div ref={mapContainerRef} className="w-full h-full relative z-0 touch-pan-y" />
            )}

            {/* 2. Google Maps Interactive Embed Mode */}
            {mapEngine === "google" && (
              <div className="w-full h-full relative z-0">
                <iframe
                  title={`Google Maps - ${currentHub.name}`}
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full touch-pan-y"
                />
              </div>
            )}

            {/* Top Overlay Badge: Live GPS & Active Hub Radar */}
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-2 text-[10px] font-mono font-bold text-white">
                <Compass
                  className="w-3.5 h-3.5 text-amber-400 animate-spin"
                  style={{ animationDuration: "12s" }}
                />
                <span>
                  {currentHub.name.toUpperCase()} • GPS {currentHub.coords[0].toFixed(3)},{" "}
                  {currentHub.coords[1].toFixed(3)}
                </span>
              </div>
            </div>

            {/* Bottom Floating Hub Switcher Pills (Matching Landing Page Experience) */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-10 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {visibleHubs.map((hub) => (
                <button
                  key={hub.key}
                  onClick={() => handleSwitchLocation(hub.key)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase transition-all shrink-0 cursor-pointer shadow-xl ${
                    selectedKey === hub.key
                      ? "bg-amber-400 text-black scale-105 shadow-amber-500/20"
                      : "bg-black/75 backdrop-blur-md text-white hover:bg-black border border-white/15"
                  }`}
                >
                  {hub.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Location Details Card (Matching Landing Page Structure) */}
          <div className="lg:col-span-3">
            <div
              className={`rounded-3xl p-6 sm:p-7 border shadow-xl flex flex-col justify-between h-full space-y-5 transition-colors ${
                isLight
                  ? "bg-white border-neutral-200"
                  : "bg-[#111111] border-white/10"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3 border-neutral-100 dark:border-white/10">
                  <h3 className="text-base font-black tracking-wider uppercase">
                    {currentHub.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-amber-500 tracking-wider">
                    {currentHub.tag}
                  </span>
                </div>

                <p
                  className={`text-xs leading-relaxed ${
                    isLight ? "text-neutral-600" : "text-neutral-300"
                  }`}
                >
                  {lang === "en" ? currentHub.descEn : currentHub.descId}
                </p>

                {/* Micro Enclaves Bullet List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    {lang === "en" ? "MICRO ENCLAVES" : "ENKLAVE KAWASAN"}
                  </span>
                  <ul className="text-xs space-y-2 text-neutral-600 dark:text-neutral-300 font-medium">
                    {(lang === "en" ? currentHub.hubsEn : currentHub.hubsId).map(
                      (hub, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span className="truncate">{hub}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Direct Concierge WhatsApp Action */}
              <div className="pt-4 border-t border-neutral-100 dark:border-white/10 space-y-2">
                <a
                  href="https://wa.me/628136764825"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === "en" ? "CONSULT REGIONAL DESK" : "KONSULTASI DESK REGIONAL"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Residences Directory in Selected Region */}
      <section
        id="estates-directory"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 border-t border-white/10 dark:border-white/10 border-neutral-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase block mb-1">
              {lang === "en" ? "ARCHITECTURAL RESIDENCES" : "RESIDENSI ARSITEKTUR"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              {lang === "en"
                ? `Properties in ${currentHub.name}`
                : `Properti di ${currentHub.name}`}
            </h2>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-500 hover:text-amber-400 font-bold"
          >
            <span>{lang === "en" ? "View All 12 Residences" : "Lihat Semua 12 Residensi"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Property Cards in this Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(cityFilteredProperties.length > 0
            ? cityFilteredProperties
            : PROPERTIES_DATA.slice(0, 3)
          ).map((prop) => (
            <Link
              key={prop.id}
              href={`/properties/${prop.slug}`}
              className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between ${
                isLight
                  ? "bg-white border-neutral-200"
                  : "bg-neutral-900 border-white/10"
              }`}
            >
              {/* Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={prop.image}
                  alt={prop.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider border border-white/15">
                    {prop.city}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-amber-500 transition-colors">
                    {prop.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-amber-500">
                    {prop.price}
                  </span>
                </div>

                <p
                  className={`text-xs line-clamp-2 ${
                    isLight ? "text-neutral-600" : "text-neutral-400"
                  }`}
                >
                  {lang === "en" ? prop.description.en : prop.description.id}
                </p>

                <div
                  className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                    isLight
                      ? "border-neutral-100 text-neutral-500"
                      : "border-white/10 text-neutral-400"
                  }`}
                >
                  <span>{prop.specs}</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{lang === "en" ? "Details" : "Detail"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Twilight Vision & Contact CTA Banner */}
      <ContactBanner />
      </main>

      <Footer />
    </div>
  );
}
