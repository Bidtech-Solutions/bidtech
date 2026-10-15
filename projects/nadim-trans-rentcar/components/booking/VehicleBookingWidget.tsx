"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import RentalDateSelector from "@/components/ui/RentalDateSelector";
import type { DeliveryLocationData } from "@/components/booking/DeliveryMapPicker";
import { formatRupiah, type Locale } from "@/lib/i18n";
import { COMPANY_INFO, type Car } from "@/lib/data";
import { KeyRound, UserRoundCheck, Clock, Sparkles } from "lucide-react";

const DeliveryMapPicker = dynamic(
  () => import("@/components/booking/DeliveryMapPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[210px] w-full rounded-2xl bg-amber-50/50 border border-amber-200/50 animate-pulse flex items-center justify-center text-xs text-amber-800">
        Memuat peta pengantaran...
      </div>
    ),
  }
);

interface VehicleBookingWidgetProps {
  car: Car;
  locale: Locale;
  variant?: "desktop" | "mobile";
  selectedPackage?: RentalPackage;
  onPackageChange?: (pkg: RentalPackage) => void;
}

const ONE_DAY_MS = 86_400_000;

function differenceInCalendarDays(later: Date, earlier: Date): number {
  const laterUtc = Date.UTC(later.getFullYear(), later.getMonth(), later.getDate());
  const earlierUtc = Date.UTC(earlier.getFullYear(), earlier.getMonth(), earlier.getDate());
  return Math.round((laterUtc - earlierUtc) / ONE_DAY_MS);
}

