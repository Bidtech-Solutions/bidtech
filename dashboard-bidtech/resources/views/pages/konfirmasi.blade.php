@extends('layouts.checkout')

@section('title', 'Ringkasan Pesanan - Bidtech')

@section('content')

<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-6">

    <!-- Baris Badge Langkah -->
    <div class="flex items-center justify-between gap-3">
        <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-3 py-1 text-xs font-semibold text-[#1E7A53]">
            Langkah 3 dari 4
        </span>
        <span class="text-xs text-[#6B7B75]">
            Konfirmasi Pesanan
        </span>
    </div>

    <!-- Header Judul -->
    <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B17]">
            Ringkasan pesanan website
        </h1>
        <p class="mt-1.5 text-sm text-[#6B7B75]">
            Periksa kembali rincian paket, domain, data diri, serta gunakan kode promo jika Anda memilikinya sebelum melanjutkan ke pembayaran.
        </p>
    </div>

    <!-- Bagian 1: Layanan & Domain -->
    <div class="rounded-3xl border border-[#E4E9E6] bg-white p-6 sm:p-8 shadow-xs space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-[#E4E9E6]">
            <div class="flex items-center gap-2.5">
                <span class="inline-block h-5 w-1 rounded-full bg-[#22C55E]"></span>
                <h2 class="text-base font-bold text-[#0B1B17]">
                    1. Layanan & Domain
                </h2>
            </div>
            <a href="{{ route('checkout.domain', $template) }}" class="rounded-xl border border-[#22C55E] text-[#1E7A53] hover:bg-[#22C55E] hover:text-white px-3.5 py-1.5 text-xs font-semibold transition">
                Ubah Domain
            </a>
        </div>

        <!-- Detail Template & Pemecahan Harga -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            @if($template->preview)
                <img src="{{ $template->preview_url }}" alt="{{ $template->name }}" class="w-full sm:w-28 h-24 sm:h-20 rounded-2xl object-cover border border-[#E4E9E6] shrink-0">
            @else
                <div class="w-full sm:w-28 h-24 sm:h-20 rounded-2xl bg-[#E7F4EE] text-[#1E7A53] flex items-center justify-center text-xs font-semibold shrink-0">
                    Template
                </div>
            @endif
            <div class="flex-1 space-y-1">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <h3 class="text-base font-bold text-[#0B1B17]">
                        {{ $template->name }}
                    </h3>
                    <div class="text-base font-extrabold text-[#1E7A53]">
                        Rp{{ number_format($templatePrice + $serverPrice + $servicePrice, 0, ',', '.') }}
                    </div>
                </div>
                <p class="text-xs text-[#6B7B75]">
                    Paket Website Komplit Siap Pakai &bull; Kategori: <strong>{{ $template->category }}</strong>
                </p>

                <!-- Badges Komponen -->
                <div class="flex flex-wrap items-center gap-2 pt-1.5 text-[11px]">
                    <span class="inline-flex items-center gap-1.5 rounded-lg bg-[#E7F4EE] px-2.5 py-1 font-semibold text-[#1E7A53]">
                        <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                        </svg>
                        <span>Desain Template ({{ $checkout['domain_duration'] ?? 1 }} Thn):</span>
                        <strong>Rp{{ number_format($templatePrice, 0, ',', '.') }}</strong>
                    </span>
                    <span class="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 font-semibold text-blue-700">
                        <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                        </svg>
                        <span>Cloud Server ({{ $checkout['domain_duration'] ?? 1 }} Thn):</span>
                        <strong>Rp{{ number_format($serverPrice, 0, ',', '.') }}</strong>
                    </span>
                    <span class="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">
                        <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                        </svg>
                        <span>Setup & Layanan ({{ $checkout['domain_duration'] ?? 1 }} Thn):</span>
                        <strong>Rp{{ number_format($servicePrice, 0, ',', '.') }}</strong>
                    </span>
                </div>
            </div>
        </div>

        <!-- Detail Domain Terpilih -->
        <div class="rounded-2xl border border-[#22C55E] bg-[#F2FBF5] p-4 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
            <div class="flex items-center gap-3">
                <div class="flex size-9 items-center justify-center rounded-xl bg-[#E7F4EE] text-[#1E7A53] shrink-0">
                    <svg class="size-4.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-[#0B1B17]">
                            {{ $checkout['domain_name'] ?? '-' }}
                        </span>
                        @if(!empty($checkout['is_own_domain']))
                            <span class="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                                Domain Milik Sendiri
                            </span>
                        @else
                            <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-2 py-0.5 text-[11px] font-semibold text-[#1E7A53]">
                                {{ $checkout['domain_duration'] ?? 1 }} Tahun
                            </span>
                        @endif
                    </div>
                    <div class="text-xs text-[#6B7B75] mt-0.5">
                        @if(!empty($checkout['is_own_domain']))
                            Bebas Biaya Registrasi &bull; Anda mengatur DNS Domain
                        @else
                            Registrasi Domain Resmi
                        @endif
                    </div>
                </div>
            </div>

            <div class="text-right">
                <div class="text-sm font-bold text-[#0B1B17]">
                    Rp{{ number_format($domainPrice, 0, ',', '.') }}
                </div>
                <div class="text-[11px] text-[#2E6806] font-medium">
                    @if(!empty($checkout['is_own_domain']))
                        Gratis Setup
                    @else
                        Termasuk PPN 11%
                    @endif
                </div>
            </div>
        </div>

        @if(!empty($checkout['is_own_domain']))
            <div class="rounded-2xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                <svg class="size-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <div class="leading-relaxed">
                    <strong>Catatan Pengaturan DNS:</strong> Setelah pembayaran dikonfirmasi, tim kami akan memberikan IP server dan panduan pengaturan DNS (A Record & CNAME) agar domain <strong>{{ $checkout['domain_name'] }}</strong> terhubung ke website Anda.
                </div>
            </div>
        @endif
    </div>

    <!-- Bagian 2: Data Pemesan -->
    <div class="rounded-3xl border border-[#E4E9E6] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-[#E4E9E6]">
            <div class="flex items-center gap-2.5">
                <span class="inline-block h-5 w-1 rounded-full bg-[#22C55E]"></span>
                <h2 class="text-base font-bold text-[#0B1B17]">
                    2. Data Pemesan
                </h2>
            </div>
            <a href="{{ route('checkout.data-diri', $template) }}" class="rounded-xl border border-[#22C55E] text-[#1E7A53] hover:bg-[#22C55E] hover:text-white px-3.5 py-1.5 text-xs font-semibold transition">
                Ubah Data
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div class="p-3.5 rounded-2xl bg-[#F4F6F5] border border-[#E4E9E6]">
                <span class="text-xs text-[#6B7B75] block mb-1">Nama Pemesan</span>
                <strong class="text-sm font-bold text-[#0B1B17] block">
                    {{ $checkout['customer']['name'] ?? '-' }}
                </strong>
            </div>

            <div class="p-3.5 rounded-2xl bg-[#F4F6F5] border border-[#E4E9E6]">
                <span class="text-xs text-[#6B7B75] block mb-1">Alamat Email</span>
                <strong class="text-sm font-bold text-[#0B1B17] block break-all">
                    {{ $checkout['customer']['email'] ?? '-' }}
                </strong>
            </div>

            <div class="p-3.5 rounded-2xl bg-[#F4F6F5] border border-[#E4E9E6]">
                <span class="text-xs text-[#6B7B75] block mb-1">Nomor WhatsApp</span>
                <strong class="text-sm font-bold text-[#0B1B17] block">
                    {{ $checkout['customer']['whatsapp'] ?? '-' }}
                </strong>
            </div>
        </div>

        @if(!empty($checkout['customer']['notes']))
            <div class="p-3.5 rounded-2xl bg-[#F4F6F5] border border-[#E4E9E6] mt-2">
                <span class="text-xs text-[#6B7B75] block mb-1">Catatan Tambahan</span>
                <p class="text-xs sm:text-sm font-medium text-[#0B1B17] leading-relaxed">
                    {{ $checkout['customer']['notes'] }}
                </p>
            </div>
        @endif
    </div>

    <!-- Bagian 3: Kode Promo & Voucher Kemitraan -->
    <div class="rounded-3xl border border-[#E4E9E6] bg-white p-6 sm:p-8 shadow-xs space-y-4" id="section-promo-container">
        <div class="flex items-center justify-between pb-3 border-b border-[#E4E9E6]">
            <div class="flex items-center gap-2.5">
                <span class="inline-block h-5 w-1 rounded-full bg-[#22C55E]"></span>
                <h2 class="text-base font-bold text-[#0B1B17]">
                    3. Kode Promo & Voucher Kemitraan
                </h2>
            </div>
            <span class="text-xs text-[#6B7B75]">
                Opsional
            </span>
        </div>

        <!-- Box Form Input Promo -->
        <div class="pt-1">
            <form id="form-apply-promo" onsubmit="terapkanPromo(event)" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div class="relative flex-1">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6B7B75]">
                        <svg class="size-4.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        id="promo-input" 
                        placeholder="Contoh: BIDTECHHEMAT, MITRABATAM"
                        value="{{ $promo['code'] ?? '' }}"
                        class="w-full rounded-2xl border border-[#E4E9E6] bg-[#F4F6F5] pl-10 pr-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B1B17] placeholder:text-[#6B7B75] placeholder:normal-case placeholder:font-normal focus:border-[#22C55E] focus:bg-white focus:outline-none transition"
                        autocomplete="off"
                        {{ !empty($promo['code']) ? 'readonly' : '' }}
                    >
                </div>

                <div class="flex items-center gap-2">
                    <button 
                        type="submit" 
                        id="btn-apply-promo"
                        class="h-11 sm:h-12 px-6 rounded-2xl bg-[#22C55E] hover:bg-[#16a34a] text-white text-xs sm:text-sm font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                        {{ !empty($promo['code']) ? 'style=display:none;' : '' }}
                    >
                        <span>Gunakan</span>
                        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </button>

                    <button 
                        type="button" 
                        id="btn-remove-promo"
                        onclick="hapusPromo()"
                        class="h-11 sm:h-12 px-5 rounded-2xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        {{ empty($promo['code']) ? 'style=display:none;' : '' }}
                    >
                        <span>Hapus Promo</span>
                        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </form>

            <!-- Pesan Error / Notifikasi AJAX -->
            <div id="promo-error-box" class="mt-2.5 hidden text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span id="promo-error-text"></span>
            </div>

            <!-- Card Banner Promo Aktif / Kemitraan -->
            <div id="promo-active-banner" class="{{ empty($promo['code']) ? 'hidden' : '' }} mt-3.5 p-4 rounded-2xl border transition {{ !empty($promo['is_partner']) ? 'border-emerald-300 bg-[#E7F4EE]' : 'border-emerald-200 bg-[#F2FBF5]' }}">
                <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div class="size-8 rounded-xl bg-white text-[#1E7A53] flex items-center justify-center font-bold text-sm shadow-2xs shrink-0" id="promo-badge-icon">
                            @if(!empty($promo['is_partner']))
                                <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-1.42-1.42l4.24-4.24a1 1 0 0 0 0-1.42l-1.41-1.41a1 1 0 0 0-1.42 0l-9.9 9.9a2 2 0 0 0 0 2.83L6 20a2 2 0 0 0 2.83 0l2.17-2.17"/><path d="m12 12 4 4"/></svg>
                            @else
                                <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                            @endif
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <strong id="promo-badge-title" class="text-xs sm:text-sm font-bold text-[#0B1B17]">
                                    {{ !empty($promo['is_partner']) ? 'Program Kemitraan: ' . ($promo['partner_name'] ?? 'Mitra Resmi') : 'Promo Aktif: ' . ($promo['name'] ?? 'Diskon Pesanan') }}
                                </strong>
                                <span id="promo-badge-code" class="inline-flex items-center rounded-md bg-[#22C55E] text-white px-2 py-0.5 text-[10px] font-extrabold uppercase font-mono">
                                    {{ $promo['code'] ?? '' }}
                                </span>
                                <!-- Badge Persentase -->
                                <span id="promo-badge-percentage" class="{{ empty($promo['is_percentage']) ? 'hidden' : 'inline-flex' }} items-center rounded-md bg-emerald-700 text-white px-2 py-0.5 text-[10px] font-black tracking-wide shadow-2xs">
                                    {{ $promo['badge_text'] ?? (!empty($promo['percentage']) ? $promo['percentage'].'% OFF' : '') }}
                                </span>
                            </div>
                            <p id="promo-badge-desc" class="text-xs text-[#1E7A53] font-medium mt-0.5">
                                @if(!empty($promo['is_percentage']))
                                    {{ $promo['discount_label'] ?? ('Diskon ' . ($promo['percentage'] ?? '') . '%') }} berhasil diterapkan! Anda hemat Rp{{ number_format($discountAmount, 0, ',', '.') }}{{ !empty($promo['is_max_reached']) ? ' (maksimal promo tercapai)' : '' }}
                                @else
                                    {{ !empty($promo['is_partner']) ? 'Diskon kemitraan berhasil diterapkan! Anda menghemat Rp' . number_format($discountAmount, 0, ',', '.') : 'Potongan diskon hemat Rp' . number_format($discountAmount, 0, ',', '.') }}
                                @endif
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bagian 4: Rincian Pembayaran Komprehensif -->
    <div class="rounded-3xl border border-[#E4E9E6] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div class="flex items-center gap-2.5 pb-3 border-b border-[#E4E9E6]">
            <span class="inline-block h-5 w-1 rounded-full bg-[#22C55E]"></span>
            <h2 class="text-base font-bold text-[#0B1B17]">
                4. Rincian Pembayaran
            </h2>
        </div>

        <!-- Kontainer Rincian Pembayaran Adaptif Sesuai Diagram Wireframe -->
        <div id="payment-breakdown-container" class="space-y-3.5 text-xs sm:text-sm">
            @php
                $defaultUmumPricingStructure = [
                    'mode' => 'umum',
                    'package_subtotal' => $templatePrice + $serverPrice + $servicePrice,
                    'package_discount' => 0,
                    'package_discount_label' => null,
                    'package_promo_price' => $templatePrice + $serverPrice + $servicePrice,
                    'domain_price' => $domainPrice,
                    'domain_discount' => 0,
                    'total' => $totalPrice,
                    'formatted_package_subtotal' => 'Rp' . number_format($templatePrice + $serverPrice + $servicePrice, 0, ',', '.'),
                    'formatted_package_promo_price' => 'Rp' . number_format($templatePrice + $serverPrice + $servicePrice, 0, ',', '.'),
                    'formatted_domain_price' => 'Rp' . number_format($domainPrice, 0, ',', '.'),
                    'formatted_total' => 'Rp' . number_format($totalPrice, 0, ',', '.'),
                    'components' => [
                        'template' => ['name' => 'Lisensi Template Website', 'price' => $templatePrice, 'formatted_price' => 'Rp' . number_format($templatePrice, 0, ',', '.'), 'discount' => 0, 'discount_label' => null, 'has_discount' => false],
                        'server' => ['name' => 'Cloud Server Hosting', 'price' => $serverPrice, 'formatted_price' => 'Rp' . number_format($serverPrice, 0, ',', '.'), 'discount' => 0, 'discount_label' => null, 'has_discount' => false],
                        'service' => ['name' => 'Setup Deployment & Layanan Teknis', 'price' => $servicePrice, 'formatted_price' => 'Rp' . number_format($servicePrice, 0, ',', '.'), 'discount' => 0, 'discount_label' => null, 'has_discount' => false],
                        'domain' => ['name' => 'Registrasi Domain', 'price' => $domainPrice, 'formatted_price' => 'Rp' . number_format($domainPrice, 0, ',', '.'), 'discount' => 0, 'discount_label' => null, 'has_discount' => false],
                    ],
                ];
                $struct = (!empty($pricingStructure) && is_array($pricingStructure)) ? $pricingStructure : $defaultUmumPricingStructure;
                $durationText = ($checkout['domain_duration'] ?? 1) . ' Tahun';
            @endphp

            @php
                $templateDesc = $order->template_desc ?? $template->template_desc ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean';
                $serverDesc = $order->server_desc ?? $template->server_desc ?? ('Cloud Server Hosting ' . $durationText . ', NVMe High Speed & Free SSL');
                $serviceDesc = $order->service_desc ?? $template->service_desc ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan';
                $duration = (int) ($checkout['domain_duration'] ?? 1);
                $pricePerYear = (int) ($checkout['domain_price_per_year'] ?? round($domainPrice / max(1, $duration)));
                $comps = $struct['components'] ?? [];
            @endphp

            <!-- Item 1, 2, 3: Paket Website -->
            <div class="flex justify-between items-start pt-1">
                <div>
                    <span class="text-sm font-bold text-[#0B1B17] block">1. Lisensi Template Website</span>
                    <span class="text-xs text-[#6B7B75] block mt-0.5">{{ $templateDesc }}</span>
                </div>
                <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">Rp{{ number_format($comps['template']['price'] ?? $templatePrice, 0, ',', '.') }}</span>
            </div>

            <div class="flex justify-between items-start pt-2">
                <div>
                    <span class="text-sm font-bold text-[#0B1B17] block">2. Cloud Server Hosting ({{ $durationText }})</span>
                    <span class="text-xs text-[#6B7B75] block mt-0.5">{{ $serverDesc }}</span>
                </div>
                <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">Rp{{ number_format($comps['server']['price'] ?? $serverPrice, 0, ',', '.') }}</span>
            </div>

            <div class="flex justify-between items-start pt-2">
                <div>
                    <span class="text-sm font-bold text-[#0B1B17] block">3. Setup Deployment & Layanan Teknis</span>
                    <span class="text-xs text-[#6B7B75] block mt-0.5">{{ $serviceDesc }}</span>
                </div>
                <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">Rp{{ number_format($comps['service']['price'] ?? $servicePrice, 0, ',', '.') }}</span>
            </div>

            <!-- Garis Pembatas -->
            <hr class="border-[#E4E9E6] my-2">

            <!-- Subtotal 3 Item -->
            <div class="flex justify-between items-center py-0.5">
                <span class="text-sm font-bold text-[#0B1B17]">Subtotal 3 Item</span>
                <span class="font-bold text-sm text-[#0B1B17] tabular-nums">Rp{{ number_format($struct['package_subtotal'] ?? ($templatePrice + $serverPrice + $servicePrice), 0, ',', '.') }}</span>
            </div>

            @if(($struct['mode'] ?? 'umum') === 'per_component')
                {{-- DISKON PER KOMPONEN --}}
                @foreach(['template', 'server', 'service'] as $cKey)
                    @if(!empty($comps[$cKey]['has_discount']))
                        <div class="rounded-xl bg-[#EAF7EE] px-4 py-2.5 flex justify-between items-center my-1.5 border-none" style="border: none !important;">
                            <div class="flex items-center gap-2">
                                <span class="size-2.5 rounded-full bg-[#10B981] inline-block shrink-0"></span>
                                <span class="text-sm font-semibold text-[#166534]">Potongan Diskon Promo (Diskon {{ $comps[$cKey]['name'] }})</span>
                            </div>
                            <span class="font-bold text-sm text-[#166534] tabular-nums">{{ $comps[$cKey]['discount_label'] }}</span>
                        </div>
                    @endif
                @endforeach

                <!-- Total 3 Item Setelah Diskon: Selaras dengan Card 1 & 3 -->
                <div class="rounded-xl bg-[#DDF4E4] px-4 py-3 flex justify-between items-center my-1.5 border-none" style="border: none !important;">
                    <div>
                        <strong class="text-sm font-bold text-[#065F46] block">Total 3 Item Setelah Diskon</strong>
                        <span class="text-xs text-[#047857] block mt-0.5">Paket Website (Template + Server + Service) setelah diskon</span>
                    </div>
                    <strong class="font-extrabold text-[#065F46] text-sm sm:text-base tabular-nums">Rp{{ number_format($struct['package_promo_price'], 0, ',', '.') }}</strong>
                </div>

            @elseif(($struct['mode'] ?? 'umum') === 'subtotal')
                {{-- DISKON SUBTOTAL --}}
                <div class="rounded-xl bg-[#EAF7EE] px-4 py-2.5 flex justify-between items-center my-1.5 border-none" style="border: none !important;">
                    <div class="flex items-center gap-2">
                        <span class="size-2.5 rounded-full bg-[#10B981] inline-block shrink-0"></span>
                        <span class="text-sm font-semibold text-[#166534]">Potongan Diskon Promo ({{ $promo['code'] ?? ($order->promo_code ?? $order->coupon_code ?? '') }})</span>
                    </div>
                    <span class="font-bold text-sm text-[#166534] tabular-nums">{{ $struct['package_discount_label'] ?? ('-Rp' . number_format($struct['package_discount'] ?? 0, 0, ',', '.')) }}</span>
                </div>

                <!-- Total 3 Item Setelah Diskon: Selaras dengan Card 1 & 3 -->
                <div class="rounded-xl bg-[#DDF4E4] px-4 py-3 flex justify-between items-center my-1.5 border-none" style="border: none !important;">
                    <div>
                        <strong class="text-sm font-bold text-[#065F46] block">Total 3 Item Setelah Diskon</strong>
                        <span class="text-xs text-[#047857] block mt-0.5">Paket Website (Template + Server + Service) setelah diskon</span>
                    </div>
                    <strong class="font-extrabold text-[#065F46] text-sm sm:text-base tabular-nums">Rp{{ number_format($struct['package_promo_price'], 0, ',', '.') }}</strong>
                </div>
            @endif

            <!-- Garis Pembatas -->
            <hr class="border-[#E4E9E6] my-2">

            <!-- Item 4: Domain -->
            <div class="flex justify-between items-start py-0.5">
                @if(!empty($checkout['is_own_domain']))
                    <div>
                        <span class="text-sm font-bold text-[#0B1B17] block">4. Setup Domain Milik Sendiri</span>
                        <span class="text-xs text-blue-600 font-medium block mt-0.5">{{ $checkout['domain_name'] }} &bull; Konfigurasi DNS Server (Gratis)</span>
                    </div>
                    <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">Rp0</span>
                @else
                    <div>
                        <span class="text-sm font-bold text-[#0B1B17] block">4. Registrasi Domain ({{ $durationText }})</span>
                        <span class="text-xs text-[#2E6806] font-medium block mt-0.5">
                            @if(!empty($checkout['domain_name']))
                                <strong class="text-[#0B1B17] font-semibold">{{ $checkout['domain_name'] }}</strong> &bull;
                            @endif
                            Rp{{ number_format($pricePerYear, 0, ',', '.') }}/thn &bull; Termasuk PPN 11%
                        </span>
                    </div>
                    <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">Rp{{ number_format($domainPrice, 0, ',', '.') }}</span>
                @endif
            </div>
        </div>

        <!-- Garis Pembatas Bawah -->
        <div class="border-t border-[#E4E9E6] pt-4 mt-3 flex items-end justify-between flex-wrap gap-4">
            <div>
                <span class="text-sm sm:text-base font-bold text-[#0B1B17] block">
                    Total Biaya Pembayaran
                </span>
                <span class="text-xs text-[#6B7B75] block mt-0.5">
                    Sudah termasuk PPN 11% & garansi pengerjaan
                </span>
            </div>
            <strong id="summary-total-price" class="text-2xl sm:text-3xl font-black text-[#046A38] tabular-nums tracking-tight">
                Rp{{ number_format($totalPrice, 0, ',', '.') }}
            </strong>
        </div>
    </div>

    <!-- Tombol Aksi di Bawah -->
    <div class="pt-2 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        <a href="{{ route('checkout.data-diri', $template) }}" class="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7B75] hover:text-[#0B1B17] transition py-2.5">
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span>Kembali ke Data Diri</span>
        </a>

        <a href="{{ route('checkout.bayar.redirect', $template) }}" class="h-12 sm:h-13 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#22C55E] hover:bg-[#16a34a] px-8 text-sm font-bold text-white shadow-xs transition cursor-pointer shrink-0">
            <span>Bayar Sekarang</span>
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
        </a>
    </div>

    <!-- Banner Edukasi / Keamanan di Bagian Bawah -->
    <div class="rounded-2xl border border-[#D0E3F9] bg-[#EDF5FD] p-4 sm:p-5 flex items-start gap-3.5 mt-6">
        <div class="flex size-6 items-center justify-center rounded-full bg-[#2563EB] text-white font-bold text-xs shrink-0 mt-0.5 shadow-xs">
            i
        </div>
        <div>
            <h3 class="text-sm font-bold text-[#0B1B17]">
                Garansi Transparansi & Kemitraan Resmi
            </h3>
            <p class="mt-0.5 text-xs sm:text-sm text-[#4A5551] leading-relaxed">
                Rincian biaya paket website di atas mencakup lisensi desain siap deploy, sewa cloud hosting 1 tahun, konfigurasi DNS domain resmi, serta layanan pemeliharaan. Jika Anda menggunakan kode promo mitra, pesanan Anda akan langsung terhubung ke program kemitraan resmi.
            </p>
        </div>
    </div>

</div>

<!-- JavaScript Interaktif AJAX Promo -->
<script>
const promoApplyUrl = "{{ route('checkout.promo.apply', $template) }}";
const promoRemoveUrl = "{{ route('checkout.promo.remove', $template) }}";
const csrfToken = "{{ csrf_token() }}";
const customerEmail = "{{ $checkout['customer']['email'] ?? '' }}";

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(num);
}

