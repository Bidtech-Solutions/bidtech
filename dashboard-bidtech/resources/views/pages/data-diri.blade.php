@extends('layouts.checkout')

@section('title', 'Data Diri Pemesan - Bidtech')

@section('content')

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

        <!-- ================= KOLOM KIRI: FORMULIR DATA DIRI ================= -->
        <div class="lg:col-span-8 space-y-6">

            <!-- Baris Badge Langkah -->
            <div class="flex items-center justify-between gap-3">
                <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-3 py-1 text-xs font-semibold text-[#1E7A53]">
                    Langkah 2 dari 4
                </span>
                <span class="text-xs text-[#6B7B75]">
                    Pengisian Data & Kontak
                </span>
            </div>

            <!-- Header Judul -->
            <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B17]">
                    Data diri pemesan website
                </h1>
                <p class="mt-1.5 text-sm text-[#6B7B75]">
                    Isi data diri Anda untuk administrasi pesanan dan koordinasi pengerjaan website.
                </p>
            </div>

            <!-- Card Domain Terpilih (Sesuai Gaya Card di Halaman Domain) -->
            <div class="rounded-2xl border-2 border-[#22C55E] bg-[#F2FBF5] p-4 sm:px-6 shadow-xs flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div class="flex items-center gap-3">
                    <div class="flex size-10 items-center justify-center rounded-xl bg-[#E7F4EE] text-[#1E7A53] shrink-0">
                        <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm sm:text-base font-bold text-[#0B1B17]">
                                {{ $checkout['domain_name'] ?? '-' }}
                            </span>
                            @if(!empty($checkout['is_own_domain']))
                                <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                    Domain Milik Sendiri
                                </span>
                            @else
                                <span class="inline-flex items-center rounded-full bg-[#E7F4EE] px-2.5 py-0.5 text-xs font-semibold text-[#1E7A53]">
                                    Domain Terpilih
                                </span>
                            @endif
                        </div>
                        <div class="text-xs text-[#6B7B75] mt-0.5 flex items-center gap-2">
                            @if(!empty($checkout['is_own_domain']))
                                <span class="text-[#1E7A53] font-medium">Bebas Biaya Registrasi (Konfigurasi DNS)</span>
                            @else
                                @php
                                    $cDuration = (int) ($checkout['domain_duration'] ?? 1);
                                @endphp
                                <span>Rp{{ number_format($checkout['domain_price'] ?? 0, 0, ',', '.') }} ({{ $cDuration }} Tahun)</span>
                                <span class="text-[#1E7A53] font-medium">• Termasuk PPN 11%</span>
                            @endif
                        </div>
                    </div>
                </div>

                @if(($flow ?? session('checkout.flow')) === 'domain-first')
                    <a href="{{ route('checkout.pilih-template') }}" class="rounded-xl border border-[#22C55E] text-[#1E7A53] hover:bg-[#22C55E] hover:text-white px-4 py-2 text-xs sm:text-sm font-semibold transition shrink-0">
                        Ganti Domain
                    </a>
                @else
                    <a href="{{ route('checkout.domain', $template) }}" class="rounded-xl border border-[#22C55E] text-[#1E7A53] hover:bg-[#22C55E] hover:text-white px-4 py-2 text-xs sm:text-sm font-semibold transition shrink-0">
                        Ganti Domain
                    </a>
                @endif
            </div>

            <!-- Pesan Error Validasi Form -->
            @if($errors->any())
                <div class="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5 text-sm text-red-800">
                    <div class="flex items-center gap-2 font-bold mb-2">
                        <svg class="size-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>Mohon periksa kembali formulir Anda:</span>
                    </div>
                    <ul class="list-disc list-inside space-y-1 text-xs sm:text-sm pl-1">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- Form Data Diri -->
            <form id="data-diri-form" method="POST" action="{{ route('checkout.data-diri.store', $template) }}" class="rounded-3xl border border-[#E4E9E6] bg-white p-6 sm:p-8 shadow-xs space-y-6">
                @csrf

                <div class="flex items-center gap-2.5 pb-2 border-b border-[#E4E9E6]">
                    <span class="inline-block h-5 w-1 rounded-full bg-[#22C55E]"></span>
                    <h2 class="text-base font-bold text-[#0B1B17]">
                        Informasi Kontak & Pemesan
                    </h2>
                </div>

                <!-- Input Nama Lengkap -->
                <div>
                    <label for="name" class="block text-xs sm:text-sm font-bold text-[#0B1B17] mb-2">
                        Nama Lengkap <span class="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value="{{ old('name', $checkout['customer']['name'] ?? '') }}" 
                        required 
                        placeholder="Contoh: Budi Santoso"
                        class="h-12 sm:h-13 w-full rounded-2xl border border-[#E4E9E6] bg-white px-4 text-sm font-medium text-[#0B1B17] outline-none transition placeholder:text-slate-400 focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                    >
                    <p class="mt-1.5 text-xs text-[#6B7B75]">
                        Nama penanggung jawab atau pemilik bisnis yang akan dicatat di pesanan.
                    </p>
                </div>

                <!-- 2 Kolom: Email & WhatsApp -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label for="email" class="block text-xs sm:text-sm font-bold text-[#0B1B17] mb-2">
                            Alamat Email <span class="text-red-500">*</span>
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value="{{ old('email', $checkout['customer']['email'] ?? '') }}" 
                            required 
                            placeholder="nama@perusahaan.com"
                            class="h-12 sm:h-13 w-full rounded-2xl border border-[#E4E9E6] bg-white px-4 text-sm font-medium text-[#0B1B17] outline-none transition placeholder:text-slate-400 focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                        >
                        <p class="mt-1.5 text-xs text-[#6B7B75]">
                            Untuk pengiriman invoice resmi dan konfirmasi pesanan.
                        </p>
                    </div>

                    <div>
                        <label for="whatsapp" class="block text-xs sm:text-sm font-bold text-[#0B1B17] mb-2">
                            Nomor WhatsApp <span class="text-red-500">*</span>
                        </label>
                        <input 
                            type="tel" 
                            id="whatsapp" 
                            name="whatsapp" 
                            value="{{ old('whatsapp', $checkout['customer']['whatsapp'] ?? '') }}" 
                            required 
                            placeholder="08123456789"
                            class="h-12 sm:h-13 w-full rounded-2xl border border-[#E4E9E6] bg-white px-4 text-sm font-medium text-[#0B1B17] outline-none transition placeholder:text-slate-400 focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                        >
                        <p class="mt-1.5 text-xs text-[#6B7B75]">
                            Untuk koordinasi pengerjaan dan konfirmasi revisi website.
                        </p>
                    </div>
                </div>

                <!-- Catatan Tambahan (Opsional) -->
                <div>
                    <label for="notes" class="block text-xs sm:text-sm font-bold text-[#0B1B17] mb-2">
                        Catatan Tambahan <span class="text-xs font-normal text-[#6B7B75]">(Opsional)</span>
                    </label>
                    <textarea 
                        id="notes" 
                        name="notes" 
                        rows="3" 
                        placeholder="Contoh: Nama brand usaha, tema warna yang diinginkan, atau fitur khusus..."
                        class="w-full rounded-2xl border border-[#E4E9E6] bg-white p-4 text-sm font-medium text-[#0B1B17] outline-none transition placeholder:text-slate-400 focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10 resize-y"
                    >{{ old('notes', $checkout['customer']['notes'] ?? '') }}</textarea>
                    <p class="mt-1.5 text-xs text-[#6B7B75]">
                        Sampaikan kebutuhan spesifik Anda untuk mempermudah tim kami.
                    </p>
                </div>

                <!-- Navigasi Bawah Form: Tombol Lanjut ada di Sidebar -->
                <div class="pt-4 border-t border-[#E4E9E6] flex items-center justify-between gap-4 flex-wrap">
                    @php
                        $isDomainFirst = ($flow ?? session('checkout.flow')) === 'domain-first';
                        $kembaliUrl = $isDomainFirst ? route('checkout.pilih-template') : route('checkout.domain', $template);
                        $kembaliLabel = $isDomainFirst ? 'Kembali ke Pemilihan Template' : 'Kembali ke Pemilihan Domain';
                    @endphp
                    <a href="{{ $kembaliUrl }}" class="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7B75] hover:text-[#0B1B17] transition py-2">
                        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        <span>{{ $kembaliLabel }}</span>
                    </a>

                    <span class="text-xs text-[#6B7B75] hidden sm:inline">
                        Lanjutkan pesanan melalui tombol di sidebar kanan &rarr;
                    </span>
                </div>
            </form>

            <!-- Banner Edukasi / Keamanan di Bagian Bawah -->
            <div class="rounded-2xl border border-[#D0E3F9] bg-[#EDF5FD] p-4 sm:p-5 flex items-start gap-3.5 mt-6">
                <div class="flex size-6 items-center justify-center rounded-full bg-[#2563EB] text-white font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    i
                </div>
                <div>
                    <h3 class="text-sm font-bold text-[#0B1B17]">
                        Data Anda Aman & Terlindungi
                    </h3>
                    <p class="mt-0.5 text-xs sm:text-sm text-[#4A5551] leading-relaxed">
                        Informasi kontak Anda hanya digunakan untuk keperluan konfigurasi domain, aktivasi hosting, dan koordinasi tim kami selama proses pembuatan website. Kami menjamin kerahasiaan data Anda.
                    </p>
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
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-[#6B7B75]">1. Desain Template ({{ $duration }} Thn)</span>
                            <span class="font-semibold text-[#0B1B17]">Rp{{ number_format($tPrice, 0, ',', '.') }}</span>
                        </div>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-[#6B7B75]">2. Cloud Server ({{ $duration }} Thn)</span>
                            <span class="font-semibold text-[#0B1B17]">Rp{{ number_format($sPrice, 0, ',', '.') }}</span>
                        </div>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-[#6B7B75]">3. Setup & Deployment ({{ $duration }} Thn)</span>
                            <span class="font-semibold text-[#0B1B17]">Rp{{ number_format($vPrice, 0, ',', '.') }}</span>
                        </div>
                        <div id="sidebar-domain-box">
                            @if(!empty($checkout['domain_name']))
                                @if(!empty($checkout['is_own_domain']))
                                    <div class="rounded-xl bg-[#E7F4EE] px-3 py-2 text-xs text-[#1E7A53] font-semibold flex items-center justify-between mt-1">
                                        <div>
                                            <span>Domain: <strong>{{ $checkout['domain_name'] }}</strong></span>
                                            <div class="text-[10px] text-[#2E6806] font-normal">Milik Sendiri (Konfigurasi DNS)</div>
                                        </div>
                                        <span class="font-bold">Rp0</span>
                                    </div>
                                @else
                                    @php
                                        $pricePerYear = (int) ($checkout['domain_price_per_year'] ?? round(($checkout['domain_price'] ?? 185000) / max(1, $duration)));
                                    @endphp
                                    <div class="rounded-xl bg-[#E7F4EE] px-3 py-2 text-xs text-[#1E7A53] font-semibold flex items-center justify-between mt-1">
                                        <div>
                                            <span>Domain: <strong>{{ $checkout['domain_name'] }}</strong></span>
                                            <div class="text-[10px] text-[#2E6806] font-normal">{{ $duration }} Tahun (Rp{{ number_format($pricePerYear, 0, ',', '.') }}/thn)</div>
                                        </div>
                                        <span class="font-bold">Rp{{ number_format($checkout['domain_price'] ?? 0, 0, ',', '.') }}</span>
                                    </div>
                                @endif
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
                        <div class="pt-2">
                            <button type="button" onclick="document.getElementById('data-diri-form')?.requestSubmit()" id="btn-sidebar-submit-datadiri" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-3 px-4 text-xs sm:text-sm font-semibold text-white shadow-sm transition cursor-pointer">
                                <span>Lanjut ke Ringkasan</span>
                                <i data-lucide="arrow-right" class="size-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </div>

    </div>
</div>

@endsection
