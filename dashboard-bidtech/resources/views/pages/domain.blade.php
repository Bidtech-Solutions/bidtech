@extends('layouts.checkout')

@section('title', 'Pilih Domain - Bidtech')

@section('content')
@php $flow = 'template-first'; @endphp

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

        <!-- ================= KOLOM KIRI: PENCARIAN & REKOMENDASI DOMAIN ================= -->
        <div class="lg:col-span-8 space-y-6">

            <!-- Baris Badge Langkah -->
            <div class="flex items-center justify-between gap-3">
                <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-3 py-1 text-xs font-semibold text-[#1E7A53]">
                    Langkah 1 dari 4
                </span>
                <span class="text-xs text-[#6B7B75]">
                    Pencarian & Pemilihan Domain
                </span>
            </div>

            <!-- Header Judul -->
            <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B17]" id="page-heading-title">
                    {{ ($activeTab ?? 'new') === 'own' ? 'Hubungkan domain milik Anda' : 'Cari domain untuk website-mu' }}
                </h1>
                <p class="mt-1.5 text-sm text-[#6B7B75]" id="page-heading-desc">
                    {{ ($activeTab ?? 'new') === 'own' ? 'Gunakan domain yang sudah Anda beli di tempat lain tanpa biaya pendaftaran domain (Rp0).' : 'Cek ketersediaan domain baru atau gunakan domain yang sudah Anda miliki.' }}
                </p>
            </div>

            <!-- Standalone Button Tab Navigation (Tombol Nyata Tanpa Container Border) -->
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <!-- Button 1: Beli Domain Baru -->
                <button 
                    type="button" 
                    id="tab-btn-new"
                    onclick="switchDomainTab('new')"
                    @class([
                        'inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm transition-all duration-200 cursor-pointer select-none',
                        'bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold shadow-sm ring-2 ring-[#22C55E]/20' => ($activeTab ?? 'new') === 'new',
                        'bg-white hover:bg-slate-50 border border-[#D5DDD8] hover:border-[#22C55E] text-[#0B1B17] hover:text-[#1E7A53] font-semibold shadow-xs' => ($activeTab ?? 'new') !== 'new',
                    ])
                >
                    <svg class="size-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <span>Beli Domain Baru</span>
                </button>

                <!-- Button 2: Saya Sudah Punya Domain -->
                <button 
                    type="button" 
                    id="tab-btn-own"
                    onclick="switchDomainTab('own')"
                    @class([
                        'inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm transition-all duration-200 cursor-pointer select-none',
                        'bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold shadow-sm ring-2 ring-[#22C55E]/20' => ($activeTab ?? 'new') === 'own',
                        'bg-white hover:bg-slate-50 border border-[#D5DDD8] hover:border-[#22C55E] text-[#0B1B17] hover:text-[#1E7A53] font-semibold shadow-xs' => ($activeTab ?? 'new') !== 'own',
                    ])
                >
                    <svg class="size-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                    <span>Saya Sudah Punya Domain</span>
                    <span id="tab-badge-own" @class([
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors',
                        'bg-white/25 text-white' => ($activeTab ?? 'new') === 'own',
                        'bg-[#E7F4EE] text-[#1E7A53]' => ($activeTab ?? 'new') !== 'own',
                    ])>
                        Bebas Biaya Rp0
                    </span>
                </button>
            </div>

            <!-- ================= TAB 1: FORM & HASIL CARI DOMAIN BARU ================= -->
            <div id="tab-content-new" class="{{ ($activeTab ?? 'new') === 'own' ? 'hidden' : '' }} space-y-6">

            <!-- Form Pencarian Domain -->
            <div>
                <form method="GET" action="{{ route('checkout.domain', $template) }}" class="flex items-center gap-2.5" id="domain-search-form" onsubmit="event.preventDefault(); triggerSearch();">
                    <div class="relative flex-1">
                        <input 
                            type="text" 
                            id="domain-input" 
                            name="q" 
                            value="{{ request('q', '') }}" 
                            placeholder="namabisnismu atau deny.com" 
                            autocomplete="off"
                            class="h-12 sm:h-13 w-full rounded-2xl border border-[#E4E9E6] bg-white pl-4 pr-11 text-sm font-medium text-[#0B1B17] outline-none transition placeholder:text-slate-400 focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                        >
                        <!-- Loading Spinner -->
                        <div id="search-spinner" class="hidden absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                            <svg class="size-5 animate-spin text-[#22C55E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </div>
                    </div>
                    <button type="submit" class="h-12 sm:h-13 shrink-0 rounded-2xl bg-[#22C55E] hover:bg-[#16a34a] px-7 text-sm font-semibold text-white shadow-xs transition cursor-pointer">
                        Cari
                    </button>
                </form>
                <p class="mt-2 text-xs text-[#6B7B75]">
                    Contoh: deny.com, restoran.id, namabrand.com, tokoonline.my.id
                </p>
            </div>

            <!-- Bagian Rekomendasi Domain -->
            <div class="pt-2">
                <div class="flex items-center justify-between gap-2.5 mb-4">
                    <div class="flex items-center gap-2.5">
                        <span class="inline-block h-5 w-1 rounded-full bg-[#22C55E]"></span>
                        <h2 class="text-base font-bold text-[#0B1B17]">
                            Rekomendasi untuk kamu
                        </h2>
                    </div>
                    <span id="domain-count-badge" class="text-xs text-[#6B7B75] font-medium">
                        Menampilkan 5 rekomendasi teratas
                    </span>
                </div>

                @php
                    $primaryDomains = array_slice($domainResults, 0, 5);
                    $extraDomains = array_slice($domainResults, 5);
                    $extraCount = count($extraDomains);
                @endphp

                <!-- 1. Container 5 Rekomendasi Utama (Langsung Terlihat) -->
                <div id="domain-primary-list" class="space-y-3">
                    @forelse($primaryDomains as $result)
                        @php
                            $taxAmount = $result['tax_amount'] ?? round($result['price'] * 0.11 / 1.11);
                            $isSelected = ($checkout['domain_name'] ?? '') === $result['domain'];
                            $isExact = $result['is_exact_match'] ?? false;
                        @endphp
                        <div 
                            @if($result['available'])
                                onclick="selectDomain('{{ $result['domain'] }}', {{ $result['price'] }}, {{ $taxAmount }}, {{ $result['price_base'] ?? round($result['price'] / 1.11) }})"
                            @endif
                            data-domain="{{ $result['domain'] }}"
                            @class([
                                'domain-card group flex items-center justify-between gap-4 rounded-2xl border p-4 sm:px-6 transition-all duration-200 select-none',
                                'cursor-pointer shadow-2xs hover:border-[#22C55E] hover:shadow-md hover:-translate-y-0.5' => $result['available'],
                                'border-2 border-[#22C55E] bg-[#F2FBF5] shadow-xs' => $result['available'] && $isSelected,
                                'border-[#E4E9E6] bg-white' => $result['available'] && !$isSelected,
                                'border-dashed border-[#E4E9E6] bg-slate-50 opacity-60 cursor-not-allowed' => !$result['available'],
                            ])
                        >
                            <!-- Sisi Kiri: Nama Domain, Badge Exact Match & Status -->
                            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                                <span class="text-sm sm:text-base font-bold text-[#0B1B17] group-hover:text-[#1E7A53] transition">
                                    {{ $result['domain'] }}
                                </span>

                                @if($isExact)
                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-[#EDF5FD] border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
                                        <svg class="size-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        </svg>
                                        <span>Pilihanmu</span>
                                    </span>
                                @endif

                                @if($result['available'])
                                    <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-3 py-1 text-xs font-semibold text-[#1E7A53]">
                                        Tersedia
                                    </span>
                                @else
                                    <span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                        Sudah Dipakai
                                    </span>
                                @endif
                            </div>

                            <!-- Sisi Kanan: Harga dan Tombol Pilih -->
                            <div class="flex items-center gap-4 sm:gap-6">
                                <div class="text-right">
                                    <div class="text-sm sm:text-base font-bold text-[#0B1B17]">
                                        Rp{{ number_format($result['price'], 0, ',', '.') }}
                                        <span class="text-xs font-normal text-[#6B7B75]">/tahun</span>
                                    </div>
                                    @if($result['available'])
                                        <div class="text-[11px] text-[#2E6806] font-medium mt-0.5">
                                            Termasuk PPN 11%
                                        </div>
                                    @endif
                                </div>

                                @if($result['available'])
                                    <button 
                                        type="button" 
                                        id="btn-domain-{{ Str::slug($result['domain']) }}"
                                        @class([
                                            'domain-select-btn rounded-xl border px-5 py-2 text-xs sm:text-sm font-semibold transition shrink-0 pointer-events-none',
                                            'bg-[#22C55E] text-white border-[#22C55E]' => $isSelected,
                                            'border-[#22C55E] text-[#1E7A53] group-hover:bg-[#22C55E] group-hover:text-white' => !$isSelected,
                                        ])
                                    >
                                        {{ $isSelected ? '✓ Terpilih' : 'Pilih' }}
                                    </button>
                                @else
                                    <button type="button" disabled class="rounded-xl border border-[#E4E9E6] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-400 cursor-not-allowed shrink-0">
                                        Sudah Dipakai
                                    </button>
                                @endif
                            </div>
                        </div>
                    @empty
                        <div class="rounded-2xl border border-dashed border-[#E4E9E6] p-8 text-center text-sm text-[#6B7B75]">
                            Ketik nama bisnismu di form pencarian di atas untuk memeriksa ketersediaan domain.
                        </div>
                    @endforelse
                </div>

                <!-- 2. Container Ekstensi Tambahan (Tersembunyi secara Default) -->
                <div id="extra-domains-container" class="hidden space-y-3 pt-3">
                    @foreach($extraDomains as $result)
                        @php
                            $taxAmount = $result['tax_amount'] ?? round($result['price'] * 0.11 / 1.11);
                            $isSelected = ($checkout['domain_name'] ?? '') === $result['domain'];
                            $isExact = $result['is_exact_match'] ?? false;
                        @endphp
                        <div 
                            @if($result['available'])
                                onclick="selectDomain('{{ $result['domain'] }}', {{ $result['price'] }}, {{ $taxAmount }}, {{ $result['price_base'] ?? round($result['price'] / 1.11) }})"
                            @endif
                            data-domain="{{ $result['domain'] }}"
                            @class([
                                'domain-card group flex items-center justify-between gap-4 rounded-2xl border p-4 sm:px-6 transition-all duration-200 select-none',
                                'cursor-pointer shadow-2xs hover:border-[#22C55E] hover:shadow-md hover:-translate-y-0.5' => $result['available'],
                                'border-2 border-[#22C55E] bg-[#F2FBF5] shadow-xs' => $result['available'] && $isSelected,
                                'border-[#E4E9E6] bg-white' => $result['available'] && !$isSelected,
                                'border-dashed border-[#E4E9E6] bg-slate-50 opacity-60 cursor-not-allowed' => !$result['available'],
                            ])
                        >
                            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                                <span class="text-sm sm:text-base font-bold text-[#0B1B17] group-hover:text-[#1E7A53] transition">
                                    {{ $result['domain'] }}
                                </span>

                                @if($isExact)
                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-[#EDF5FD] border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
                                        <svg class="size-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        </svg>
                                        <span>Pilihanmu</span>
                                    </span>
                                @endif

                                @if($result['available'])
                                    <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-3 py-1 text-xs font-semibold text-[#1E7A53]">
                                        Tersedia
                                    </span>
                                @else
                                    <span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                        Sudah Dipakai
                                    </span>
                                @endif
                            </div>

                            <div class="flex items-center gap-4 sm:gap-6">
                                <div class="text-right">
                                    <div class="text-sm sm:text-base font-bold text-[#0B1B17]">
                                        Rp{{ number_format($result['price'], 0, ',', '.') }}
                                        <span class="text-xs font-normal text-[#6B7B75]">/tahun</span>
                                    </div>
                                    @if($result['available'])
                                        <div class="text-[11px] text-[#2E6806] font-medium mt-0.5">
                                            Termasuk PPN 11%
                                        </div>
                                    @endif
                                </div>

                                @if($result['available'])
                                    <button 
                                        type="button" 
                                        id="btn-domain-{{ Str::slug($result['domain']) }}"
                                        @class([
                                            'domain-select-btn rounded-xl border px-5 py-2 text-xs sm:text-sm font-semibold transition shrink-0 pointer-events-none',
                                            'bg-[#22C55E] text-white border-[#22C55E]' => $isSelected,
                                            'border-[#22C55E] text-[#1E7A53] group-hover:bg-[#22C55E] group-hover:text-white' => !$isSelected,
                                        ])
                                    >
                                        {{ $isSelected ? '✓ Terpilih' : 'Pilih' }}
                                    </button>
                                @else
                                    <button type="button" disabled class="rounded-xl border border-[#E4E9E6] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-400 cursor-not-allowed shrink-0">
                                        Sudah Dipakai
                                    </button>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>

                <!-- 3. Tombol Toggle Ekstensi Tambahan -->
                <div class="pt-4 text-center {{ $extraCount === 0 ? 'hidden' : '' }}" id="toggle-extra-wrapper">
                    <button 
                        type="button" 
                        id="btn-toggle-extra" 
                        onclick="toggleExtraDomains()" 
                        class="inline-flex items-center gap-2 rounded-2xl border border-[#E4E9E6] bg-white hover:bg-[#F4F6F5] hover:border-[#22C55E] px-6 py-3 text-xs sm:text-sm font-bold text-[#0B1B17] transition shadow-2xs cursor-pointer select-none"
                    >
                        <span id="toggle-extra-text">Lihat {{ $extraCount }} Pilihan Ekstensi Lainnya</span>
                        <svg id="toggle-extra-icon" class="size-4 text-[#1E7A53] transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- ================= 4. PILIHAN DURASI PAKET WEBSITE & DOMAIN (1, 2, 3 TAHUN) ================= -->
            @php
                $selectedDomain = $checkout['domain_name'] ?? '';
                $currentDuration = (int) ($checkout['domain_duration'] ?? 1);
                $isOwn = !empty($checkout['is_own_domain']);
                $priceYear = $isOwn ? 0 : (int) ($checkout['domain_price_per_year'] ?? round(($checkout['domain_price'] ?? 185000) / max(1, $currentDuration)));
                $templatePricePerYear = (int) ($template->template_price ?? 1000000);
                $serverPricePerYear = (int) ($template->server_price ?? 500000);
                $servicePricePerYear = (int) ($template->service_price ?? 500000);
            @endphp
            <div id="domain-duration-section" class="rounded-3xl border border-[#E4E9E6] bg-white p-5 sm:p-6 shadow-xs space-y-4 mt-6 transition-all duration-300 {{ empty($selectedDomain) ? 'hidden' : '' }}">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4E9E6] pb-3">
                    <div class="flex items-center gap-2.5">
                        <span class="inline-block h-5 w-1 rounded-full bg-[#22C55E]"></span>
                        <div>
                            <h3 class="text-base font-bold text-[#0B1B17]">
                                Pilih Durasi Paket Website Komplit
                            </h3>
                            <p class="text-xs text-[#6B7B75] mt-0.5">
                                Paket website untuk <strong id="duration-domain-label" class="text-[#1E7A53]">{{ $selectedDomain }}</strong> mencakup Lisensi Desain, Cloud Server, Setup Layanan & Registrasi Domain.
                            </p>
                        </div>
                    </div>
                    <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-3 py-1 text-xs font-semibold text-[#1E7A53] shrink-0">
                        Opsi Paket 1 - 3 Tahun
                    </span>
                </div>

                <!-- 3 Opsi Kartu Durasi: 1 Tahun, 2 Tahun, 3 Tahun -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5" id="duration-cards-grid">
                    @foreach([
                        1 => ['label' => 'Paket 1 Tahun', 'badge' => 'Standar', 'badge_color' => 'bg-slate-100 text-slate-700', 'desc' => 'Aktif 1 Tahun Penuh'],
                        2 => ['label' => 'Paket 2 Tahun', 'badge' => 'Rekomendasi', 'badge_color' => 'bg-[#E7F4EE] text-[#1E7A53] border border-[#22C55E]/40', 'desc' => 'Langsung Aktif 2 Tahun'],
                        3 => ['label' => 'Paket 3 Tahun', 'badge' => 'Paling Hemat', 'badge_color' => 'bg-blue-50 text-blue-700 border border-blue-200', 'desc' => 'Masa Aktif 3 Tahun Bebas Cemas'],
                    ] as $dur => $info)
                        @php
                            $isDurSelected = $currentDuration === $dur;
                            $durTemplatePrice = $templatePricePerYear * $dur;
                            $durServerPrice = $serverPricePerYear * $dur;
                            $durServicePrice = $servicePricePerYear * $dur;
                            $durDomainPrice = $priceYear * $dur;
                            $durPackageTotal = $durTemplatePrice + $durServerPrice + $durServicePrice;
                            $durTotalAll = $durPackageTotal + $durDomainPrice;
                        @endphp
                        <div 
                            onclick="pilihDurasiDomain({{ $dur }})"
                            id="duration-card-{{ $dur }}"
                            @class([
                                'duration-card cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between gap-3 relative select-none',
                                'border-2 border-[#22C55E] bg-[#F2FBF5] shadow-xs' => $isDurSelected,
                                'border-[#E4E9E6] bg-white hover:border-[#22C55E] hover:bg-slate-50/70' => !$isDurSelected,
                            ])
                        >
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <div class="text-sm font-bold text-[#0B1B17]">{{ $info['label'] }}</div>
                                    <div class="text-[11px] text-[#6B7B75] mt-0.5">{{ $info['desc'] }}</div>
                                </div>
                                <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold {{ $info['badge_color'] }}">
                                    {{ $info['badge'] }}
                                </span>
                            </div>

                            <div class="space-y-1 text-[11px] text-[#6B7B75] pt-1 border-t border-slate-100">
                                <div class="flex justify-between items-center">
                                    <span>Paket Website:</span>
                                    <span class="font-bold text-[#0B1B17]">
                                        Rp{{ number_format($durPackageTotal, 0, ',', '.') }}
                                    </span>
                                </div>
                                <div class="flex justify-between items-center text-[10px] pl-2 text-slate-500">
                                    <span>• Desain & Server ({{ $dur }} Thn):</span>
                                    <span>Rp{{ number_format($durTemplatePrice + $durServerPrice, 0, ',', '.') }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span>Domain ({{ $dur }} Thn):</span>
                                    <span class="font-medium text-[#0B1B17] duration-domain-price" data-duration="{{ $dur }}">
                                        {{ $isOwn ? 'Rp0 (Milik Sendiri)' : 'Rp' . number_format($durDomainPrice, 0, ',', '.') }}
                                    </span>
                                </div>
                            </div>

                            <div class="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                                <div>
                                    <div class="text-[11px] text-[#6B7B75]">Total Estimasi:</div>
                                    <strong class="text-sm sm:text-base font-black text-[#1E7A53] duration-total-price" data-duration="{{ $dur }}">
                                        Rp{{ number_format($durTotalAll, 0, ',', '.') }}
                                    </strong>
                                </div>
                                <span class="duration-radio-indicator size-5 rounded-full border-2 flex items-center justify-center text-xs transition font-bold {{ $isDurSelected ? 'border-[#22C55E] bg-[#22C55E] text-white' : 'border-slate-300 bg-white text-transparent' }}">
                                    ✓
                                </span>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <!-- Banner Edukasi di Bagian Bawah -->
            <div class="rounded-2xl border border-[#D0E3F9] bg-[#EDF5FD] p-4 sm:p-5 flex items-start gap-3.5 mt-6">
                <div class="flex size-6 items-center justify-center rounded-full bg-[#2563EB] text-white font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    i
                </div>
                <div>
                    <h3 class="text-sm font-bold text-[#0B1B17]">
                        Kenapa punya domain sendiri?
                    </h3>
                    <p class="mt-0.5 text-xs sm:text-sm text-[#4A5551] leading-relaxed">
                        Domain membuat bisnismu terlihat lebih profesional, mudah diingat, dan meningkatkan kepercayaan pelanggan.
                    </p>
                </div>
            </div>
        </div> <!-- /tab-content-new -->

        <!-- ================= TAB 2: SAYA SUDAH PUNYA DOMAIN SENDIRI ================= -->
        <div id="tab-content-own" class="{{ ($activeTab ?? 'new') === 'own' ? '' : 'hidden' }} space-y-6">
            @php
                $isOwnSelected = !empty($checkout['domain_name']) && !empty($checkout['is_own_domain']);
                $ownDomainName = $isOwnSelected ? $checkout['domain_name'] : '';
            @endphp

            <!-- Box Domain Sendiri yang SUDAH Terpilih -->
            <div id="own-domain-selected-box" class="{{ $isOwnSelected ? '' : 'hidden' }} rounded-2xl border-2 border-[#22C55E] bg-[#F2FBF5] p-5 sm:p-6 shadow-xs space-y-4">
                <div class="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                    <div class="flex items-center gap-3.5">
                        <div class="flex size-12 items-center justify-center rounded-2xl bg-[#22C55E] text-white shrink-0 shadow-xs">
                            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="text-lg sm:text-xl font-black text-[#0B1B17]" id="own-domain-selected-name">
                                    {{ $ownDomainName }}
                                </span>
                                <span class="inline-flex items-center rounded-full bg-[#E7F4EE] border border-[#22C55E]/40 px-2.5 py-0.5 text-xs font-bold text-[#1E7A53]">
                                    ✓ Domain Anda Terpilih
                                </span>
                            </div>
                            <div class="text-xs text-[#6B7B75] mt-1 flex items-center gap-2 flex-wrap">
                                <span class="font-bold text-[#1E7A53]">Biaya Domain: Rp0 (Bebas Biaya)</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        onclick="editOwnDomain()" 
                        class="rounded-xl border border-[#22C55E] bg-white hover:bg-[#22C55E] text-[#1E7A53] hover:text-white px-4 py-2 text-xs sm:text-sm font-semibold transition shrink-0 inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                        </svg>
                        <span>Ganti Domain</span>
                    </button>
                </div>

                <div class="rounded-xl bg-white border border-[#22C55E]/30 p-3.5 text-xs text-[#4A5551] flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                    <div class="flex items-center gap-2">
                        <span class="inline-block size-2 rounded-full bg-[#22C55E]"></span>
                        <span>Domain siap digunakan! Silakan klik <strong>Lanjut ke Data Diri</strong> di kolom ringkasan.</span>
                    </div>
                    <a href="{{ route('checkout.data-diri', $template) }}" class="font-bold text-[#1E7A53] hover:underline shrink-0">
                        Lanjut Sekarang &rarr;
                    </a>
                </div>
            </div>

            <!-- Form Input Domain Sendiri (Ditampilkan jika belum memilih atau sedang klik 'Ganti') -->
            <div id="own-domain-form-box" class="{{ $isOwnSelected ? 'hidden' : '' }} rounded-2xl border border-[#E4E9E6] bg-white p-5 sm:p-6 shadow-xs space-y-5">
                <div class="space-y-1">
                    <div class="flex items-center gap-2.5">
                        <span class="inline-block h-5 w-1 rounded-full bg-[#22C55E]"></span>
                        <h2 class="text-base font-bold text-[#0B1B17]">
                            Masukkan Nama Domain Milik Anda
                        </h2>
                    </div>
                    <p class="text-xs sm:text-sm text-[#6B7B75]">
                        Ketik domain yang sudah Anda miliki di registrar lain (misal: Niagahoster, DomaiNesia, IDCloudHost, Cloudflare, Rumahweb, dll).
                    </p>
                </div>

                <form id="own-domain-form" onsubmit="event.preventDefault(); submitOwnDomain();" class="space-y-4">
                    <div>
                        <label for="own-domain-input" class="block text-xs font-bold text-[#0B1B17] uppercase tracking-wider mb-2">
                            Nama Domain Lengkap
                        </label>
                        <div class="relative flex items-center">
                            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                id="own-domain-input" 
                                name="own_domain" 
                                value="{{ $ownDomainName }}"
                                placeholder="contohbisnis.com atau tokoanda.id" 
                                autocomplete="off"
                                class="h-12 sm:h-13 w-full rounded-2xl border border-[#E4E9E6] bg-white pl-11 pr-4 text-sm font-semibold text-[#0B1B17] outline-none transition placeholder:text-slate-400 placeholder:font-normal focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                            >
                        </div>
                        <p class="mt-1.5 text-xs text-[#6B7B75]">
                            Ketik nama domain tanpa <code>http://</code>, <code>https://</code>, atau <code>www</code>. Contoh: <strong>bisnisku.com</strong>
                        </p>
                    </div>


                    <!-- Pesan Error Dinamis -->
                    <div id="own-domain-error" class="hidden rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-start gap-2">
                        <svg class="size-4 shrink-0 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span id="own-domain-error-text">Format nama domain tidak valid.</span>
                    </div>

                    <div class="pt-2 flex items-center gap-3">
                        <button 
                            type="submit" 
                            id="btn-submit-own-domain"
                            class="h-12 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] px-7 text-sm font-semibold text-white shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span id="btn-submit-own-text">Gunakan Domain Ini</span>
                            <svg id="btn-submit-own-spinner" class="hidden size-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </button>
                        @if($isOwnSelected)
                            <button 
                                type="button" 
                                onclick="cancelEditOwnDomain()" 
                                class="h-12 rounded-xl border border-[#E4E9E6] bg-white hover:bg-slate-50 px-5 text-sm font-medium text-[#4A5551] transition cursor-pointer"
                            >
                                Batal
                            </button>
                        @endif
                    </div>
                </form>
            </div>

            <!-- Edukasi Alur Penggunaan Domain Sendiri -->
            <div class="rounded-2xl border border-[#D0E3F9] bg-[#EDF5FD] p-4 sm:p-5 flex items-start gap-3.5">
                <div class="flex size-7 items-center justify-center rounded-xl bg-[#2563EB] text-white font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </div>
                <div class="space-y-1">
                    <h3 class="text-sm font-bold text-[#0B1B17]">
                        Bagaimana alur penggunaan domain sendiri?
                    </h3>
                    <p class="text-xs sm:text-sm text-[#4A5551] leading-relaxed">
                        1. <strong>Biaya Domain Rp0:</strong> Anda tidak dikenakan biaya pembelian domain di Bidtech.<br>
                        2. <strong>Selesaikan Pemesanan:</strong> Lanjutkan pengisian data diri dan pembayaran lisensi website + server.<br>
                        3. <strong>Arahkan DNS:</strong> Setelah pesanan selesai, Anda cukup mengarahkan A Record domain Anda ke IP server Bidtech. Tim support kami siap memandu sampai website online!
                    </p>
                </div>
            </div>
        </div>
    </div>

        <!-- ================= KOLOM KANAN: RINGKASAN PESANAN ================= -->
        <div class="lg:col-span-4 relative">
            <aside class="sticky top-24 space-y-4">
                <div class="rounded-2xl border border-[#E4E9E6] bg-white p-5 shadow-xs">
                    <h2 class="text-sm font-extrabold uppercase tracking-wider text-[#6B7B75] mb-4">Ringkasan Pesanan</h2>
                    <div class="pb-4 border-b border-[#E4E9E6] space-y-3">
                        <div class="w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-[#E7F4EE]">
                            <img src="{{ $template->preview_url }}" alt="{{ $template->name }}" class="h-full w-full object-cover">
                        </div>
                        <div class="overflow-hidden">
                            <h3 class="font-bold text-[#0B1B17] text-sm truncate">{{ $template->name }}</h3>
                            <p class="text-xs text-[#6B7B75]">Template Website</p>
                        </div>
                    </div>
                    <div class="mt-4 space-y-2.5">
                        @php
                            $duration = (int) ($checkout['domain_duration'] ?? 1);
                            $duration = in_array($duration, [1, 2, 3], true) ? $duration : 1;
                            $tPrice = ((int) ($template->template_price ?? 1000000)) * $duration;
                            $sPrice = ((int) ($template->server_price ?? 500000)) * $duration;
                            $vPrice = ((int) ($template->service_price ?? 500000)) * $duration;
                            $dPrice = (int) ($checkout['domain_price'] ?? 0);
                            $promoSession = session('checkout.promo');
                            $discAmount = (int) ($promoSession['discount_amount'] ?? 0);
                            $estTotal = max(0, $tPrice + $sPrice + $vPrice + $dPrice - $discAmount);
                        @endphp
                        <div class="flex items-center justify-between text-xs" id="sidebar-template-row">
                            <span class="text-[#6B7B75]" id="sidebar-template-label">1. Desain Template ({{ $duration }} Thn)</span>
                            <span class="font-semibold text-[#0B1B17]" id="sidebar-template-price">Rp{{ number_format($tPrice, 0, ',', '.') }}</span>
                        </div>
                        <div class="flex items-center justify-between text-xs" id="sidebar-server-row">
                            <span class="text-[#6B7B75]" id="sidebar-server-label">2. Cloud Server ({{ $duration }} Thn)</span>
                            <span class="font-semibold text-[#0B1B17]" id="sidebar-server-price">Rp{{ number_format($sPrice, 0, ',', '.') }}</span>
                        </div>
                        <div class="flex items-center justify-between text-xs" id="sidebar-service-row">
                            <span class="text-[#6B7B75]" id="sidebar-service-label">3. Setup & Deployment ({{ $duration }} Thn)</span>
                            <span class="font-semibold text-[#0B1B17]" id="sidebar-service-price">Rp{{ number_format($vPrice, 0, ',', '.') }}</span>
                        </div>
                        <div id="sidebar-domain-box">
                            @if(!empty($checkout['domain_name']))
                                @php
                                    $isOwn = !empty($checkout['is_own_domain']);
                                    $duration = (int) ($checkout['domain_duration'] ?? 1);
                                    $pricePerYear = (int) ($checkout['domain_price_per_year'] ?? round(($checkout['domain_price'] ?? 185000) / max(1, $duration)));
                                @endphp
                                <div class="rounded-xl bg-[#E7F4EE] px-3 py-2 text-xs text-[#1E7A53] font-semibold flex items-center justify-between mt-1">
                                    <div>
                                        <span>Domain: <strong>{{ $checkout['domain_name'] }}</strong></span>
                                        @if($isOwn)
                                            <div class="text-[10px] text-[#2E6806] font-normal">Domain Milik Sendiri (Bebas Biaya)</div>
                                        @else
                                            <div class="text-[10px] text-[#2E6806] font-normal" id="sidebar-domain-detail">{{ $duration }} Tahun (Rp{{ number_format($pricePerYear, 0, ',', '.') }}/thn)</div>
                                        @endif
                                    </div>
                                    <span class="font-bold" id="sidebar-domain-price-val">Rp{{ number_format($checkout['domain_price'] ?? 0, 0, ',', '.') }}</span>
                                </div>
                            @else
                                <div class="rounded-xl bg-[#F4F6F5] px-3 py-2 text-xs text-[#6B7B75] flex items-center justify-between mt-1">
                                    <span>4. Registrasi Domain</span>
                                    <span class="font-medium text-amber-700">Belum dipilih</span>
                                </div>
                            @endif
                        </div>
                        <hr class="border-[#E4E9E6] my-2">
                        <div class="flex items-baseline justify-between">
                            <div>
                                <span class="text-xs font-medium text-[#4A5551]">Estimasi total</span>
                                <div class="text-[10px] text-[#6B7B75]">Sudah termasuk PPN</div>
                            </div>
                            <strong id="sidebar-total-price" class="text-xl font-black text-[#1E7A53]">
                                Rp{{ number_format($estTotal, 0, ',', '.') }}
                            </strong>
                        </div>
                        <div class="pt-2" id="sidebar-cta-wrapper">
                            @if(!empty($checkout['domain_name']))
                                <a href="{{ route('checkout.data-diri', $template) }}" id="btn-lanjut-datadiri" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-3 px-4 text-xs sm:text-sm font-semibold text-white shadow-sm transition">
                                    <span>Lanjut ke Data Diri</span>
                                    <i data-lucide="arrow-right" class="size-4"></i>
                                </a>
                            @else
                                <button type="button" disabled id="btn-lanjut-datadiri-disabled" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BAC7C2] py-3 px-4 text-xs sm:text-sm font-semibold text-white cursor-not-allowed shadow-xs">
                                    <span>Lanjut ke Data Diri</span>
                                    <i data-lucide="arrow-right" class="size-4"></i>
                                </button>
                                <p id="sidebar-hint" class="mt-2 text-center text-[11px] text-[#6B7B75]">Pilih domain terlebih dahulu untuk melanjutkan.</p>
                            @endif
                        </div>
                    </div>
                </div>
            </aside>
        </div>

    </div>
</div>

<!-- JavaScript Interaktif Live Search & AJAX Domain Selection -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    const domainInput = document.getElementById('domain-input');
    const searchSpinner = document.getElementById('search-spinner');
    const primaryList = document.getElementById('domain-primary-list');
    const extraContainer = document.getElementById('extra-domains-container');
    const toggleWrapper = document.getElementById('toggle-extra-wrapper');
    const toggleText = document.getElementById('toggle-extra-text');
    const toggleIcon = document.getElementById('toggle-extra-icon');
    const countBadge = document.getElementById('domain-count-badge');

    const searchUrl = "{{ route('checkout.domain.search', $template) }}";
    const selectUrl = "{{ route('checkout.domain.select', $template) }}";
    const durationUrl = "{{ route('checkout.domain.duration', $template) }}";
    const ownDomainUrl = "{{ route('checkout.domain.own', $template) }}";
    const dataDiriUrl = "{{ route('checkout.data-diri', $template) }}";
    const csrfToken = "{{ csrf_token() }}";
    const templatePrice = {{ $template->price }};
    const serverPricePerYear = {{ (int) ($template->server_price ?? 500000) }};

    let debounceTimer = null;
    let abortController = null;
    let currentSelectedDomain = "{{ $checkout['domain_name'] ?? '' }}";
    let currentDuration = {{ (int) ($checkout['domain_duration'] ?? 1) }};
    let currentPricePerYear = {{ (int) ($checkout['domain_price_per_year'] ?? round(($checkout['domain_price'] ?? 185000) / max(1, (int) ($checkout['domain_duration'] ?? 1)))) }};

    const defaultPrimaryHtml = primaryList ? primaryList.innerHTML : '';
    const defaultExtraHtml = extraContainer ? extraContainer.innerHTML : '';
    let currentExtraCount = {{ $extraCount }};
    const defaultExtraCount = {{ $extraCount }};

    function formatRupiah(num) {
        return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(num);
    }

    // Fungsi Toggle Tampilan Ekstensi Tambahan
    window.toggleExtraDomains = function() {
        if (!extraContainer) return;
        const isHidden = extraContainer.classList.contains('hidden');
        if (isHidden) {
            extraContainer.classList.remove('hidden');
            if (toggleIcon) toggleIcon.classList.add('rotate-180');
            if (toggleText) toggleText.textContent = 'Sembunyikan Ekstensi Tambahan';
        } else {
            extraContainer.classList.add('hidden');
            if (toggleIcon) toggleIcon.classList.remove('rotate-180');
            if (toggleText) toggleText.textContent = `Lihat ${currentExtraCount} Pilihan Ekstensi Lainnya`;
        }
    };

    // Helper render card domain (tersedia atau sudah terpakai, mendukung badge exact match)
    function renderDomainCard(item) {
        const priceFmt = formatRupiah(item.price || 185000);
        const taxAmt = item.tax_amount || Math.round((item.price || 185000) * 0.11 / 1.11);
        const priceBase = item.price_base || Math.round((item.price || 185000) / 1.11);
        const isSelected = (currentSelectedDomain === item.domain);

        const exactBadge = item.is_exact_match ? `
            <span class="inline-flex items-center gap-1.5 rounded-full bg-[#EDF5FD] border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
                <svg class="size-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
                <span>Pilihanmu</span>
            </span>
        ` : '';

        if (item.available) {
            return `
                <div 
                    onclick="selectDomain('${item.domain}', ${item.price}, ${taxAmt}, ${priceBase})"
                    data-domain="${item.domain}"
                    class="domain-card group flex items-center justify-between gap-4 rounded-2xl border p-4 sm:px-6 transition-all duration-200 cursor-pointer shadow-2xs hover:border-[#22C55E] hover:shadow-md hover:-translate-y-0.5 select-none ${isSelected ? 'border-2 border-[#22C55E] bg-[#F2FBF5] shadow-xs' : 'border-[#E4E9E6] bg-white'}"
                >
                    <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span class="text-sm sm:text-base font-bold text-[#0B1B17] group-hover:text-[#1E7A53] transition">
                            ${item.domain}
                        </span>
                        ${exactBadge}
                        <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-3 py-1 text-xs font-semibold text-[#1E7A53]">
                            Tersedia
                        </span>
                    </div>
                    <div class="flex items-center gap-4 sm:gap-6">
                        <div class="text-right">
                            <div class="text-sm sm:text-base font-bold text-[#0B1B17]">
                                Rp${priceFmt} <span class="text-xs font-normal text-[#6B7B75]">/tahun</span>
                            </div>
                            <div class="text-[11px] text-[#2E6806] font-medium mt-0.5">
                                Termasuk PPN 11%
                            </div>
                        </div>
                        <button 
                            type="button" 
                            class="domain-select-btn rounded-xl border px-5 py-2 text-xs sm:text-sm font-semibold transition shrink-0 pointer-events-none ${isSelected ? 'bg-[#22C55E] text-white border-[#22C55E]' : 'border-[#22C55E] text-[#1E7A53] group-hover:bg-[#22C55E] group-hover:text-white'}"
                        >
                            ${isSelected ? '✓ Terpilih' : 'Pilih'}
                        </button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-[#E4E9E6] bg-slate-50 p-4 sm:px-6 shadow-2xs opacity-60 cursor-not-allowed select-none">
                    <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span class="text-sm sm:text-base font-bold text-[#0B1B17]">
                            ${item.domain}
                        </span>
                        ${exactBadge}
                        <span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                            Sudah Dipakai
                        </span>
                    </div>
                    <div class="flex items-center gap-4 sm:gap-6">
                        <div class="text-right text-xs text-[#6B7B75]">
                            Domain ini sudah dimiliki orang lain
                        </div>
                        <button type="button" disabled class="rounded-xl border border-[#E4E9E6] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-400 cursor-not-allowed shrink-0">
                            Sudah Dipakai
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Fungsi trigger pencarian AJAX cepat
    window.triggerSearch = function() {
        const query = (domainInput.value || '').trim();
        if (query.length < 3) {
            searchSpinner.classList.add('hidden');
            return;
        }

        if (abortController) {
            abortController.abort();
        }
        abortController = new AbortController();

        searchSpinner.classList.remove('hidden');

        // Tampilkan 4 baris skeleton cards pulsing selama proses query live API
        if (primaryList) {
            primaryList.innerHTML = `
                <div class="space-y-3">
                    <div class="flex items-center gap-2 py-1 text-xs text-[#6B7B75]">
                        <svg class="size-3.5 animate-spin text-[#22C55E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span>Memeriksa ketersediaan domain real-time...</span>
                    </div>
                    ${[1, 2, 3, 4].map(() => `
                        <div class="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:px-6 animate-pulse">
                            <div class="flex items-center gap-3 flex-1">
                                <div class="h-5 w-36 sm:w-48 rounded-md bg-slate-200"></div>
                                <div class="h-5 w-16 rounded-full bg-emerald-100"></div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="space-y-1 text-right">
                                    <div class="h-4 w-24 rounded bg-slate-200"></div>
                                    <div class="h-3 w-16 rounded bg-slate-100"></div>
                                </div>
                                <div class="h-9 w-20 rounded-xl bg-emerald-200/60 shrink-0"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        if (extraContainer) {
            extraContainer.classList.add('hidden');
        }
        if (toggleWrapper) {
            toggleWrapper.classList.add('hidden');
        }

        fetch(`${searchUrl}?q=${encodeURIComponent(query)}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            signal: abortController.signal
        })
        .then(res => res.json())
        .then(data => {
            searchSpinner.classList.add('hidden');
            if (data.status === 'success') {
                const domains = data.domains || [];
                if (domains.length === 0) {
                    if (primaryList) {
                        primaryList.innerHTML = `
                            <div class="rounded-2xl border border-dashed border-[#E4E9E6] p-8 text-center text-sm text-[#6B7B75]">
                                Tidak ditemukan hasil untuk pencarian "${query}". Coba kata kunci lainnya.
                            </div>
                        `;
                    }
                    if (extraContainer) {
                        extraContainer.innerHTML = '';
                        extraContainer.classList.add('hidden');
                    }
                    if (toggleWrapper) {
                        toggleWrapper.classList.add('hidden');
                    }
                    if (countBadge) {
                        countBadge.textContent = '0 domain ditemukan';
                    }
                } else {
                    const primary = domains.slice(0, 5);
                    const extra = domains.slice(5);
                    currentExtraCount = extra.length;

                    if (primaryList) {
                        primaryList.innerHTML = primary.map(renderDomainCard).join('');
                    }

                    if (extraContainer) {
                        extraContainer.innerHTML = extra.map(renderDomainCard).join('');
                        extraContainer.classList.add('hidden');
                    }

                    if (toggleIcon) toggleIcon.classList.remove('rotate-180');

                    if (extra.length > 0) {
                        if (toggleWrapper) toggleWrapper.classList.remove('hidden');
                        if (toggleText) toggleText.textContent = `Lihat ${extra.length} Pilihan Ekstensi Lainnya`;
                        if (countBadge) {
                            countBadge.textContent = `Menampilkan 5 rekomendasi teratas dari ${domains.length} ekstensi`;
                        }
                    } else {
                        if (toggleWrapper) toggleWrapper.classList.add('hidden');
                        if (countBadge) {
                            countBadge.textContent = `Menampilkan ${primary.length} rekomendasi teratas`;
                        }
                    }
                }
            }
        })
        .catch(err => {
            if (err.name !== 'AbortError') {
                searchSpinner.classList.add('hidden');
            }
        });
    };

    // Auto-search saat user mengetik dengan debounce 350ms
    domainInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const val = (e.target.value || '').trim();
        if (val.length === 0) {
            searchSpinner.classList.add('hidden');
            if (abortController) abortController.abort();
            
            // Reset ke tampilan default awal
            if (primaryList) primaryList.innerHTML = defaultPrimaryHtml;
            if (extraContainer) {
                extraContainer.innerHTML = defaultExtraHtml;
                extraContainer.classList.add('hidden');
            }
            if (toggleIcon) toggleIcon.classList.remove('rotate-180');
            currentExtraCount = defaultExtraCount;

            if (defaultExtraCount > 0) {
                if (toggleWrapper) toggleWrapper.classList.remove('hidden');
                if (toggleText) toggleText.textContent = `Lihat ${defaultExtraCount} Pilihan Ekstensi Lainnya`;
            } else {
                if (toggleWrapper) toggleWrapper.classList.add('hidden');
            }

            if (countBadge) {
                countBadge.textContent = 'Menampilkan 5 rekomendasi teratas';
            }
            return;
        }

        if (val.length < 3) {
            searchSpinner.classList.add('hidden');
            return;
        }

        debounceTimer = setTimeout(() => {
            triggerSearch();
        }, 350);
    });

    // Fungsi Pilih Domain secara instan pada Seluruh Card & memperbarui sidebar tanpa reload
    window.selectDomain = function(domain, price, taxAmount, priceBase) {
        currentSelectedDomain = domain;
        currentPricePerYear = price;

        // Unhide section pemilih durasi domain & update label dan kartu harga
        const durSection = document.getElementById('domain-duration-section');
        if (durSection) durSection.classList.remove('hidden');
        const durLabel = document.getElementById('duration-domain-label');
        if (durLabel) durLabel.innerText = domain;

        document.querySelectorAll('.duration-server-price').forEach(elem => {
            const dur = parseInt(elem.getAttribute('data-duration'), 10);
            elem.innerText = 'Rp' + formatRupiah(serverPricePerYear * dur);
        });
        document.querySelectorAll('.duration-domain-price').forEach(elem => {
            const dur = parseInt(elem.getAttribute('data-duration'), 10);
            elem.innerText = 'Rp' + formatRupiah(price * dur);
        });
        document.querySelectorAll('.duration-total-price').forEach(elem => {
            const dur = parseInt(elem.getAttribute('data-duration'), 10);
            const serverPrice = serverPricePerYear * dur;
            elem.innerText = 'Rp' + formatRupiah((price * dur) + serverPrice);
        });

        // 1. Beri feedback visual langsung pada seluruh kartu di halaman
        document.querySelectorAll('.domain-card').forEach(card => {
            const cardDomain = card.getAttribute('data-domain');
            const btn = card.querySelector('.domain-select-btn');

            if (cardDomain === domain) {
                card.classList.remove('border-[#E4E9E6]', 'bg-white');
                card.classList.add('border-2', 'border-[#22C55E]', 'bg-[#F2FBF5]', 'shadow-xs');
                if (btn) {
                    btn.innerHTML = `
                        <span class="inline-flex items-center gap-1.5">
                            <svg class="size-3.5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            <span>Menyimpan...</span>
                        </span>
                    `;
                    btn.className = 'domain-select-btn rounded-xl border border-[#22C55E] bg-[#22C55E] text-white px-4 py-2 text-xs sm:text-sm font-semibold transition shrink-0 pointer-events-none';
                }
            } else {
                card.classList.remove('border-2', 'border-[#22C55E]', 'bg-[#F2FBF5]', 'shadow-xs');
                card.classList.add('border-[#E4E9E6]', 'bg-white');
                if (btn) {
                    btn.innerText = 'Pilih';
                    btn.className = 'domain-select-btn rounded-xl border border-[#22C55E] text-[#1E7A53] group-hover:bg-[#22C55E] group-hover:text-white px-5 py-2 text-xs sm:text-sm font-semibold transition shrink-0 pointer-events-none';
                }
            }
        });

        // 2. Tampilkan skeleton shimmer halus pada sidebar domain & total harga selama request session disimpan
        const domainBox = document.getElementById('sidebar-domain-box');
        if (domainBox) {
            domainBox.innerHTML = `
                <div class="h-12 w-full rounded-xl bg-emerald-100/70 p-2.5 animate-pulse flex items-center justify-between">
                    <div class="space-y-1">
                        <div class="h-3.5 w-28 bg-emerald-200/80 rounded"></div>
                        <div class="h-2.5 w-16 bg-emerald-200/60 rounded"></div>
                    </div>
                    <div class="h-4 w-20 bg-emerald-200/80 rounded"></div>
                </div>
            `;
        }
        const totalElem = document.getElementById('sidebar-total-price');
        if (totalElem) {
            totalElem.innerHTML = `<span class="inline-block h-6 w-32 bg-emerald-100/80 rounded-md animate-pulse"></span>`;
        }

        fetch(selectUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                domain: domain,
                price: price,
                duration: currentDuration,
                tax_amount: taxAmount,
                price_base: priceBase
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                // Selesaikan status tombol kartu terpilih
                document.querySelectorAll('.domain-card').forEach(card => {
                    if (card.getAttribute('data-domain') === domain) {
                        const btn = card.querySelector('.domain-select-btn');
                        if (btn) btn.innerText = '✓ Terpilih';
                    }
                });

                // Update template, server & service rows di sidebar
                const templateLabel = document.getElementById('sidebar-template-label');
                const templatePriceElem = document.getElementById('sidebar-template-price');
                if (templateLabel && data.domain_duration) {
                    templateLabel.innerText = `1. Desain Template (${data.domain_duration} Thn)`;
                }
                if (templatePriceElem && data.formatted_template_price) {
                    templatePriceElem.innerText = data.formatted_template_price;
                }

                const serverLabel = document.getElementById('sidebar-server-label');
                const serverPriceElem = document.getElementById('sidebar-server-price');
                if (serverLabel && data.domain_duration) {
                    serverLabel.innerText = `2. Cloud Server (${data.domain_duration} Thn)`;
                }
                if (serverPriceElem && data.formatted_server_price) {
                    serverPriceElem.innerText = data.formatted_server_price;
                }

                const serviceLabel = document.getElementById('sidebar-service-label');
                const servicePriceElem = document.getElementById('sidebar-service-price');
                if (serviceLabel && data.domain_duration) {
                    serviceLabel.innerText = `3. Setup & Deployment (${data.domain_duration} Thn)`;
                }
                if (servicePriceElem && data.formatted_service_price) {
                    servicePriceElem.innerText = data.formatted_service_price;
                }

                // Update tampilan Sidebar Domain Box dengan data baru
                if (domainBox) {
                    domainBox.innerHTML = `
                        <div class="rounded-xl bg-[#E7F4EE] px-3.5 py-2.5 text-xs text-[#1E7A53] font-semibold flex items-center justify-between animate-in fade-in duration-200">
                            <div>
                                <span>Domain: <strong>${data.domain_name}</strong></span>
                                <div class="text-[10px] text-[#2E6806] font-normal mt-0.5">
                                    ${data.domain_duration} Tahun (Rp${data.formatted_price_year}/thn • PPN 11%)
                                </div>
                            </div>
                            <span class="text-sm font-bold">
                                ${data.formatted_price}
                            </span>
                        </div>
                    `;
                }

                // Update Total Harga di Sidebar
                if (totalElem) {
                    totalElem.innerText = data.formatted_total;
                }

                // Ubah Tombol Lanjut ke Data Diri menjadi Aktif (Hijau)
                const ctaWrapper = document.getElementById('sidebar-cta-wrapper');
                if (ctaWrapper) {
                    ctaWrapper.innerHTML = `
                        <a href="${dataDiriUrl}" id="btn-lanjut-datadiri" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-3.5 px-5 text-sm font-semibold text-white shadow-sm transition">
                            <span>Lanjut ke Data Diri</span>
                            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    `;
                }
            }
        })
        .catch(err => {
            console.error('Gagal memilih domain:', err);
        });
    };

    // Fungsi Mengubah Durasi Registrasi Domain (1, 2, atau 3 Tahun)
    window.pilihDurasiDomain = function(duration) {
        currentDuration = duration;

        // 1. Update visual radio pada kartu durasi
        [1, 2, 3].forEach(d => {
            const card = document.getElementById(`duration-card-${d}`);
            if (card) {
                const radio = card.querySelector('.duration-radio-indicator');
                if (d === duration) {
                    card.className = 'duration-card cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between gap-3 relative select-none border-2 border-[#22C55E] bg-[#F2FBF5] shadow-xs';
                    if (radio) {
                        radio.className = 'duration-radio-indicator size-5 rounded-full border-2 flex items-center justify-center text-xs transition font-bold border-[#22C55E] bg-[#22C55E] text-white';
                    }
                } else {
                    card.className = 'duration-card cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between gap-3 relative select-none border-[#E4E9E6] bg-white hover:border-[#22C55E] hover:bg-slate-50/70';
                    if (radio) {
                        radio.className = 'duration-radio-indicator size-5 rounded-full border-2 flex items-center justify-center text-xs transition font-bold border-slate-300 bg-white text-transparent';
                    }
                }
            }
        });

        // 2. Shimmer pada sidebar
        const domainBox = document.getElementById('sidebar-domain-box');
        if (domainBox) {
            domainBox.innerHTML = `
                <div class="h-12 w-full rounded-xl bg-emerald-100/70 p-2.5 animate-pulse flex items-center justify-between">
                    <div class="space-y-1">
                        <div class="h-3.5 w-28 bg-emerald-200/80 rounded"></div>
                        <div class="h-2.5 w-16 bg-emerald-200/60 rounded"></div>
                    </div>
                    <div class="h-4 w-20 bg-emerald-200/80 rounded"></div>
                </div>
            `;
        }
        const totalElem = document.getElementById('sidebar-total-price');
        if (totalElem) {
            totalElem.innerHTML = `<span class="inline-block h-6 w-32 bg-emerald-100/80 rounded-md animate-pulse"></span>`;
        }

        // 3. Kirim request AJAX ke server
        fetch(durationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ duration: duration })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                const templateLabel = document.getElementById('sidebar-template-label');
                const templatePriceElem = document.getElementById('sidebar-template-price');
                if (templateLabel && data.domain_duration) {
                    templateLabel.innerText = `1. Desain Template (${data.domain_duration} Thn)`;
                }
                if (templatePriceElem && data.formatted_template_price) {
                    templatePriceElem.innerText = data.formatted_template_price;
                }

                const serverLabel = document.getElementById('sidebar-server-label');
                const serverPriceElem = document.getElementById('sidebar-server-price');
                if (serverLabel && data.domain_duration) {
                    serverLabel.innerText = `2. Cloud Server (${data.domain_duration} Thn)`;
                }
                if (serverPriceElem && data.formatted_server_price) {
                    serverPriceElem.innerText = data.formatted_server_price;
                }

                const serviceLabel = document.getElementById('sidebar-service-label');
                const servicePriceElem = document.getElementById('sidebar-service-price');
                if (serviceLabel && data.domain_duration) {
                    serviceLabel.innerText = `3. Setup & Deployment (${data.domain_duration} Thn)`;
                }
                if (servicePriceElem && data.formatted_service_price) {
                    servicePriceElem.innerText = data.formatted_service_price;
                }

                if (domainBox) {
                    const isOwnDom = data.domain_price === 0;
                    domainBox.innerHTML = `
                        <div class="rounded-xl bg-[#E7F4EE] px-3.5 py-2.5 text-xs text-[#1E7A53] font-semibold flex items-center justify-between animate-in fade-in duration-200">
                            <div>
                                <span>Domain: <strong>${data.domain_name}</strong></span>
                                <div class="text-[10px] text-[#2E6806] font-normal mt-0.5">
                                    ${isOwnDom ? 'Domain Milik Sendiri (Bebas Biaya)' : data.domain_duration + ' Tahun (Rp' + data.formatted_price_year + '/thn • PPN 11%)'}
                                </div>
                            </div>
                            <span class="text-sm font-bold">
                                ${data.formatted_price}
                            </span>
                        </div>
                    `;
                }
                if (totalElem) {
                    totalElem.innerText = data.formatted_total;
                }
            }
        })
        .catch(err => console.error('Gagal update durasi domain:', err));
    };

    // ==========================================
    // FUNGSI TAB SWITCHING: BELI BARU VS DOMAIN SENDIRI
    // ==========================================
    window.switchDomainTab = function(tab) {
        const btnNew = document.getElementById('tab-btn-new');
        const btnOwn = document.getElementById('tab-btn-own');
        const badgeOwn = document.getElementById('tab-badge-own');
        const contentNew = document.getElementById('tab-content-new');
        const contentOwn = document.getElementById('tab-content-own');
        const headingTitle = document.getElementById('page-heading-title');
        const headingDesc = document.getElementById('page-heading-desc');

        const activeBtnClass = 'inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm transition-all duration-200 cursor-pointer select-none bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold shadow-sm ring-2 ring-[#22C55E]/20';
        const inactiveBtnClass = 'inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm transition-all duration-200 cursor-pointer select-none bg-white hover:bg-slate-50 border border-[#D5DDD8] hover:border-[#22C55E] text-[#0B1B17] hover:text-[#1E7A53] font-semibold shadow-xs';

        if (tab === 'own') {
            // Tab Own Active (Button Hijau Solid)
            if (btnOwn) btnOwn.className = activeBtnClass;
            if (badgeOwn) badgeOwn.className = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors bg-white/25 text-white';

            // Tab New Inactive (Button Putih Border Halus)
            if (btnNew) btnNew.className = inactiveBtnClass;

            if (contentNew) contentNew.classList.add('hidden');
            if (contentOwn) contentOwn.classList.remove('hidden');

            if (headingTitle) headingTitle.innerText = 'Hubungkan domain milik Anda';
            if (headingDesc) headingDesc.innerText = 'Gunakan domain yang sudah Anda beli di tempat lain tanpa biaya pendaftaran domain (Rp0).';

            try {
                const url = new URL(window.location);
                url.searchParams.set('tab', 'own');
                window.history.replaceState({}, '', url);
            } catch(e) {}
        } else {
            // Tab New Active (Button Hijau Solid)
            if (btnNew) btnNew.className = activeBtnClass;

            // Tab Own Inactive (Button Putih Border Halus)
            if (btnOwn) btnOwn.className = inactiveBtnClass;
            if (badgeOwn) badgeOwn.className = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors bg-[#E7F4EE] text-[#1E7A53]';

            if (contentNew) contentNew.classList.remove('hidden');
            if (contentOwn) contentOwn.classList.add('hidden');

            if (headingTitle) headingTitle.innerText = 'Cari domain untuk website-mu';
            if (headingDesc) headingDesc.innerText = 'Cek ketersediaan domain dan pilih domain yang paling cocok.';

            try {
                const url = new URL(window.location);
                url.searchParams.set('tab', 'new');
                window.history.replaceState({}, '', url);
            } catch(e) {}
        }
    };

    // ==========================================
    // FUNGSI SUBMIT DOMAIN MILIK SENDIRI (AJAX)
    // ==========================================
    window.submitOwnDomain = function() {
        const input = document.getElementById('own-domain-input');
        const errorBox = document.getElementById('own-domain-error');
        const errorText = document.getElementById('own-domain-error-text');
        const btnText = document.getElementById('btn-submit-own-text');
        const btnSpinner = document.getElementById('btn-submit-own-spinner');
        const submitBtn = document.getElementById('btn-submit-own-domain');

        if (!input) return;
        let domainVal = (input.value || '').trim().toLowerCase();
        // Sanitasi: hilangkan protokol dan trailing slash
        domainVal = domainVal.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, '');
        input.value = domainVal;

        if (errorBox) errorBox.classList.add('hidden');

        // Validasi format domain di client
        const domainRegex = /^(?!:\/\/)([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
        if (!domainVal || !domainRegex.test(domainVal)) {
            if (errorBox && errorText) {
                errorText.textContent = 'Format nama domain tidak valid. Contoh yang benar: bisnissaya.com atau tokoanda.id (tanpa http:// atau www)';
                errorBox.classList.remove('hidden');
            }
            input.focus();
            return;
        }

        // Tampilkan status loading
        if (btnText) btnText.textContent = 'Menyimpan...';
        if (btnSpinner) btnSpinner.classList.remove('hidden');
        if (submitBtn) submitBtn.disabled = true;

        // Shimmer pada sidebar
        const domainBox = document.getElementById('sidebar-domain-box');
        if (domainBox) {
            domainBox.innerHTML = `
                <div class="h-12 w-full rounded-xl bg-emerald-100/70 p-2.5 animate-pulse flex items-center justify-between">
                    <div class="space-y-1">
                        <div class="h-3.5 w-28 bg-emerald-200/80 rounded"></div>
                        <div class="h-2.5 w-16 bg-emerald-200/60 rounded"></div>
                    </div>
                    <div class="h-4 w-12 bg-emerald-200/80 rounded"></div>
                </div>
            `;
        }
        const totalElem = document.getElementById('sidebar-total-price');
        if (totalElem) {
            totalElem.innerHTML = `<span class="inline-block h-6 w-32 bg-emerald-100/80 rounded-md animate-pulse"></span>`;
        }

        fetch(ownDomainUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                domain: domainVal
            })
        })
        .then(res => res.json())
        .then(data => {
            if (btnText) btnText.textContent = 'Gunakan Domain Ini';
            if (btnSpinner) btnSpinner.classList.add('hidden');
            if (submitBtn) submitBtn.disabled = false;

            if (data.status === 'success') {
                currentSelectedDomain = data.domain_name;

                // Update Box Terpilih
                const selectedBox = document.getElementById('own-domain-selected-box');
                const formBox = document.getElementById('own-domain-form-box');
                const nameLabel = document.getElementById('own-domain-selected-name');

                if (nameLabel) nameLabel.textContent = data.domain_name;

                if (formBox) formBox.classList.add('hidden');
                if (selectedBox) selectedBox.classList.remove('hidden');

                // Update Sidebar Domain Box
                if (domainBox) {
                    domainBox.innerHTML = `
                        <div class="rounded-xl bg-[#E7F4EE] px-3.5 py-2.5 text-xs text-[#1E7A53] font-semibold flex items-center justify-between animate-in fade-in duration-200">
                            <div>
                                <span>Domain: <strong>${data.domain_name}</strong></span>
                                <div class="text-[10px] text-[#2E6806] font-normal mt-0.5">
                                    Domain Milik Sendiri (Bebas Biaya)
                                </div>
                            </div>
                            <span class="text-sm font-bold">
                                Rp0
                            </span>
                        </div>
                    `;
                }

                // Update server price row di sidebar
                const serverLabel = document.getElementById('sidebar-server-label');
                const serverPriceElem = document.getElementById('sidebar-server-price');
                if (serverLabel && data.domain_duration) {
                    serverLabel.innerText = `2. Cloud Server (${data.domain_duration} Thn)`;
                }
                if (serverPriceElem && data.formatted_server_price) {
                    serverPriceElem.innerText = data.formatted_server_price;
                }

                // Update Total Harga di Sidebar
                if (totalElem) {
                    totalElem.innerText = data.formatted_total;
                }

                // Tampilkan pemilih durasi paket server untuk domain sendiri
                const durSection = document.getElementById('domain-duration-section');
                if (durSection) {
                    durSection.classList.remove('hidden');
                    const durLabel = document.getElementById('duration-domain-label');
                    if (durLabel) durLabel.innerText = data.domain_name;
                    document.querySelectorAll('.duration-server-price').forEach(elem => {
                        const dur = parseInt(elem.getAttribute('data-duration'), 10);
                        elem.innerText = 'Rp' + formatRupiah(serverPricePerYear * dur);
                    });
                    document.querySelectorAll('.duration-domain-price').forEach(elem => {
                        elem.innerText = 'Rp0 (Milik Sendiri)';
                    });
                    document.querySelectorAll('.duration-total-price').forEach(elem => {
                        const dur = parseInt(elem.getAttribute('data-duration'), 10);
                        elem.innerText = 'Rp' + formatRupiah(serverPricePerYear * dur);
                    });
                }

                // Aktifkan CTA Lanjut ke Data Diri
                const ctaWrapper = document.getElementById('sidebar-cta-wrapper');
                if (ctaWrapper) {
                    ctaWrapper.innerHTML = `
                        <a href="${dataDiriUrl}" id="btn-lanjut-datadiri" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-3.5 px-5 text-sm font-semibold text-white shadow-sm transition">
                            <span>Lanjut ke Data Diri</span>
                            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    `;
                }
            } else {
                const msg = (data.errors && data.errors.domain) ? data.errors.domain[0] : (data.message || 'Gagal menyimpan domain');
                if (errorBox && errorText) {
                    errorText.textContent = msg;
                    errorBox.classList.remove('hidden');
                }
            }
        })
        .catch(err => {
            console.error('Error submit domain sendiri:', err);
            if (btnText) btnText.textContent = 'Gunakan Domain Ini';
            if (btnSpinner) btnSpinner.classList.add('hidden');
            if (submitBtn) submitBtn.disabled = false;
            if (errorBox && errorText) {
                errorText.textContent = 'Terjadi kesalahan jaringan atau validasi. Silakan periksa format domain dan coba lagi.';
                errorBox.classList.remove('hidden');
            }
        });
    };

    // Fungsi Buka Edit Domain Sendiri
    window.editOwnDomain = function() {
        const selectedBox = document.getElementById('own-domain-selected-box');
        const formBox = document.getElementById('own-domain-form-box');
        const input = document.getElementById('own-domain-input');

        if (selectedBox) selectedBox.classList.add('hidden');
        if (formBox) formBox.classList.remove('hidden');
        if (input) input.focus();
    };

    // Fungsi Batal Edit Domain Sendiri
    window.cancelEditOwnDomain = function() {
        const selectedBox = document.getElementById('own-domain-selected-box');
        const formBox = document.getElementById('own-domain-form-box');

        if (formBox) formBox.classList.add('hidden');
        if (selectedBox) selectedBox.classList.remove('hidden');
    };
});
</script>

@endsection