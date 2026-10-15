"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import VehicleBookingWidget, { type RentalPackage } from "@/components/booking/VehicleBookingWidget";
import { getCar, getRelatedCarsForLocale } from "@/lib/localizedData";
import { formatRupiah, getLocalizedPath, type Locale } from "@/lib/i18n";
import {
  Users,
  Gauge,
  Briefcase,
  Fuel,
  Zap,
  ShieldCheck,
  Check,
  ChevronRight,
  Star,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Car as CarIcon,
  Sparkles,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";

const RENTAL_RULES_ID = [
  "Kendaraan mobil/motor yang disewakan tidak dapat dipindah tangankan",
  "Kendaraan tidak dapat dijadikan jaminan/digadaikan",
  "Pelanggaran No. 1 & 2 akan diproses melalui jalur hukum/pidana. Pemilik kendaraan berhak mengambil kembali kendaraannya.",
  "Pengembalian kendaraan harus dalam keadaan seperti pada saat serah terima kendaraan di awal. Jika terjadi lecet/tabrakan, 100% adalah tanggung jawab pihak penyewa dan akan dikenakan denda. Jika kerusakan cukup parah, Penyewa wajib membayar sewa kendaraan selama kendaraan berada di bengkel.",
  "Jika terjadi keterlambatan pengembalian kendaraan, akan dikenakan biaya over time mulai dari 50.000 per jam sampai 10% dari harga sewa, dengan batas overtime 3 jam. Jika lebih dari 3 jam, waktu keterlambatan terhitung sebagai 1 hari sewa.",
  "Tidak diperbolehkan MEROKOK di dalam mobil. Jika saat pengembalian mobil berbau asap rokok, penyewa akan dikenakan denda sebesar 150K.",
  "Penyewa wajib menggunakan SAFETY BELT saat berkendara dan dilarang bermain ponsel. Jika terkena tilang elektronik, seluruh denda (100%) akan dibebankan kepada penyewa kendaraan.",
  "Bensin (BBM) yang terpakai wajib di kembalikan, apabila pengembalian kurang dari jarum/balok/range jarak tempuh, penyewa wajib bersedia membayar kekurangan bensin yang telah di gunakan.",
  "Mohon untuk tetap menjaga kebersihan kendaraan.",
];

const RENTAL_RULES_EN = [
  "Rented vehicles (cars/motorcycles) cannot be transferred or handed over to other parties.",
  "Vehicles cannot be used as collateral or pawned.",
  "Violations of No. 1 & 2 will be processed through legal/criminal procedures. The vehicle owner reserves the right to repossess the vehicle.",
  "The vehicle must be returned in the same condition as at initial handover. In the event of scratches/collisions, 100% is the renter's responsibility and fines apply. If damage is severe, the renter must pay the rental fee while the vehicle is in the workshop.",
  "In case of late return, overtime fees apply starting from 50,000 per hour up to 10% of rental price, with a 3-hour limit. If exceeding 3 hours, late time counts as 1 day's rental.",
  "NO SMOKING inside the car. If the car smells of cigarette smoke upon return, the renter will be fined 150K.",
  "Renters must wear a SAFETY BELT while driving and are prohibited from using mobile phones. If caught by electronic traffic tickets, all fines (100%) will be charged to the renter.",
  "Consumed fuel (BBM) must be returned; if return level is below the initial needle/bar/mileage range, the renter must pay for the missing fuel used.",
  "Please maintain the cleanliness of the vehicle.",
];

export default function VehicleDetailClient({ slug }: { slug: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const car = getCar(locale, slug);

  const [selectedImage, setSelectedImage] = useState<string>(car?.image || "");
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "terms">("terms");
  const [isLiked, setIsLiked] = useState(false);

  if (!car) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-md mx-auto">
            <CarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("vehicle.notFoundTitle")}</h1>
            <p className="text-gray-600 text-sm mb-6">
              {t("vehicle.notFoundDescription")}
            </p>
            <Link href={getLocalizedPath(locale, "/kendaraan")}>
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl px-6 py-3 font-bold shadow-lg shadow-amber-500/20">
                {t("vehicle.backToList")}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const galleryImages = car.gallery && car.gallery.length > 0 ? car.gallery : (car.image ? [car.image] : []);
  const relatedCars = getRelatedCarsForLocale(locale, car.slug, car.category, 3);

  const isInherentlyAllIn =
    car.slug.includes("all-in") ||
    car.priceNote?.toLowerCase().includes("all in") ||
    car.priceNote?.toLowerCase().includes("all-in");

  const [selectedPackage, setSelectedPackage] = useState<RentalPackage>(
    isInherentlyAllIn ? "all-in" : "self-drive"
  );

  const driverSurcharge = 250000;
  const currentDailyRate = selectedPackage === "with-driver" ? car.price + driverSurcharge : car.price;
  const currentPriceNote = selectedPackage === "with-driver"
    ? (locale === "id" ? "/ hari (dengan supir)" : locale === "ms" ? "/ hari (dengan pemandu)" : "/ day (with driver)")
    : car.priceNote;

  return (
    <>
      <Header />

      <main className="min-h-screen pt-24 sm:pt-28 pb-20 bg-[#F8FAFC]">
        {/* Breadcrumb & Navigation Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <Link href={getLocalizedPath(locale, "/")} className="hover:text-amber-600 transition-colors font-medium">
                {t("vehicle.breadcrumbHome")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <Link href={getLocalizedPath(locale, "/kendaraan")} className="hover:text-amber-600 transition-colors font-medium">
                {t("vehicle.breadcrumbVehicles")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                {car.name}
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2.5 rounded-full border transition-all ${isLiked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                aria-label={t("common.saved")}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${car.name} - NadimTrans RentCar`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert(t("common.copied"));
                  }
                }}
                className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all"
                aria-label={t("common.share")}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* Left Column: Photos, Specs, Description, Features (8 Cols) + Mobile Booking Card */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">

              {/* Photo Showcase & Thumbnails */}
              <div id="galeri" className="scroll-mt-24 sm:scroll-mt-28 bg-white rounded-3xl p-4 sm:p-6 border border-gray-200/80 shadow-sm">
                {/* Main Large Display Image */}
                <div className="relative h-64 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden bg-white mb-4 flex items-center justify-center border border-gray-200/80 shadow-sm">
                  {(selectedImage || car.image) ? (
                    <Image
                      src={selectedImage || car.image}
                      alt={car.name}
                      fill
                      priority
                      className="object-contain p-6 sm:p-10 transition-transform duration-500 hover:scale-105 drop-shadow-[0_16px_30px_rgba(0,0,0,0.15)]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-amber-50/30 p-8 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-3 text-slate-400">
                        <CarIcon className="w-8 h-8" />
                      </div>
                      <p className="text-base font-bold text-slate-800 uppercase tracking-wider">{t("vehicle.photoPlaceholder")}</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm">{t("vehicle.photoPlaceholderDescription", { name: car.name })}</p>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950 text-amber-400 border border-amber-500/40 shadow-md">
                      {car.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm text-gray-900 shadow-md">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{car.rating}</span>
                      <span className="text-gray-400 font-normal">({car.reviews} {t("common.reviews")})</span>
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img
                          ? "border-amber-500 ring-2 ring-amber-500/30 scale-[1.02]"
                          : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"
                          }`}
                      >
                        <Image src={img} alt={`${car.name} - ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Booking Card - Visible only on mobile */}
              <div className="lg:hidden">
                <VehicleBookingWidget
                  car={car}
                  locale={locale}
                  variant="mobile"
                  selectedPackage={selectedPackage}
                  onPackageChange={setSelectedPackage}
                />
              </div>

              {/* Title & Key Highlights */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1 block">
                      {car.type}
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                      {car.name}
                    </h1>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      {t("vehicle.rentalRate")}
                    </span>
                    <div className="flex flex-col sm:items-end">
                      <span className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight leading-none transition-all duration-300">
                        {formatRupiah(currentDailyRate, locale)}
                      </span>
                      {currentPriceNote && (
                        <span className="text-xs text-gray-500 font-medium mt-1.5 block sm:text-right max-w-[280px] leading-snug transition-all duration-300">
                          {currentPriceNote}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specs Grid Bar */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    {t("vehicle.primarySpecs")}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                      <Users className="w-5 h-5 text-amber-600 mb-2" />
                      <span className="text-xs text-gray-500">{t("vehicle.capacity")}</span>
                      <span className="font-bold text-gray-900 text-sm">{car.specs.seats} {t("common.passengers")}</span>
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                      <Briefcase className="w-5 h-5 text-amber-600 mb-2" />
                      <span className="text-xs text-gray-500">{t("vehicle.luggage")}</span>
                      <span className="font-bold text-gray-900 text-sm">{car.specs.luggage} {t("common.luggage")}</span>
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                      <Gauge className="w-5 h-5 text-amber-600 mb-2" />
                      <span className="text-xs text-gray-500">{t("vehicle.transmission")}</span>
                      <span className="font-bold text-gray-900 text-sm truncate max-w-full">
                        {car.specs.transmission}
                      </span>
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                      <Fuel className="w-5 h-5 text-amber-600 mb-2" />
                      <span className="text-xs text-gray-500">{t("vehicle.fuel")}</span>
                      <span className="font-bold text-gray-900 text-sm truncate max-w-full">
                        {car.specs.fuel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Performance Specs if available */}
                {(car.specs.engine || car.specs.power || car.specs.acceleration) && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {car.specs.engine && (
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                        <span className="text-gray-500 block mb-0.5">{t("vehicle.engine")}:</span>
                        <span className="font-semibold text-gray-900">{car.specs.engine}</span>
                      </div>
                    )}
                    {car.specs.power && (
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                        <span className="text-gray-500 block mb-0.5">{t("vehicle.power")}:</span>
                        <span className="font-semibold text-gray-900">{car.specs.power}</span>
                      </div>
                    )}
                    {car.specs.acceleration && (
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                        <span className="text-gray-500 block mb-0.5">{t("vehicle.acceleration")}:</span>
                        <span className="font-semibold text-gray-900">{car.specs.acceleration}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tabs Navigation for Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
                <div className="flex border-b border-gray-200 gap-4 sm:gap-6 overflow-x-auto scrollbar-none">
                  {/* Tab: Syarat & Ketentuan (Paling Kiri) */}
                  <button
                    onClick={() => setActiveTab("terms")}
                    className={`pb-4 text-sm font-bold transition-all relative flex-shrink-0 ${activeTab === "terms" ? "text-amber-600" : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    {t("vehicle.terms")}
                    {activeTab === "terms" && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      />
                    )}
                  </button>

                  {/* Tab: Fitur & Fasilitas (Tengah) */}
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`pb-4 text-sm font-bold transition-all relative flex-shrink-0 ${activeTab === "features" ? "text-amber-600" : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    {t("vehicle.features")}
                    {activeTab === "features" && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      />
                    )}
                  </button>

                  {/* Tab: Deskripsi & Kenyamanan (Paling Kanan) */}
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-4 text-sm font-bold transition-all relative flex-shrink-0 ${activeTab === "overview" ? "text-amber-600" : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    {t("vehicle.overview")}
                    {activeTab === "overview" && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      />
                    )}
                  </button>
                </div>

                {/* Tab 1: Overview */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                      {car.description}
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-3">{t("vehicle.benefits")}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {car.included.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Peraturan Rental Mobil (Dari Flyer Resmi Nadim Trans) */}
                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-300/80 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm tracking-wide uppercase">
                            {locale === "id" ? "PERATURAN RENTAL MOBIL" : "CAR RENTAL REGULATIONS"}
                          </h4>
                          <p className="text-[11px] sm:text-xs font-bold text-amber-800 uppercase mt-0.5">
                            {locale === "id"
                              ? "PENTING DIKETAHUI KETENTUAN-KETENTUAN DI BAWAH INI!"
                              : "IMPORTANT TERMS AND CONDITIONS TO KNOW BELOW!"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        {(locale === "id" ? RENTAL_RULES_ID : RENTAL_RULES_EN).map((rule, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-xs sm:text-[13px] text-gray-800 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Features */}
                {activeTab === "features" && (
                  <div className="space-y-4">
                    <p className="text-gray-600 text-xs sm:text-sm mb-4">
                      {t("vehicle.featureIntro")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {car.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs sm:text-sm font-semibold text-gray-800"
                        >
                          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Terms */}
                {activeTab === "terms" && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-950 space-y-1">
                        <span className="font-bold block">{t("vehicle.verificationTitle")}</span>
                        <p>{t("vehicle.verificationDescription")}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {car.terms.map((term, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{term}</span>
                        </div>
                      ))}
                    </div>

                    {/* Peraturan Rental Mobil (Dari Flyer Resmi Nadim Trans) */}
                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-300/80 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm tracking-wide uppercase">
                            {locale === "id" ? "PERATURAN RENTAL MOBIL" : "CAR RENTAL REGULATIONS"}
                          </h4>
                          <p className="text-[11px] sm:text-xs font-bold text-amber-800 uppercase mt-0.5">
                            {locale === "id"
                              ? "PENTING DIKETAHUI KETENTUAN-KETENTUAN DI BAWAH INI!"
                              : "IMPORTANT TERMS AND CONDITIONS TO KNOW BELOW!"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        {(locale === "id" ? RENTAL_RULES_ID : RENTAL_RULES_EN).map((rule, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-xs sm:text-[13px] text-gray-800 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Booking / Reservation Form (4-5 Cols) - Desktop Only */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 space-y-6">
                <VehicleBookingWidget
                  car={car}
                  locale={locale}
                  variant="desktop"
                  selectedPackage={selectedPackage}
                  onPackageChange={setSelectedPackage}
                />

                {/* Assistance Box */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 border border-amber-500/30 rounded-3xl p-6 text-white shadow-xl shadow-black/20">
                  <h4 className="font-bold text-base mb-1 text-amber-400">{t("vehicle.specialHelpTitle")}</h4>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {t("vehicle.specialHelpDescription")}
                  </p>
                  <button
                    onClick={() => {
                      const text = encodeURIComponent(
                        `${t("vehicle.whatsappGreeting")}\n\n` +
                        `${t("vehicle.whatsappQuestion")}`
                      );
                      window.open(`https://wa.me/6281276003870?text=${text}`, "_blank");
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-xl transition-colors shadow-md shadow-amber-500/20"
                  >
                    <span>{t("vehicle.contactSupport")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Assistance Box - Between Product Description and Related Vehicles */}
          <div className="lg:hidden mt-12 mb-12">
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 border border-amber-500/30 rounded-3xl p-6 text-white shadow-xl shadow-black/20">
              <h4 className="font-bold text-base mb-1 text-amber-400">{t("vehicle.specialHelpTitle")}</h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {t("vehicle.specialHelpDescription")}
              </p>
              <button
                onClick={() => {
                  const text = encodeURIComponent(
                    `${t("vehicle.whatsappGreeting")}\n\n` +
                    `${t("vehicle.whatsappQuestion")}`
                  );
                  window.open(`https://wa.me/6281276003870?text=${text}`, "_blank");
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-xl transition-colors shadow-md shadow-amber-500/20"
              >
                <span>{t("vehicle.contactSupport")}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Related Recommended Vehicles */}
          {relatedCars.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200/80">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                    {t("vehicle.similarVehicles")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {t("vehicle.related")}
                  </h2>
                </div>
                <Link
                  href={getLocalizedPath(locale, "/kendaraan")}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors group"
                >
                  <span>{t("vehicle.viewAllFleet")}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {relatedCars.map((relCar) => (
                  <div
                    key={relCar.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 bg-white overflow-hidden flex items-center justify-center border-b border-gray-100">
                        {relCar.image ? (
                          <Image
                            src={relCar.image}
                            alt={relCar.name}
                            fill
                            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_16px_rgba(0,0,0,0.12)]"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-amber-50/30 flex flex-col items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
                            <CarIcon className="w-7 h-7 mb-1" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">{t("vehicle.unitPhoto")}</span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-slate-950/90 text-amber-400 border border-amber-500/40 shadow-sm">
                            {relCar.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <div className="flex justify-between items-start gap-3.5 sm:gap-4 mb-3 min-h-[3rem]">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors text-base truncate">
                              {relCar.name}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-snug mt-0.5">{relCar.type}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-sm sm:text-base font-black text-amber-600 block whitespace-nowrap">
                              {formatRupiah(relCar.price, locale)}
                            </span>
                            <span className="text-[10px] text-gray-400 block whitespace-nowrap">{relCar.priceNote}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1 py-2.5 px-1.5 sm:px-2 bg-gray-50/80 rounded-xl border border-gray-100 text-xs text-gray-600 mb-2">
                          <div className="flex items-center justify-center gap-1 min-w-0">
                            <Users className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span className="text-[11px] font-semibold truncate">{relCar.specs.seats} {t("common.seats")}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 border-x border-gray-200/80 min-w-0">
                            <Briefcase className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span className="text-[11px] font-semibold truncate">{relCar.specs.luggage} {t("common.luggage")}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 min-w-0">
                            <Gauge className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span className="text-[11px] font-semibold truncate" title={relCar.specs.transmission}>
                              {relCar.specs.transmission.replace("Otomatis", "Matic").replace("Automatic", "Auto")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0">
                      <Link href={`${getLocalizedPath(locale, `/kendaraan/${relCar.slug}`)}#galeri`}>
                        <Button className="w-full bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/40 transition-all font-semibold rounded-xl text-xs h-10 shadow-sm cursor-pointer active:scale-98">
                          {t("catalog.bookNow")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </main>

      <Footer />
    </>
  );
}