function getFormattedCurrentTime(date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export type RentalPackage = "self-drive" | "with-driver" | "all-in";

export default function VehicleBookingWidget({
  car,
  locale,
  variant = "desktop",
  selectedPackage: controlledPackage,
  onPackageChange,
}: VehicleBookingWidgetProps) {
  // Varian "mobile" juga dipakai di iPad/tablet (di bawah breakpoint lg),
  // sehingga di layar md ke atas kita pecah menjadi 2 kolom agar tidak melebar.
  const isSplitOnTablet = variant === "mobile";
  const t = useTranslations();

  // Deteksi jika mobil bawaannya adalah All In (Alphard All In, Hiace All In)
  const priceNote = car.priceNote?.toLowerCase() ?? "";
  const isInherentlyAllIn =
    car.slug.includes("all-in") ||
    priceNote.includes("all in") ||
    priceNote.includes("all-in");

  // Paket sewa: jika dikontrol dari luar gunakan prop, atau gunakan local state
  const [internalPackage, setInternalPackage] = useState<RentalPackage>(
    isInherentlyAllIn ? "all-in" : "self-drive"
  );
  const selectedPackage = controlledPackage ?? internalPackage;
  const setSelectedPackage = (pkg: RentalPackage) => {
    setInternalPackage(pkg);
    onPackageChange?.(pkg);
  };

  // Tanggal sewa: inisialisasi default ke hari ini
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<string>("09:00");

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
    setStartDate(today);
    setEndDate(today);

    // Otomatis menyesuaikan jam ke jam real-time saat ini saat buka halaman
    const realTimeNow = getFormattedCurrentTime(now);
    setDeliveryTime(realTimeNow);
    setDeliveryData((prev) => ({
      ...prev,
      deliveryTime: realTimeNow,
    }));
  }, []);

  const isDateSelected = Boolean(startDate && endDate);

  // Data pengantaran mobil
  const [deliveryData, setDeliveryData] = useState<DeliveryLocationData>({
    deliveryType: "delivery",
    kecamatan: "Nongsa",
    address: "Bandara Internasional Hang Nadim, Batu Besar, Batam",
    deliveryTime: "09:00",
    latitude: 1.1218,
    longitude: 104.1168,
    googleMapsUrl: "https://maps.google.com/?q=1.1218,104.1168",
  });

  const handleDeliveryTimeChange = (time: string) => {
    setDeliveryTime(time);
    setDeliveryData((prev) => ({
      ...prev,
      deliveryTime: time,
    }));
  };

  const rentalDays =
    startDate && endDate ? differenceInCalendarDays(endDate, startDate) + 1 : 1;

  // Hitung tarif harian berdasarkan paket
  const calculateDailyPackageRate = (): {
    dailyTotal: number;
    packageLabel: string;
  } => {
    if (isInherentlyAllIn) {
      return {
        dailyTotal: car.price,
        packageLabel:
          locale === "id"
            ? "Paket All In (Driver & BBM)"
            : locale === "ms"
            ? "Pakej All In (Pemandu & Minyak)"
            : "All In Package (Driver & Fuel)",
      };
    }

    if (selectedPackage === "self-drive") {
      return {
        dailyTotal: car.price,
        packageLabel:
          locale === "id"
            ? "Lepas Kunci"
            : locale === "ms"
            ? "Pandu Sendiri"
            : "Self-Drive",
      };
    }

    return {
      dailyTotal: car.price + 250000,
      packageLabel:
        locale === "id"
          ? "Dengan Supir"
          : locale === "ms"
          ? "Dengan Pemandu"
          : "With Driver",
    };
  };

  const { dailyTotal, packageLabel } = calculateDailyPackageRate();
  const totalCost = dailyTotal * rentalDays;
  const totalCostFormatted = formatRupiah(totalCost, locale);

  const dateFormatter = new Intl.DateTimeFormat(
    locale === "id" ? "id-ID" : "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const rentalPeriod =
    startDate && endDate
      ? `${dateFormatter.format(startDate)} - ${dateFormatter.format(endDate)}`
      : "";

  const durationLabel = `${rentalDays} ${locale === "id" ? "Hari" : "Days"}`;

  const summaryLabels = {
    vehicle: locale === "id" ? "Kendaraan:" : locale === "ms" ? "Kenderaan:" : "Vehicle:",
    service: locale === "id" ? "Layanan:" : locale === "ms" ? "Perkhidmatan:" : "Service:",
    schedule: locale === "id" ? "Jadwal Pengantaran:" : locale === "ms" ? "Jadual Penghantaran:" : "Delivery Schedule:",
    spot: locale === "id" ? "Titik Antar / Jemput:" : locale === "ms" ? "Titik Ambil / Hantar:" : "Delivery Spot:",
    total: locale === "id" ? "Total Estimasi Sewa:" : locale === "ms" ? "Jumlah Anggaran Sewa:" : "Total Rental Estimate:",
  };

  // WhatsApp Handler dengan data lengkap & titik Maps real-time
  const handleWhatsAppOrder = () => {
    if (!startDate || !endDate) return;

    const messageLines = [
      locale === "id"
        ? "Halo NadimTrans RentCar, saya ingin memesan rental mobil:"
        : "Hello NadimTrans RentCar, I would like to book a car:",
      "",
      `- ${locale === "id" ? "Kendaraan" : "Vehicle"}: ${car.name} (${car.type})`,
      `- ${locale === "id" ? "Pilihan Layanan" : "Rental Package"}: ${packageLabel}`,
      `- ${locale === "id" ? "Periode Sewa" : "Rental Period"}: ${rentalPeriod} (${durationLabel})`,
      `- ${locale === "id" ? "Jam Pengantaran" : "Delivery Time"}: ${deliveryTime} WIB`,
      `- ${locale === "id" ? "Layanan" : "Service"}: ${locale === "id" ? "Diantar Langsung ke Lokasi" : "Direct Delivery to Location"}`,
      `- ${locale === "id" ? "Wilayah / Kecamatan" : "Sub-District"}: Kec. ${deliveryData.kecamatan || "Batam Kota"}`,
      `- ${locale === "id" ? "Detail Alamat / Patokan" : "Delivery Address"}: ${deliveryData.address || "-"}`,
      `- ${locale === "id" ? "Titik Google Maps Driver" : "Google Maps Pin Link"}: ${deliveryData.googleMapsUrl}`,
      `- ${locale === "id" ? "Estimasi Total Biaya" : "Estimated Total"}: ${totalCostFormatted}`,
      "",
      locale === "id"
        ? "Mohon konfirmasi ketersediaan unit dan jadwal pengantaran. Terima kasih!"
        : "Please confirm unit availability and delivery schedule. Thank you!",
    ];

    const encodedText = encodeURIComponent(messageLines.join("\n"));
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodedText}`, "_blank");
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-7 border border-amber-200/80 shadow-xl shadow-amber-500/5 transition-all space-y-4 md:space-y-5">
      {/* Header + Pilihan Layanan (sejajar 2 kolom di iPad) */}
      <div className={isSplitOnTablet ? "space-y-4 md:grid md:grid-cols-2 md:items-center md:gap-6 md:space-y-0" : "space-y-4"}>
      {/* 1. Header: Total Estimasi Sewa (Hidden di Desktop, Tetap Tampil di Mobile/Tablet) */}
      <div className={`lg:hidden ${isSplitOnTablet ? "pb-3 border-b border-gray-100 md:pb-0 md:border-b-0" : "pb-3 border-b border-gray-100"}`}>
        <span className="text-xs md:text-sm font-semibold text-gray-500 block mb-0.5">
          {locale === "id" ? "Total Estimasi Sewa" : "Total Rental Estimate"}
        </span>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[28px] leading-tight sm:text-4xl font-black text-[#cd7f32]">
            {isDateSelected ? totalCostFormatted : `${formatRupiah(dailyTotal, locale)}`}
          </span>
          <span className="text-xs md:text-sm text-gray-500 font-semibold">
            {isDateSelected
              ? `(${durationLabel})`
              : (locale === "id" ? "/ hari" : "/ day")}
          </span>
        </div>
      </div>

      {/* 2. Pilihan Layanan: Lepas Kunci & Dengan Supir (Hanya 2 Tombol, tanpa Paket All In tambahan) */}
      <div>

        {isInherentlyAllIn ? (
          <div className="flex items-center gap-3 rounded-2xl border border-amber-300 bg-amber-50/80 p-3 text-amber-950">
            <Sparkles className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-amber-950">
                {locale === "id" ? "Paket All In (Driver & BBM 10 Jam)" : "All In Package (Driver & Fuel 10 Hours)"}
              </p>
              <p className="text-[11px] text-amber-800 leading-snug mt-0.5">
                {locale === "id"
                  ? "Unit premium ini otomatis termasuk supir profesional dan BBM hingga 10 jam."
                  : "This premium vehicle automatically includes a professional driver and fuel for up to 10 hours."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {/* 1. Lepas Kunci */}
            <button
              type="button"
              onClick={() => setSelectedPackage("self-drive")}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-center transition-all duration-200 active:scale-[0.98] ${
                selectedPackage === "self-drive"
                  ? "border-amber-400 bg-[#fefbec] text-amber-950 ring-2 ring-amber-400/30 shadow-sm font-extrabold"
                  : "border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50/40"
              }`}
            >
              <KeyRound className="h-4 w-4 text-amber-600 flex-shrink-0" />
              <span className="text-xs font-bold leading-tight">
                {locale === "id" ? "Lepas Kunci" : "Self-Drive"}
              </span>
            </button>

            {/* 2. Dengan Supir */}
            <button
              type="button"
              onClick={() => setSelectedPackage("with-driver")}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-center transition-all duration-200 active:scale-[0.98] ${
                selectedPackage === "with-driver"
                  ? "border-amber-400 bg-[#fefbec] text-amber-950 ring-2 ring-amber-400/30 shadow-sm font-extrabold"
                  : "border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50/40"
              }`}
            >
              <UserRoundCheck className="h-4 w-4 text-amber-600 flex-shrink-0" />
              <div className="text-left leading-tight">
                <span className="block text-xs font-bold">
                  {locale === "id" ? "Dengan Supir" : "With Driver"}
                </span>
                <span className="text-[10px] text-gray-500 font-semibold mt-0.5 block">
                  {locale === "id"
                    ? "+Rp 250.000/hari"
                    : `+${formatRupiah(250000, locale)}/${locale === "ms" ? "hari" : "day"}`}
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
      </div>

      {/* Peta + Kalender: 1 kolom di HP & sidebar desktop, 2 kolom di iPad */}
      <div className={isSplitOnTablet ? "space-y-4 pt-2 border-t border-gray-100 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 md:pt-5 md:items-start" : "space-y-4 pt-2 border-t border-gray-100"}>
      {/* 3. Map & Lokasi Pengantaran */}
      <div className="min-w-0">
        <DeliveryMapPicker
          locale={locale}
          value={deliveryData}
          onChange={(updated) => setDeliveryData(updated)}
        />
      </div>

      {/* 4. Kalender Sewa, Tanggal & Jam Pengantaran (Disatukan) */}
      <div className="min-w-0 pt-1">
        <RentalDateSelector
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          deliveryTime={deliveryTime}
          onDeliveryTimeChange={handleDeliveryTimeChange}
          onChange={(nextStartDate, nextEndDate) => {
            setStartDate(nextStartDate);
            setEndDate(nextEndDate);
          }}
        />
      </div>
      </div>

      {/* 6. Rincian Akhir & Tombol WhatsApp (Semua di halaman yang sama) */}
      <div className="pt-3 border-t border-gray-100 space-y-3">
        {/* Ringkasan Singkat Pesanan */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] text-gray-700">
          <div className="flex justify-between items-center font-medium">
            <span className="text-gray-500">{summaryLabels.vehicle}</span>
            <span className="font-bold text-gray-900 text-right">{car.name}</span>
          </div>
          <div className="flex justify-between items-center font-medium">
            <span className="text-gray-500">{summaryLabels.service}</span>
            <span className="font-bold text-gray-900 text-right">{packageLabel}</span>
          </div>
          <div className="flex justify-between items-center font-medium">
            <span className="text-gray-500">{summaryLabels.schedule}</span>
            <span className="font-bold text-gray-900 text-right">
              {startDate ? dateFormatter.format(startDate) : "-"} ({deliveryTime} WIB)
            </span>
          </div>
          <div className="flex justify-between items-center font-medium">
            <span className="text-gray-500">{summaryLabels.spot}</span>
            <span className="font-bold text-gray-900 truncate max-w-[60%] text-right">
              Kec. {deliveryData.kecamatan || "Batam Kota"}
            </span>
          </div>
          <div className="flex justify-between items-baseline pt-2.5 border-t border-gray-100 font-extrabold text-sm sm:text-base text-gray-900">
            <span>{summaryLabels.total}</span>
            <span className="text-[#cd7f32] text-base sm:text-lg font-black">{totalCostFormatted}</span>
          </div>
        </div>

        {/* Tombol Utama: Pesan via WhatsApp */}
        <Button
          type="button"
          onClick={handleWhatsAppOrder}
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold h-12 rounded-2xl shadow-lg shadow-green-500/20 flex items-center justify-center transition-all active:scale-[0.99] text-sm cursor-pointer"
        >
          <span>
            {locale === "id"
              ? "Pesan via WhatsApp Sekarang"
              : locale === "ms"
              ? "Tempah melalui WhatsApp Sekarang"
              : "Order via WhatsApp Now"}
          </span>
        </Button>

        {/* Informasi Rekening Pembayaran Resmi (Tanpa Icon) */}
        <div className="rounded-2xl border border-gray-200/90 bg-gray-50/80 p-3.5 sm:p-4 text-xs text-gray-700 space-y-2.5">
          <div className="flex flex-wrap items-baseline justify-between gap-1 pb-2 border-b border-gray-200">
            <span className="font-extrabold text-gray-900 text-xs sm:text-[13px]">
              {locale === "id"
                ? "Metode Pembayaran Resmi"
                : locale === "ms"
                ? "Kaedah Pembayaran Rasmi"
                : "Official Payment Methods"}
            </span>
            <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md">
              A/n Dwi Gandhi Herdian
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="font-bold text-gray-800">BNI</span>
              <span className="font-mono font-bold text-gray-900 tracking-wider">0352721997</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="font-bold text-gray-800">BCA</span>
              <span className="font-mono font-bold text-gray-900 tracking-wider">0611847466</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="font-bold text-gray-800">MANDIRI</span>
              <span className="font-mono font-bold text-gray-900 tracking-wider">1090022349898</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="font-bold text-gray-800">SEA BANK</span>
              <span className="font-mono font-bold text-gray-900 tracking-wider">901960264464</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-bold text-gray-800">DANA</span>
              <span className="font-mono font-bold text-gray-900 tracking-wider">081276003870</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 pt-1 leading-relaxed border-t border-gray-200/60">
            {locale === "id"
              ? "Pembayaran & transfer sewa hanya sah ke rekening resmi di atas."
              : locale === "ms"
              ? "Pembayaran & pindahan sewaan hanya sah ke akaun rasmi di atas."
              : "Rental payments and transfers are only valid to the official accounts above."}
          </p>
        </div>
      </div>

    </div>
  );
}
