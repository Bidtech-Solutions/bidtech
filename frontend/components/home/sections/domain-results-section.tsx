"use client";

import {
  CheckCircle2,
  XCircle,
  Search,
  ArrowRight,
  Loader2,
  Sparkles,
  Check,
  Globe,
} from "lucide-react";
import { useState } from "react";

interface DomainItem {
  domain: string;
  available: boolean;
  price: number;
  price_base?: number;
  tax_amount?: number;
  extension: string;
}

interface DomainResultsSectionProps {
  results: DomainItem[];
  isSearching: boolean;
  errorMessage: string;
  keyword: string;
}

const POPULAR_TLDS = [".com", ".id", ".co.id", ".my.id", ".online", ".net", ".org"];

const LARAVEL_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_LARAVEL_URL || "http://localhost:8000";

export function DomainResultsSection({
  results,
  isSearching,
  errorMessage,
  keyword,
}: DomainResultsSectionProps) {
  const [selectedTld, setSelectedTld] = useState<string>("all");
  const [filterAvailability, setFilterAvailability] = useState<"all" | "available">("all");
  const [isNavigatingDomain, setIsNavigatingDomain] = useState<string | null>(null);

  const handleSelectDomain = (domain: DomainItem) => {
    setIsNavigatingDomain(domain.domain);
    const targetUrl = new URL(`${LARAVEL_CHECKOUT_URL}/checkout/pilih-template`);
    targetUrl.searchParams.set("domain", domain.domain);
    targetUrl.searchParams.set("price", String(domain.price));
    if (domain.price_base) targetUrl.searchParams.set("price_base", String(domain.price_base));
    if (domain.tax_amount) targetUrl.searchParams.set("tax_amount", String(domain.tax_amount));
    window.location.assign(targetUrl.toString());
  };

  const filteredResults = results.filter((item) => {
    const matchTld =
      selectedTld === "all" ||
      item.domain.endsWith(selectedTld) ||
      item.extension === selectedTld.replace(".", "");

    const matchAvailability =
      filterAvailability === "all" || (filterAvailability === "available" && item.available);

    return matchTld && matchAvailability;
  });

  const availableCount = results.filter((d) => d.available).length;

  return (
    <section
      id="domain-results"
      className="w-full bg-gradient-to-b from-white via-emerald-50/30 to-white py-8 sm:py-10"
      style={{
        animation: "domain-results-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      <style>{`
        @keyframes domain-results-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        {/* Card container */}
        <div className="rounded-3xl border border-emerald-100 bg-white shadow-[0_8px_40px_rgba(34,197,94,0.10)] overflow-hidden">

          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/30">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-9 rounded-2xl bg-brand-primary/10 text-brand-primary shrink-0">
                <Globe className="size-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                  Hasil Pengecekan Domain
                </h2>
                {keyword && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    Menampilkan semua ekstensi untuk kata kunci{" "}
                    <span className="font-semibold text-brand-primary">&ldquo;{keyword}&rdquo;</span>
                  </p>
                )}
              </div>
            </div>

            {/* Filter Bar — hanya tampil jika ada hasil */}
            {!isSearching && results.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100/80 text-xs">
                {/* Status Filter */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setFilterAvailability("all")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                      filterAvailability === "all"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Semua ({results.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterAvailability("available")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                      filterAvailability === "available"
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    <Check className="size-3" />
                    <span>Hanya Tersedia ({availableCount})</span>
                  </button>
                </div>

                {/* TLD Filter Chips */}
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedTld("all")}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer shrink-0 ${
                      selectedTld === "all"
                        ? "bg-brand-primary text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Semua Ekstensi
                  </button>
                  {POPULAR_TLDS.map((tld) => (
                    <button
                      key={tld}
                      type="button"
                      onClick={() => setSelectedTld(selectedTld === tld ? "all" : tld)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer shrink-0 ${
                        selectedTld === tld
                          ? "bg-brand-primary text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-brand-primary"
                      }`}
                    >
                      {tld}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 space-y-2.5">
            {isSearching ? (
              <div className="space-y-2.5 py-4">
                <div className="flex items-center justify-center gap-2 py-3 text-xs text-slate-500 font-medium">
                  <Loader2 className="size-4 animate-spin text-brand-primary" />
                  <span>Memeriksa ketersediaan seluruh ekstensi domain secara real-time...</span>
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 animate-pulse"
                  >
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-32 sm:w-44 rounded-md bg-slate-200" />
                        <div className="h-4 w-16 rounded-full bg-emerald-100/70" />
                      </div>
                      <div className="h-3 w-24 rounded bg-slate-200" />
                    </div>
                    <div className="h-8 w-20 rounded-xl bg-emerald-200/60 shrink-0" />
                  </div>
                ))}
              </div>
            ) : errorMessage ? (
              <div className="py-12 text-center">
                <div className="size-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                  <XCircle className="size-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">{errorMessage}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Silakan coba dengan kata kunci domain yang berbeda.
                </p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="py-12 text-center">
                <div className="size-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="size-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Tidak ada domain yang cocok dengan filter.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Coba ubah pilihan ekstensi atau pilih &ldquo;Semua&rdquo;.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 px-1">
                  <span>
                    Ditemukan <strong className="text-slate-700">{filteredResults.length}</strong>{" "}
                    ekstensi domain:
                  </span>
                  <span>Pilih domain untuk lanjut ke checkout</span>
                </div>

                {filteredResults.map((item) => (
                  <div
                    key={item.domain}
                    className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 sm:p-4 transition-all ${
                      item.available
                        ? "border-emerald-100 bg-white hover:border-brand-primary hover:bg-emerald-50/30 hover:shadow-sm"
                        : "border-slate-100 bg-slate-50/60 opacity-60"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                          {item.domain}
                        </span>
                        {item.available ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 shrink-0">
                            <CheckCircle2 className="size-3 text-emerald-600" />
                            Tersedia
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-medium text-slate-600 shrink-0">
                            <XCircle className="size-3" />
                            Sudah Dipakai
                          </span>
                        )}
                      </div>

                      <div className="mt-1 text-xs">
                        {item.available ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-brand-primary text-sm sm:text-base">
                              Rp{Number(item.price).toLocaleString("id-ID")}
                            </span>
                            <span className="text-[11px] text-slate-500 font-normal">
                              /tahun (Inklusif PPN)
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">
                            Domain ini sudah dimiliki orang lain dan tidak tersedia untuk dibeli.
                          </span>
                        )}
                      </div>
                    </div>

                    {item.available ? (
                      <button
                        type="button"
                        disabled={isNavigatingDomain !== null}
                        onClick={() => handleSelectDomain(item)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-70 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {isNavigatingDomain === item.domain ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin" />
                            <span>Menyiapkan...</span>
                          </>
                        ) : (
                          <>
                            <span>Pilih Domain</span>
                            <ArrowRight className="size-3.5" />
                          </>
                        )}
                      </button>
                    ) : (
                      <a
                        href={`${LARAVEL_CHECKOUT_URL}/checkout/pilih-template?domain=${encodeURIComponent(item.domain)}&own=1&price=0`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:border-brand-primary hover:text-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all shadow-xs hover:shadow-sm"
                        title="Gunakan domain milik Anda sendiri"
                      >
                        <span>Milik Anda? Pakai Domain Ini</span>
                        <ArrowRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {!isSearching && (results.length > 0 || errorMessage) && (
            <div className="px-4 sm:px-5 py-3.5 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-brand-primary shrink-0" />
                <span>Domain langsung aktif otomatis bersama paket template pilihan Anda.</span>
              </div>
              <div>
                <span>Sudah punya domain sendiri? </span>
                <a href="/template-website" className="font-semibold text-brand-primary hover:underline">
                  Langsung pilih template &rarr;
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
