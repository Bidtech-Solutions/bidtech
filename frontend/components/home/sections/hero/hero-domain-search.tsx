"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Globe, Loader2,
  CheckCircle2, XCircle, ArrowRight, Sparkles, Check,
} from "lucide-react";
import Link from "next/link";

interface DomainItem {
  domain: string;
  available: boolean;
  price: number;
  price_base?: number;
  tax_amount?: number;
  extension: string;
}

const POPULAR_TLDS = [".com", ".id", ".co.id", ".my.id", ".online", ".net", ".org"];
const LARAVEL_CHECKOUT_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const DOMAIN_SEARCH_URL = `${LARAVEL_CHECKOUT_URL.replace(/\/$/, "")}/api/domain/search`;

export function HeroDomainSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"domain" | "template">("domain");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<DomainItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTld, setSelectedTld] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState<"all" | "available">("all");
  const [isNavigating, setIsNavigating] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = async (raw: string) => {
    const q = raw.trim();
    if (!q) return;

    // Batalkan request sebelumnya jika masih berjalan
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setIsSearching(true);
    setHasSearched(true);
    setErrorMessage("");
    setResults([]);

    try {
      const res = await fetch(`${DOMAIN_SEARCH_URL}?q=${encodeURIComponent(q)}`, {
        signal: abortRef.current.signal,
        headers: {
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Domain search failed with status ${res.status}`);
      }
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.domains)) {
        setResults(data.domains);
      } else {
        setErrorMessage(data.message || "Domain tidak ditemukan.");
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== "AbortError") {
        setErrorMessage("Gagal memeriksa domain. Silakan coba lagi.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Realtime debounce: trigger setelah 500ms ketika base >= 4 karakter dan tab domain
  useEffect(() => {
    if (activeTab !== "domain") return;
    const base = keyword.trim().replace(/\..+$/, "");
    if (base.length < 4) {
      const timer = setTimeout(() => {
        if (hasSearched) {
          setHasSearched(false);
          setResults([]);
          setErrorMessage("");
        }
      }, 0);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => handleSearch(keyword.trim()), 500);
    return () => clearTimeout(timer);
  }, [keyword, hasSearched, activeTab]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = keyword.trim();
    if (!q) {
      if (activeTab === "template") {
        router.push("/template-website");
      } else {
        inputRef.current?.focus();
      }
      return;
    }

    if (activeTab === "template") {
      router.push(`/template-website?q=${encodeURIComponent(q)}`);
      return;
    }

    handleSearch(q);
  };

  const handleSelectDomain = (item: DomainItem) => {
    setIsNavigating(item.domain);
    const url = new URL(`${LARAVEL_CHECKOUT_URL}/checkout/pilih-template`);
    url.searchParams.set("domain", item.domain);
    url.searchParams.set("price", String(item.price));
    if (item.price_base) url.searchParams.set("price_base", String(item.price_base));
    if (item.tax_amount) url.searchParams.set("tax_amount", String(item.tax_amount));
    window.location.assign(url.toString());
  };

  const filteredResults = results.filter((item) => {
    const matchTld =
      selectedTld === "all" ||
      item.domain.endsWith(selectedTld) ||
      item.extension === selectedTld.replace(".", "");
    const matchAvail =
      filterAvailability === "all" || (filterAvailability === "available" && item.available);
    return matchTld && matchAvail;
  });

  const availableCount = results.filter((d) => d.available).length;

  return (
    <div className="relative w-full z-30">
      <div className="rounded-2xl sm:rounded-3xl border-2 border-[#5bb82e] bg-white shadow-[0_8px_32px_rgba(91,184,46,0.12)] p-4 sm:p-5 md:p-6 overflow-hidden">

        {/* Tab Buttons matching design capsule */}
        <div className="inline-flex items-center rounded-full bg-slate-100/90 p-1 border border-slate-200/50">
          <button
            type="button"
            onClick={() => setActiveTab("domain")}
            className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer ${
              activeTab === "domain"
                ? "bg-[#5bb82e] text-white shadow-xs"
                : "bg-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Globe className="size-4" />
            <span>Cek Domain</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("template");
              if (activeTab === "template" || keyword.trim()) {
                router.push(keyword.trim() ? `/template-website?q=${encodeURIComponent(keyword.trim())}` : "/template-website");
              }
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm transition shadow-xs cursor-pointer ${
              activeTab === "template"
                ? "bg-[#5bb82e] text-white font-bold shadow-xs"
                : "bg-transparent text-slate-600 hover:text-slate-900 font-semibold"
            }`}
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <span>Jelajahi Template</span>
          </button>
        </div>

        {/* Search Input Form matching design */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 sm:mt-5 flex items-center rounded-full border border-slate-200 bg-white p-1.5 pl-4 sm:pl-5 shadow-xs focus-within:border-[#5bb82e] focus-within:ring-2 focus-within:ring-[#5bb82e]/20 transition-all"
        >
          {isSearching ? (
            <Loader2 className="size-5 text-[#5bb82e] animate-spin shrink-0" />
          ) : (
            <Search className="size-5 text-slate-400 shrink-0" />
          )}
          <input
            ref={inputRef}
            id="hero-domain-input"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Ketik nama domain atau desain impian Anda"
            className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 font-normal outline-none"
            autoComplete="off"
            spellCheck={false}
          />

          {keyword && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setKeyword("");
                setHasSearched(false);
                setResults([]);
                setErrorMessage("");
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-600 p-1 mr-1 text-xs rounded-full hover:bg-slate-100 transition shrink-0 cursor-pointer"
              title="Hapus"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            className="rounded-full bg-[#5bb82e] hover:bg-[#4ea625] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition shadow-xs shrink-0 cursor-pointer"
          >
            Telusuri
          </button>
        </form>

        {/* Subtle hint for users who already have a domain */}
        <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-slate-500">
          <span>
            Sudah memiliki domain sendiri?{" "}
            <Link
              href="/template-website"
              className="font-semibold text-[#5bb82e] hover:text-[#4ea625] hover:underline inline-flex items-center gap-0.5"
            >
              Langsung pilih template website
              <ArrowRight className="size-3 ml-0.5" />
            </Link>
          </span>
        </div>

        {/* Results — muncul di dalam card setelah search */}
        {hasSearched && (
          <div className="mt-4 pt-4 border-t border-slate-100">

            {/* Filter bar */}
            {!isSearching && results.length > 0 && (
              <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFilterAvailability("all")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${filterAvailability === "all" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    Semua ({results.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterAvailability("available")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 ${filterAvailability === "available" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}
                  >
                    <Check className="size-3" />
                    Tersedia ({availableCount})
                  </button>
                </div>
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setSelectedTld("all")}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer shrink-0 ${selectedTld === "all" ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    Semua
                  </button>
                  {POPULAR_TLDS.map((tld) => (
                    <button
                      key={tld}
                      type="button"
                      onClick={() => setSelectedTld(selectedTld === tld ? "all" : tld)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer shrink-0 ${selectedTld === tld ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-brand-primary"}`}
                    >
                      {tld}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Domain list */}
            <div className="px-4 pb-4 space-y-2 max-h-72 overflow-y-auto">
              {isSearching ? (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-slate-500 text-center py-2 flex items-center justify-center gap-2">
                    <Loader2 className="size-3.5 animate-spin text-brand-primary" />
                    Memeriksa ketersediaan domain...
                  </p>
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 animate-pulse">
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3.5 w-36 rounded bg-slate-200" />
                        <div className="h-3 w-20 rounded bg-slate-200" />
                      </div>
                      <div className="h-7 w-16 rounded-lg bg-emerald-200/60" />
                    </div>
                  ))}
                </div>
              ) : errorMessage ? (
                <div className="py-8 text-center">
                  <XCircle className="size-8 text-rose-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">{errorMessage}</p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="py-8 text-center">
                  <Search className="size-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">Tidak ada domain yang cocok.</p>
                </div>
              ) : (
                <>
                  <p className="text-[11px] text-slate-400 pt-1 pb-0.5">
                    Ditemukan <strong className="text-slate-600">{filteredResults.length}</strong> ekstensi — pilih untuk lanjut checkout
                  </p>
                  {filteredResults.map((item) => (
                    <div
                      key={item.domain}
                      className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition-all ${item.available ? "border-emerald-100 bg-white hover:border-brand-primary hover:bg-emerald-50/20 hover:shadow-sm" : "border-slate-100 bg-slate-50/60 opacity-60"}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900 truncate">{item.domain}</span>
                          {item.available ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              <CheckCircle2 className="size-3 text-emerald-600" /> Tersedia
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                              <XCircle className="size-3" /> Dipakai
                            </span>
                          )}
                        </div>
                        {item.available && (
                          <p className="text-xs mt-0.5">
                            <span className="font-bold text-brand-primary">Rp{Number(item.price).toLocaleString("id-ID")}</span>
                            <span className="text-slate-400 ml-1">/tahun</span>
                          </p>
                        )}
                      </div>
                      {item.available ? (
                        <button
                          type="button"
                          disabled={isNavigating !== null}
                          onClick={() => handleSelectDomain(item)}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover px-3 py-1.5 text-xs font-bold text-white transition-all cursor-pointer disabled:opacity-70 hover:scale-[1.02]"
                        >
                          {isNavigating === item.domain ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <>Pilih <ArrowRight className="size-3" /></>
                          )}
                        </button>
                      ) : (
                        <a
                          href={`${LARAVEL_CHECKOUT_URL}/checkout/pilih-template?domain=${encodeURIComponent(item.domain)}&own=1&price=0`}
                          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white hover:border-[#5bb82e] hover:text-[#5bb82e] px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition-all cursor-pointer shadow-xs"
                          title="Gunakan domain milik Anda sendiri"
                        >
                          <span>Milik Anda?</span>
                          <ArrowRight className="size-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {!isSearching && results.length > 0 && (
              <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/80 flex items-center gap-1.5 text-[11px] text-slate-500">
                <Sparkles className="size-3.5 text-brand-primary shrink-0" />
                Domain langsung aktif otomatis bersama paket template pilihan Anda.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
