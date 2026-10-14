@extends('layouts.dashboard')

@php
    $isMarketingRole = (isset($isMarketing) && $isMarketing) || (auth()->check() && auth()->user()->isMarketing());
    $pageTitle = $isMarketingRole ? 'Kelola Nasabah - Marketing Portal Bidtech' : 'Kelola Pesanan Klien - Admin CMS Bidtech';
    $headingTitle = $isMarketingRole ? 'Kelola Nasabah' : 'Kelola Pesanan Klien';
    $headingSubtitle = $isMarketingRole 
        ? 'Pantau seluruh transaksi nasabah, riwayat pesanan klien, dan unduh berkas invoice resmi pembelian.' 
        : 'Pantau seluruh transaksi, filter periode pesanan bulanan/tahunan, dan ubah status domain & website klien secara manual.';
@endphp

@section('title', $pageTitle)

@section('content')
<div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Top Bar Title & Quick Action -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{{ $headingTitle }}</h1>
            <p class="text-sm text-slate-500 mt-1">{{ $headingSubtitle }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
            @php
                $activePeriodText = 'Semua Waktu';
                if ($stats['period'] === 'monthly') {
                    $activePeriodText = ($monthsMap[$stats['selected_month']] ?? '') . ' ' . $stats['selected_year'];
                } elseif ($stats['period'] === 'yearly') {
                    $activePeriodText = 'Tahun ' . $stats['selected_year'];
                }
            @endphp
            <span class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/60 shadow-2xs">
                <i data-lucide="calendar" class="w-4 h-4"></i>
                <span>Periode: {{ $activePeriodText }}</span>
            </span>
        </div>
    </div>

    <!-- ================= 1. DYNAMIC BENTO STATS SESUAI PERIODE ================= -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <!-- Omzet Lunas Periode Ini -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Omzet Lunas (Periode)</span>
                <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <i data-lucide="wallet" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="mt-3">
                <p class="text-lg sm:text-xl font-black text-emerald-700 whitespace-nowrap tracking-tight">
                    Rp {{ number_format($stats['period_omzet'], 0, ',', '.') }}
                </p>
                <p class="text-[11px] text-slate-400 mt-0.5">
                    {{ $stats['period_paid'] }} Transaksi Lunas
                </p>
            </div>
        </div>

        <!-- Pesanan Lunas -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pesanan Lunas</span>
                <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="mt-3">
                <p class="text-lg sm:text-xl font-black text-slate-900 whitespace-nowrap tracking-tight">
                    {{ $stats['period_paid'] }} <span class="text-xs font-semibold text-slate-400">/ {{ $stats['period_total'] }} Order</span>
                </p>
                <p class="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Terverifikasi sistem
                </p>
            </div>
        </div>

        <!-- Menunggu Pembayaran -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Menunggu Bayar</span>
                <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <i data-lucide="clock" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="mt-3">
                <p class="text-lg sm:text-xl font-black text-amber-600 whitespace-nowrap tracking-tight">
                    {{ $stats['period_unpaid'] }} <span class="text-xs font-semibold text-slate-400">Order</span>
                </p>
                <p class="text-[11px] text-amber-700 font-semibold mt-0.5">
                    Menunggu transfer
                </p>
            </div>
        </div>

        <!-- Batal / Kedaluwarsa -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Batal / Expired</span>
                <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <i data-lucide="ban" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="mt-3">
                <p class="text-lg sm:text-xl font-black text-rose-600 whitespace-nowrap tracking-tight">
                    {{ $stats['period_invalid'] }} <span class="text-xs font-semibold text-slate-400">Order</span>
                </p>
                <p class="text-[11px] text-rose-600 font-semibold mt-0.5">
                    Tidak diselesaikan
                </p>
            </div>
        </div>
    </div>

    <!-- ================= 3. TABEL MANAJEMEN PESANAN LENGKAP ================= -->
    <div class="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <!-- Header & Reset -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
                <h2 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <i data-lucide="{{ $isMarketingRole ? 'users' : 'layers' }}" class="w-5 h-5 text-emerald-600"></i>
                    <span>{{ $isMarketingRole ? 'Daftar Nasabah & Pesanan' : 'Daftar Pesanan Klien' }}</span>
                </h2>
                <p class="text-xs text-slate-500 mt-0.5">
                    Total <strong class="text-slate-800">{{ $orders->total() }}</strong> {{ $isMarketingRole ? 'nasabah/transaksi' : 'pesanan' }} ditemukan di sistem
                </p>
            </div>
            <div class="flex items-center gap-2">
                <a href="{{ route('dashboard.order.export', request()->query()) }}"
                   class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition shadow-2xs"
                   title="Unduh data tabel saat ini ke format Excel (.xlsx)">
                    <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-emerald-600"></i>
                    <span>Ekspor Excel</span>
                </a>
                @if($stats['search'] || $stats['category'] !== 'all' || $stats['status'] !== 'all' || $stats['period'] !== 'all')
                    <a href="{{ route('dashboard.order') }}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition" title="Reset Semua Filter">
                        <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                        <span>Reset Filter</span>
                    </a>
                @endif
            </div>
        </div>

        <!-- ================= UNIFIED SEARCH & FILTER TOOLBAR DI ATAS TABEL ================= -->
        <form method="GET" action="{{ route('dashboard.order') }}" class="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center gap-3">
            <!-- 1. Input Pencarian -->
            <div class="relative flex-1 min-w-[220px]">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <input type="text" name="search" value="{{ $stats['search'] }}" 
                       placeholder="Cari no. order, nama, email, domain..." 
                       class="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 transition">
                @if($stats['search'])
                    <a href="{{ route('dashboard.order', array_filter(['category' => $stats['category'] !== 'all' ? $stats['category'] : null, 'status' => $stats['status'] !== 'all' ? $stats['status'] : null, 'period' => $stats['period'] !== 'all' ? $stats['period'] : null, 'month' => $stats['selected_month'], 'year' => $stats['selected_year']])) }}" 
                       class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded-full hover:bg-slate-200 transition"
                       title="Hapus Pencarian">
                        <i data-lucide="x" class="w-3.5 h-3.5"></i>
                    </a>
                @endif
            </div>

            <!-- 2. Filter Kategori Template -->
            <div class="w-full sm:w-44">
                <select name="category" class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                    <option value="all" {{ $stats['category'] === 'all' ? 'selected' : '' }}>Semua Kategori</option>
                    @foreach($stats['available_categories'] as $cat)
                        <option value="{{ $cat }}" {{ $stats['category'] === $cat ? 'selected' : '' }}>{{ $cat }}</option>
                    @endforeach
                </select>
            </div>

            <!-- 3. Filter Status Pembayaran -->
            <div class="w-full sm:w-40">
                <select name="status" class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                    <option value="all" {{ $stats['status'] === 'all' ? 'selected' : '' }}>Semua Status</option>
                    <option value="paid" {{ $stats['status'] === 'paid' ? 'selected' : '' }}>🟢 Lunas (Paid)</option>
                    <option value="unpaid" {{ $stats['status'] === 'unpaid' ? 'selected' : '' }}>🟡 Menunggu Bayar</option>
                    <option value="invalid" {{ $stats['status'] === 'invalid' ? 'selected' : '' }}>🔴 Batal / Expired</option>
                </select>
            </div>

            <!-- 4. Filter Tipe Periode -->
            <div class="w-full sm:w-36">
                <select name="period" id="filter-period-select" onchange="togglePeriodInputs(this.value)"
                        class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                    <option value="all" {{ $stats['period'] === 'all' ? 'selected' : '' }}>Semua Waktu</option>
                    <option value="monthly" {{ $stats['period'] === 'monthly' ? 'selected' : '' }}>Bulanan</option>
                    <option value="yearly" {{ $stats['period'] === 'yearly' ? 'selected' : '' }}>Tahunan</option>
                </select>
            </div>

            <!-- Dropdown Bulan (Muncul jika period == monthly) -->
            <div class="w-full sm:w-36" id="filter-month-wrapper" style="{{ $stats['period'] === 'monthly' ? '' : 'display:none;' }}">
                <select name="month" class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                    @foreach($monthsMap as $mNum => $mName)
                        <option value="{{ $mNum }}" {{ $stats['selected_month'] == $mNum ? 'selected' : '' }}>{{ $mName }}</option>
                    @endforeach
                </select>
            </div>

            <!-- Dropdown Tahun -->
            <div class="w-full sm:w-28" id="filter-year-wrapper" style="{{ in_array($stats['period'], ['monthly', 'yearly']) ? '' : 'display:none;' }}">
                <select name="year" class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                    @foreach($stats['available_years'] as $yr)
                        <option value="{{ $yr }}" {{ $stats['selected_year'] == $yr ? 'selected' : '' }}>{{ $yr }}</option>
                    @endforeach
                </select>
            </div>

            <!-- Tombol Terapkan Filter & Pencarian -->
            <button type="submit" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0 ml-auto sm:ml-0" title="Terapkan Pencarian & Filter">
                <i data-lucide="search" class="w-3.5 h-3.5"></i>
                <span>Terapkan</span>
            </button>
        </form>

        <div class="overflow-x-auto rounded-2xl border border-slate-200/80">
            <table class="w-full text-left text-xs sm:text-sm text-slate-600">
                <thead class="text-[11px] uppercase font-bold text-slate-700 bg-slate-50/80 border-b border-slate-200 tracking-wider">
                    <tr>
                        <th class="py-3 px-3.5">No. Order & Tanggal</th>
                        <th class="py-3 px-3.5">Pemesan</th>
                        <th class="py-3 px-3.5">Template / Domain</th>
                        <th class="py-3 px-3.5 text-center">Status Domain</th>
                        <th class="py-3 px-3.5 text-center">Status Website</th>
                        <th class="py-3 px-3.5 text-center">Status Pembayaran</th>
                        <th class="py-3 px-3.5 text-right">Total</th>
                        <th class="py-3 px-3.5 text-center">{{ $isMarketingRole ? 'Aksi Invoice' : 'Aksi Cepat' }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($orders as $ro)
                        @php
                            $sVal = $ro->status->value ?? $ro->status;
                            $isPaid = $ro->isPaid();
                            $domainStatusVal = $isPaid ? ($ro->domain_status?->value ?? 'pending_registration') : '-';
                            $websiteStatusVal = $isPaid ? ($ro->website_status?->value ?? 'in_progress') : '-';
                            $domainFinalVal = $ro->domain_final ?: $ro->domain_name;
                        @endphp
                        <tr class="hover:bg-slate-50/60 transition">
                            <td class="py-3.5 px-3.5">
                                <p class="font-mono font-bold text-xs text-slate-900">{{ $ro->order_number }}</p>
                                <p class="text-[11px] text-slate-400 mt-0.5">{{ $ro->created_at ? $ro->created_at->format('d M Y, H:i') : '-' }}</p>
                            </td>
                            <td class="py-3.5 px-3.5">
                                <p class="font-bold text-xs text-slate-900">{{ $ro->full_name }}</p>
                                <p class="text-[11px] text-slate-500 truncate max-w-[140px]">{{ $ro->email }}</p>
                                <p class="text-[11px] text-emerald-700 font-mono">{{ $ro->whatsapp }}</p>
                            </td>
                            <td class="py-3.5 px-3.5">
                                <p class="text-xs font-semibold text-slate-800">{{ $ro->template?->name ?? 'Template' }}</p>
                                @if($ro->template?->category)
                                    <span class="inline-block mt-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                                        {{ $ro->template->category }}
                                    </span>
                                @endif
                                <p class="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                                    <i data-lucide="globe" class="w-3 h-3"></i>
                                    <span>{{ $domainFinalVal }}</span>
                                </p>
                                @if($ro->is_own_domain)
                                    <span class="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60" title="Domain sudah dimiliki klien, tidak perlu didaftarkan. Cukup arahkan DNS.">
                                        <i data-lucide="link-2" class="w-3 h-3"></i>
                                        <span>Domain Milik Klien</span>
                                    </span>
                                @endif
                            </td>
                            <!-- Status Domain -->
                            <td class="py-3.5 px-3.5 text-center">
                                @if($isPaid && $domainStatusVal === 'registered')
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#166534]">
                                        <i data-lucide="check" class="w-3 h-3"></i>
                                        <span>Aktif</span>
                                    </span>
                                @elseif($isPaid && $domainStatusVal === 'pending_registration')
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E]">
                                        <i data-lucide="clock" class="w-3 h-3"></i>
                                        <span>{{ $ro->is_own_domain ? 'Arahkan DNS' : 'Diproses' }}</span>
                                    </span>
                                @else
                                    <span class="text-xs text-slate-400 font-bold">-</span>
                                @endif
                            </td>
                            <!-- Status Website -->
                            <td class="py-3.5 px-3.5 text-center">
                                @if($isPaid && $websiteStatusVal === 'deployed')
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#166534]">
                                        <i data-lucide="sparkles" class="w-3 h-3"></i>
                                        <span>Live</span>
                                    </span>
                                @elseif($isPaid && $websiteStatusVal === 'in_progress')
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                                        <i data-lucide="code" class="w-3 h-3"></i>
                                        <span>Dikerjakan</span>
                                    </span>
                                @elseif($isPaid && $websiteStatusVal === 'maintenance')
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                                        <i data-lucide="wrench" class="w-3 h-3"></i>
                                        <span>Maintenance</span>
                                    </span>
                                @else
                                    <span class="text-xs text-slate-400 font-bold">-</span>
                                @endif
                            </td>
                            <!-- Status Pembayaran -->
                            <td class="py-3.5 px-3.5 text-center">
                                @if($sVal === 'paid')
                                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#DCFCE7] text-[#166534]">
                                        <i data-lucide="check-circle" class="w-3 h-3"></i>
                                        <span>LUNAS</span>
                                    </span>
                                @elseif($sVal === 'invalid')
                                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#FEE2E2] text-[#991B1B]">
                                        <i data-lucide="x-circle" class="w-3 h-3"></i>
                                        <span>BATAL</span>
                                    </span>
                                @else
                                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#FEF3C7] text-[#92400E]">
                                        <i data-lucide="clock" class="w-3 h-3"></i>
                                        <span>UNPAID</span>
                                    </span>
                                @endif
                            </td>
                            <td class="py-3.5 px-3.5 text-right font-mono font-bold text-xs text-slate-900">
                                Rp {{ number_format($ro->total_price, 0, ',', '.') }}
                            </td>
                            <td class="py-3.5 px-3.5 text-center">
                                <div class="flex items-center justify-center gap-1.5">
                                    @if(auth()->check() && auth()->user()->isAdmin())
                                        <!-- Tombol Ubah Status (Modal) - Khusus Admin -->
                                        <button type="button" 
                                                onclick='openStatusModal({
                                                    id: {{ $ro->id }},
                                                    order_number: "{{ $ro->order_number }}",
                                                    full_name: "{{ addslashes($ro->full_name) }}",
                                                    whatsapp: "{{ addslashes($ro->whatsapp) }}",
                                                    status: "{{ $sVal }}",
                                                    domain_name: "{{ addslashes($ro->domain_name) }}",
                                                    domain_status: "{{ $domainStatusVal }}",
                                                    domain_final: "{{ addslashes($ro->domain_final ?: '') }}",
                                                    website_status: "{{ $websiteStatusVal }}"
                                                })'
                                                class="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition cursor-pointer" 
                                                title="Ubah Status Klien & Pesanan">
                                            <i data-lucide="settings-2" class="w-4 h-4"></i>
                                        </button>

                                        <!-- Tombol Lihat Invoice Modal (Identik Bayar) - Khusus Admin -->
                                        <button type="button" 
                                                onclick='openInvoiceModal({
                                                    order_number: "{{ $ro->order_number }}",
                                                    date_formatted: "{{ $ro->created_at ? $ro->created_at->format('d M Y') : '-' }}",
                                                    full_name: "{{ addslashes($ro->full_name) }}",
                                                    email: "{{ addslashes($ro->email) }}",
                                                    whatsapp: "{{ addslashes($ro->whatsapp) }}",
                                                    status: "{{ $sVal }}",
                                                    template_name: "{{ addslashes($ro->template?->name ?? 'Template Website') }}",
                                                    template_desc: "{{ addslashes($ro->template_desc ?? $ro->template?->template_desc ?? 'Lisensi Desain UI/UX Eksklusif') }}",
                                                    template_price: {{ (int) ($ro->template_price ?? $ro->template?->template_price ?? 1000000) }},
                                                    server_price: {{ (int) ($ro->server_price ?? $ro->template?->server_price ?? 500000) }},
                                                    server_desc: "{{ addslashes($ro->server_desc ?? 'Cloud Server Hosting 1 Tahun, NVMe High Speed & SSL') }}",
                                                    service_price: {{ (int) ($ro->service_price ?? $ro->template?->service_price ?? 500000) }},
                                                    service_desc: "{{ addslashes($ro->service_desc ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan') }}",
                                                    domain_name: "{{ addslashes($domainFinalVal) }}",
                                                    domain_duration: {{ (int) ($ro->domain_duration ?: 1) }},
                                                    domain_price: {{ (int) ($ro->domain_price ?? 0) }},
                                                    is_own_domain: {{ $ro->is_own_domain ? 'true' : 'false' }},
                                                    promo_code: "{{ addslashes($ro->promo_code ?? '') }}",
                                                    discount_amount: {{ (int) ($ro->discount_amount ?? 0) }},
                                                    total_price: {{ (int) $ro->total_price }},
                                                    preview_url: "{{ $ro->template ? $ro->template->preview_url : asset('images/design_thumbnail/rentcar.webp') }}",
                                                    download_url: "{{ route('checkout.invoice.download', $ro->order_number) }}",
                                                    direct_bayar_url: "{{ route('checkout.bayar.direct', $ro->order_number) }}"
                                                })'
                                                class="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer" 
                                                title="Lihat Detail Invoice Resmi">
                                            <i data-lucide="file-text" class="w-4 h-4"></i>
                                        </button>

                                        <!-- Unduh PDF Langsung (Admin) -->
                                        <a href="{{ route('checkout.invoice.download', $ro->order_number) }}" target="_blank"
                                           class="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition"
                                           title="Unduh PDF Resmi">
                                            <i data-lucide="download" class="w-4 h-4"></i>
                                        </a>
                                    @else
                                        <!-- Unduh Invoice Resmi (Marketing: Hanya Ikon Unduh) -->
                                        <a href="{{ route('checkout.invoice.download', $ro->order_number) }}" target="_blank"
                                           class="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition inline-flex items-center justify-center"
                                           title="Unduh PDF Resmi">
                                            <i data-lucide="download" class="w-4 h-4"></i>
                                        </a>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="py-12 text-center text-slate-400">
                                <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                <p class="font-medium text-sm">Tidak ada pesanan yang sesuai dengan filter.</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($orders->hasPages())
            <div class="pt-2">
                {{ $orders->links() }}
            </div>
        @endif
    </div>
