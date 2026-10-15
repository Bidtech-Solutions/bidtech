@extends('layouts.dashboard')

@section('title', !empty($isAdmin) && $isAdmin ? 'Admin Dashboard - Bidtech' : ((!empty($isMarketing) && $isMarketing) ? 'Marketing Dashboard - Bidtech' : 'Dashboard Klien - Bidtech'))

@section('content')

<div class="max-w-7xl mx-auto space-y-8">
    {{-- Top Header --}}
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <div class="flex items-center gap-2.5">
                <h1 class="text-2xl lg:text-3xl font-bold text-ink">Halo, {{ $firstName }}</h1>
                @if(!empty($isAdmin) && $isAdmin)
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-800 border border-primary-200/50">
                        <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                        <span>Administrator</span>
                    </span>
                @elseif(!empty($isMarketing) && $isMarketing)
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200/50">
                        <i data-lucide="badge-percent" class="w-3.5 h-3.5"></i>
                        <span>Divisi Marketing</span>
                    </span>
                @endif
            </div>
            <p class="text-sm text-ink-muted mt-1">
                @if(!empty($isAdmin) && $isAdmin)
                    Selamat datang di panel kontrol utama Bidtech. Pantau pesanan klien dan kelola modul sistem.
                @elseif(!empty($isMarketing) && $isMarketing)
                    Pantau kinerja konversi, pertumbuhan nasabah terdaftar, dan tindak lanjuti pesanan nasabah Bidtech.
                @else
                    Ini progres website <a href="{{ $domainUrl }}" target="_blank" rel="noopener noreferrer" class="font-bold text-ink hover:text-primary hover:underline transition inline-flex items-center gap-1" title="Buka website">{{ $domainName }}<i data-lucide="external-link" class="w-3.5 h-3.5 text-ink-muted"></i></a> kamu
                @endif
            </p>
        </div>
        <div class="flex items-center gap-3 self-start sm:self-auto bg-surface sm:bg-transparent p-2.5 sm:p-0 rounded-2xl border sm:border-0 border-border">
            <div class="w-10 h-10 rounded-full bg-success-surface text-primary font-bold flex items-center justify-center text-sm shrink-0">
                {{ $initials }}
            </div>
            <div>
                <div class="text-sm font-semibold text-ink leading-tight flex items-center gap-1.5">
                    {{ $user->name }}
                </div>
                <div class="text-xs text-ink-muted">{{ $user->email }}</div>
            </div>
        </div>
    </div>

    @if(!empty($isAdmin) && $isAdmin)
        <!-- Notifikasi Flash Message -->
        @if(session('success'))
            <div class="mt-6 p-4 rounded-2xl bg-success-surface border border-primary/30 text-forest flex items-center justify-between text-sm font-semibold shadow-xs">
                <div class="flex items-center gap-2.5">
                    <i data-lucide="check-circle-2" class="w-5 h-5 text-primary-700"></i>
                    <span>{{ session('success') }}</span>
                </div>
                <button type="button" onclick="this.parentElement.remove()" class="text-primary-800 hover:text-primary-950 cursor-pointer p-1">✕</button>
            </div>
        @endif

        <div class="mt-8 space-y-8">
            <!-- ================= 1. EXECUTIVE WELCOME & QUICK ACTION BAR ================= -->
            <div class="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-primary/25"
                 style="background: linear-gradient(135deg, #0B1B17 0%, #0E2502 55%, #153306 100%);">
                <div class="absolute -right-12 -bottom-12 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                     style="background: radial-gradient(circle, rgba(99, 224, 9, 0.22) 0%, transparent 70%);"></div>
                <div class="absolute -left-12 -top-12 w-56 h-56 rounded-full blur-2xl pointer-events-none"
                     style="background: radial-gradient(circle, rgba(99, 224, 9, 0.12) 0%, transparent 70%);"></div>

                <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div class="space-y-2.5 max-w-2xl">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30 backdrop-blur-xs">
                            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-primary"></i>
                            <span>Bidtech Administrator Workspace</span>
                        </span>
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                            Selamat Datang di <span class="text-primary">Dashboard Admin</span>
                        </h1>
                        <p class="text-slate-200/90 text-sm leading-relaxed">
                            Pantau ringkasan pendapatan omzet, performa penjualan template, dan aktivitas pesanan klien secara terpusat. Untuk manajemen transaksi & update status manual klien, silakan buka menu Kelola Pesanan.
                        </p>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                        <a href="{{ route('dashboard.order') }}"
                           class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-ink font-extrabold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all transform hover:-translate-y-0.5 cursor-pointer">
                            <i data-lucide="shopping-bag" class="w-4 h-4 text-ink"></i>
                            <span>Buka Kelola Pesanan</span>
                            <i data-lucide="arrow-right" class="w-4 h-4 text-ink"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- ================= 2. EXECUTIVE KPI BENTO CARDS ================= -->
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Total Omzet Lunas</span>
                        <div class="w-10 h-10 rounded-2xl bg-success-surface text-primary-800 flex items-center justify-center">
                            <i data-lucide="wallet" class="w-5 h-5 text-primary-700"></i>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-xl sm:text-2xl font-extrabold text-primary truncate">
                            Rp {{ number_format($adminStats['total_omzet'], 0, ',', '.') }}
                        </p>
                        <p class="text-[11px] text-ink-muted mt-0.5">
                            {{ $adminStats['paid_orders'] }} Transaksi Lunas
                        </p>
                    </div>
                </div>

                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Total Pesanan</span>
                        <div class="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                            <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-xl sm:text-2xl font-extrabold text-ink">
                            {{ $adminStats['total_orders'] }}
                        </p>
                        <p class="text-[11px] text-ink-muted mt-0.5">
                            <span class="text-primary-800 font-semibold">{{ $adminStats['paid_orders'] }} Lunas</span> &bull;
                            <span class="text-amber-700 font-semibold">{{ $adminStats['unpaid_orders'] }} Pending</span>
                        </p>
                    </div>
                </div>

                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Klien Terdaftar</span>
                        <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                            <i data-lucide="users" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-xl sm:text-2xl font-extrabold text-ink">
                            {{ $adminStats['total_users'] }}
                        </p>
                        <p class="text-[11px] text-ink-muted mt-0.5">
                            Pengguna portal klien
                        </p>
                    </div>
                </div>

                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Katalog Template</span>
                        <div class="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                            <i data-lucide="layout-template" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-xl sm:text-2xl font-extrabold text-ink">
                            {{ $adminStats['active_templates'] }}
                        </p>
                        <p class="text-[11px] text-ink-muted mt-0.5 flex items-center gap-1">
                            <span class="inline-flex items-center gap-1 font-semibold text-purple-700"><i data-lucide="eye" class="w-3 h-3"></i><span id="dashboard-total-views">{{ number_format($adminStats['total_views'] ?? 0, 0, ',', '.') }}</span> Dilihat</span>
                            <span>&bull; {{ $adminStats['total_templates'] }} Master</span>
                        </p>
                    </div>
                </div>

                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Kode Promo Aktif</span>
                        <div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                            <i data-lucide="ticket-percent" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-xl sm:text-2xl font-extrabold text-ink">
                            {{ $adminStats['active_promos'] }}
                        </p>
                        <p class="text-[11px] text-ink-muted mt-0.5">
                            Dari {{ $adminStats['total_promos'] }} voucher & promo
                        </p>
                    </div>
                </div>
            </div>

            <!-- ================= 3. QUICK NAVIGATION SHORTCUTS ================= -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <a href="{{ route('dashboard.order') }}"
                   class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-canvas transition group flex items-center gap-3.5">
                    <div class="w-10 h-10 rounded-xl bg-primary-50 text-primary-800 group-hover:bg-primary group-hover:text-ink flex items-center justify-center transition">
                        <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs font-bold text-ink group-hover:text-primary transition truncate">Kelola Pesanan</p>
                        <p class="text-[11px] text-ink-muted truncate">Daftar & status klien</p>
                    </div>
                </a>

                <a href="{{ route('dashboard.templates.index') }}"
                   class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-canvas transition group flex items-center gap-3.5">
                    <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition">
                        <i data-lucide="layout-template" class="w-5 h-5"></i>
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs font-bold text-ink group-hover:text-primary transition truncate">Katalog Template</p>
                        <p class="text-[11px] text-ink-muted truncate">Master & statistik penayangan</p>
                    </div>
                </a>

                <a href="{{ route('dashboard.promos.index') }}"
                   class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-canvas transition group flex items-center gap-3.5">
                    <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition">
                        <i data-lucide="ticket-percent" class="w-5 h-5"></i>
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs font-bold text-ink group-hover:text-primary transition truncate">Kode Promo</p>
                        <p class="text-[11px] text-ink-muted truncate">Diskon & kuota promo</p>
                    </div>
                </a>

                <a href="{{ route('dashboard.partners.index') }}"
                   class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-canvas transition group flex items-center gap-3.5">
                    <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition">
                        <i data-lucide="users" class="w-5 h-5"></i>
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs font-bold text-ink group-hover:text-primary transition truncate">Mitra & Komisi</p>
                        <p class="text-[11px] text-ink-muted truncate">Afiliasi & penarikan</p>
                    </div>
                </a>
            </div>

            <!-- ================= 4. TEMPLATE TERLARIS LEADERBOARD ================= -->
            @if(!empty($adminStats['top_templates']) && $adminStats['top_templates']->count() > 0)
            <div class="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
                    <div>
                        <h2 class="font-bold text-ink text-base sm:text-lg flex items-center gap-2">
                            <i data-lucide="trophy" class="w-5 h-5 text-amber-500"></i>
                            <span>Performa Penjualan: Template Paling Laku</span>
                        </h2>
                        <p class="text-xs text-ink-muted mt-0.5">Daftar template website dengan penjualan tertinggi di sistem.</p>
                    </div>
                    <a href="{{ route('dashboard.templates.index', ['sort' => 'sales']) }}" class="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline self-start sm:self-auto">
                        <span>Lihat Katalog Lengkap</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    @foreach($adminStats['top_templates'] as $idx => $tt)
                        <div class="bg-canvas border border-border rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-primary/40 transition">
                            <div class="flex items-center gap-3">
                                <div class="w-7 h-7 rounded-lg {{ $idx === 0 ? 'bg-amber-400 text-slate-950 font-black' : ($idx === 1 ? 'bg-slate-300 text-slate-900 font-bold' : ($idx === 2 ? 'bg-amber-700 text-white font-bold' : 'bg-surface text-ink-muted font-bold')) }} flex items-center justify-center text-xs shrink-0 shadow-2xs">
                                    #{{ $idx + 1 }}
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h3 class="text-xs font-bold text-ink truncate" title="{{ $tt->name }}">{{ $tt->name }}</h3>
                                    <p class="text-[11px] text-ink-muted truncate">{{ $tt->category }}</p>
                                </div>
                            </div>

                            <div class="aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-border">
                                <img src="{{ $tt->preview_url }}" alt="{{ $tt->name }}" class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300">
                            </div>

                            <div class="pt-2 border-t border-border flex items-center justify-between gap-1 text-[11px]">
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200/50" title="Total dilihat / diklik pengunjung">
                                        <i data-lucide="eye" class="w-3 h-3 text-purple-600"></i>
                                        <span class="template-view-badge" data-template-id="{{ $tt->id }}">{{ number_format($tt->views ?? 0, 0, ',', '.') }}</span>
                                    </span>
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold bg-success-surface text-primary-800 border border-primary/20" title="Total pesanan lunas">
                                        <i data-lucide="shopping-bag" class="w-3 h-3 text-primary-700"></i>
                                        <span>{{ $tt->sales_count }} Laku</span>
                                    </span>
                                </div>
                                <span class="font-mono font-bold text-ink shrink-0">
                                    Rp {{ number_format($tt->price, 0, ',', '.') }}
                                </span>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            @endif

            <!-- ================= 5. PESANAN KLIEN TERBARU ================= -->
            <div class="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                    <div>
                        <h2 class="font-bold text-ink text-base sm:text-lg flex items-center gap-2">
                            <i data-lucide="clock" class="w-5 h-5 text-primary"></i>
                            <span>Pesanan Klien Terbaru</span>
                        </h2>
                        <p class="text-xs text-ink-muted mt-0.5">5 transaksi pesanan terakhir yang masuk ke dalam sistem.</p>
                    </div>
                    <a href="{{ route('dashboard.order') }}" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-ink font-bold text-xs shadow-xs transition cursor-pointer self-start sm:self-auto">
                        <span>Buka Semua Pesanan ({{ $adminStats['total_orders'] }})</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-border">
                    <table class="w-full text-left text-xs sm:text-sm text-ink-muted">
                        <thead class="text-[11px] uppercase font-bold text-ink bg-canvas border-b border-border tracking-wider">
                            <tr>
                                <th class="py-3 px-3.5">No. Order & Tanggal</th>
                                <th class="py-3 px-3.5">Pemesan</th>
                                <th class="py-3 px-3.5">Template / Domain</th>
                                <th class="py-3 px-3.5 text-center">Status Pembayaran</th>
                                <th class="py-3 px-3.5 text-right">Total</th>
                                <th class="py-3 px-3.5 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            @forelse($adminStats['recent_orders'] as $ro)
                                @php
                                    $sVal = $ro->status->value ?? $ro->status;
                                @endphp
                                <tr class="hover:bg-canvas/60 transition">
                                    <td class="py-3.5 px-3.5">
                                        <p class="font-mono font-bold text-xs text-ink">{{ $ro->order_number }}</p>
                                        <p class="text-[11px] text-ink-muted mt-0.5">{{ $ro->created_at ? $ro->created_at->format('d M Y, H:i') : '-' }}</p>
                                    </td>
                                    <td class="py-3.5 px-3.5">
                                        <p class="font-bold text-xs text-ink">{{ $ro->full_name }}</p>
                                        <p class="text-[11px] text-ink-muted truncate max-w-[140px]">{{ $ro->email }}</p>
                                    </td>
                                    <td class="py-3.5 px-3.5">
                                        <p class="text-xs font-semibold text-ink">{{ $ro->template?->name ?? 'Template Website' }}</p>
                                        <p class="text-[11px] text-primary font-bold flex items-center gap-1">
                                            <i data-lucide="globe" class="w-3 h-3"></i>
                                            <span>{{ $ro->domain_final ?: $ro->domain_name }}</span>
                                        </p>
                                    </td>
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
                                    <td class="py-3.5 px-3.5 text-right font-mono font-bold text-xs text-ink">
                                        Rp {{ number_format($ro->total_price, 0, ',', '.') }}
                                    </td>
                                    <td class="py-3.5 px-3.5 text-center">
                                        <a href="{{ route('dashboard.order', ['search' => $ro->order_number]) }}"
                                           class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary-50 text-primary-800 hover:bg-primary-100 text-xs font-semibold transition"
                                           title="Kelola Pesanan Ini">
                                            <span>Kelola</span>
                                            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="py-10 text-center text-ink-muted">
                                        <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 text-ink-muted/50"></i>
                                        <p class="font-medium text-sm">Belum ada pesanan terbaru.</p>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div class="pt-2 text-center">
                    <a href="{{ route('dashboard.order') }}" class="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
                        <span>Buka Halaman Kelola Pesanan Klien untuk Mengubah Status & Download Invoice</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>
            </div>
    @elseif(!empty($isMarketing) && $isMarketing)
        <!-- Flash Message Alerts -->
        @if(session('success'))
            <div class="mt-6 p-4 rounded-2xl bg-success-surface border border-primary/30 text-forest flex items-center justify-between text-sm font-semibold shadow-xs">
                <div class="flex items-center gap-2.5">
                    <i data-lucide="check-circle-2" class="w-5 h-5 text-primary-700"></i>
                    <span>{{ session('success') }}</span>
                </div>
                <button type="button" onclick="this.parentElement.remove()" class="text-primary-800 hover:text-primary-950 cursor-pointer p-1">✕</button>
            </div>
        @endif

        <div class="mt-8 space-y-8">
            <!-- ================= 1. MARKETING WELCOME & QUICK ACTION BANNER ================= -->
            <div class="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-500/20"
                 style="background: linear-gradient(135deg, #091D17 0%, #0D2636 50%, #0F3B2E 100%);">
                <div class="absolute -right-12 -bottom-12 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                     style="background: radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, transparent 70%);"></div>
                <div class="absolute -left-12 -top-12 w-56 h-56 rounded-full blur-2xl pointer-events-none"
                     style="background: radial-gradient(circle, rgba(99, 224, 9, 0.15) 0%, transparent 70%);"></div>

                <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div class="space-y-2.5 max-w-2xl">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-xs">
                            <i data-lucide="badge-percent" class="w-3.5 h-3.5 text-blue-300"></i>
                            <span>Portal Divisi Pemasaran & Penjualan</span>
                        </span>
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                            Dashboard Tim <span class="text-primary">Marketing</span>
                        </h1>
                        <p class="text-slate-200/90 text-sm leading-relaxed">
                            Pantau akuisisi nasabah baru, ringkasan transaksi pesanan, serta unduh invoice resmi pesanan untuk kebutuhan transaksi nasabah.
                        </p>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                        <a href="{{ route('dashboard.order') }}"
                           class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-ink font-extrabold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all transform hover:-translate-y-0.5 cursor-pointer">
                            <i data-lucide="users" class="w-4 h-4 text-ink"></i>
                            <span>Kelola Data Nasabah</span>
                            <i data-lucide="arrow-right" class="w-4 h-4 text-ink"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- ================= 2. MARKETING KPI METRIC CARDS ================= -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <!-- Total Nasabah -->
                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Total Nasabah</span>
                        <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                            <i data-lucide="users" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-2xl sm:text-3xl font-extrabold text-ink">
                            {{ number_format($marketingStats['total_nasabah']) }}
                        </p>
                        <div class="flex items-center gap-1.5 mt-1.5">
                            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-success-surface text-primary-800">
                                <i data-lucide="trending-up" class="w-3 h-3 text-primary-700"></i>
                                +{{ $marketingStats['new_nasabah_month'] }}
                            </span>
                            <span class="text-[11px] text-ink-muted">Nasabah bulan ini</span>
                        </div>
                    </div>
                </div>

                <!-- Total Omzet Penjualan -->
                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Total Omzet Lunas</span>
                        <div class="w-10 h-10 rounded-2xl bg-success-surface text-primary-800 flex items-center justify-center">
                            <i data-lucide="wallet" class="w-5 h-5 text-primary-700"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-xl sm:text-2xl font-extrabold text-primary truncate">
                            Rp {{ number_format($marketingStats['total_omzet'], 0, ',', '.') }}
                        </p>
                        <p class="text-[11px] text-ink-muted mt-1.5">
                            {{ $marketingStats['paid_orders'] }} Transaksi Berhasil
                        </p>
                    </div>
                </div>

                <!-- Menunggu Bayar (Leads Follow-Up) -->
                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Menunggu Bayar</span>
                        <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                            <i data-lucide="clock" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-2xl sm:text-3xl font-extrabold text-amber-600">
                            {{ $marketingStats['unpaid_orders'] }}
                        </p>
                        <div class="flex items-center gap-1.5 mt-1.5">
                            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                Unpaid
                            </span>
                            <span class="text-[11px] text-ink-muted">Pesanan belum bayar</span>
                        </div>
                    </div>
                </div>

                <!-- Promo & Voucher Aktif -->
                <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Promo Aktif</span>
                        <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                            <i data-lucide="ticket-percent" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-2xl sm:text-3xl font-extrabold text-ink">
                            {{ $marketingStats['active_promos'] }} <span class="text-sm font-semibold text-ink-muted">Kode</span>
                        </p>
                        <p class="text-[11px] text-ink-muted mt-1.5">
                            {{ $marketingStats['promos_used_count'] }} kali kupon digunakan
                        </p>
                    </div>
                </div>
            </div>

            <!-- ================= 3. DAFTAR TRANSAKSI PESANAN NASABAH TERBARU ================= -->
            <div class="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                    <div>
                        <h2 class="font-bold text-ink text-base sm:text-lg flex items-center gap-2">
                            <i data-lucide="receipt" class="w-5 h-5 text-emerald-600"></i>
                            <span>Daftar Transaksi Pesanan Nasabah Terbaru</span>
                        </h2>
                        <p class="text-xs text-ink-muted mt-0.5">Daftar transaksi terbaru nasabah. Klik tombol download invoice untuk mengunduh invoice resmi pesanan.</p>
                    </div>
                    <a href="{{ route('dashboard.order') }}" class="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline self-start sm:self-auto">
                        <span>Lihat Semua di Kelola Nasabah</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-border">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-canvas border-b border-border text-xs text-ink-muted uppercase font-semibold">
                            <tr>
                                <th class="py-3 px-4">Nasabah & Kontak</th>
                                <th class="py-3 px-3.5">No. Pesanan</th>
                                <th class="py-3 px-3.5">Template / Domain</th>
                                <th class="py-3 px-3.5 text-center">Status</th>
                                <th class="py-3 px-3.5 text-right">Total Nilai</th>
                                <th class="py-3 px-4 text-center">Invoice</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            @forelse($marketingStats['recent_leads'] as $lead)
                                @php
                                    $sVal = $lead->status instanceof \App\Enums\OrderStatus ? $lead->status->value : (string) $lead->status;
                                    $leadClient = $lead->client;
                                    $leadName = $lead->full_name ?: ($leadClient?->name ?? 'Nasabah');
                                    $leadEmail = $lead->email ?: ($leadClient?->email ?? '-');
                                    $rawPhone = $lead->whatsapp ?: ($leadClient?->whatsapp ?? '');
                                    $templateName = $lead->template?->name ?? 'Custom Website';
                                @endphp
                                <tr class="hover:bg-canvas/50 transition">
                                    <td class="py-3.5 px-4">
                                        <div class="font-bold text-ink text-sm">{{ $leadName }}</div>
                                        <div class="text-xs text-ink-muted flex items-center gap-2 mt-0.5">
                                            <span>{{ $leadEmail }}</span>
                                            @if($rawPhone)
                                                <span class="text-slate-300">•</span>
                                                <span class="font-mono text-[11px] text-ink">{{ $rawPhone }}</span>
                                            @endif
                                        </div>
                                    </td>
                                    <td class="py-3.5 px-3.5 font-mono text-xs text-ink">
                                        <div>{{ $lead->order_number }}</div>
                                        <div class="text-[10px] text-ink-muted mt-0.5">{{ $lead->created_at ? $lead->created_at->format('d M Y, H:i') : '-' }}</div>
                                    </td>
                                    <td class="py-3.5 px-3.5 text-xs">
                                        <div class="font-semibold text-ink">{{ $templateName }}</div>
                                        <div class="text-[11px] text-ink-muted font-mono truncate max-w-[150px]">{{ $lead->domain_final ?: ($lead->domain_name ?: '-') }}</div>
                                    </td>
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
                                    <td class="py-3.5 px-3.5 text-right font-mono font-bold text-xs text-ink">
                                        Rp {{ number_format($lead->total_price, 0, ',', '.') }}
                                    </td>
                                    <td class="py-3.5 px-4 text-center">
                                        <a href="{{ route('checkout.invoice.download', $lead->order_number) }}"
                                           target="_blank"
                                           class="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition inline-flex items-center justify-center"
                                           title="Unduh PDF Resmi">
                                            <i data-lucide="download" class="w-4 h-4"></i>
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="py-10 text-center text-ink-muted">
                                        <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 text-ink-muted/50"></i>
                                        <p class="font-medium text-sm">Belum ada aktivitas pesanan nasabah terbaru.</p>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div class="pt-2 text-center">
                    <a href="{{ route('dashboard.order') }}" class="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
                        <span>Buka Halaman Kelola Nasabah untuk Melihat & Mengunduh Seluruh Data Transaksi</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>
            </div>

            <!-- ================= 4. TEMPLATE TERLARIS (REKOMENDASI JUALAN MARKETING) ================= -->
            @if(!empty($marketingStats['top_templates']) && $marketingStats['top_templates']->count() > 0)
            <div class="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
                    <div>
                        <h2 class="font-bold text-ink text-base sm:text-lg flex items-center gap-2">
                            <i data-lucide="flame" class="w-5 h-5 text-amber-500"></i>
                            <span>Template Website Paling Laris (Rekomendasi Penjualan)</span>
                        </h2>
                        <p class="text-xs text-ink-muted mt-0.5">Template dengan konversi penjualan tertinggi untuk direkomendasikan kepada calon nasabah.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    @foreach($marketingStats['top_templates'] as $idx => $tt)
                        <div class="bg-canvas border border-border rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-primary/40 transition">
                            <div class="flex items-center gap-3">
                                <div class="w-7 h-7 rounded-lg {{ $idx === 0 ? 'bg-amber-400 text-slate-950 font-black' : ($idx === 1 ? 'bg-slate-300 text-slate-900 font-bold' : ($idx === 2 ? 'bg-amber-700 text-white font-bold' : 'bg-surface text-ink-muted font-bold')) }} flex items-center justify-center text-xs shrink-0 shadow-2xs">
                                    #{{ $idx + 1 }}
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h3 class="text-xs font-bold text-ink truncate" title="{{ $tt->name }}">{{ $tt->name }}</h3>
                                    <p class="text-[11px] text-ink-muted truncate">{{ $tt->category }}</p>
                                </div>
                            </div>

                            <div class="aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-border">
                                <img src="{{ $tt->preview_url }}" alt="{{ $tt->name }}" class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300">
                            </div>

                            <div class="pt-2 border-t border-border flex items-center justify-between">
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-success-surface text-primary-800 border border-primary/20">
                                    <i data-lucide="shopping-bag" class="w-3 h-3"></i>
                                    <span>{{ $tt->sales_count }} Terjual</span>
                                </span>
                                <span class="text-xs font-extrabold text-ink font-mono">
                                    Rp {{ number_format($tt->template_price, 0, ',', '.') }}
                                </span>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            @endif
        </div>
    @else
        {{-- Quick Metrics Bento Grid untuk Klien Biasa --}}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <!-- Card 1: Domain Klien -->
            <div class="bg-surface border border-border rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[155px]">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-ink-muted">Domain</span>
                    <a href="{{ $domainUrl }}" target="_blank" rel="noopener noreferrer" 
                       class="w-8 h-8 rounded-full bg-primary-100 text-primary-800 hover:bg-primary hover:text-white flex items-center justify-center shrink-0 transition"
                       title="Buka Website">
                        <i data-lucide="globe" class="w-4 h-4"></i>
                    </a>
                </div>
                <div class="my-3">
                    <a href="{{ $domainUrl }}" target="_blank" rel="noopener noreferrer" 
                       class="text-xl lg:text-2xl font-bold tracking-tight text-ink hover:text-primary transition inline-flex items-center gap-2 group max-w-full"
                       title="Kunjungi {{ $domainUrl }} (Buka di tab baru)">
                        <span class="break-all group-hover:underline">{{ $domainName }}</span>
                        <i data-lucide="external-link" class="w-4 h-4 text-ink-muted group-hover:text-primary shrink-0 transition"></i>
                    </a>
                </div>
                <div>
                    @if($isDomainRegistered)
                        <div class="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-xs w-max font-bold border border-[#86efac]">
                            <i data-lucide="check" class="w-3.5 h-3.5 stroke-[2.5]"></i>
                            <span>Domain aktif</span>
                        </div>
                    @elseif(!empty($order?->is_own_domain))
                        <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs w-max font-semibold border border-blue-200">
                            <i data-lucide="link" class="w-3.5 h-3.5"></i>
                            <span>Perlu Pointing DNS</span>
                        </div>
                    @else
                        <div class="inline-flex items-center gap-1.5 bg-warning-surface text-warning px-3 py-1 rounded-full text-xs w-max font-semibold border border-warning/20">
                            <i data-lucide="refresh-cw" class="w-3.5 h-3.5 animate-spin"></i>
                            <span>Diproses tim kami</span>
                        </div>
                    @endif
                </div>
            </div>

            <!-- Card 2: Status Website -->
            <div class="bg-surface border border-border rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[155px]">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-ink-muted">Status website</span>
                    <div class="w-8 h-8 rounded-full {{ $isWebsiteLive ? 'bg-[#DCFCE7] text-[#166534]' : ($isWebsiteMaintenance ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700') }} flex items-center justify-center shrink-0">
                        <i data-lucide="{{ $isWebsiteLive ? 'rocket' : ($isWebsiteMaintenance ? 'wrench' : 'code-2') }}" class="w-4 h-4"></i>
                    </div>
                </div>
                <div class="my-3">
                    <div class="text-xl lg:text-2xl font-bold tracking-tight text-ink">
                        @if($isWebsiteLive)
                            Website Live
                        @elseif($isWebsiteMaintenance)
                            Dalam Pemeliharaan
                        @elseif($isWebsiteInProgress)
                            Sedang Dikerjakan
                        @else
                            Menunggu Antrean
                        @endif
                    </div>
                </div>
                <div>
                    @if($isWebsiteLive)
                        <div class="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-xs w-max font-bold border border-[#86efac]">
                            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                            <span>Siap diakses</span>
                        </div>
                    @elseif($isWebsiteMaintenance)
                        <div class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs w-max font-bold border border-amber-200">
                            <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
                            <span>Maintenance berkala</span>
                        </div>
                    @elseif($isWebsiteInProgress)
                        <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs w-max font-bold border border-blue-200">
                            <i data-lucide="code-2" class="w-3.5 h-3.5"></i>
                            <span>Website dikerjakan</span>
                        </div>
                    @else
                        <div class="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs w-max font-bold border border-slate-200">
                            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                            <span>Menunggu proses</span>
                        </div>
                    @endif
                </div>
            </div>

            <!-- Card 3: Template Website -->
            <div class="bg-surface border border-border rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[155px]">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-ink-muted">Template</span>
                    <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
                        <i data-lucide="layout" class="w-4 h-4"></i>
                    </div>
                </div>
                <div class="my-3">
                    <div class="text-xl lg:text-2xl font-bold tracking-tight text-ink truncate" title="{{ $template?->name ?? 'Pilihan Template' }}">
                        {{ $template?->name ?? 'Pilihan Template' }}
                    </div>
                </div>
                <div>
                    <div class="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs w-max font-semibold border border-primary-200/60">
                        <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                        <span>Lunas {{ $paidDateShort }}</span>
                    </div>
                </div>
            </div>
        </div>

        {{-- Lower Content: Progress Stepper & Support Card --}}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 items-start">
            <div class="lg:col-span-8 flex flex-col space-y-6">
                <!-- Card 1: Stepper Progres Proyek -->
                <div class="bg-surface border border-border rounded-3xl p-7 shadow-sm">
                    <h2 class="text-lg font-bold text-ink mb-7 flex items-center gap-2">
                        <i data-lucide="milestone" class="w-5 h-5 text-primary"></i>
                        <span>Progres proyekmu</span>
                    </h2>

                    <div class="relative space-y-8 pl-4">
                        <div class="relative flex items-start gap-4">
                            <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                                <i data-lucide="check" class="w-4 h-4 stroke-[3]"></i>
                            </div>
                            <div class="w-0.5 bg-border absolute left-4 top-8 -bottom-8"></div>
                            <div>
                                <p class="text-sm font-semibold text-ink">Pembayaran diterima</p>
                                <p class="text-xs text-ink-muted mt-0.5">{{ $paidAtFormatted }}</p>
                            </div>
                        </div>

                        <div class="relative flex items-start gap-4">
                            @if($isDomainRegistered)
                                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                                    <i data-lucide="check" class="w-4 h-4 stroke-[3]"></i>
                                </div>
                            @else
                                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-success-surface">
                                    <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
                                </div>
                            @endif
                            <div class="w-0.5 bg-border absolute left-4 top-8 -bottom-8"></div>
                            <div>
                                <p class="text-sm font-semibold text-ink">
                                    {{ $isDomainRegistered ? 'Domain aktif & terhubung' : (!empty($order?->is_own_domain) ? 'Arahkan DNS Domain Sendiri' : 'Domain diproses tim kami') }}
                                </p>
                                <p class="text-xs text-ink-muted mt-0.5">
                                    {{ $isDomainRegistered ? 'DNS dan domain telah terkonfigurasi ke server' : (!empty($order?->is_own_domain) ? 'Arahkan A Record (@) ke IP 103.189.234.18 server Bidtech' : 'Registrasi ke IdCloudHost sedang berjalan') }}
                                </p>
                                @if(!empty($domainRegisteredAtFormatted) && $isDomainRegistered)
                                    <p class="text-xs text-ink-muted mt-1 flex items-center gap-1.5 font-medium">
                                        <i data-lucide="clock" class="w-3 h-3 text-ink-muted/70"></i>
                                        <span>{{ $domainRegisteredAtFormatted }}</span>
                                    </p>
                                @endif
                            </div>
                        </div>

                        <div class="relative flex items-start gap-4">
                            @if($isWebsiteLive)
                                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                                    <i data-lucide="check" class="w-4 h-4 stroke-[3]"></i>
                                </div>
                            @elseif($isWebsiteMaintenance)
                                <div class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-amber-100 shadow-xs">
                                    <i data-lucide="wrench" class="w-4 h-4"></i>
                                </div>
                            @elseif($isWebsiteInProgress)
                                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-success-surface">
                                    <i data-lucide="circle-dot" class="w-4 h-4 animate-pulse"></i>
                                </div>
                            @else
                                <div class="w-8 h-8 rounded-full bg-border text-ink-muted flex items-center justify-center flex-shrink-0 z-10">
                                    <i data-lucide="circle-dot" class="w-4 h-4"></i>
                                </div>
                            @endif
                            <div class="w-0.5 bg-border absolute left-4 top-8 -bottom-8"></div>
                            <div>
                                <p class="text-sm font-medium {{ $isWebsiteInProgress || $isWebsiteLive || $isWebsiteMaintenance ? 'text-ink font-semibold' : 'text-ink-muted' }}">
                                    @if($isWebsiteMaintenance)
                                        Website dalam pemeliharaan (Maintenance)
                                    @elseif($isWebsiteLive)
                                        Pengerjaan website selesai
                                    @else
                                        Website dikerjakan
                                    @endif
                                </p>
                                <p class="text-xs {{ $isWebsiteInProgress || $isWebsiteLive || $isWebsiteMaintenance ? 'text-ink-muted' : 'text-ink-muted/70' }} mt-0.5">
                                    @if($isWebsiteMaintenance)
                                        Website sedang dalam pemeliharaan berkala atau pembaruan konfigurasi server oleh Tim IT.
                                    @elseif($isWebsiteLive)
                                        Pengerjaan kode dan penyesuaian aset selesai 100%.
                                    @else
                                        Tim developer sedang menyesuaikan aset dan konten website.
                                    @endif
                                </p>
                                @if(!empty($websiteProgressAtFormatted) && ($isWebsiteInProgress || $isWebsiteLive || $isWebsiteMaintenance))
                                    <p class="text-xs text-ink-muted mt-1 flex items-center gap-1.5 font-medium">
                                        <i data-lucide="clock" class="w-3 h-3 text-ink-muted/70"></i>
                                        <span>{{ $websiteProgressAtFormatted }}</span>
                                    </p>
                                @endif
                            </div>
                        </div>

                        <div class="relative flex items-start gap-4">
                            @if($isWebsiteLive)
                                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs ring-4 ring-success-surface">
                                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                                </div>
                            @else
                                <div class="w-8 h-8 rounded-full bg-border text-ink-muted flex items-center justify-center flex-shrink-0 z-10">
                                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                                </div>
                            @endif
                            <div>
                                <p class="text-sm font-medium {{ $isWebsiteLive ? 'text-ink font-semibold' : 'text-ink-muted' }}">
                                    Website live
                                </p>
                                <p class="text-xs {{ $isWebsiteLive ? 'text-success font-medium' : 'text-ink-muted/70' }} mt-0.5">
                                    <a href="{{ $domainUrl }}" target="_blank" rel="noopener noreferrer" class="hover:underline font-bold text-ink inline-flex items-center gap-0.5">{{ $domainName }}<i data-lucide="external-link" class="w-3 h-3 text-ink-muted"></i></a> {{ $isWebsiteLive ? 'sudah live dan dapat diakses publik' : ($isWebsiteMaintenance ? 'sedang dalam proses maintenance sementara' : 'akan siap diakses setelah proses selesai') }}
                                </p>
                                @if(!empty($websiteLiveAtFormatted) && $isWebsiteLive)
                                    <p class="text-xs text-ink-muted mt-1 flex items-center gap-1.5 font-medium">
                                        <i data-lucide="clock" class="w-3 h-3 text-ink-muted/70"></i>
                                        <span>{{ $websiteLiveAtFormatted }}</span>
                                    </p>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 2: Riwayat Pembaruan Status Proyek (Audit Timeline) -->
                <div class="bg-surface border border-border rounded-3xl p-7 shadow-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border mb-6">
                        <div>
                            <h2 class="text-lg font-bold text-ink flex items-center gap-2">
                                <i data-lucide="history" class="w-5 h-5 text-primary"></i>
                                <span>Riwayat Update Status Domain & Website</span>
                            </h2>
                            <p class="text-xs text-ink-muted mt-0.5">Catatan dan linimasa pembaruan status pengerjaan proyek dari tim teknis Bidtech.</p>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary-100 text-primary-800 border border-primary-200/50">
                                {{ !empty($statusHistories) ? $statusHistories->count() : 0 }} Aktivitas
                            </span>
                        </div>
                    </div>

                    @if(!empty($statusHistories) && $statusHistories->isNotEmpty())
                        @php
                            $countDomain = $statusHistories->where('type', 'domain')->count();
                            $countWebsite = $statusHistories->where('type', 'website')->count();
                            $countOther = $statusHistories->whereNotIn('type', ['domain', 'website'])->count();
                        @endphp

                        @if($statusHistories->count() > 3)
                            <!-- Filter Kategori (Pills) -->
                            <div class="flex items-center gap-2 pb-4 overflow-x-auto text-xs">
                                <button type="button" onclick="setHistoryFilter('all', this)" class="hist-filter-pill px-3 py-1.5 rounded-full font-bold transition bg-primary text-white shadow-2xs cursor-pointer">
                                    Semua ({{ $statusHistories->count() }})
                                </button>
                                <button type="button" onclick="setHistoryFilter('domain', this)" class="hist-filter-pill px-3 py-1.5 rounded-full font-medium transition bg-canvas hover:bg-canvas/80 text-ink border border-border cursor-pointer">
                                    Domain ({{ $countDomain }})
                                </button>
                                <button type="button" onclick="setHistoryFilter('website', this)" class="hist-filter-pill px-3 py-1.5 rounded-full font-medium transition bg-canvas hover:bg-canvas/80 text-ink border border-border cursor-pointer">
                                    Website ({{ $countWebsite }})
                                </button>
                                @if($countOther > 0)
                                    <button type="button" onclick="setHistoryFilter('other', this)" class="hist-filter-pill px-3 py-1.5 rounded-full font-medium transition bg-canvas hover:bg-canvas/80 text-ink border border-border cursor-pointer">
                                        Pesanan & Umum ({{ $countOther }})
                                    </button>
                                @endif
                            </div>
                        @endif

                        <!-- Timeline List -->
                        <div class="relative space-y-6 pl-3" id="timeline-history-list">
                            @foreach($statusHistories as $idx => $hist)
                                @php
                                    $isOtherType = !in_array($hist->type, ['domain', 'website'], true);
                                    $histFilterType = $isOtherType ? 'other' : $hist->type;
                                @endphp
                                <div class="timeline-history-item relative flex items-start gap-4 transition-all duration-200"
                                     data-type="{{ $histFilterType }}"
                                     style="{{ $idx >= 5 ? 'display: none;' : '' }}">
                                    <!-- Icon Circle Indicator -->
                                    <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 shadow-xs {{ $hist->status_to === 'deployed' || $hist->status_to === 'registered' || $hist->status_to === 'paid' ? 'bg-success text-white' : ($hist->status_to === 'in_progress' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white') }}">
                                        <i data-lucide="{{ $hist->icon() }}" class="w-4 h-4"></i>
                                    </div>

                                    @if(!$loop->last)
                                        <div class="timeline-line w-0.5 bg-border absolute left-4 top-8 -bottom-6"></div>
                                    @endif

                                    <div class="flex-1 bg-canvas/60 border border-border/80 rounded-2xl p-4 transition hover:border-primary/30">
                                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-border/50">
                                            <div class="flex items-center gap-2 flex-wrap">
                                                <span class="text-xs font-bold text-ink">{{ $hist->typeLabel() }}</span>
                                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold border {{ $hist->badgeClasses() }}">
                                                    <span>{{ $hist->statusToLabel() }}</span>
                                                </span>
                                                @if($idx === 0)
                                                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-100 text-primary-800">
                                                        Terbaru
                                                    </span>
                                                @endif
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

                        <!-- Empty state if filter has 0 items -->
                        <div id="timeline-filter-empty" class="hidden py-8 text-center text-ink-muted space-y-2">
                            <i data-lucide="inbox" class="w-8 h-8 mx-auto text-ink-muted/40"></i>
                            <p class="text-xs font-medium">Tidak ada aktivitas pada kategori ini.</p>
                        </div>

                        <!-- Pagination Controls (Bar) -->
                        <div id="timeline-pagination-bar" class="pt-5 mt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 {{ $statusHistories->count() <= 5 ? 'hidden' : '' }}">
                            <p class="text-xs text-ink-muted" id="timeline-pagination-info">
                                Menampilkan <strong id="timeline-page-range">1 - {{ min(5, $statusHistories->count()) }}</strong> dari <strong>{{ $statusHistories->count() }}</strong> aktivitas
                            </p>
                            
                            <div class="flex items-center gap-1.5 self-center sm:self-auto" id="timeline-pagination-buttons">
                                <!-- Tombol pagination nomor halaman di-generate secara interaktif oleh JS -->
                            </div>
                        </div>
                    @else
                        <!-- State default bila belum ada log khusus lanjutan -->
                        <div class="rounded-2xl border border-dashed border-border bg-canvas/40 p-6 text-center space-y-2">
                            <div class="w-10 h-10 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center mx-auto mb-2">
                                <i data-lucide="activity" class="w-5 h-5 text-primary-700"></i>
                            </div>
                            <h4 class="text-sm font-bold text-ink">Pembaruan Progres Otomatis Aktif</h4>
                            <p class="text-xs text-ink-muted max-w-md mx-auto leading-relaxed">
                                Domain <span class="font-semibold text-ink">{{ $domainName }}</span> dan website Anda sedang diproses oleh Tim IT Bidtech. Setiap perubahan konfigurasi dan catatan progres akan otomatis tercatat di linimasa ini.
                            </p>
                            <div class="pt-2 flex items-center justify-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-success-surface text-primary-800 border border-primary/20">
                                    <i data-lucide="check" class="w-3 h-3 text-primary-700"></i>
                                    <span>Pembayaran Lunas ({{ $paidDateShort }})</span>
                                </span>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            <div class="lg:col-span-4 flex flex-col">
                <div class="bg-surface border border-border rounded-3xl p-7 shadow-sm flex flex-col justify-between h-full">
                    <div>
                        <h3 class="font-bold text-sm text-ink">Tim yang menangani proyekmu</h3>
                        <div class="flex items-center gap-3.5 mt-4">
                            <div class="w-11 h-11 rounded-2xl bg-success-surface text-primary font-bold flex items-center justify-center text-sm shrink-0">
                                IT
                            </div>
                            <div>
                                <div class="text-sm font-semibold text-ink">Tim IT Bidtech</div>
                                <div class="text-xs text-ink-muted">Kontak untuk kickoff proyek</div>
                            </div>
                        </div>

                        <a href="https://wa.me/6281234567890?text={{ urlencode('Halo Tim IT Bidtech, saya ingin menanyakan progres website untuk order ' . $orderNumber) }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="w-full mt-4 border border-border hover:border-primary hover:bg-success-surface/40 text-ink font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition text-sm cursor-pointer">
                            <i data-lucide="message-circle" class="w-4 h-4 text-whatsapp"></i>
                            <span>Hubungi via WhatsApp</span>
                        </a>
                    </div>

                    <div class="pt-6 border-t border-border mt-6">
                        <h4 class="font-bold text-sm text-ink mb-3">Order</h4>
                        <div class="flex justify-between items-center text-xs py-1.5">
                            <span class="text-ink-muted">Nomor order</span>
                            <span class="font-mono font-bold text-ink">{{ $orderNumber }}</span>
                        </div>
                        <div class="flex justify-between items-center text-xs py-1.5">
                            <span class="text-ink-muted">Total dibayar</span>
                            <span class="font-bold text-ink text-sm">Rp{{ number_format($totalPaid, 0, ',', '.') }}</span>
                        </div>

                        <a href="{{ route('dashboard.order') }}" class="w-full mt-4 border border-border hover:bg-canvas text-ink font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs transition cursor-pointer">
                            <span>Lihat detail order</span>
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>

@if(!$isAdmin && !empty($statusHistories) && $statusHistories->isNotEmpty())
@push('scripts')
<script>
    (function() {
        const ITEMS_PER_PAGE = 5;
        let currentPage = 1;
        let currentFilter = 'all';

        function getFilteredItems() {
            const allItems = Array.from(document.querySelectorAll('.timeline-history-item'));
            if (currentFilter === 'all') {
                return allItems;
            }
            return allItems.filter(item => item.getAttribute('data-type') === currentFilter);
        }

        function updateTimelineDisplay() {
            const allItems = Array.from(document.querySelectorAll('.timeline-history-item'));
            const filteredItems = getFilteredItems();
            const totalItems = filteredItems.length;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

            if (currentPage > totalPages) {
                currentPage = totalPages;
            }
            if (currentPage < 1) {
                currentPage = 1;
            }

            // Sembunyikan semua item
            allItems.forEach(item => {
                item.style.display = 'none';
            });

            // Tampilkan item untuk halaman aktif
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

            for (let i = startIndex; i < endIndex; i++) {
                if (filteredItems[i]) {
                    filteredItems[i].style.display = 'flex';
                }
            }

            // Notice kosong bila filter tidak memiliki item
            const emptyNotice = document.getElementById('timeline-filter-empty');
            if (emptyNotice) {
                emptyNotice.classList.toggle('hidden', totalItems > 0);
            }

            // Sembunyikan / tampilkan pagination bar
            const paginationBar = document.getElementById('timeline-pagination-bar');
            if (paginationBar) {
                paginationBar.classList.toggle('hidden', totalItems <= ITEMS_PER_PAGE);
            }

            // Update teks rentang aktivitas
            const rangeEl = document.getElementById('timeline-page-range');
            if (rangeEl) {
                if (totalItems === 0) {
                    rangeEl.innerText = '0';
                } else {
                    rangeEl.innerText = `${startIndex + 1} - ${endIndex}`;
                }
            }

            // Render Tombol Halaman
            const buttonsContainer = document.getElementById('timeline-pagination-buttons');
            if (buttonsContainer) {
                buttonsContainer.innerHTML = '';

                if (totalPages > 1) {
                    // Tombol Prev
                    const prevBtn = document.createElement('button');
                    prevBtn.type = 'button';
                    prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>';
                    prevBtn.className = `p-1.5 rounded-lg border text-xs transition flex items-center justify-center cursor-pointer ${
                        currentPage === 1 
                            ? 'border-border text-ink-muted/40 cursor-not-allowed opacity-50' 
                            : 'border-border bg-surface hover:bg-canvas text-ink'
                    }`;
                    prevBtn.disabled = currentPage === 1;
                    prevBtn.onclick = () => {
                        if (currentPage > 1) {
                            currentPage--;
                            updateTimelineDisplay();
                        }
                    };
                    buttonsContainer.appendChild(prevBtn);

                    // Nomor-nomor Halaman
                    for (let p = 1; p <= totalPages; p++) {
                        if (totalPages <= 7 || p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                            const pBtn = document.createElement('button');
                            pBtn.type = 'button';
                            pBtn.innerText = p;
                            pBtn.className = `min-w-[28px] h-7 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                                p === currentPage
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'border border-border bg-surface hover:bg-canvas text-ink'
                            }`;
                            pBtn.onclick = () => {
                                currentPage = p;
                                updateTimelineDisplay();
                            };
                            buttonsContainer.appendChild(pBtn);
                        } else if (p === currentPage - 2 || p === currentPage + 2) {
                            const ellipsis = document.createElement('span');
                            ellipsis.innerText = '...';
                            ellipsis.className = 'px-1 text-ink-muted text-xs';
                            buttonsContainer.appendChild(ellipsis);
                        }
                    }

                    // Tombol Next
                    const nextBtn = document.createElement('button');
                    nextBtn.type = 'button';
                    nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>';
                    nextBtn.className = `p-1.5 rounded-lg border text-xs transition flex items-center justify-center cursor-pointer ${
                        currentPage === totalPages 
                            ? 'border-border text-ink-muted/40 cursor-not-allowed opacity-50' 
                            : 'border-border bg-surface hover:bg-canvas text-ink'
                    }`;
                    nextBtn.disabled = currentPage === totalPages;
                    nextBtn.onclick = () => {
                        if (currentPage < totalPages) {
                            currentPage++;
                            updateTimelineDisplay();
                        }
                    };
                    buttonsContainer.appendChild(nextBtn);
                }
            }

            if (window.lucide) {
                lucide.createIcons();
            }
        }

        window.setHistoryFilter = function(filter, btn) {
            currentFilter = filter;
            currentPage = 1;

            document.querySelectorAll('.hist-filter-pill').forEach(b => {
                b.className = 'hist-filter-pill px-3 py-1.5 rounded-full font-medium transition bg-canvas hover:bg-canvas/80 text-ink border border-border cursor-pointer';
            });
            if (btn) {
                btn.className = 'hist-filter-pill px-3 py-1.5 rounded-full font-bold transition bg-primary text-white shadow-2xs cursor-pointer';
            }

            updateTimelineDisplay();
        };

        document.addEventListener('DOMContentLoaded', function() {
            updateTimelineDisplay();
        });

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            updateTimelineDisplay();
        }
    })();
</script>
@endpush
@endif

@endsection
