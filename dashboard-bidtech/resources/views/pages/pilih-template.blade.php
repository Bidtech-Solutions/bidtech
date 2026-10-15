@extends('layouts.checkout')

@section('title', 'Pilih Template Website - Bidtech')

@section('content')
@php $flow = 'domain-first'; @endphp

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

    <!-- ================= HEADER SECTION & STEPPER INFO ================= -->
    <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-3 py-1 text-xs font-semibold text-[#1E7A53]">
                Langkah 1 dari 4: Pemilihan Template
            </span>
            <span class="text-xs text-[#6B7B75]">
                Alur Pemesanan Cepat dengan Domain Anda
            </span>
        </div>

        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B17]">
                Pilih Desain Website untuk Domain Anda
            </h1>
            <p class="mt-1.5 text-sm text-[#6B7B75]">
                Pilih template profesional yang paling cocok untuk bisnis Anda. Setelah memilih, Anda dapat langsung melengkapi data pemesanan.
            </p>
        </div>

        <!-- Banner Domain Terpilih -->
        <div id="banner-domain-wrapper">
            @if(!empty($domainTerpilih))
                @php
                    $curDuration = (int) ($domainDuration ?? 1);
                    $pricePerThn = (int) ($domainPricePerYear ?? round($domainPrice / max(1, $curDuration)));
                @endphp
                <div class="rounded-3xl border-2 border-[#22C55E] bg-[#F2FBF5] p-5 sm:p-6 shadow-xs space-y-4">
                    <div class="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                        <div class="flex items-center gap-3.5">
                            <div class="flex size-11 items-center justify-center rounded-2xl bg-[#22C55E] text-white shrink-0 shadow-xs">
                                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="text-base sm:text-lg font-black text-[#0B1B17]" id="banner-domain-name">
                                        {{ $domainTerpilih }}
                                    </span>
                                    @if(!empty($isOwnDomain))
                                        <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                            Domain Milik Sendiri
                                        </span>
                                    @else
                                        <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-2.5 py-0.5 text-xs font-semibold text-[#1E7A53]">
                                            Domain Terpilih
                                        </span>
                                    @endif
                                </div>
                                <div class="text-xs text-[#6B7B75] mt-0.5 flex items-center gap-2 flex-wrap">
                                    @if(!empty($isOwnDomain))
                                        <span class="font-bold text-[#1E7A53]" id="banner-domain-price">Bebas Biaya Registrasi (Rp0)</span>
                                        <span>• Hubungkan via konfigurasi DNS A Record / CNAME</span>
                                    @else
                                        <span class="font-bold text-[#1E7A53]" id="banner-domain-price">
                                            Rp{{ number_format($domainPrice, 0, ',', '.') }} ({{ $curDuration }} Tahun)
                                        </span>
                                        <span id="banner-domain-subtext">• Rp{{ number_format($pricePerThn, 0, ',', '.') }}/thn • Termasuk PPN 11%</span>
                                    @endif
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 shrink-0">
                            <button 
                                type="button" 
                                id="btn-ganti-domain"
                                onclick="bukaModalGantiDomain()" 
                                class="rounded-xl border border-[#22C55E] text-[#1E7A53] hover:bg-[#22C55E] hover:text-white px-3.5 py-2 text-xs sm:text-sm font-semibold transition shrink-0 inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                                <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                                </svg>
                                <span>Ganti Domain</span>
                            </button>
                            <a 
                                href="{{ config('app.frontend_url') }}/#hero" 
                                class="rounded-xl border border-[#E4E9E6] bg-white hover:bg-slate-50 text-[#4A5551] px-3.5 py-2 text-xs sm:text-sm font-medium transition inline-flex items-center gap-1 shrink-0"
                                title="Kembali ke formulir pencarian domain di landing page"
                            >
                                <span>Ke Landing Page</span>
                                <svg class="size-3.5 text-[#6B7B75]" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Pemilih Durasi Paket Website (Cloud Server + Domain) -->
                    <div class="pt-3 border-t border-[#22C55E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div class="text-xs text-[#4A5551]">
                            <strong class="text-[#0B1B17]">Pilihan Durasi Paket Website:</strong>
                            <span class="text-[#6B7B75]"> Durasi berlaku untuk Cloud Server Hosting & Registrasi Domain</span>
                        </div>

                        <div class="inline-flex rounded-xl bg-white p-1 border border-[#E4E9E6] shadow-2xs self-start sm:self-auto" id="template-duration-selector">
                            @foreach([1 => '1 Tahun', 2 => '2 Tahun', 3 => '3 Tahun'] as $dur => $lbl)
                                <button
                                    type="button"
                                    onclick="gantiDurasiTemplate({{ $dur }})"
                                    id="btn-durasi-{{ $dur }}"
                                    class="duration-pill-btn rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer {{ $curDuration === $dur ? 'bg-[#22C55E] text-white shadow-xs' : 'text-[#4A5551] hover:text-[#0B1B17] hover:bg-slate-50' }}"
                                >
                                    {{ $lbl }}
                                </button>
                            @endforeach
                        </div>
                    </div>
                </div>
            @else
                <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:px-6 text-sm text-amber-900 flex items-center justify-between gap-4 flex-wrap">
                    <div class="flex items-center gap-2.5">
                        <svg class="size-4.5 shrink-0 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 1 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span>Anda belum memilih domain. Anda dapat memilih domain sekarang atau langsung memilih template.</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <button 
                            type="button" 
                            onclick="bukaModalGantiDomain()" 
                            class="rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white px-4 py-2 text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
                        >
                            + Pilih Domain Sekarang
                        </button>
                        <a href="{{ config('app.frontend_url') }}/#hero" class="text-xs sm:text-sm font-bold text-amber-800 underline hover:text-amber-950">
                            Ke Landing Page &rarr;
                        </a>
                    </div>
                </div>
            @endif
        </div>
    </div>

    <!-- ================= FILTER KATEGORI ================= -->
    <div class="mt-8">
        @php
            $categories = $templates->pluck('category')->unique()->filter()->values();
        @endphp

        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="category-filter-bar">
            <button 
                type="button" 
                onclick="filterCategory('all', this)"
                class="category-btn active shrink-0 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer bg-[#22C55E] text-white border-[#22C55E]"
            >
                Semua Desain ({{ $templates->count() }})
            </button>
            @foreach($categories as $cat)
                @php $count = $templates->where('category', $cat)->count(); @endphp
                <button 
                    type="button" 
                    onclick="filterCategory('{{ Str::slug($cat) }}', this)"
                    class="category-btn shrink-0 rounded-full border border-[#E4E9E6] bg-white text-[#6B7B75] hover:border-[#22C55E] hover:text-[#0B1B17] px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                    {{ $cat }} ({{ $count }})
                </button>
            @endforeach
        </div>
    </div>

    <!-- ================= KATALOG TEMPLATE GRID ================= -->
    <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="template-grid">
        @foreach($templates as $item)
            @php
                $slugCat = Str::slug($item->category);
                $curDuration = (int) ($domainDuration ?? 1);
                $curDuration = in_array($curDuration, [1, 2, 3], true) ? $curDuration : 1;
                $tBasePrice = (int) ($item->template_price ?? 1000000);
                $sBasePrice = (int) ($item->server_price ?? 500000);
                $vBasePrice = (int) ($item->service_price ?? 500000);
                $cardTemplatePrice = $tBasePrice * $curDuration;
                $cardServerPrice = $sBasePrice * $curDuration;
                $cardServicePrice = $vBasePrice * $curDuration;
                $cardTotal = $cardTemplatePrice + $cardServerPrice + $cardServicePrice;
            @endphp
            <div 
                class="template-card group flex flex-col overflow-hidden rounded-3xl border border-[#E4E9E6] bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-[#22C55E]/50 hover:shadow-lg"
                data-category="{{ $slugCat }}"
                data-template-base="{{ $tBasePrice }}"
                data-server-base="{{ $sBasePrice }}"
                data-service-base="{{ $vBasePrice }}"
            >
                <!-- Thumbnail Preview -->
                <div class="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    @if($item->preview)
                        <img 
                            src="{{ $item->preview_url }}"
                            alt="{{ $item->name }}"
                            class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                            loading="lazy"
                        >
                    @else
                        <div class="flex h-full w-full items-center justify-center text-xs text-[#6B7B75]">
                            Preview Belum Tersedia
                        </div>
                    @endif

                    <!-- Category Badge Floating -->
                    <div class="absolute top-3 left-3">
                        <span class="inline-flex items-center rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#1E7A53] shadow-xs">
                            {{ $item->category }}
                        </span>
                    </div>
                </div>

                <!-- Konten Kartu -->
                <div class="flex flex-1 flex-col p-5 sm:p-6 justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-[#0B1B17] group-hover:text-[#1E7A53] transition">
                            {{ $item->name }}
                        </h3>
                        <div class="mt-2 flex items-baseline justify-between">
                            <span class="text-xs text-[#6B7B75]">Total Paket Website</span>
                            <span class="card-total-price text-base sm:text-lg font-black text-[#1E7A53]">
                                Rp{{ number_format($cardTotal, 0, ',', '.') }}
                            </span>
                        </div>

                        <!-- Rincian Pemecahan Komponen Harga -->
                        <div class="mt-3 pt-3 border-t border-[#F0F3F1] space-y-1.5 text-[11px]">
                            <div class="flex items-center justify-between text-[#4A5551]" title="{{ $item->template_desc ?? 'Lisensi Desain & Source Code' }}">
                                <span class="flex items-center gap-1.5">
                                    <span class="size-1.5 rounded-full bg-[#22C55E]"></span>
                                    <span class="card-template-label">Desain Template ({{ $curDuration }} Thn):</span>
                                </span>
                                <span class="card-template-price font-bold text-[#0B1B17]">Rp{{ number_format($cardTemplatePrice, 0, ',', '.') }}</span>
                            </div>
                            <div class="flex items-center justify-between text-[#4A5551]" title="{{ $item->server_desc ?? 'Cloud Server Hosting & Free SSL' }}">
                                <span class="flex items-center gap-1.5">
                                    <span class="size-1.5 rounded-full bg-blue-500"></span>
                                    <span class="card-server-label">Cloud Server ({{ $curDuration }} Thn):</span>
                                </span>
                                <span class="card-server-price font-bold text-[#0B1B17]">Rp{{ number_format($cardServerPrice, 0, ',', '.') }}</span>
                            </div>
                            <div class="flex items-center justify-between text-[#4A5551]" title="{{ $item->service_desc ?? 'Setup Domain, Deployment & Maintenance' }}">
                                <span class="flex items-center gap-1.5">
                                    <span class="size-1.5 rounded-full bg-amber-500"></span>
                                    <span class="card-service-label">Layanan & Setup ({{ $curDuration }} Thn):</span>
                                </span>
                                <span class="card-service-price font-bold text-[#0B1B17]">Rp{{ number_format($cardServicePrice, 0, ',', '.') }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Tombol Aksi -->
                    <div class="mt-5 flex items-center gap-2.5 pt-4 border-t border-[#E4E9E6]">
                        @if($item->landing_url)
                            <a 
                                href="{{ $item->landing_url }}" 
                                target="_blank" 
                                class="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-[#E4E9E6] bg-white py-2.5 px-3 text-xs sm:text-sm font-semibold text-[#4A5551] hover:border-[#22C55E] hover:text-[#0B1B17] transition"
                            >
                                <span>Lihat Demo</span>
                                <svg class="size-3.5 text-[#6B7B75]" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                        @endif

                        <form method="POST" action="{{ route('checkout.pilih-template.select', $item) }}" class="flex-1 select-template-form" onsubmit="const btn = this.querySelector('button[type=submit]'); btn.disabled = true; btn.innerHTML = '<svg class=\'size-4 animate-spin text-white inline\' fill=\'none\' viewBox=\'0 0 24 24\'><circle class=\'opacity-25\' cx=\'12\' cy=\'12\' r=\'10\' stroke=\'currentColor\' stroke-width=\'4\'></circle><path class=\'opacity-75\' fill=\'currentColor\' d=\'M4 12a8 8 0 018-8v8H4z\'></path></svg> <span>Menyiapkan...</span>';">
                            @csrf
                            <input type="hidden" name="domain" class="template-domain-input" value="{{ $domainTerpilih }}">
                            <button 
                                type="submit" 
                                class="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-2.5 px-3 text-xs sm:text-sm font-bold text-white shadow-xs transition cursor-pointer disabled:opacity-75"
                            >
                                <span>Pilih Template</span>
                                <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    <!-- Empty State Filter -->
    <div id="no-template-state" class="hidden rounded-3xl border border-[#E4E9E6] bg-white p-12 text-center mt-8">
        <p class="text-sm font-bold text-[#0B1B17]">Tidak ada template di kategori ini.</p>
        <p class="text-xs text-[#6B7B75] mt-1">Silakan pilih kategori lain atau reset filter untuk melihat semua desain.</p>
        <button 
            type="button" 
            onclick="filterCategory('all', document.querySelector('.category-btn'))"
            class="mt-4 rounded-xl bg-[#22C55E] px-4 py-2 text-xs font-semibold text-white"
        >
            Tampilkan Semua Desain
        </button>
    </div>

    <!-- ================= BANNER KUSTOMISASI ================= -->
    <div class="mt-12 rounded-3xl border border-[#D0E3F9] bg-[#EDF5FD] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="space-y-1 text-center sm:text-left">
            <h3 class="text-base sm:text-lg font-bold text-[#0B1B17]">
                Tidak menemukan desain yang sesuai dengan brand Anda?
            </h3>
            <p class="text-xs sm:text-sm text-[#4A5551]">
                Tim Bidtech siap membuatkan desain website eksklusif & fitur khusus sesuai kebutuhan spesifik perusahaan Anda.
            </p>
        </div>
        <a 
            id="btn-custom-consult"
            href="https://wa.me/628217601455?text={{ urlencode('Halo Bidtech, saya ingin konsultasi pembuatan website custom untuk domain saya: ' . ($domainTerpilih ?? '')) }}"
            target="_blank" 
            class="rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 text-xs sm:text-sm font-bold transition shrink-0 shadow-xs inline-flex items-center gap-2"
        >
            <span>Konsultasi Website Custom</span>
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
        </a>
    </div>

</div>

<!-- ================= MODAL GANTI DOMAIN ================= -->
<div 
    id="modal-ganti-domain" 
    style="display: none;"
    class="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all duration-300 overscroll-contain"
    onclick="handleModalBackdropClick(event)"
>
    <div 
        class="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#E4E9E6] space-y-5 overscroll-contain"
        onclick="event.stopPropagation()"
    >
        <!-- Modal Header -->
        <div class="flex items-start justify-between pb-3 border-b border-[#E4E9E6]">
            <div>
                <h3 class="text-lg sm:text-xl font-extrabold text-[#0B1B17]">
                    Ganti Nama Domain
                </h3>
                <p class="text-xs sm:text-sm text-[#6B7B75] mt-0.5">
                    Cari nama domain baru yang ingin Anda hubungkan ke website ini.
                </p>
            </div>
            <button 
                type="button" 
                onclick="tutupModalGantiDomain()" 
                class="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
            >
                ✕
            </button>
        </div>

        <!-- Form Pencarian Domain di Modal -->
        <div>
            <form onsubmit="event.preventDefault(); cariDomainModal();" class="flex items-center gap-2.5">
                <div class="relative flex-1">
                    <input 
                        type="text" 
                        id="input-domain-modal" 
                        placeholder="namabisnis.com atau tokosaya"
                        class="h-12 w-full rounded-2xl border border-[#E4E9E6] bg-white pl-4 pr-10 text-sm font-semibold text-[#0B1B17] outline-none transition focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                    >
                    <div id="modal-search-spinner" class="hidden absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg class="size-4 animate-spin text-[#22C55E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div>
                </div>
                <button 
                    type="submit" 
                    id="btn-search-modal"
                    class="h-12 shrink-0 rounded-2xl bg-[#22C55E] hover:bg-[#16a34a] px-6 text-xs sm:text-sm font-bold text-white shadow-xs transition cursor-pointer"
                >
                    Cari
                </button>
            </form>

            <!-- Quick Chips Ekstensi -->
            <div class="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span class="text-[11px] text-[#6B7B75] shrink-0">Ekstensi populer:</span>
                @foreach(['.com', '.id', '.co.id', '.my.id', '.online'] as $tld)
                    <button 
                        type="button" 
                        onclick="pilihTldModal('{{ $tld }}')"
                        class="rounded-full bg-slate-100 hover:bg-[#E7F4EE] hover:text-[#1E7A53] px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 transition cursor-pointer"
                    >
                        {{ $tld }}
                    </button>
                @endforeach
            </div>
        </div>

        <!-- Wadah Hasil Pencarian Domain di Modal -->
        <div id="modal-results-container" class="space-y-2 max-h-60 overflow-y-auto overscroll-contain pr-1">
            <div class="py-8 text-center text-xs text-[#6B7B75]" id="modal-initial-text">
                Ketik nama domain dan klik <strong>Cari</strong> untuk memeriksa ketersediaan & harga resmi.
            </div>
        </div>

        <!-- Modal Footer -->
        <div class="pt-3 border-t border-[#E4E9E6] flex items-center justify-between gap-3 flex-wrap">
            <a 
                href="{{ config('app.frontend_url') }}/#hero" 
                class="text-xs font-semibold text-slate-500 hover:text-[#1E7A53] underline transition"
            >
                Atau kembali ke Beranda Landing Page &rarr;
            </a>

            <button 
                type="button" 
                onclick="tutupModalGantiDomain()" 
                class="rounded-xl border border-[#E4E9E6] bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 transition cursor-pointer"
            >
                Tutup
            </button>
        </div>
    </div>
</div>

<!-- ================= JAVASCRIPT LOGIC ================= -->
<script>
// Ganti Durasi Paket Website (Cloud Server + Domain)
async function gantiDurasiTemplate(duration) {
    const selector = document.getElementById('template-duration-selector');
    const buttons = selector ? selector.querySelectorAll('.duration-pill-btn') : [];
    
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#22C55E]', 'text-white', 'shadow-xs');
        btn.classList.add('text-[#4A5551]');
    });

    const activeBtn = document.getElementById(`btn-durasi-${duration}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-[#22C55E]', 'text-white', 'shadow-xs');
        activeBtn.classList.remove('text-[#4A5551]');
    }

    // Update kartu template seketika (optimistic UI)
    const cards = document.querySelectorAll('.template-card');
    cards.forEach(card => {
        const tBase = parseInt(card.getAttribute('data-template-base') || '1000000', 10);
        const sBase = parseInt(card.getAttribute('data-server-base') || '500000', 10);
        const vBase = parseInt(card.getAttribute('data-service-base') || '500000', 10);
        
        const cardTemplate = tBase * duration;
        const cardServer = sBase * duration;
        const cardService = vBase * duration;
        const cardTotal = cardTemplate + cardServer + cardService;

        const templateLbl = card.querySelector('.card-template-label');
        if (templateLbl) templateLbl.textContent = `Desain Template (${duration} Thn):`;
        const templatePr = card.querySelector('.card-template-price');
        if (templatePr) templatePr.textContent = 'Rp' + cardTemplate.toLocaleString('id-ID');

        const serverLbl = card.querySelector('.card-server-label');
        if (serverLbl) serverLbl.textContent = `Cloud Server (${duration} Thn):`;
        const serverPr = card.querySelector('.card-server-price');
        if (serverPr) serverPr.textContent = 'Rp' + cardServer.toLocaleString('id-ID');

        const serviceLbl = card.querySelector('.card-service-label');
        if (serviceLbl) serviceLbl.textContent = `Layanan & Setup (${duration} Thn):`;
        const servicePr = card.querySelector('.card-service-price');
        if (servicePr) servicePr.textContent = 'Rp' + cardService.toLocaleString('id-ID');

        const totalPr = card.querySelector('.card-total-price');
        if (totalPr) totalPr.textContent = 'Rp' + cardTotal.toLocaleString('id-ID');
    });

    // Kirim request AJAX ke backend untuk menyimpan durasi ke session
    try {
        const res = await fetch("{{ route('checkout.pilih-template.duration') }}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ duration: duration }),
        });

        const data = await res.json();
        if (data.status === 'success') {
            const bannerPrice = document.getElementById('banner-domain-price');
            if (bannerPrice && !{{ !empty($isOwnDomain) ? 'true' : 'false' }}) {
                bannerPrice.textContent = `${data.formatted_price} (${data.domain_duration} Tahun)`;
            }
        }
    } catch (err) {
        console.error('Gagal memperbarui durasi domain:', err);
    }
}

// Filter Kategori Template
function filterCategory(category, btn) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(b => {
        b.classList.remove('bg-[#22C55E]', 'text-white', 'border-[#22C55E]');
        b.classList.add('bg-white', 'text-[#6B7B75]', 'border-[#E4E9E6]');
    });

    if (btn) {
        btn.classList.remove('bg-white', 'text-[#6B7B75]', 'border-[#E4E9E6]');
        btn.classList.add('bg-[#22C55E]', 'text-white', 'border-[#22C55E]');
    }

    const cards = document.querySelectorAll('.template-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const emptyState = document.getElementById('no-template-state');
    if (emptyState) {
        emptyState.classList.toggle('hidden', visibleCount > 0);
    }
}

// Kontrol Modal Ganti Domain
function bukaModalGantiDomain() {
    const modal = document.getElementById('modal-ganti-domain');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.classList.add('overflow-hidden');
    const input = document.getElementById('input-domain-modal');
    if (input) {
        setTimeout(() => input.focus({ preventScroll: true }), 100);
    }
}

function tutupModalGantiDomain() {
    const modal = document.getElementById('modal-ganti-domain');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.classList.remove('overflow-hidden');
}

function handleModalBackdropClick(e) {
    if (e.target.id === 'modal-ganti-domain') {
        tutupModalGantiDomain();
    }
}

function pilihTldModal(tld) {
    const input = document.getElementById('input-domain-modal');
    let val = input.value.trim();
    if (val.includes('.')) {
        val = val.split('.')[0];
    }
    if (!val) val = 'tokosaya';
    input.value = val + tld;
    cariDomainModal();
}

// Pencarian Domain di Modal via API Laravel
async function cariDomainModal() {
    const input = document.getElementById('input-domain-modal');
    const query = input.value.trim();
    if (!query) return;

    const spinner = document.getElementById('modal-search-spinner');
    const container = document.getElementById('modal-results-container');

    spinner.classList.remove('hidden');
    container.innerHTML = `
        <div class="space-y-2 py-1">
            <div class="flex items-center gap-2 text-xs text-[#6B7B75] pb-1">
                <svg class="size-3.5 animate-spin text-[#22C55E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Memeriksa ketersediaan domain...</span>
            </div>
            ${[1, 2, 3].map(() => `
                <div class="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 animate-pulse">
                    <div class="space-y-2 flex-1">
                        <div class="flex items-center gap-2">
                            <div class="h-4 w-32 sm:w-44 rounded-md bg-slate-200"></div>
                            <div class="h-4 w-14 rounded-full bg-emerald-100"></div>
                        </div>
                        <div class="h-3 w-28 rounded bg-slate-200"></div>
                    </div>
                    <div class="h-8 w-18 rounded-xl bg-emerald-200/60 shrink-0"></div>
                </div>
            `).join('')}
        </div>
    `;

    try {
        const res = await fetch(`{{ route('api.domain.search') }}?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (data.status === 'success' && Array.isArray(data.domains) && data.domains.length > 0) {
            let html = '';
            data.domains.slice(0, 6).forEach(item => {
                const formattedPrice = 'Rp' + Number(item.price).toLocaleString('id-ID');
                html += `
                    <div class="flex items-center justify-between gap-3 rounded-2xl border p-3 transition ${item.available ? 'border-emerald-100 bg-[#F2FBF5]' : 'border-slate-100 bg-slate-50 opacity-60'}">
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-bold text-[#0B1B17] truncate">${item.domain}</span>
                                ${item.available ? `
                                    <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-2 py-0.5 text-[10px] font-bold text-[#1E7A53]">
                                        Tersedia
                                    </span>
                                ` : `
                                    <span class="inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                                        Sudah Dipakai
                                    </span>
                                `}
                            </div>
                            <div class="text-xs text-[#6B7B75] mt-0.5">
                                ${item.available ? `<strong class="text-[#1E7A53]">${formattedPrice}</strong> /tahun • Termasuk PPN` : 'Tidak dapat didaftarkan'}
                            </div>
                        </div>

                        ${item.available ? `
                            <button 
                                type="button" 
                                onclick="pilihDomainBaru('${item.domain}', ${item.price}, ${item.price_base || 0}, ${item.tax_amount || 0}, this)"
                                class="btn-gunakan-domain shrink-0 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] px-3.5 py-1.5 text-xs font-bold text-white transition shadow-xs cursor-pointer disabled:opacity-75"
                            >
                                Gunakan
                            </button>
                        ` : ''}
                    </div>
                `;
            });
            container.innerHTML = html;
        } else {
            container.innerHTML = `
                <div class="py-6 text-center text-xs text-rose-500 font-medium">
                    ${data.message || 'Tidak ada domain yang ditemukan. Silakan gunakan nama lain.'}
                </div>
            `;
        }
    } catch (err) {
        container.innerHTML = `
            <div class="py-6 text-center text-xs text-rose-500 font-medium">
                Gagal memuat ketersediaan domain. Silakan periksa koneksi atau coba lagi.
            </div>
        `;
    } finally {
        spinner.classList.add('hidden');
    }
}

// Terapkan Domain Baru ke Halaman & Refresh State dengan Feedback Loading
function pilihDomainBaru(domain, price, priceBase, taxAmount, btn) {
    if (!domain) return;
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `
            <span class="inline-flex items-center gap-1">
                <svg class="size-3 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Menerapkan...</span>
            </span>
        `;
        document.querySelectorAll('.btn-gunakan-domain').forEach(b => {
            if (b !== btn) b.disabled = true;
        });
    }

    const url = new URL('{{ route('checkout.pilih-template') }}', window.location.origin);
    url.searchParams.set('domain', domain);
    if (price) url.searchParams.set('price', price);
    if (priceBase) url.searchParams.set('price_base', priceBase);
    if (taxAmount) url.searchParams.set('tax_amount', taxAmount);
    window.location.href = url.toString();
}

// Debounce otomatis pencarian di input modal saat mengetik
let debounceModalTimer = null;
document.addEventListener('DOMContentLoaded', () => {
    const modalInput = document.getElementById('input-domain-modal');
    if (modalInput) {
        modalInput.addEventListener('input', (e) => {
            clearTimeout(debounceModalTimer);
            const val = e.target.value.trim();
            if (val.length >= 3) {
                debounceModalTimer = setTimeout(() => {
                    cariDomainModal();
                }, 550);
            }
        });
    }

    // Tutup modal jika tombol Escape ditekan
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            tutupModalGantiDomain();
        }
    });

    // Cegah scroll chaining ke halaman latar belakang saat menggulir list domain di modal
    const resultsContainer = document.getElementById('modal-results-container');
    if (resultsContainer) {
        resultsContainer.addEventListener('wheel', (e) => {
            const isAtTop = resultsContainer.scrollTop === 0;
            const isAtBottom = resultsContainer.scrollHeight - resultsContainer.scrollTop <= resultsContainer.clientHeight + 1;
            if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});
</script>

@endsection
