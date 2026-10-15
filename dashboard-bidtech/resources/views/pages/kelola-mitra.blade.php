@extends('layouts.dashboard')

@section('title', 'Kelola Mitra & Komisi - Admin CMS Bidtech')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Flash Alert Notifications -->
    @if(session('success'))
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <i data-lucide="check-circle" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="text-sm font-bold text-emerald-900">Sukses</p>
                    <p class="text-xs text-emerald-700 mt-0.5">{{ session('success') }}</p>
                </div>
            </div>
            <button type="button" onclick="this.parentElement.remove()" class="text-emerald-500 hover:text-emerald-700 p-1">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>
    @endif

    @if(session('error'))
        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-start justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <i data-lucide="alert-circle" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="text-sm font-bold text-rose-900">Perhatian</p>
                    <p class="text-xs text-rose-700 mt-0.5">{{ session('error') }}</p>
                </div>
            </div>
            <button type="button" onclick="this.parentElement.remove()" class="text-rose-500 hover:text-rose-700 p-1">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>
    @endif

    @if($errors->any())
        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-start justify-between gap-3 shadow-xs">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="text-sm font-bold text-rose-900">Terdapat kesalahan pengisian formulir:</p>
                    <ul class="list-disc list-inside text-xs text-rose-700 mt-1 space-y-0.5">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
            <button type="button" onclick="this.parentElement.remove()" class="text-rose-500 hover:text-rose-700 p-1">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>
    @endif

    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Afiliasi Mitra & Komisi</h1>
            <p class="text-sm text-slate-500 mt-1">Kelola data mitra afiliasi, atur skema & besaran komisi, pantau performa kupon, serta status kemitraan.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button type="button" onclick="openAddPartnerModal()"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-xs cursor-pointer">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>Tambah Mitra</span>
            </button>
            <a href="{{ route('dashboard.promos.create') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition shadow-xs">
                <i data-lucide="ticket-plus" class="w-4 h-4"></i>
                <span>Buat Promo Mitra</span>
            </a>
            <a href="{{ route('dashboard.promos.all-usages') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition shadow-xs">
                <i data-lucide="history" class="w-4 h-4"></i>
                <span>Riwayat Redeem</span>
            </a>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i data-lucide="users" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mitra Terdaftar</p>
                <div class="flex items-baseline gap-2 mt-0.5">
                    <p class="text-2xl font-bold text-slate-900">{{ $stats['total_partners'] }}</p>
                    <span class="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                        {{ $stats['active_partners'] ?? $stats['total_partners'] }} Aktif
                    </span>
                </div>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <i data-lucide="ticket" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Promo Mitra</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total_promos'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <i data-lucide="check-circle-2" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Ditebus</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total_redeem'] }}x</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <i data-lucide="coins" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Komisi (Order Lunas)</p>
                <p class="text-xl font-bold text-amber-700 mt-0.5">Rp{{ number_format($stats['total_commission'], 0, ',', '.') }}</p>
            </div>
        </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs">
        <form method="GET" action="{{ route('dashboard.partners.index') }}" class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <!-- Input Pencarian -->
            <div class="relative flex-1 min-w-[220px]">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <input type="text" name="search" value="{{ request('search') }}"
                       placeholder="Cari nama, email, atau no. WhatsApp mitra..."
                       class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <!-- Grid Filter & Sorting Dropdowns -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <!-- Filter Status -->
                <div>
                    <select name="status" onchange="this.form.submit()"
                            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer text-slate-700">
                        <option value="all" {{ request('status') === 'all' || !request()->has('status') ? 'selected' : '' }}>Semua Status</option>
                        <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>Hanya Aktif</option>
                        <option value="inactive" {{ request('status') === 'inactive' ? 'selected' : '' }}>Hanya Nonaktif</option>
                    </select>
                </div>

                <!-- Filter Skema Komisi -->
                <div>
                    <select name="commission_type" onchange="this.form.submit()"
                            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer text-slate-700">
                        <option value="all" {{ request('commission_type') === 'all' || !request()->has('commission_type') ? 'selected' : '' }}>Semua Skema</option>
                        <option value="PERCENTAGE" {{ request('commission_type') === 'PERCENTAGE' ? 'selected' : '' }}>Persentase (%)</option>
                        <option value="FIXED" {{ request('commission_type') === 'FIXED' ? 'selected' : '' }}>Nominal Tetap (Rp)</option>
                    </select>
                </div>

                <!-- Filter Kepemilikan Kupon -->
                <div>
                    <select name="has_promo" onchange="this.form.submit()"
                            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer text-slate-700">
                        <option value="all" {{ request('has_promo') === 'all' || !request()->has('has_promo') ? 'selected' : '' }}>Semua Kupon</option>
                        <option value="yes" {{ request('has_promo') === 'yes' ? 'selected' : '' }}>Punya Kupon</option>
                        <option value="no" {{ request('has_promo') === 'no' ? 'selected' : '' }}>Belum Ada Kupon</option>
                    </select>
                </div>

                <!-- Urutkan / Sort -->
                <div>
                    <select name="sort" onchange="this.form.submit()"
                            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer text-slate-700">
                        <option value="latest" {{ request('sort') === 'latest' || !request()->has('sort') ? 'selected' : '' }}>Terbaru</option>
                        <option value="name_asc" {{ request('sort') === 'name_asc' ? 'selected' : '' }}>Nama (A - Z)</option>
                        <option value="commission_desc" {{ request('sort') === 'commission_desc' ? 'selected' : '' }}>Komisi Tertinggi</option>
                        <option value="redeem_desc" {{ request('sort') === 'redeem_desc' ? 'selected' : '' }}>Redeem Terbanyak</option>
                    </select>
                </div>
            </div>

            <!-- Tombol Aksi -->
            <div class="flex items-center gap-2 shrink-0">
                <button type="submit"
                        class="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition shadow-xs cursor-pointer">
                    Filter
                </button>
                @if(request('search') || (request()->has('status') && request('status') !== 'all') || (request()->has('commission_type') && request('commission_type') !== 'all') || (request()->has('has_promo') && request('has_promo') !== 'all') || (request()->has('sort') && request('sort') !== 'latest'))
                    <a href="{{ route('dashboard.partners.index') }}"
                       class="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                        Reset
                    </a>
                @endif
            </div>
        </form>
    </div>

    <!-- Tabel Daftar Mitra -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 class="font-bold text-slate-800 text-base">Daftar Mitra & Rekapitulasi Komisi</h2>
            <span class="text-xs font-medium text-slate-400">{{ count($partnersGrouped) }} Mitra Ditampilkan</span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-600">
                <thead class="bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                    <tr>
                        <th class="py-3.5 px-4 w-12 text-center">No</th>
                        <th class="py-3.5 px-4">Mitra</th>
                        <th class="py-3.5 px-4">Skema Komisi</th>
                        <th class="py-3.5 px-4">Kupon Terafiliasi</th>
                        <th class="py-3.5 px-4 text-center">Redeem</th>
                        <th class="py-3.5 px-4 text-right">Komisi (Lunas)</th>
                        <th class="py-3.5 px-4 text-center">Status</th>
                        <th class="py-3.5 px-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($partnersGrouped as $row)
                        @php
                            $partner = $row['partner'];
                            $user = $partner->user;
                            $isActive = (bool) ($partner->is_active ?? true);
                            $isPercentage = $partner->type_commission->value === 'PERCENTAGE';
                            $commissionText = $isPercentage ? $partner->amount_commission.'%' : 'Rp'.number_format($partner->amount_commission, 0, ',', '.');
                            $hasOrders = $row['total_redeem'] > 0;
                        @endphp
                        <tr class="hover:bg-slate-50/70 transition {{ !$isActive ? 'bg-slate-50/40 opacity-80' : '' }}">
                            <!-- No -->
                            <td class="py-4 px-4 text-center font-mono font-bold text-xs text-slate-400">
                                {{ $loop->iteration }}
                            </td>

                            <!-- Mitra Info -->
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-9 h-9 rounded-xl {{ $isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500' }} flex items-center justify-center font-bold text-sm shrink-0">
                                        {{ strtoupper(substr($user->name, 0, 1)) }}
                                    </div>
                                    <div class="min-w-0">
                                        <p class="font-bold text-slate-900 text-sm truncate flex items-center gap-1.5">
                                            <span>{{ $user->name }}</span>
                                            @if(!$isActive)
                                                <span class="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-200 text-slate-600">Nonaktif</span>
                                            @endif
                                        </p>
                                        <p class="text-xs font-mono text-slate-400 mt-0.5 truncate">{{ $user->email }}</p>
                                        @if($user->whatsapp)
                                            <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $user->whatsapp) }}" target="_blank"
                                               class="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:text-emerald-700 mt-0.5 font-medium">
                                                <i data-lucide="phone" class="w-3 h-3"></i>
                                                <span>{{ $user->whatsapp }}</span>
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            </td>

                            <!-- Skema Komisi -->
                            <td class="py-4 px-4 whitespace-nowrap">
                                <div class="space-y-1">
                                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold {{ $isPercentage ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-amber-50 text-amber-700 border border-amber-100' }}">
                                        @if($isPercentage)
                                            <i data-lucide="percent" class="w-3 h-3"></i>
                                            <span>{{ $partner->amount_commission }}% / order</span>
                                        @else
                                            <i data-lucide="coins" class="w-3 h-3"></i>
                                            <span>Rp{{ number_format($partner->amount_commission, 0, ',', '.') }} / order</span>
                                        @endif
                                    </span>
                                    <p class="text-[10px] text-slate-400 font-medium">Tipe: {{ $partner->type_commission->value }}</p>
                                </div>
                            </td>

                            <!-- Kupon Terafiliasi -->
                            <td class="py-4 px-4">
                                <div class="flex flex-wrap gap-1.5 max-w-xs">
                                    @forelse($row['coupons'] as $coupon)
                                        <a href="{{ route('dashboard.promos.usages', $coupon) }}"
                                           title="Lihat riwayat pemakaian kode {{ $coupon->code }}"
                                           class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 font-mono text-xs font-bold transition border border-violet-100">
                                            <span>{{ $coupon->code }}</span>
                                            <span class="text-[10px] font-normal text-violet-500">({{ $coupon->orders_count }})</span>
                                        </a>
                                    @empty
                                        <span class="text-xs text-slate-400 italic">Belum ada kupon</span>
                                    @endforelse
                                </div>
                            </td>

                            <!-- Redeem -->
                            <td class="py-4 px-4 text-center whitespace-nowrap">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                                    {{ $row['total_redeem'] }}x
                                </span>
                            </td>

                            <!-- Hak Komisi Lunas -->
                            <td class="py-4 px-4 text-right whitespace-nowrap">
                                <span class="font-extrabold text-blue-600 text-base">
                                    Rp{{ number_format($row['total_commission'], 0, ',', '.') }}
                                </span>
                            </td>

                            <!-- Status Toggle -->
                            <td class="py-4 px-4 text-center whitespace-nowrap">
                                <form action="{{ route('dashboard.partners.toggle-active', $partner) }}" method="POST" class="inline-block">
                                    @csrf
                                    <button type="submit"
                                            title="Klik untuk {{ $isActive ? 'nonaktifkan' : 'aktifkan' }} mitra ini"
                                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer {{ $isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200' }}">
                                        <span class="w-1.5 h-1.5 rounded-full {{ $isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400' }}"></span>
                                        <span>{{ $isActive ? 'Aktif' : 'Nonaktif' }}</span>
                                    </button>
                                </form>
                            </td>

                            <!-- Aksi Menu -->
                            <td class="py-4 px-4 text-center whitespace-nowrap">
                                <div class="flex items-center justify-center gap-1.5">
                                    <!-- Edit & Atur Komisi -->
                                    <button type="button"
                                            data-id="{{ $partner->id }}"
                                            data-name="{{ $user->name }}"
                                            data-email="{{ $user->email }}"
                                            data-whatsapp="{{ $user->whatsapp ?? '' }}"
                                            data-type="{{ $partner->type_commission->value }}"
                                            data-amount="{{ $partner->amount_commission }}"
                                            onclick="openEditPartnerModalFromEl(this)"
                                            title="Edit data dan atur besar komisi mitra"
                                            class="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer">
                                        <i data-lucide="edit-3" class="w-4 h-4"></i>
                                    </button>

                                    <!-- Hapus Mitra -->
                                    <button type="button"
                                            data-id="{{ $partner->id }}"
                                            data-name="{{ $user->name }}"
                                            data-has-orders="{{ $hasOrders ? '1' : '0' }}"
                                            onclick="openDeletePartnerModalFromEl(this)"
                                            title="{{ $hasOrders ? 'Mitra memiliki riwayat order lunas (disarankan dinonaktifkan)' : 'Hapus mitra' }}"
                                            class="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer">
                                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="py-12 text-center text-slate-400">
                                <i data-lucide="users" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                <p class="text-sm font-medium">Belum ada mitra terdaftar yang sesuai kriteria.</p>
                                <button type="button" onclick="openAddPartnerModal()"
                                        class="mt-3 inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 text-sm font-semibold cursor-pointer">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Tambah Mitra Baru Sekarang
                                </button>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</div>

<!-- ============================================================== -->
<!-- MODAL 1: TAMBAH MITRA BARU -->
<!-- ============================================================== -->
<div id="modal-add-partner" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs hidden">
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <i data-lucide="user-plus" class="w-4 h-4"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-base">Tambah Mitra Afiliasi Baru</h3>
            </div>
            <button type="button" onclick="closeAddPartnerModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <form action="{{ route('dashboard.partners.store') }}" method="POST" class="p-6 space-y-4">
            @csrf

            <!-- Identitas Mitra -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Lengkap Mitra <span class="text-rose-500">*</span></label>
                <input type="text" name="name" required placeholder="Contoh: Budi Santoso / PT Agensi Digital"
                       class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Email Mitra <span class="text-rose-500">*</span></label>
                    <input type="email" name="email" required placeholder="mitra@contoh.com"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">No. WhatsApp</label>
                    <input type="text" name="whatsapp" placeholder="08123456789"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
            </div>

            <!-- Password Akun -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Password Akun <span class="text-rose-500">*</span></label>
                <input type="password" name="password" required minlength="6" placeholder="Minimal 6 karakter untuk login mitra"
                       class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <!-- Konfigurasi Komisi -->
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div class="flex items-center gap-2">
                    <i data-lucide="coins" class="w-4 h-4 text-amber-600"></i>
                    <p class="text-xs font-bold text-slate-800 uppercase tracking-wider">Atur Skema & Besar Komisi</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Tipe Komisi <span class="text-rose-500">*</span></label>
                        <select name="type_commission" id="add-commission-type" required onchange="handleCommissionTypeChange('add')"
                                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer">
                            <option value="PERCENTAGE">Persentase (%)</option>
                            <option value="FIXED">Nominal Tetap (Rp)</option>
                        </select>
                    </div>
                    <div>
                        <label id="add-commission-label" class="block text-xs font-semibold text-slate-600 mb-1">Besar Komisi (%) <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <span id="add-commission-prefix" class="hidden absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rp</span>
                            <input type="text" name="amount_commission" id="add-commission-amount" required placeholder="Contoh: 10"
                                   oninput="formatCommissionInput(this, 'add')"
                                   class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                            <span id="add-commission-suffix" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                        </div>
                    </div>
                </div>
                <p id="add-commission-hint" class="text-[11px] text-slate-400">
                    Mitra akan mendapatkan komisi sebesar persentase dari harga paket website setelah diskon klien (biaya domain tidak dihitung).
                </p>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="closeAddPartnerModal()"
                        class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer">
                    Batal
                </button>
                <button type="submit"
                        class="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition cursor-pointer">
                    Simpan Mitra
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ============================================================== -->
<!-- MODAL 2: EDIT MITRA & ATUR KOMISI -->
<!-- ============================================================== -->
<div id="modal-edit-partner" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs hidden">
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <i data-lucide="edit-3" class="w-4 h-4"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-base">Edit Mitra & Atur Komisi</h3>
            </div>
            <button type="button" onclick="closeEditPartnerModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <form id="form-edit-partner" action="" method="POST" class="p-6 space-y-4">
            @csrf
            @method('PUT')

            <!-- Identitas Mitra -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Lengkap Mitra <span class="text-rose-500">*</span></label>
                <input type="text" name="name" id="edit-partner-name" required
                       class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Email Mitra <span class="text-rose-500">*</span></label>
                    <input type="email" name="email" id="edit-partner-email" required
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">No. WhatsApp</label>
                    <input type="text" name="whatsapp" id="edit-partner-whatsapp" placeholder="08123456789"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
            </div>

            <!-- Ganti Password (Opsional) -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Password Baru (Opsional)</label>
                <input type="password" name="password" minlength="6" placeholder="Kosongkan jika tidak ingin mengubah password"
                       class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                <p class="text-[11px] text-slate-400 mt-1">Isi hanya jika mitra lupa password atau meminta reset password.</p>
            </div>

            <!-- Konfigurasi Komisi -->
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div class="flex items-center gap-2">
                    <i data-lucide="coins" class="w-4 h-4 text-amber-600"></i>
                    <p class="text-xs font-bold text-slate-800 uppercase tracking-wider">Atur Skema & Besar Komisi</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Tipe Komisi <span class="text-rose-500">*</span></label>
                        <select name="type_commission" id="edit-commission-type" required onchange="handleCommissionTypeChange('edit')"
                                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer">
                            <option value="PERCENTAGE">Persentase (%)</option>
                            <option value="FIXED">Nominal Tetap (Rp)</option>
                        </select>
                    </div>
                    <div>
                        <label id="edit-commission-label" class="block text-xs font-semibold text-slate-600 mb-1">Besar Komisi (%) <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <span id="edit-commission-prefix" class="hidden absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rp</span>
                            <input type="text" name="amount_commission" id="edit-commission-amount" required
                                   oninput="formatCommissionInput(this, 'edit')"
                                   class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                            <span id="edit-commission-suffix" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                        </div>
                    </div>
                </div>
                <p id="edit-commission-hint" class="text-[11px] text-slate-400">
                    Nilai komisi ini otomatis berlaku untuk pesanan baru. Komisi persentase dihitung dari harga paket website setelah diskon klien (biaya domain tidak dihitung).
                </p>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="closeEditPartnerModal()"
                        class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer">
                    Batal
                </button>
                <button type="submit"
                        class="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer">
                    Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ============================================================== -->
<!-- MODAL 3: KONFIRMASI HAPUS MITRA -->
<!-- ============================================================== -->
<div id="modal-delete-partner" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs hidden">
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-md overflow-hidden animate-in fade-in duration-150">
        <div class="p-6 text-center space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <i data-lucide="alert-triangle" class="w-6 h-6"></i>
            </div>
            <div>
                <h3 class="font-bold text-slate-900 text-lg">Konfirmasi Hapus Mitra</h3>
                <p class="text-xs text-slate-500 mt-1">
                    Apakah Anda yakin ingin menghapus mitra <strong id="delete-partner-name" class="text-slate-800"></strong> dari sistem?
                </p>
                <div id="delete-has-orders-warning" class="hidden mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-left">
                    <p class="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <i data-lucide="info" class="w-4 h-4 shrink-0 text-amber-600"></i>
                        <span>Mitra memiliki riwayat transaksi/order!</span>
                    </p>
                    <p class="text-[11px] text-amber-700 mt-1 leading-relaxed">
                        Data mitra tidak dapat dihapus permanen demi integritas laporan keuangan. Sistem akan menolak aksi hapus. Disarankan untuk memilih <strong>Nonaktifkan</strong> status mitra saja.
                    </p>
                </div>
            </div>

            <form id="form-delete-partner" action="" method="POST" class="flex items-center justify-center gap-2 pt-2">
                @csrf
                @method('DELETE')
                <button type="button" onclick="closeDeletePartnerModal()"
                        class="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer">
                    Batal
                </button>
                <button type="submit"
                        class="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition cursor-pointer">
                    Ya, Hapus Mitra
                </button>
            </form>
        </div>
    </div>
</div>

<script>
    function openAddPartnerModal() {
        document.getElementById('modal-add-partner').classList.remove('hidden');
        handleCommissionTypeChange('add');
        if (window.lucide) lucide.createIcons();
    }

    function closeAddPartnerModal() {
        document.getElementById('modal-add-partner').classList.add('hidden');
    }

    function openEditPartnerModalFromEl(btn) {
        openEditPartnerModal({
            id: btn.dataset.id,
            name: btn.dataset.name,
            email: btn.dataset.email,
            whatsapp: btn.dataset.whatsapp,
            type_commission: btn.dataset.type,
            amount_commission: btn.dataset.amount
        });
    }

    function openDeletePartnerModalFromEl(btn) {
        openDeletePartnerModal(
            btn.dataset.id,
            btn.dataset.name,
            btn.dataset.hasOrders === '1'
        );
    }

    function openEditPartnerModal(data) {
        document.getElementById('form-edit-partner').action = `/dashboard/partners/${data.id}`;
        document.getElementById('edit-partner-name').value = data.name || '';
        document.getElementById('edit-partner-email').value = data.email || '';
        document.getElementById('edit-partner-whatsapp').value = data.whatsapp || '';
        document.getElementById('edit-commission-type').value = data.type_commission || 'PERCENTAGE';

        const amountInput = document.getElementById('edit-commission-amount');
        if (data.type_commission === 'FIXED') {
            amountInput.value = formatRupiahNumber(data.amount_commission);
        } else {
            amountInput.value = data.amount_commission;
        }

        handleCommissionTypeChange('edit');
        document.getElementById('modal-edit-partner').classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    }

    function closeEditPartnerModal() {
        document.getElementById('modal-edit-partner').classList.add('hidden');
    }

    function openDeletePartnerModal(partnerId, partnerName, hasOrders) {
        document.getElementById('form-delete-partner').action = `/dashboard/partners/${partnerId}`;
        document.getElementById('delete-partner-name').textContent = partnerName;

        const warningEl = document.getElementById('delete-has-orders-warning');
        if (hasOrders) {
            warningEl.classList.remove('hidden');
        } else {
            warningEl.classList.add('hidden');
        }

        document.getElementById('modal-delete-partner').classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    }

    function closeDeletePartnerModal() {
        document.getElementById('modal-delete-partner').classList.add('hidden');
    }

    function handleCommissionTypeChange(prefix) {
        const typeSelect = document.getElementById(`${prefix}-commission-type`);
        const label = document.getElementById(`${prefix}-commission-label`);
        const prefixEl = document.getElementById(`${prefix}-commission-prefix`);
        const suffixEl = document.getElementById(`${prefix}-commission-suffix`);
        const input = document.getElementById(`${prefix}-commission-amount`);
        const hint = document.getElementById(`${prefix}-commission-hint`);

        if (typeSelect.value === 'FIXED') {
            label.innerHTML = 'Besar Komisi (Rp) <span class="text-rose-500">*</span>';
            prefixEl.classList.remove('hidden');
            suffixEl.classList.add('hidden');
            input.classList.add('pl-9');
            input.classList.remove('pr-8');
            input.placeholder = 'Contoh: 200.000';
            hint.textContent = 'Mitra akan menerima komisi nominal tetap (Rupiah) setiap kali pesanan lunas.';

            // Re-format existing value to rupiah
            if (input.value) {
                input.value = formatRupiahNumber(input.value.replace(/[^0-9]/g, ''));
            }
        } else {
            label.innerHTML = 'Besar Komisi (%) <span class="text-rose-500">*</span>';
            prefixEl.classList.add('hidden');
            suffixEl.classList.remove('hidden');
            input.classList.remove('pl-9');
            input.classList.add('pr-8');
            input.placeholder = 'Contoh: 10';
            hint.textContent = 'Mitra akan menerima komisi berupa persentase dari harga paket website setelah diskon klien (biaya domain tidak dihitung).';

            // Strip formatting if switching back to percentage
            if (input.value) {
                input.value = input.value.replace(/[^0-9]/g, '');
            }
        }
    }

    function formatCommissionInput(input, prefix) {
        const typeSelect = document.getElementById(`${prefix}-commission-type`);
        if (typeSelect.value === 'FIXED') {
            let val = input.value.replace(/[^0-9]/g, '');
            input.value = formatRupiahNumber(val);
        } else {
            let val = input.value.replace(/[^0-9]/g, '');
            if (val !== '' && parseInt(val, 10) > 100) {
                val = '100';
            }
            input.value = val;
        }
    }

    function formatRupiahNumber(number) {
        if (!number) return '';
        const numStr = number.toString().replace(/[^0-9]/g, '');
        return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Close modals on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAddPartnerModal();
            closeEditPartnerModal();
            closeDeletePartnerModal();
        }
    });

    // Close on backdrop click
    ['modal-add-partner', 'modal-edit-partner', 'modal-delete-partner'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.add('hidden');
                }
            });
        }
    });
</script>
@endsection