</div>

@if(auth()->check() && auth()->user()->isAdmin())
<!-- ================= MODAL 1: UBAH STATUS KLIEN & PESANAN MANUAL ================= -->
<div id="status-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 hidden overflow-y-auto">
    <div class="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 my-auto animate-in fade-in zoom-in-95 duration-200">
        <!-- Header Modal -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
                    <i data-lucide="settings-2" class="w-5 h-5"></i>
                </div>
                <div>
                    <h3 class="font-bold text-slate-900 text-base">Ubah Status Klien Manual</h3>
                    <p class="text-xs text-slate-500">Kelola status pesanan, domain, & pengerjaan website</p>
                </div>
            </div>
            <button type="button" onclick="closeStatusModal()" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>

        <form id="status-update-form" method="POST" action="" class="space-y-4">
            @csrf
            <!-- Ringkasan Info Order -->
            <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 grid grid-cols-2 gap-3 text-xs">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-white text-slate-600 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                        <i data-lucide="receipt" class="w-4 h-4 text-emerald-600"></i>
                    </div>
                    <div class="min-w-0">
                        <span class="text-[10px] uppercase font-bold text-slate-400 block">No. Order</span>
                        <strong id="modal-order-number" class="font-mono text-slate-900 text-xs font-bold truncate block">#BT-000</strong>
                    </div>
                </div>
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-white text-slate-600 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                        <i data-lucide="user-check" class="w-4 h-4 text-blue-600"></i>
                    </div>
                    <div class="min-w-0">
                        <span class="text-[10px] uppercase font-bold text-slate-400 block">Pemesan</span>
                        <strong id="modal-client-name" class="text-slate-900 text-xs font-bold truncate block">Nama Klien</strong>
                        <span id="modal-client-phone-top" class="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                            <i data-lucide="phone" class="w-2.5 h-2.5 text-emerald-600 shrink-0"></i>
                            <span id="modal-client-phone-top-val">-</span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Input 1: Custom Dropdown Status Pembayaran Order -->
            <div class="space-y-1.5 relative" id="dropdown-order-status-container">
                <label class="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <i data-lucide="credit-card" class="w-3.5 h-3.5 text-emerald-600"></i>
                    <span>1. Status Pembayaran Order</span>
                </label>
                <input type="hidden" name="order_status" id="modal-order-status" value="paid">
                
                <!-- Trigger Button -->
                <button type="button" id="trigger-order-status" onclick="toggleCustomDropdown('order-status')"
                        class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-2xs cursor-pointer">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <span id="selected-order-status-icon" class="flex items-center shrink-0">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
                        </span>
                        <span id="selected-order-status-label" class="font-bold text-slate-900 truncate">Lunas (PAID) - Otomatis Buat Akun Klien</span>
                    </div>
                    <i data-lucide="chevron-down" id="chevron-order-status" class="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200"></i>
                </button>

                <!-- Menu List -->
                <div id="menu-order-status" class="hidden absolute left-0 right-0 top-full mt-1.5 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <button type="button" onclick="selectCustomOption('order_status', 'paid', 'check-circle-2', 'text-emerald-600', 'Lunas (PAID) - Otomatis Buat Akun Klien')"
                            class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/80 text-left transition group cursor-pointer">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <strong class="text-xs font-bold text-slate-900 block group-hover:text-emerald-800">Lunas (PAID)</strong>
                                <span class="text-[11px] text-slate-500">Otomatis buat & aktifkan akun klien</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#166534]">PAID</span>
                    </button>

                    <button type="button" onclick="selectCustomOption('order_status', 'unpaid', 'clock', 'text-amber-600', 'Menunggu Pembayaran (UNPAID)')"
                            class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-amber-50/80 text-left transition group cursor-pointer">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                <i data-lucide="clock" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <strong class="text-xs font-bold text-slate-900 block group-hover:text-amber-800">Menunggu Pembayaran (UNPAID)</strong>
                                <span class="text-[11px] text-slate-500">Tagihan belum dibayar pemesan</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E]">UNPAID</span>
                    </button>

                    <button type="button" onclick="selectCustomOption('order_status', 'invalid', 'x-circle', 'text-rose-600', 'Kedaluwarsa / Dibatalkan (INVALID)')"
                            class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-rose-50/80 text-left transition group cursor-pointer">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                                <i data-lucide="x-circle" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <strong class="text-xs font-bold text-slate-900 block group-hover:text-rose-800">Kedaluwarsa / Batal (INVALID)</strong>
                                <span class="text-[11px] text-slate-500">Melewati batas bayar / dibatalkan</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEE2E2] text-[#991B1B]">INVALID</span>
                    </button>
                </div>
                <p class="text-[11px] text-slate-400 flex items-center gap-1">
                    <i data-lucide="info" class="w-3 h-3 text-slate-400 shrink-0"></i>
                    <span>Mengubah ke Lunas akan otomatis mengaktifkan kredensial login portal klien.</span>
                </p>
            </div>

            <!-- Notice jika status pesanan bukan LUNAS -->
            <div id="modal-not-paid-notice" class="hidden p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
                <div class="space-y-0.5">
                    <strong class="font-bold block text-xs text-amber-900" id="modal-not-paid-notice-title">Status Domain & Website Nonaktif</strong>
                    <p class="text-[11px] text-amber-700 leading-relaxed" id="modal-not-paid-notice-text">
                        Pesanan ini belum/tidak lunas sehingga status domain dan status pengerjaan website otomatis dinonaktifkan (tampil strip - pada tabel).
                    </p>
                </div>
            </div>

            <!-- Input 2: Custom Dropdown Status Domain Klien -->
            <div class="space-y-1.5 relative" id="dropdown-domain-status-container">
                <label class="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <i data-lucide="globe" class="w-3.5 h-3.5 text-emerald-600"></i>
                    <span>2. Status Domain Klien</span>
                </label>
                <input type="hidden" name="domain_status" id="modal-domain-status" value="pending_registration">

                <!-- Trigger Button -->
                <button type="button" id="trigger-domain-status" onclick="toggleCustomDropdown('domain-status')"
                        class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-2xs cursor-pointer">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <span id="selected-domain-status-icon" class="flex items-center shrink-0">
                            <i data-lucide="clock" class="w-4 h-4 text-amber-600"></i>
                        </span>
                        <span id="selected-domain-status-label" class="font-bold text-slate-900 truncate">Domain Diproses Tim Kami</span>
                    </div>
                    <i data-lucide="chevron-down" id="chevron-domain-status" class="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200"></i>
                </button>

                <!-- Menu List -->
                <div id="menu-domain-status" class="hidden absolute left-0 right-0 top-full mt-1.5 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <button type="button" onclick="selectCustomOption('domain_status', 'pending_registration', 'clock', 'text-amber-600', 'Domain Diproses Tim Kami')"
                            class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-amber-50/80 text-left transition group cursor-pointer">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                <i data-lucide="clock" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <strong class="text-xs font-bold text-slate-900 block group-hover:text-amber-800">Domain Diproses Tim Kami</strong>
                                <span class="text-[11px] text-slate-500">Menunggu verifikasi registrar / DNS</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E]">DIPROSES</span>
                    </button>

                    <button type="button" onclick="selectCustomOption('domain_status', 'registered', 'globe', 'text-emerald-600', 'Domain Aktif & Terhubung ke Server')"
                            class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/80 text-left transition group cursor-pointer">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <i data-lucide="globe" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <strong class="text-xs font-bold text-slate-900 block group-hover:text-emerald-800">Domain Aktif & Terhubung</strong>
                                <span class="text-[11px] text-slate-500">Domain live mengarah ke server</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#166534]">AKTIF</span>
                    </button>
                </div>
            </div>

            <!-- Input 3: Nama Domain Final -->
            <div class="space-y-1.5" id="domain-final-container">
                <label class="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <i data-lucide="link-2" class="w-3.5 h-3.5 text-emerald-600"></i>
                    <span>3. Nama Domain Final (URL Aktif)</span>
                </label>
                <div class="relative">
                    <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <i data-lucide="external-link" class="w-4 h-4"></i>
                    </div>
                    <input type="text" name="domain_final" id="modal-domain-final" placeholder="contoh: bisnisklien.com"
                           class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-2xs">
                </div>
                <p class="text-[11px] text-slate-400 flex items-center gap-1">
                    <i data-lucide="info" class="w-3 h-3 text-slate-400 shrink-0"></i>
                    <span>Domain yang akan ditampilkan di dashboard klien dan link tombol live.</span>
                </p>
            </div>

            <!-- Input 4: Custom Dropdown Status Pengerjaan Website -->
            <div class="space-y-1.5 relative" id="dropdown-website-status-container">
                <label class="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <i data-lucide="layout" class="w-3.5 h-3.5 text-emerald-600"></i>
                    <span>4. Status Pengerjaan Website (Progres)</span>
                </label>
                <input type="hidden" name="website_status" id="modal-website-status" value="in_progress">

                <!-- Trigger Button -->
                <button type="button" id="trigger-website-status" onclick="toggleCustomDropdown('website-status')"
                        class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-2xs cursor-pointer">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <span id="selected-website-status-icon" class="flex items-center shrink-0">
                            <i data-lucide="code-2" class="w-4 h-4 text-blue-600"></i>
                        </span>
                        <span id="selected-website-status-label" class="font-bold text-slate-900 truncate">Sedang Dikerjakan (Tim Developer)</span>
                    </div>
                    <i data-lucide="chevron-down" id="chevron-website-status" class="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200"></i>
                </button>

                <!-- Menu List -->
                <div id="menu-website-status" class="hidden absolute left-0 right-0 top-full mt-1.5 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <button type="button" onclick="selectCustomOption('website_status', 'in_progress', 'code-2', 'text-blue-600', 'Sedang Dikerjakan (Tim Developer)')"
                            class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-blue-50/80 text-left transition group cursor-pointer">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                <i data-lucide="code-2" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <strong class="text-xs font-bold text-slate-900 block group-hover:text-blue-800">Sedang Dikerjakan</strong>
                                <span class="text-[11px] text-slate-500">Proses kustomisasi oleh tim developer</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">DIKERJAKAN</span>
                    </button>

                    <button type="button" onclick="selectCustomOption('website_status', 'deployed', 'rocket', 'text-emerald-600', 'Website Live (Selesai & Siap Diakses)')"
                            class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/80 text-left transition group cursor-pointer">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <i data-lucide="rocket" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <strong class="text-xs font-bold text-slate-900 block group-hover:text-emerald-800">Website Live (Selesai)</strong>
                                <span class="text-[11px] text-slate-500">Website online & siap diakses publik</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#166534]">LIVE</span>
                    </button>

                    <button type="button" onclick="selectCustomOption('website_status', 'maintenance', 'wrench', 'text-slate-600', 'Perbaikan Sementara (Maintenance)')"
                            class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 text-left transition group cursor-pointer">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                                <i data-lucide="wrench" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <strong class="text-xs font-bold text-slate-900 block group-hover:text-slate-800">Maintenance (Perbaikan)</strong>
                                <span class="text-[11px] text-slate-500">Website dalam pemeliharaan berkala</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">MAINTENANCE</span>
                    </button>
                </div>
            </div>

            <!-- Catatan Pembaruan Progres (Opsional untuk Histori Klien) -->
            <div>
                <label for="modal-notes" class="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Catatan Pembaruan untuk Klien (Opsional)</span>
                    <span class="text-[10px] text-slate-400 font-normal">Akan tercatat di riwayat progres klien</span>
                </label>
                <textarea name="notes" id="modal-notes" rows="2"
                          placeholder="Contoh: DNS domain telah terhubung ke IP hosting, sedang instalasi template website..."
                          class="w-full text-xs rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-slate-400 resize-none"></textarea>
            </div>

            <!-- Kontrol Notifikasi WhatsApp ke Klien (Opsi 1) -->
            <div id="modal-wa-toggle-container" class="p-3.5 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl flex items-start gap-3 transition">
                <div class="flex items-center h-5 mt-0.5">
                    <input type="checkbox" name="notify_client_whatsapp" id="modal-notify-client-whatsapp" value="1" checked
                           class="w-4 h-4 text-emerald-600 bg-white border-emerald-300 rounded focus:ring-emerald-500 focus:ring-2 cursor-pointer">
                </div>
                <div class="text-xs flex-1">
                    <label for="modal-notify-client-whatsapp" class="font-bold text-slate-800 cursor-pointer flex flex-wrap items-center gap-1.5">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
                        <span>Kirim notifikasi WhatsApp ke Klien</span>
                        <span id="modal-client-wa-badge" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/80">
                            <i data-lucide="phone" class="w-2.5 h-2.5 text-emerald-700"></i>
                            <span id="modal-client-wa-text">-</span>
                        </span>
                    </label>
                    <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Broadcast otomatis dikirim ke nomor WA klien (<strong id="modal-client-wa-desc" class="text-emerald-800 font-mono font-bold">-</strong>) jika status diubah ke <strong class="text-emerald-700">Domain Aktif</strong> atau <strong class="text-emerald-700">Website Live</strong>. Hilangkan centang jika Anda tidak ingin mengirim pesan ke klien.
                    </p>
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="closeStatusModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer">
                    <i data-lucide="x" class="w-3.5 h-3.5"></i>
                    <span>Batal</span>
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer">
                    <i data-lucide="save" class="w-4 h-4"></i>
                    <span>Simpan Perubahan</span>
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ================= MODAL 2: LIHAT INVOICE (FORMAT IDENTIK HALAMAN BAYAR) ================= -->
<div id="invoice-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 hidden overflow-y-auto">
    <div class="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        <!-- Top Bar Modal -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <i data-lucide="receipt" class="w-5 h-5"></i>
                </div>
                <div>
                    <h3 class="font-bold text-slate-900 text-lg">Invoice Resmi Pesanan</h3>
                    <p class="text-xs text-slate-500">Format resmi standar penagihan Bidtech (identik halaman bayar)</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <a id="inv-modal-download-btn" href="#" target="_blank" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-xs transition">
                    <i data-lucide="file-down" class="w-3.5 h-3.5"></i>
                    <span>Unduh PDF</span>
                </a>
                <a id="inv-modal-direct-btn" href="#" target="_blank" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition">
                    <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                    <span>Buka Web Bayar</span>
                </a>
                <button type="button" onclick="closeInvoiceModal()" class="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer">
                    ✕
                </button>
            </div>
        </div>

        <!-- Layout 2 Kolom Sesuai Halaman Bayar -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Kolom Kiri: Rincian & Tabel -->
            <div class="lg:col-span-8 space-y-5">
                <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4 text-xs sm:text-sm">
                    <div class="flex justify-between items-center">
                        <span class="text-slate-500">Nomor Invoice:</span>
                        <strong id="inv-modal-num" class="font-mono font-bold text-slate-900 text-sm">#BT-000</strong>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-slate-500">Tanggal Pesanan:</span>
                        <span id="inv-modal-date" class="font-medium text-slate-900">-</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-slate-500">Status Pembayaran:</span>
                        <span id="inv-modal-status-badge" class="font-bold uppercase text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">PAID</span>
                    </div>
                    <hr class="border-slate-200">
                    <div class="space-y-1.5">
                        <span class="text-xs font-bold text-slate-400 uppercase">Informasi Pemesan:</span>
                        <div class="flex justify-between"><span class="text-slate-500">Nama:</span><strong id="inv-modal-name" class="text-slate-900">-</strong></div>
                        <div class="flex justify-between"><span class="text-slate-500">Email:</span><strong id="inv-modal-email" class="text-slate-900 break-all">-</strong></div>
                        <div class="flex justify-between"><span class="text-slate-500">WhatsApp:</span><strong id="inv-modal-wa" class="text-slate-900 font-mono">-</strong></div>
                    </div>
                </div>

                <!-- Tabel Rincian 4 Item -->
                <div class="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                    <table class="w-full text-left">
                        <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                            <tr>
                                <th class="p-3">Layanan / Item</th>
                                <th class="p-3 text-center">Durasi</th>
                                <th class="p-3 text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr>
                                <td class="p-3">
                                    <strong id="inv-modal-tpl-name" class="font-bold text-slate-900 block">1. Lisensi Template</strong>
                                    <span id="inv-modal-tpl-desc" class="text-[11px] text-slate-500 block mt-0.5">Lisensi Desain UI/UX Eksklusif & Clean Code</span>
                                </td>
                                <td class="p-3 text-center text-slate-500">Selamanya</td>
                                <td id="inv-modal-tpl-price" class="p-3 text-right font-bold text-slate-900">Rp 0</td>
                            </tr>
                            <tr>
                                <td class="p-3">
                                    <strong class="font-bold text-slate-900 block">2. Cloud Server Hosting (1 Tahun)</strong>
                                    <span id="inv-modal-srv-desc" class="text-[11px] text-slate-500 block mt-0.5">High Speed NVMe & Free SSL</span>
                                </td>
                                <td class="p-3 text-center text-slate-500">1 Tahun</td>
                                <td id="inv-modal-srv-price" class="p-3 text-right font-bold text-slate-900">Rp 0</td>
                            </tr>
                            <tr>
                                <td class="p-3">
                                    <strong class="font-bold text-slate-900 block">3. Setup Deployment & Layanan Teknis</strong>
                                    <span id="inv-modal-lay-desc" class="text-[11px] text-slate-500 block mt-0.5">Setup domain & garansi teknis</span>
                                </td>
                                <td class="p-3 text-center text-slate-500">Instan</td>
                                <td id="inv-modal-lay-price" class="p-3 text-right font-bold text-slate-900">Rp 0</td>
                            </tr>
                            <tr>
                                <td class="p-3">
                                    <strong class="font-bold text-slate-900 block">4. Registrasi Domain</strong>
                                    <span id="inv-modal-dom-desc" class="text-[11px] text-slate-500 block mt-0.5">Registrasi domain resmi &bull; Termasuk PPN 11%</span>
                                </td>
                                <td id="inv-modal-dom-duration" class="p-3 text-center text-slate-500">1 Tahun</td>
                                <td id="inv-modal-dom-price" class="p-3 text-right font-bold text-slate-900">Rp 0</td>
                            </tr>
                            <tr id="inv-modal-promo-row" class="bg-emerald-50 hidden">
                                <td class="p-3">
                                    <strong id="inv-modal-promo-code" class="font-bold text-emerald-800 block">Potongan Diskon Promo</strong>
                                    <span class="text-[11px] text-emerald-700">Diskon kode promo resmi</span>
                                </td>
                                <td class="p-3 text-center font-bold text-emerald-700">Hemat</td>
                                <td id="inv-modal-promo-discount" class="p-3 text-right font-extrabold text-emerald-700">-Rp 0</td>
                            </tr>
                        </tbody>
                        <tfoot class="bg-slate-50/80 border-t border-slate-200">
                            <tr>
                                <td colspan="2" class="p-3.5 text-right font-bold text-slate-800 text-sm">Total Pembayaran:</td>
                                <td id="inv-modal-total-price" class="p-3.5 text-right font-black text-emerald-700 text-base">Rp 0</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <!-- Kolom Kanan: Mockup & Info Cepat -->
            <div class="lg:col-span-4 space-y-4">
                <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Preview Template</span>
                    <div class="aspect-[16/10] rounded-xl overflow-hidden bg-white border border-slate-200">
                        <img id="inv-modal-preview-img" src="" alt="Preview" class="w-full h-full object-cover object-top">
                    </div>
                    <div class="pt-2">
                        <span class="text-xs text-slate-500 block">Domain Proyek:</span>
                        <span id="inv-modal-domain-val" class="font-bold text-slate-900 text-xs font-mono">-</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endif