function sembunyikanErrorPromo() {
    const errBox = document.getElementById('promo-error-box');
    if (errBox) errBox.classList.add('hidden');
}

function tampilkanErrorPromo(msg) {
    const errBox = document.getElementById('promo-error-box');
    const errText = document.getElementById('promo-error-text');
    if (errBox && errText) {
        errText.textContent = msg;
        errBox.classList.remove('hidden');
    }
}

// Default umum struktur untuk reset ketika promo dihapus
const defaultUmumPricingStructure = {!! json_encode($defaultUmumPricingStructure) !!};

function renderDynamicPricingLayout(struct, promoCode) {
    const container = document.getElementById('payment-breakdown-container');
    if (!container || !struct) return;

    const durationText = "{{ $checkout['domain_duration'] ?? 1 }} Tahun";
    const isOwnDomain = {{ !empty($checkout['is_own_domain']) ? 'true' : 'false' }};
    const domainName = "{{ $checkout['domain_name'] ?? '' }}";
    const domainPricePerYear = {{ (int) ($checkout['domain_price_per_year'] ?? round($domainPrice / max(1, (int) ($checkout['domain_duration'] ?? 1)))) }};

    const templateDesc = "{{ $template->template_desc ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean' }}";
    const serverDesc = "{{ $template->server_desc ?? ('Cloud Server Hosting ' . (($checkout['domain_duration'] ?? 1) . ' Tahun') . ', NVMe High Speed & Free SSL') }}";
    const serviceDesc = "{{ $template->service_desc ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan' }}";

    let html = '';

    const comps = struct.components || {};
    const tPrice = comps.template?.formatted_price || ('Rp' + formatRupiah(comps.template?.price || 0));
    const sPrice = comps.server?.formatted_price || ('Rp' + formatRupiah(comps.server?.price || 0));
    const svPrice = comps.service?.formatted_price || ('Rp' + formatRupiah(comps.service?.price || 0));
    const dPrice = struct.formatted_domain_price || ('Rp' + formatRupiah(struct.domain_price || 0));
    const pkgSubtotal = struct.formatted_package_subtotal || ('Rp' + formatRupiah(struct.package_subtotal || 0));
    const pkgPromoPrice = struct.formatted_package_promo_price || ('Rp' + formatRupiah(struct.package_promo_price || 0));

    // Item 1, 2, 3: Paket Website
    html += `
        <div class="flex justify-between items-start pt-1">
            <div>
                <span class="text-sm font-bold text-[#0B1B17] block">1. Lisensi Template Website</span>
                <span class="text-xs text-[#6B7B75] block mt-0.5">${templateDesc}</span>
            </div>
            <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">${tPrice}</span>
        </div>
        <div class="flex justify-between items-start pt-2">
            <div>
                <span class="text-sm font-bold text-[#0B1B17] block">2. Cloud Server Hosting (${durationText})</span>
                <span class="text-xs text-[#6B7B75] block mt-0.5">${serverDesc}</span>
            </div>
            <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">${sPrice}</span>
        </div>
        <div class="flex justify-between items-start pt-2">
            <div>
                <span class="text-sm font-bold text-[#0B1B17] block">3. Setup Deployment & Layanan Teknis</span>
                <span class="text-xs text-[#6B7B75] block mt-0.5">${serviceDesc}</span>
            </div>
            <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">${svPrice}</span>
        </div>

        <!-- Garis Pembatas -->
        <hr class="border-[#E4E9E6] my-2">

        <!-- Subtotal 3 Item -->
        <div class="flex justify-between items-center py-0.5">
            <span class="text-sm font-bold text-[#0B1B17]">Subtotal 3 Item</span>
            <span class="font-bold text-sm text-[#0B1B17] tabular-nums">${pkgSubtotal}</span>
        </div>
    `;

    if (struct.mode === 'per_component') {
        const discountComps = [];
        ['template', 'server', 'service'].forEach(key => {
            if (comps[key] && comps[key].has_discount) {
                discountComps.push(comps[key]);
            }
        });

        discountComps.forEach(comp => {
            html += `
                <div class="rounded-xl bg-[#EAF7EE] px-4 py-2.5 flex justify-between items-center my-1.5 border-none" style="border: none !important;">
                    <div class="flex items-center gap-2">
                        <span class="size-2.5 rounded-full bg-[#10B981] inline-block shrink-0"></span>
                        <span class="text-sm font-semibold text-[#166534]">Potongan Diskon Promo (Diskon ${comp.name})</span>
                    </div>
                    <span class="font-bold text-sm text-[#166534] tabular-nums">${comp.discount_label}</span>
                </div>
            `;
        });

        html += `
            <div class="rounded-xl bg-[#DDF4E4] px-4 py-3 flex justify-between items-center my-1.5 border-none" style="border: none !important;">
                <div>
                    <strong class="text-sm font-bold text-[#065F46] block">Total 3 Item Setelah Diskon</strong>
                    <span class="text-xs text-[#047857] block mt-0.5">Paket Website (Template + Server + Service) setelah diskon</span>
                </div>
                <strong class="font-extrabold text-[#065F46] text-sm sm:text-base tabular-nums">${pkgPromoPrice}</strong>
            </div>
        `;
    } else if (struct.mode === 'subtotal') {
        const discountLabel = struct.package_discount_label || ('-Rp' + formatRupiah(struct.package_discount || 0));
        html += `
            <div class="rounded-xl bg-[#EAF7EE] px-4 py-2.5 flex justify-between items-center my-1.5 border-none" style="border: none !important;">
                <div class="flex items-center gap-2">
                    <span class="size-2.5 rounded-full bg-[#10B981] inline-block shrink-0"></span>
                    <span class="text-sm font-semibold text-[#166534]">Potongan Diskon Promo (${promoCode || ''})</span>
                </div>
                <span class="font-bold text-sm text-[#166534] tabular-nums">${discountLabel}</span>
            </div>
            <div class="rounded-xl bg-[#DDF4E4] px-4 py-3 flex justify-between items-center my-1.5 border-none" style="border: none !important;">
                <div>
                    <strong class="text-sm font-bold text-[#065F46] block">Total 3 Item Setelah Diskon</strong>
                    <span class="text-xs text-[#047857] block mt-0.5">Paket Website (Template + Server + Service) setelah diskon</span>
                </div>
                <strong class="font-extrabold text-[#065F46] text-sm sm:text-base tabular-nums">${pkgPromoPrice}</strong>
            </div>
        `;
    }

    // Garis Pembatas
    html += `<hr class="border-[#E4E9E6] my-2">`;

    // Item 4: Domain
    if (isOwnDomain) {
        html += `
            <div class="flex justify-between items-start py-0.5">
                <div>
                    <span class="text-sm font-bold text-[#0B1B17] block">4. Setup Domain Milik Sendiri</span>
                    <span class="text-xs text-blue-600 font-medium block mt-0.5">${domainName} &bull; Konfigurasi DNS Server (Gratis)</span>
                </div>
                <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">Rp0</span>
            </div>
        `;
    } else {
        const perYearFormatted = 'Rp' + formatRupiah(domainPricePerYear);
        html += `
            <div class="flex justify-between items-start py-0.5">
                <div>
                    <span class="text-sm font-bold text-[#0B1B17] block">4. Registrasi Domain (${durationText})</span>
                    <span class="text-xs text-[#2E6806] font-medium block mt-0.5">
                        ${domainName ? `<strong class="text-[#0B1B17] font-semibold">${domainName}</strong> &bull; ` : ''}
                        ${perYearFormatted}/thn &bull; Termasuk PPN 11%
                    </span>
                </div>
                <span class="font-bold text-sm text-[#0B1B17] shrink-0 tabular-nums">${dPrice}</span>
            </div>
        `;
    }

    container.innerHTML = html;
}

