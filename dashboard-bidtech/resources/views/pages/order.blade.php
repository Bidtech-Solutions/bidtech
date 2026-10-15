@extends('layouts.dashboard')

@section('title', 'Detail & Invoice Pesanan - Bidtech')

@section('content')
<div class="max-w-7xl mx-auto space-y-6">
    <!-- Breadcrumb Navigasi Klien -->
    <div class="flex items-center gap-2 text-xs font-semibold text-ink-muted">
        <a href="{{ route('dashboard') }}" class="hover:text-ink transition flex items-center gap-1">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
            <span>Dashboard</span>
        </a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-primary font-bold">Detail Order & Invoice</span>
    </div>

    <div id="view-detail-order" class="page-view {{ request()->routeIs('dashboard.order*') ? 'active' : '' }} max-w-6xl">
    <!-- Top Header & Status Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
            <div class="flex items-center gap-2.5">
                <h1 class="text-2xl lg:text-3xl font-bold text-ink">Detail & Invoice Pesanan</h1>
                @php
                    $isOrderPaid = $order ? $order->isPaid() : true;
                    $isOrderExpired = $order ? ($order->isExpired() || $order->status === \App\Enums\OrderStatus::Invalid) : false;
                @endphp
                @if($isOrderPaid)
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#166534] border border-[#86efac]">
                        <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                        <span>LUNAS</span>
                    </span>
                @elseif($isOrderExpired)
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#fca5a5]">
                        <i data-lucide="x-circle" class="w-3.5 h-3.5"></i>
                        <span>KEDALUWARSA / BATAL</span>
                    </span>
                @else
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#fde68a]">
                        <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                        <span>MENUNGGU PEMBAYARAN</span>
                    </span>
                @endif
            </div>
            <p class="text-xs sm:text-sm text-ink-muted mt-1 font-mono">Invoice Resmi: {{ $orderNumber }}</p>
        </div>

        <div class="flex items-center gap-2.5 self-start sm:self-auto">
            <a href="{{ route('checkout.invoice.download', $orderNumber) }}" target="_blank" 
               class="inline-flex items-center gap-2 rounded-xl border border-primary bg-mint-soft hover:bg-primary hover:text-white px-4 py-2.5 text-xs sm:text-sm font-bold text-primary transition shadow-2xs cursor-pointer">
                <i data-lucide="file-down" class="w-4 h-4"></i>
                <span>Unduh Invoice (PDF)</span>
            </a>
        </div>
    </div>

    <!-- Main 2-Column Grid (Sesuai Struktur Halaman Bayar) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-6">

        <!-- ================= KOLOM KIRI (8 COLS): INFORMASI & RINCIAN PESANAN ================= -->
        <div class="lg:col-span-8 space-y-6">
            <div class="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">

                <!-- 1. Informasi Pesanan -->
                <div>
                    <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <h2 class="text-base font-bold text-ink flex items-center gap-2">
                            <i data-lucide="receipt" class="w-4 h-4 text-primary"></i>
                            <span>Informasi Pesanan</span>
                        </h2>
                    </div>
                    <div class="space-y-2 text-xs sm:text-sm">
                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">Nomor Invoice</span>
                            <div class="flex items-center gap-2 font-mono font-bold text-ink flex-1">
                                <span id="client-invoice-num">{{ $orderNumber }}</span>
                                <button type="button" onclick="navigator.clipboard.writeText('{{ $orderNumber }}'); alert('Nomor invoice berhasil disalin!');" 
                                        title="Salin Nomor Invoice" class="p-1 text-ink-muted hover:text-ink transition rounded cursor-pointer">
                                    <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </div>

                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">Tanggal Pesanan</span>
                            <span class="font-medium text-ink flex-1">
                                {{ $paidDateShort }}
                            </span>
                        </div>
                    </div>
                </div>

                <hr class="border-border">

                <!-- 2. Informasi Akun Pemesan -->
                <div>
                    <h2 class="text-base font-bold text-ink mb-3 flex items-center gap-2">
                        <i data-lucide="user-check" class="w-4 h-4 text-primary"></i>
                        <span>Informasi Akun Pemesan</span>
                    </h2>
                    <div class="space-y-2 text-xs sm:text-sm">
                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">Nama Lengkap</span>
                            <span class="font-semibold text-ink flex-1">: {{ $user->name }}</span>
                        </div>
                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">Alamat Email</span>
                            <span class="font-semibold text-ink flex-1 break-all">: {{ $user->email }}</span>
                        </div>
                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">No. WhatsApp</span>
                            <span class="font-semibold text-ink flex-1">: {{ $user->whatsapp }}</span>
                        </div>
                    </div>
                </div>

                <hr class="border-border">

                <!-- 3. Status Pembayaran & Status Transaksi -->
                <div class="space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 text-xs sm:text-sm">
                        <span class="text-ink-muted w-36 sm:w-44 shrink-0">Status Pembayaran</span>
                        <div class="flex-1 space-y-1">
                            @if($isOrderPaid)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DCFCE7] text-[#166534] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="check" class="w-3.5 h-3.5"></i>
                                    <span>PAID</span>
                                </span>
                                <p class="text-xs text-ink-muted">Pembayaran telah berhasil diverifikasi oleh sistem.</p>
                            @elseif($isOrderExpired)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#FEE2E2] text-[#991B1B] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
                                    <span>EXPIRED</span>
                                </span>
                                <p class="text-xs text-rose-600">Tagihan telah melewati batas waktu pembayaran.</p>
                            @else
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#FEF3C7] text-[#92400E] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                                    <span>UNPAID</span>
                                </span>
                                <p class="text-xs text-amber-700">Silakan selesaikan pembayaran sebelum batas waktu berakhir.</p>
                            @endif
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 text-xs sm:text-sm">
                        <span class="text-ink-muted w-36 sm:w-44 shrink-0">Status Transaksi</span>
                        <div class="flex-1 space-y-1">
                            @if($isOrderPaid)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DCFCE7] text-[#166534] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                                    <span>PROCESSED</span>
                                </span>
                                <p class="text-xs text-ink-muted">Pesanan dan konfigurasi website sedang aktif diproses.</p>
                            @elseif($isOrderExpired)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="ban" class="w-3.5 h-3.5"></i>
                                    <span>CANCELLED</span>
                                </span>
                                <p class="text-xs text-ink-muted">Pesanan dibatalkan atau kedaluwarsa.</p>
                            @else
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DBEAFE] text-[#1E40AF] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i>
                                    <span>PENDING</span>
                                </span>
                                <p class="text-xs text-ink-muted">Pesanan akan otomatis diproses segera setelah pembayaran lunas.</p>
                            @endif
                        </div>
                    </div>
                </div>

                <hr class="border-border">

                <!-- 4. Rincian Pesanan (Tabel) -->
                <div>
                    <h2 class="text-base font-bold text-ink mb-3 flex items-center gap-2">
                        <i data-lucide="clipboard-list" class="w-4 h-4 text-primary"></i>
                        <span>Rincian Pesanan</span>
                    </h2>
                    <div class="border border-border rounded-2xl overflow-hidden">
                        <table class="w-full text-left text-xs sm:text-sm">
                            <thead class="bg-canvas border-b border-border text-ink-muted font-bold">
                                <tr>
                                    <th class="p-3.5 sm:p-4">Layanan / Item</th>
                                    <th class="p-3.5 sm:p-4 text-center">Durasi</th>
                                    <th class="p-3.5 sm:p-4 text-right">Subtotal</th>
                                </tr>
                            </thead>
                    @php
                        $duration = (int) ($order?->domain_duration ?: 1);
                        $durationText = $duration . ' Tahun';
                        $templateDesc = $order?->template_desc ?? $template?->template_desc ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean';
                        $serverDesc = $order?->server_desc ?? $template?->server_desc ?? ('Cloud Server Hosting ' . $durationText . ', NVMe High Speed & Free SSL');
                        $serviceDesc = $order?->service_desc ?? $template?->service_desc ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan';
                        $pricePerYear = (int) round($domainPrice / max(1, $duration));
                        $packageSubtotal = $templatePrice + $serverPrice + $servicePrice;
                        $hasDiscount = !empty($discountAmount) && $discountAmount > 0;
                        $packagePromoPrice = max(0, $packageSubtotal - ($hasDiscount ? $discountAmount : 0));
                    @endphp

                    <div class="border border-border rounded-2xl overflow-hidden">
                        <table class="w-full text-left text-xs sm:text-sm">
                            <thead class="bg-canvas border-b border-border text-ink-muted font-bold">
                                <tr>
                                    <th class="p-3.5 sm:p-4">Layanan / Item</th>
                                    <th class="p-3.5 sm:p-4 text-center">Durasi</th>
                                    <th class="p-3.5 sm:p-4 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-ink block">
                                            1. Lisensi Template Website
                                        </strong>
                                        <span class="text-[11px] text-ink-muted block mt-0.5">
                                            {{ $templateDesc }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">-</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-ink">
                                        Rp{{ number_format($templatePrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-ink block">
                                            2. Cloud Server Hosting ({{ $durationText }})
                                        </strong>
                                        <span class="text-[11px] text-ink-muted block mt-0.5">
                                            {{ $serverDesc }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">{{ $durationText }}</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-ink">
                                        Rp{{ number_format($serverPrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-ink block">
                                            3. Setup Deployment & Layanan Teknis
                                        </strong>
                                        <span class="text-[11px] text-ink-muted block mt-0.5">
                                            {{ $serviceDesc }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">-</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-ink">
                                        Rp{{ number_format($servicePrice, 0, ',', '.') }}
                                    </td>
                                </tr>

                                <!-- Subtotal 3 Item -->
                                <tr class="bg-slate-50/70">
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-ink block">
                                            Subtotal 3 Item
                                        </strong>
                                        <span class="text-[11px] text-ink-muted block mt-0.5">
                                            Akumulasi 3 komponen website sebelum diskon
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">3 Item</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-ink">
                                        Rp{{ number_format($packageSubtotal, 0, ',', '.') }}
                                    </td>
                                </tr>

                                @if($hasDiscount)
                                    <!-- Potongan Diskon Promo -->
                                    <tr class="bg-[#F2FBF5]">
                                        <td class="p-3.5 sm:p-4">
                                            <div class="flex items-center text-[#166534] font-semibold gap-1.5">
                                                <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0"></span>
                                                <strong>Potongan Diskon Promo ({{ $order?->promo_code }})</strong>
                                                @if($order?->is_partner_order && !empty($order?->partner_name))
                                                    <span class="ml-2 inline-flex items-center gap-1 rounded-md bg-white border border-[#22C55E] px-2 py-0.5 text-[10px] font-bold text-[#1E7A53]">
                                                        Mitra: {{ $order?->partner_name }}
                                                    </span>
                                                @endif
                                            </div>
                                        </td>
                                        <td class="p-3.5 sm:p-4 text-center text-[#166534] font-bold">Hemat</td>
                                        <td class="p-3.5 sm:p-4 text-right font-extrabold text-[#166534]">
                                            -Rp{{ number_format($discountAmount, 0, ',', '.') }}
                                        </td>
                                    </tr>

                                    <!-- Total 3 Item Setelah Diskon: High-End Highlight Bar -->
                                    <tr class="bg-gradient-to-r from-[#F0FDF4] via-[#F2FBF5] to-[#ECFDF5] border-t-2 border-b-2 border-[#A7F3D0]">
                                        <td class="p-3.5 sm:p-4">
                                            <strong class="font-bold text-[#065F46] block">
                                                Total 3 Item Setelah Diskon
                                            </strong>
                                            <span class="text-[11px] text-[#047857] block mt-0.5">
                                                Paket Website (Template + Server + Service) setelah diskon voucher
                                            </span>
                                        </td>
                                        <td class="p-3.5 sm:p-4 text-center text-[#065F46] font-bold">3 Item</td>
                                        <td class="p-3.5 sm:p-4 text-right font-black text-[#065F46] text-sm sm:text-base tabular-nums">
                                            Rp{{ number_format($packagePromoPrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                @endif

                                <!-- Item 4: Domain -->
                                <tr>
                                    @if((int)$domainPrice === 0)
                                        <td class="p-3.5 sm:p-4">
                                            <strong class="font-bold text-ink block">
                                                4. Setup Domain Milik Sendiri
                                            </strong>
                                            <span class="text-[11px] text-blue-600 font-medium block mt-0.5">
                                                {{ $domainName }} &bull; Konfigurasi DNS Server (Gratis)
                                            </span>
                                        </td>
                                        <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">-</td>
                                        <td class="p-3.5 sm:p-4 text-right font-bold text-primary tabular-nums">
                                            Rp0
                                        </td>
                                    @else
                                        <td class="p-3.5 sm:p-4">
                                            <strong class="font-bold text-ink block">
                                                4. Registrasi Domain ({{ $durationText }})
                                            </strong>
                                            <span class="text-[11px] text-ink-muted block mt-0.5">
                                                <strong class="text-ink font-semibold">{{ $domainName }}</strong> &bull; Rp{{ number_format($pricePerYear, 0, ',', '.') }}/thn &bull; Termasuk PPN 11%
                                            </span>
                                        </td>
                                        <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">{{ $durationText }}</td>
                                        <td class="p-3.5 sm:p-4 text-right font-bold text-ink tabular-nums">
                                            Rp{{ number_format($domainPrice, 0, ',', '.') }}
                                        </td>
                                    @endif
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Total Biaya Pembayaran Baris Besar -->
                    <div class="flex items-baseline justify-between pt-5 border-t-2 border-dashed border-[#E4E9E6] mt-4">
                        <div>
                            <span class="text-base font-bold text-ink block">Total Biaya Pembayaran</span>
                            <div class="flex items-center gap-1.5 text-xs text-ink-muted mt-1">
                                <svg class="size-4 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                </svg>
                                <span>Sudah termasuk PPN 11% & garansi pengerjaan</span>
                            </div>
                        </div>
                        <strong class="text-3xl sm:text-4xl font-black text-[#046A38] tabular-nums tracking-tight">
                            Rp{{ number_format($totalPaid, 0, ',', '.') }}
                        </strong>
                    </div>
                </div>

                <!-- 5. Blue Info Box -->
                <div class="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 flex items-start gap-3 text-xs text-slate-800">
                    <div class="flex size-5 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[10px] shrink-0 mt-0.5">
                        i
                    </div>
                    <div>
                        <strong class="block font-bold">Verifikasi Sistem Otomatis</strong>
                        <span class="text-slate-600">Seluruh komponen layanan website, server cloud, dan registrasi domain Anda telah dicatat dalam database resmi Bidtech.</span>
                    </div>
                </div>
            </div>

            <!-- Card Riwayat Pembaruan Status Proyek (Linimasa Audit & Aktivitas Tim) -->
            <div class="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
                    <div>
                        <h2 class="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                            <i data-lucide="history" class="w-5 h-5 text-primary"></i>
                            <span>Riwayat Pembaruan Status Domain & Website</span>
                        </h2>
                        <p class="text-xs text-ink-muted mt-0.5">Catatan audit dan linimasa aktivitas teknis dari tim pengembang Bidtech.</p>
                    </div>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary-100 text-primary-800 border border-primary-200/50 self-start sm:self-auto shrink-0">
                        {{ !empty($statusHistories) ? $statusHistories->count() : 0 }} Aktivitas
                    </span>
                </div>

                @if(!empty($statusHistories) && $statusHistories->isNotEmpty())
                    <div class="relative space-y-6 pl-3">
                        @foreach($statusHistories as $idx => $hist)
                            <div class="relative flex items-start gap-4">
                                <!-- Icon Circle Indicator -->
                                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 shadow-xs {{ $hist->status_to === 'deployed' || $hist->status_to === 'registered' || $hist->status_to === 'paid' ? 'bg-success text-white' : ($hist->status_to === 'in_progress' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white') }}">
                                    <i data-lucide="{{ $hist->icon() }}" class="w-4 h-4"></i>
                                </div>

                                @if(!$loop->last)
                                    <div class="w-0.5 bg-border absolute left-4 top-8 -bottom-6"></div>
                                @endif

                                <div class="flex-1 bg-canvas/60 border border-border/80 rounded-2xl p-4 transition hover:border-primary/30">
                                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-border/50">
                                        <div class="flex items-center gap-2 flex-wrap">
                                            <span class="text-xs font-bold text-ink">{{ $hist->typeLabel() }}</span>
                                            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border {{ $hist->badgeClasses() }}">
                                                <span>{{ $hist->statusToLabel() }}</span>
                                            </span>
                                        </div>
                                        <span class="text-[11px] font-medium text-ink-muted shrink-0 flex items-center gap-1">
                                            <i data-lucide="clock" class="w-3 h-3 text-ink-muted/70"></i>
                                            <span>{{ $hist->created_at ? $hist->created_at->locale('id')->translatedFormat('d M Y, H:i') . ' WIB' : '-' }}</span>
                                        </span>
                                    </div>

                                    @if($hist->notes)
                                        <p class="text-xs text-ink/90 mt-2 leading-relaxed bg-surface/70 p-2.5 rounded-xl border border-border/60">
                                            {{ $hist->notes }}
                                        </p>
                                    @endif

                                    <div class="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-border/40 text-[11px] text-ink-muted">
                                        <span class="flex items-center gap-1">
                                            <i data-lucide="user-check" class="w-3 h-3 text-primary"></i>
                                            <span>Diperbarui oleh: <strong class="text-ink font-semibold">{{ $hist->user?->name ?? 'Tim Teknis Bidtech' }}</strong></span>
                                        </span>
                                        <span class="text-[10px] text-ink-muted/70">
                                            {{ $hist->created_at ? $hist->created_at->diffForHumans() : '' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <!-- Fallback informatif jika belum ada catatan update manual dari admin -->
                    <div class="rounded-2xl border border-dashed border-border bg-canvas/40 p-6 text-center space-y-2">
                        <div class="w-10 h-10 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center mx-auto mb-2">
                            <i data-lucide="activity" class="w-5 h-5 text-primary-700"></i>
                        </div>
                        <h4 class="text-sm font-bold text-ink">Pembaruan Progres Otomatis Aktif</h4>
                        <p class="text-xs text-ink-muted max-w-md mx-auto leading-relaxed">
                            Domain <span class="font-semibold text-ink">{{ $domainName }}</span> dan pengerjaan website Anda terpantau aktif oleh sistem. Setiap perubahan status konfigurasi serta catatan dari Tim IT akan otomatis tercatat pada linimasa ini.
                        </p>
                        <div class="pt-2 flex items-center justify-center gap-2">
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-success-surface text-primary-800 border border-primary/20">
                                <i data-lucide="check" class="w-3 h-3 text-primary-700"></i>
                                <span>Pesanan Diterima ({{ $paidDateShort }})</span>
                            </span>
                        </div>
                    </div>
                @endif
            </div>
        </div>

        <!-- ================= KOLOM KANAN (4 COLS): DETAIL TEMPLATE & SUPPORT ================= -->
        <div class="lg:col-span-4 space-y-6">

            <!-- Card 1: Detail Template Website -->
            <div class="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-bold text-ink">
                        Detail Desain Website
                    </h3>
                    @if(!empty($template))
                        <a href="{{ $template->landing_url }}" target="_blank" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
                            <span>Lihat Demo</span>
                            <i data-lucide="external-link" class="w-3 h-3"></i>
                        </a>
                    @endif
                </div>

                <!-- Gambar Preview Mockup Website -->
                <div class="overflow-hidden rounded-2xl border border-border bg-canvas aspect-[16/10]">
                    @if($template && $template->preview)
                        <img src="{{ $template->preview_url }}" alt="{{ $template->name }}" class="h-full w-full object-cover">
                    @else
                        <div class="flex h-full w-full items-center justify-center text-xs text-ink-muted">
                            Preview tidak tersedia
                        </div>
                    @endif
                </div>

                <!-- Info Template & Domain -->
                <div class="space-y-3 pt-1">
                    <div>
                        <h4 class="text-base font-bold text-ink leading-snug">
                            {{ $template?->name ?? 'Pilihan Template Website' }}
                        </h4>
                        <p class="text-xs text-ink-muted mt-0.5">
                            Kategori: {{ $template?->category ?? 'Bisnis & Profesional' }}
                        </p>
                    </div>

                    <div class="pt-3 border-t border-border space-y-2 text-xs">
                        <div class="flex items-center justify-between">
                            <span class="text-ink-muted">Domain Proyek:</span>
                            <a href="https://{{ $domainName }}" target="_blank" rel="noopener noreferrer" class="font-bold text-ink hover:text-primary flex items-center gap-1">
                                <span>{{ $domainName }}</span>
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                            </a>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-ink-muted">Status Domain:</span>
                            <div class="text-right">
                                @if($isDomainRegistered)
                                    <span class="bg-success-surface text-success px-2.5 py-0.5 rounded-full text-[11px] font-bold">Domain Aktif</span>
                                    @if(!empty($domainRegisteredAtFormatted))
                                        <div class="text-[10px] text-ink-muted mt-0.5 font-mono">{{ $domainRegisteredAtFormatted }}</div>
                                    @endif
                                @else
                                    <span class="bg-warning-surface text-warning px-2.5 py-0.5 rounded-full text-[11px] font-bold">Diproses Tim</span>
                                @endif
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-ink-muted">Status Website:</span>
                            <div class="text-right">
                                @if($isWebsiteLive)
                                    <span class="bg-success-surface text-success px-2.5 py-0.5 rounded-full text-[11px] font-bold">Website Live</span>
                                    @if(!empty($websiteLiveAtFormatted))
                                        <div class="text-[10px] text-ink-muted mt-0.5 font-mono">{{ $websiteLiveAtFormatted }}</div>
                                    @endif
                                @elseif($isWebsiteInProgress)
                                    <span class="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Dikerjakan</span>
                                    @if(!empty($websiteProgressAtFormatted))
                                        <div class="text-[10px] text-ink-muted mt-0.5 font-mono">{{ $websiteProgressAtFormatted }}</div>
                                    @endif
                                @else
                                    <span class="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Maintenance</span>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2: Bantuan & Support Tim IT -->
            <div class="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
                <h3 class="text-base font-bold text-ink">Bantuan Layanan</h3>
                <p class="text-xs text-ink-muted">
                    Membutuhkan penyesuaian domain, email profesional, atau konsultasi teknis terkait website Anda?
                </p>
                <a href="https://wa.me/6281234567890?text={{ urlencode('Halo Tim IT Bidtech, saya ingin berkonsultasi mengenai invoice & pesanan website saya #' . $orderNumber) }}" 
                   target="_blank" 
                   class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold text-xs py-3 px-4 shadow-xs transition">
                    <i data-lucide="message-circle" class="w-4 h-4"></i>
                    <span>Hubungi Support via WhatsApp</span>
                </a>
            </div>

        </div>
    </div>
</div>

</div>
@endsection