<script>
    function togglePeriodInputs(val) {
        const monthWrap = document.getElementById('filter-month-wrapper');
        const yearWrap = document.getElementById('filter-year-wrapper');
        if (val === 'monthly') {
            monthWrap.style.display = 'block';
            yearWrap.style.display = 'block';
        } else if (val === 'yearly') {
            monthWrap.style.display = 'none';
            yearWrap.style.display = 'block';
        } else {
            monthWrap.style.display = 'none';
            yearWrap.style.display = 'none';
        }
    }

    const statusOptionsMap = {
        order_status: {
            paid: { icon: 'check-circle-2', colorClass: 'text-emerald-600', label: 'Lunas (PAID) - Otomatis Buat Akun Klien' },
            unpaid: { icon: 'clock', colorClass: 'text-amber-600', label: 'Menunggu Pembayaran (UNPAID)' },
            invalid: { icon: 'x-circle', colorClass: 'text-rose-600', label: 'Kedaluwarsa / Dibatalkan (INVALID)' }
        },
        domain_status: {
            pending_registration: { icon: 'clock', colorClass: 'text-amber-600', label: 'Domain Diproses Tim Kami' },
            registered: { icon: 'globe', colorClass: 'text-emerald-600', label: 'Domain Aktif & Terhubung ke Server' }
        },
        website_status: {
            in_progress: { icon: 'code-2', colorClass: 'text-blue-600', label: 'Sedang Dikerjakan (Tim Developer)' },
            deployed: { icon: 'rocket', colorClass: 'text-emerald-600', label: 'Website Live (Selesai & Siap Diakses)' },
            maintenance: { icon: 'wrench', colorClass: 'text-slate-600', label: 'Perbaikan Sementara (Maintenance)' }
        }
    };

    function toggleCustomDropdown(name) {
        const menu = document.getElementById(`menu-${name}`);
        const chevron = document.getElementById(`chevron-${name}`);
        const isClosed = menu.classList.contains('hidden');
        
        closeAllCustomDropdowns();
        
        if (isClosed) {
            menu.classList.remove('hidden');
            if (chevron) chevron.classList.add('rotate-180');
        }
    }

    function closeAllCustomDropdowns() {
        ['order-status', 'domain-status', 'website-status'].forEach(name => {
            const menu = document.getElementById(`menu-${name}`);
            const chevron = document.getElementById(`chevron-${name}`);
            if (menu) menu.classList.add('hidden');
            if (chevron) chevron.classList.remove('rotate-180');
        });
    }

    function selectCustomOption(field, value, icon, colorClass, label) {
        const hyphenName = field.replace('_', '-');
        
        const hiddenInput = document.getElementById(`modal-${hyphenName}`);
        if (hiddenInput) {
            hiddenInput.value = value;
        }
        
        const iconSpan = document.getElementById(`selected-${hyphenName}-icon`);
        const labelSpan = document.getElementById(`selected-${hyphenName}-label`);
        
        if (iconSpan) {
            iconSpan.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 ${colorClass}"></i>`;
        }
        if (labelSpan) {
            labelSpan.innerText = label;
        }
        
        closeAllCustomDropdowns();
        if (field === 'order_status') {
            updateModalFieldsVisibility(value);
        }
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    function updateModalFieldsVisibility(orderStatus) {
        const warningBox = document.getElementById('modal-not-paid-notice');
        const domainSection = document.getElementById('dropdown-domain-status-container');
        const domainFinalSection = document.getElementById('domain-final-container');
        const websiteSection = document.getElementById('dropdown-website-status-container');
        const waContainer = document.getElementById('modal-wa-toggle-container');

        if (orderStatus === 'paid') {
            if (warningBox) warningBox.classList.add('hidden');
            if (waContainer) waContainer.classList.remove('hidden');
            [domainSection, domainFinalSection, websiteSection].forEach(el => {
                if (el) {
                    el.classList.remove('opacity-40', 'pointer-events-none');
                }
            });
        } else {
            if (warningBox) {
                warningBox.classList.remove('hidden');
                const warningText = document.getElementById('modal-not-paid-notice-text');
                if (warningText) {
                    warningText.innerText = orderStatus === 'invalid'
                        ? 'Pesanan BATAL / Kedaluwarsa. Status domain dan pengerjaan website tidak diproses (tampil strip - pada tabel).'
                        : 'Pesanan BELUM LUNAS. Status domain dan website akan aktif setelah pembayaran terverifikasi LUNAS.';
                }
            }
            if (waContainer) waContainer.classList.add('hidden');
            [domainSection, domainFinalSection, websiteSection].forEach(el => {
                if (el) {
                    el.classList.add('opacity-40', 'pointer-events-none');
                }
            });
        }
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('#dropdown-order-status-container') &&
            !e.target.closest('#dropdown-domain-status-container') &&
            !e.target.closest('#dropdown-website-status-container')) {
            closeAllCustomDropdowns();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeStatusModal();
            closeInvoiceModal();
        }
    });

    function openStatusModal(data) {
        const form = document.getElementById('status-update-form');
        form.action = `/dashboard/order/${data.id}/update-status`;
        document.getElementById('modal-order-number').innerText = data.order_number;
        document.getElementById('modal-client-name').innerText = data.full_name;
        
        const clientPhone = data.whatsapp || '-';
        if (document.getElementById('modal-client-wa-text')) {
            document.getElementById('modal-client-wa-text').innerText = clientPhone;
        }
        if (document.getElementById('modal-client-wa-desc')) {
            document.getElementById('modal-client-wa-desc').innerText = clientPhone;
        }
        if (document.getElementById('modal-client-phone-top-val')) {
            document.getElementById('modal-client-phone-top-val').innerText = clientPhone;
        }
        
        const ordVal = data.status || 'paid';
        const ordOpt = (statusOptionsMap.order_status && statusOptionsMap.order_status[ordVal]) || statusOptionsMap.order_status.paid;
        selectCustomOption('order_status', ordVal, ordOpt.icon, ordOpt.colorClass, ordOpt.label);

        const domVal = (!data.domain_status || data.domain_status === '-') ? 'pending_registration' : data.domain_status;
        const domOpt = (statusOptionsMap.domain_status && statusOptionsMap.domain_status[domVal]) || statusOptionsMap.domain_status.pending_registration;
        selectCustomOption('domain_status', domVal, domOpt.icon, domOpt.colorClass, domOpt.label);

        document.getElementById('modal-domain-final').value = data.domain_final || data.domain_name || '';

        const webVal = (!data.website_status || data.website_status === '-') ? 'in_progress' : data.website_status;
        const webOpt = (statusOptionsMap.website_status && statusOptionsMap.website_status[webVal]) || statusOptionsMap.website_status.in_progress;
        selectCustomOption('website_status', webVal, webOpt.icon, webOpt.colorClass, webOpt.label);

        if (document.getElementById('modal-notes')) {
            document.getElementById('modal-notes').value = '';
        }

        const waCheckbox = document.getElementById('modal-notify-client-whatsapp');
        if (waCheckbox) {
            waCheckbox.checked = true;
        }

        updateModalFieldsVisibility(ordVal);

        closeAllCustomDropdowns();
        document.getElementById('status-modal-backdrop').classList.remove('hidden');
        if (window.lucide) { lucide.createIcons(); }
    }

    function closeStatusModal() {
        closeAllCustomDropdowns();
        document.getElementById('status-modal-backdrop').classList.add('hidden');
    }

    function openInvoiceModal(data) {
        document.getElementById('inv-modal-num').innerText = data.order_number;
        document.getElementById('inv-modal-date').innerText = data.date_formatted;
        document.getElementById('inv-modal-name').innerText = data.full_name;
        document.getElementById('inv-modal-email').innerText = data.email;
        document.getElementById('inv-modal-wa').innerText = data.whatsapp;
        document.getElementById('inv-modal-tpl-name').innerText = '1. Lisensi Template Website: ' + data.template_name;
        document.getElementById('inv-modal-tpl-desc').innerText = data.template_desc;
        document.getElementById('inv-modal-srv-desc').innerText = data.server_desc;
        document.getElementById('inv-modal-lay-desc').innerText = data.service_desc;
        document.getElementById('inv-modal-dom-desc').innerText = data.is_own_domain
            ? 'Domain Milik Sendiri: ' + data.domain_name + ' • Konfigurasi DNS (Gratis)'
            : 'Registrasi Domain: ' + data.domain_name + ' • Termasuk PPN 11%';
        document.getElementById('inv-modal-dom-duration').innerText = data.is_own_domain ? '-' : data.domain_duration + ' Tahun';

        document.getElementById('inv-modal-tpl-price').innerText = 'Rp ' + Number(data.template_price).toLocaleString('id-ID');
        document.getElementById('inv-modal-srv-price').innerText = 'Rp ' + Number(data.server_price).toLocaleString('id-ID');
        document.getElementById('inv-modal-lay-price').innerText = 'Rp ' + Number(data.service_price).toLocaleString('id-ID');
        document.getElementById('inv-modal-dom-price').innerText = 'Rp ' + Number(data.domain_price).toLocaleString('id-ID');
        document.getElementById('inv-modal-total-price').innerText = 'Rp ' + Number(data.total_price).toLocaleString('id-ID');

        const promoRow = document.getElementById('inv-modal-promo-row');
        if (data.discount_amount > 0) {
            promoRow.classList.remove('hidden');
            document.getElementById('inv-modal-promo-code').innerText = 'Diskon Kode Promo (' + data.promo_code + ')';
            document.getElementById('inv-modal-promo-discount').innerText = '-Rp ' + Number(data.discount_amount).toLocaleString('id-ID');
        } else {
            promoRow.classList.add('hidden');
        }

        const statusBadge = document.getElementById('inv-modal-status-badge');
        if (data.status === 'paid') {
            statusBadge.className = 'font-bold uppercase text-xs px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534]';
            statusBadge.innerText = 'LUNAS (PAID)';
        } else if (data.status === 'invalid') {
            statusBadge.className = 'font-bold uppercase text-xs px-2.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#991B1B]';
            statusBadge.innerText = 'BATAL / EXPIRED';
        } else {
            statusBadge.className = 'font-bold uppercase text-xs px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E]';
            statusBadge.innerText = 'MENUNGGU BAYAR';
        }

        document.getElementById('inv-modal-preview-img').src = data.preview_url;
        document.getElementById('inv-modal-domain-val').innerText = data.domain_name;
        document.getElementById('inv-modal-download-btn').href = data.download_url;
        document.getElementById('inv-modal-direct-btn').href = data.direct_bayar_url;

        document.getElementById('invoice-modal-backdrop').classList.remove('hidden');
    }

    function closeInvoiceModal() {
        document.getElementById('invoice-modal-backdrop').classList.add('hidden');
    }
</script>
@endsection