async function terapkanPromo(e) {
    e.preventDefault();
    sembunyikanErrorPromo();

    const input = document.getElementById('promo-input');
    const btnApply = document.getElementById('btn-apply-promo');
    const code = input ? input.value.trim() : '';

    if (!code) {
        tampilkanErrorPromo('Silakan ketik kode promo terlebih dahulu.');
        return;
    }

    const originalText = btnApply.innerHTML;
    btnApply.disabled = true;
    btnApply.innerHTML = '<svg class="size-4 animate-spin text-white inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> <span>Mengecek...</span>';

    try {
        const response = await fetch(promoApplyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                email: customerEmail
            })
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            input.readOnly = true;
            btnApply.style.display = 'none';
            document.getElementById('btn-remove-promo').style.display = 'inline-flex';

            const banner = document.getElementById('promo-active-banner');
            const bTitle = document.getElementById('promo-badge-title');
            const bCode = document.getElementById('promo-badge-code');
            const bDesc = document.getElementById('promo-badge-desc');
            const bIcon = document.getElementById('promo-badge-icon');
            const bPercent = document.getElementById('promo-badge-percentage');

            if (data.is_partner) {
                bTitle.textContent = 'Program Kemitraan: ' + (data.partner_name || 'Mitra Resmi');
                if (bIcon) {
                    bIcon.innerHTML = `<svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-1.42-1.42l4.24-4.24a1 1 0 0 0 0-1.42l-1.41-1.41a1 1 0 0 0-1.42 0l-9.9 9.9a2 2 0 0 0 0 2.83L6 20a2 2 0 0 0 2.83 0l2.17-2.17"/><path d="m12 12 4 4"/></svg>`;
                }
            } else {
                bTitle.textContent = 'Promo Aktif: ' + data.promo_code;
                if (bIcon) {
                    bIcon.innerHTML = `<svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>`;
                }
            }

            if (bPercent) {
                if (data.is_percentage && data.badge_text) {
                    bPercent.textContent = data.badge_text;
                    bPercent.classList.remove('hidden');
                    bPercent.classList.add('inline-flex');
                } else {
                    bPercent.classList.add('hidden');
                    bPercent.classList.remove('inline-flex');
                }
            }

            if (data.is_percentage) {
                const cappedText = data.is_max_reached ? ' (maksimal promo tercapai)' : '';
                bDesc.textContent = (data.discount_label || ('Diskon ' + data.percentage + '%')) + ' berhasil diterapkan! Anda hemat ' + data.formatted_discount + cappedText;
            } else {
                bDesc.textContent = data.is_partner
                    ? 'Diskon kemitraan berhasil diterapkan! Anda menghemat ' + data.formatted_discount
                    : 'Potongan diskon hemat ' + data.formatted_discount;
            }

            bCode.textContent = data.promo_code;
            banner.classList.remove('hidden');

            // Render tata letak harga dinamis sesuai sketsa diagram
            if (data.pricing_structure) {
                renderDynamicPricingLayout(data.pricing_structure, data.promo_code);
            }

            const totalText = document.getElementById('summary-total-price');
            if (totalText) totalText.textContent = data.formatted_total;
        } else {
            tampilkanErrorPromo(data.message || 'Kode promo tidak valid atau tidak memenuhi syarat.');
        }
    } catch (err) {
        tampilkanErrorPromo('Terjadi gangguan jaringan saat memvalidasi kode promo.');
    } finally {
        btnApply.disabled = false;
        btnApply.innerHTML = originalText;
    }
}

async function hapusPromo() {
    sembunyikanErrorPromo();
    const btnRemove = document.getElementById('btn-remove-promo');
    const input = document.getElementById('promo-input');
    const btnApply = document.getElementById('btn-apply-promo');

    btnRemove.disabled = true;

    try {
        const response = await fetch(promoRemoveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            if (input) {
                input.readOnly = false;
                input.value = '';
            }
            btnRemove.style.display = 'none';
            btnApply.style.display = 'inline-flex';

            const banner = document.getElementById('promo-active-banner');
            const totalText = document.getElementById('summary-total-price');
            const bPercent = document.getElementById('promo-badge-percentage');

            if (banner) banner.classList.add('hidden');
            if (bPercent) {
                bPercent.classList.add('hidden');
                bPercent.classList.remove('inline-flex');
                bPercent.textContent = '';
            }

            // Kembalikan tata letak ke mode umum
            renderDynamicPricingLayout(defaultUmumPricingStructure, '');

            if (totalText) totalText.textContent = data.formatted_total;
        }
    } catch (err) {
        tampilkanErrorPromo('Gagal menghapus kode promo.');
    } finally {
        btnRemove.disabled = false;
    }
}
</script>

@endsection
