@extends('layouts.dashboard')

@section('title', 'Kelola Pengguna - Admin CMS Bidtech')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Top Bar Title & Quick Action -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Kelola Pengguna & Hak Akses</h1>
            <p class="text-sm text-slate-500 mt-1">Manajemen seluruh akun pengguna, analitik aktivitas klien, afiliasi mitra, dan penugasan tim internal Bidtech.</p>
        </div>
        <div class="flex items-center gap-3">
            <button type="button" onclick="openAddUserModal()"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>Tambah User Baru</span>
            </button>
        </div>
    </div>

    <!-- ================= 1. BENTO STATS CARDS (INFORMATIF & TERSTRUKTUR) ================= -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        <!-- CARD 1: Total Pengguna & Pertumbuhan Registrasi -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pengguna</span>
                <div class="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <i data-lucide="users" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="mt-4">
                <div class="flex items-baseline gap-2">
                    <p class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {{ number_format($stats['total']) }}
                    </p>
                    <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        +{{ $stats['new_this_month'] }} Bulan Ini
                    </span>
                </div>
                <div class="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Internal Staff:</span>
                    <span class="font-bold text-slate-700">{{ $stats['admin'] }} Admin • {{ $stats['marketing'] }} Mkt</span>
                </div>
            </div>
        </div>

        <!-- CARD 2: Klien & Nilai Transaksi Bisnis -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-200 transition">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Klien & Transaksi</span>
                <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="mt-4">
                <div class="flex items-baseline gap-2">
                    <p class="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
                        {{ number_format($stats['klien']) }} <span class="text-sm font-semibold text-slate-400">Klien</span>
                    </p>
                </div>
                <div class="mt-2.5 pt-2.5 border-t border-slate-100 space-y-0.5 text-xs">
                    <div class="flex items-center justify-between text-slate-500">
                        <span>Omzet Klien:</span>
                        <span class="font-bold text-emerald-700">Rp {{ number_format($stats['klien_omzet'], 0, ',', '.') }}</span>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Transaksi Lunas:</span>
                        <span class="font-semibold text-slate-600">{{ $stats['klien_paid_orders'] }} Order</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- CARD 3: Mitra Afiliasi & Kinerja Komisi -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-cyan-200 transition">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-cyan-600 uppercase tracking-wider">Mitra & Afiliasi</span>
                <div class="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                    <i data-lucide="award" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="mt-4">
                <div class="flex items-baseline gap-2">
                    <p class="text-2xl sm:text-3xl font-black text-cyan-800 tracking-tight">
                        {{ number_format($stats['mitra']) }} <span class="text-sm font-semibold text-slate-400">Mitra</span>
                    </p>
                </div>
                <div class="mt-2.5 pt-2.5 border-t border-slate-100 space-y-0.5 text-xs">
                    <div class="flex items-center justify-between text-slate-500">
                        <span>Total Komisi:</span>
                        <span class="font-bold text-cyan-800">Rp {{ number_format($stats['mitra_commission_total'], 0, ',', '.') }}</span>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Kupon Afiliasi:</span>
                        <span class="font-semibold text-slate-600">{{ $stats['mitra_coupons_count'] }} Voucher</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- CARD 4: Tim Media & Produktivitas Artikel -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-amber-200 transition">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Tim Media & Blog</span>
                <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <i data-lucide="newspaper" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="mt-4">
                <div class="flex items-baseline gap-2">
                    <p class="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight">
                        {{ number_format($stats['media']) }} <span class="text-sm font-semibold text-slate-400">Penulis</span>
                    </p>
                </div>
                <div class="mt-2.5 pt-2.5 border-t border-slate-100 space-y-0.5 text-xs">
                    <div class="flex items-center justify-between text-slate-500">
                        <span>Artikel Tayang:</span>
                        <span class="font-bold text-amber-700">{{ $stats['media_articles_published'] }} Terbit</span>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Draf Berjalan:</span>
                        <span class="font-semibold text-slate-600">{{ $stats['media_articles_draft'] }} Draf</span>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- ================= 2. FILTER TABS & SEARCH BAR ================= -->
    <div class="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <!-- Tab Filter Role -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <a href="{{ route('dashboard.users.index', array_merge(request()->except('role', 'page'), ['role' => null])) }}"
                   class="px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 {{ empty($activeRole) ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' }}">
                    <span>Semua Role</span>
                    <span class="px-1.5 py-0.2 rounded-full text-[10px] {{ empty($activeRole) ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700' }}">{{ $stats['total'] }}</span>
                </a>

                @foreach($roles as $roleEnum)
                    @php
                        $roleVal = $roleEnum->value;
                        $roleCountKey = strtolower($roleVal);
                        $roleCount = $stats[$roleCountKey] ?? 0;
                        $isActive = ($activeRole === $roleVal);
                    @endphp
                    <a href="{{ route('dashboard.users.index', array_merge(request()->except('role', 'page'), ['role' => $roleVal])) }}"
                       class="px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 {{ $isActive ? 'bg-primary text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' }}">
                        <span>{{ ucfirst(strtolower($roleVal)) }}</span>
                        <span class="px-1.5 py-0.2 rounded-full text-[10px] {{ $isActive ? 'bg-primary-hover text-white' : 'bg-slate-200 text-slate-700' }}">
                            {{ $roleCount }}
                        </span>
                    </a>
                @endforeach
            </div>

            <!-- Search Bar Form -->
            <form action="{{ route('dashboard.users.index') }}" method="GET" class="flex items-center gap-2">
                @if($activeRole)
                    <input type="hidden" name="role" value="{{ $activeRole }}">
                @endif
                <div class="relative w-full sm:w-80">
                    <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                    <input type="text" name="search" value="{{ request('search') }}"
                           placeholder="Cari nama, email, whatsapp, domain..."
                           class="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
                <button type="submit" class="px-3.5 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition cursor-pointer">
                    Cari
                </button>
                @if(request('search'))
                    <a href="{{ route('dashboard.users.index', request()->only('role')) }}"
                       class="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-xl transition"
                       title="Reset pencarian">
                        Reset
                    </a>
                @endif
            </form>
        </div>
    </div>

    <!-- ================= 3. TABEL DATA PENGGUNA TERPADU ================= -->
    <div class="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th class="py-3.5 px-5">Profil Pengguna</th>
                        <th class="py-3.5 px-4">Role Akun</th>
                        <th class="py-3.5 px-5">Ringkasan Aktivitas & Kinerja</th>
                        <th class="py-3.5 px-4">Kontak WhatsApp</th>
                        <th class="py-3.5 px-4">Terdaftar</th>
                        <th class="py-3.5 px-5 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-sm">
                    @forelse($users as $user)
                        @php
                            $roleName = $user->role->value;
                            
                            // Badge color styling per role
                            $badgeClass = match($roleName) {
                                'ADMIN'     => 'bg-purple-100 text-purple-800 border-purple-200/80',
                                'MARKETING' => 'bg-blue-100 text-blue-800 border-blue-200/80',
                                'KLIEN'     => 'bg-emerald-100 text-emerald-800 border-emerald-200/80',
                                'MEDIA'     => 'bg-amber-100 text-amber-800 border-amber-200/80',
                                'MITRA'     => 'bg-cyan-100 text-cyan-800 border-cyan-200/80',
                                default     => 'bg-slate-100 text-slate-800 border-slate-200/80',
                            };

                            // Perhitungan total belanja untuk Klien
                            $klienTotalSpent = 0;
                            if ($user->isKlien()) {
                                foreach ($user->orders as $o) {
                                    if ($o->status === \App\Enums\OrderStatus::Paid) {
                                        $klienTotalSpent += $o->total_price;
                                    }
                                }
                            }
                        @endphp
                        <tr class="hover:bg-slate-50/60 transition group">
                            
                            <!-- Profil Pengguna Info -->
                            <td class="py-4 px-5">
                                <div class="flex items-center gap-3">
                                    <div class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 uppercase shadow-2xs">
                                        {{ strtoupper(substr($user->name, 0, 2)) }}
                                    </div>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-2">
                                            <p class="font-bold text-slate-900 truncate">{{ $user->name }}</p>
                                            @if($user->id === auth()->id())
                                                <span class="px-1.5 py-0.2 rounded-md text-[9px] font-bold bg-slate-200 text-slate-700">Akun Anda</span>
                                            @endif
                                        </div>
                                        <p class="text-xs text-slate-400 truncate">{{ $user->email }}</p>
                                    </div>
                                </div>
                            </td>

                            <!-- Role Badge -->
                            <td class="py-4 px-4 whitespace-nowrap">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border {{ $badgeClass }}">
                                    {{ $roleName }}
                                </span>
                            </td>

                            <!-- Ringkasan Aktivitas & Kinerja (Kaya Informasi Sesuai Role) -->
                            <td class="py-4 px-5">
                                @if($user->isKlien())
                                    <div class="space-y-1">
                                        <div class="flex items-center gap-2">
                                            <span class="inline-flex items-center gap-1 font-bold text-slate-900 text-xs">
                                                <i data-lucide="shopping-bag" class="w-3.5 h-3.5 text-emerald-600"></i>
                                                {{ $user->orders_count }} Pesanan
                                            </span>
                                            @if($user->paid_orders_count > 0)
                                                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                                    {{ $user->paid_orders_count }} Lunas
                                                </span>
                                            @endif
                                        </div>

                                        @if($klienTotalSpent > 0)
                                            <p class="text-xs font-semibold text-emerald-700">
                                                Total Belanja: Rp {{ number_format($klienTotalSpent, 0, ',', '.') }}
                                            </p>
                                        @endif

                                        @if($user->latestOrder)
                                            <div class="flex items-center gap-1.5 text-[11px] text-slate-500">
                                                <i data-lucide="globe" class="w-3 h-3 text-slate-400"></i>
                                                <span class="truncate max-w-[180px] font-mono text-slate-700">{{ $user->latestOrder->domain_name }}</span>
                                                <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold {{ $user->latestOrder->status === \App\Enums\OrderStatus::Paid ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600' }}">
                                                    {{ $user->latestOrder->status->label() }}
                                                </span>
                                            </div>
                                        @else
                                            <p class="text-[11px] text-slate-400 italic">Belum melakukan checkout</p>
                                        @endif
                                    </div>

                                @elseif($user->isMitra())
                                    <div class="space-y-1">
                                        <div class="flex items-center gap-2">
                                            <span class="inline-flex items-center gap-1 font-bold text-cyan-800 text-xs">
                                                <i data-lucide="award" class="w-3.5 h-3.5 text-cyan-600"></i>
                                                Skema: {{ $user->partner?->type_commission->value ?? 'Fixed' }}
                                            </span>
                                        </div>
                                        
                                        @if($user->partner && $user->partner->coupons->isNotEmpty())
                                            <div class="flex items-center gap-1 flex-wrap">
                                                <span class="text-[11px] text-slate-400">Kupon:</span>
                                                @foreach($user->partner->coupons->take(2) as $cpn)
                                                    <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 border border-cyan-200/60">
                                                        {{ $cpn->code }}
                                                    </span>
                                                @endforeach
                                                @if($user->partner->coupons->count() > 2)
                                                    <span class="text-[10px] text-slate-400">+{{ $user->partner->coupons->count() - 2 }} lagi</span>
                                                @endif
                                            </div>
                                        @else
                                            <p class="text-[11px] text-slate-400 italic">Belum ada kupon terhubung</p>
                                        @endif
                                    </div>

                                @elseif($user->isMedia())
                                    <div class="space-y-1">
                                        <div class="flex items-center gap-2">
                                            <span class="inline-flex items-center gap-1 font-bold text-amber-800 text-xs">
                                                <i data-lucide="feather" class="w-3.5 h-3.5 text-amber-600"></i>
                                                {{ $user->articles_count }} Total Artikel
                                            </span>
                                            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                                                {{ $user->published_articles_count }} Tayang
                                            </span>
                                        </div>
                                        @if($user->author_name)
                                            <p class="text-[11px] text-slate-500 truncate">
                                                Byline: <span class="font-semibold text-slate-700">{{ $user->author_name }}</span>
                                            </p>
                                        @endif
                                    </div>

                                @elseif($user->isAdmin())
                                    <div class="space-y-0.5">
                                        <p class="text-xs font-bold text-purple-900">Administrator Utama</p>
                                        <p class="text-[11px] text-slate-400">Akses penuh seluruh modul CMS & sistem</p>
                                    </div>

                                @elseif($user->isMarketing())
                                    <div class="space-y-0.5">
                                        <p class="text-xs font-bold text-blue-900">Staf Pemasaran (Marketing)</p>
                                        <p class="text-[11px] text-slate-400">Pemantauan metrik transaksi & promosi</p>
                                    </div>
                                @endif
                            </td>

                            <!-- Kontak WhatsApp -->
                            <td class="py-4 px-4 whitespace-nowrap text-xs">
                                @if($user->whatsapp)
                                    @php
                                        $cleanWa = preg_replace('/[^0-9]/', '', $user->whatsapp);
                                        if (str_starts_with($cleanWa, '0')) {
                                            $cleanWa = '62' . substr($cleanWa, 1);
                                        }
                                    @endphp
                                    <a href="https://wa.me/{{ $cleanWa }}" target="_blank" rel="noopener noreferrer"
                                       class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200/50 transition">
                                        <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
                                        <span>{{ $user->whatsapp }}</span>
                                    </a>
                                @else
                                    <span class="text-slate-400 italic text-[11px]">- Tidak ada -</span>
                                @endif
                            </td>

                            <!-- Terdaftar Sejak -->
                            <td class="py-4 px-4 whitespace-nowrap text-xs text-slate-500">
                                <p class="font-medium text-slate-700">{{ $user->created_at ? $user->created_at->format('d M Y') : '-' }}</p>
                                <p class="text-[10px] text-slate-400">{{ $user->created_at ? $user->created_at->diffForHumans() : '' }}</p>
                            </td>

                            <!-- Kolom Aksi Lengkap -->
                            <td class="py-4 px-5 text-right whitespace-nowrap">
                                <div class="inline-flex items-center gap-1">
                                    
                                    <!-- Tombol LIHAT DETAIL (Quick View) -->
                                    <button type="button"
                                        onclick="openDetailUserModal(@js([
                                            'id' => $user->id,
                                            'name' => $user->name,
                                            'email' => $user->email,
                                            'whatsapp' => $user->whatsapp,
                                            'role' => $user->role->value,
                                            'author_name' => $user->author_name,
                                            'created_at' => $user->created_at ? $user->created_at->format('d F Y, H:i') : '-',
                                            'orders_count' => $user->orders_count,
                                            'paid_orders_count' => $user->paid_orders_count,
                                            'total_spent' => number_format($klienTotalSpent, 0, ',', '.'),
                                            'orders' => $user->orders->map(fn($o) => [
                                                'order_number' => $o->order_number,
                                                'domain_name' => $o->domain_name,
                                                'status' => $o->status->label(),
                                                'status_val' => $o->status->value,
                                                'website_status' => $o->isPaid() ? $o->website_status->label() : '-',
                                                'total_price' => number_format($o->total_price, 0, ',', '.'),
                                                'created_at' => $o->created_at ? $o->created_at->format('d M Y') : '-'
                                            ]),
                                            'partner' => $user->partner ? [
                                                'type_commission' => $user->partner->type_commission->value ?? 'Fixed',
                                                'amount_commission' => number_format($user->partner->amount_commission, 0, ',', '.'),
                                                'coupons' => $user->partner->coupons->map(fn($c) => [
                                                    'code' => $c->code,
                                                    'is_active' => $c->is_active
                                                ])
                                            ] : null,
                                            'articles_count' => $user->articles_count,
                                            'published_articles_count' => $user->published_articles_count,
                                            'articles' => $user->articles->map(fn($a) => [
                                                'title' => $a->title,
                                                'status' => $a->status->value,
                                                'published_at' => $a->published_at ? $a->published_at->format('d M Y') : '-'
                                            ])
                                        ]))"
                                        class="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-primary-50 transition cursor-pointer"
                                        title="Lihat Detail Profil & Riwayat">
                                        <i data-lucide="eye" class="w-4 h-4"></i>
                                    </button>

                                    <!-- Edit User Button -->
                                    <button type="button"
                                        onclick="openEditUserModal(@js([
                                            'id' => $user->id,
                                            'name' => $user->name,
                                            'email' => $user->email,
                                            'whatsapp' => $user->whatsapp,
                                            'role' => $user->role->value,
                                            'author_name' => $user->author_name,
                                            'is_self' => ($user->id === auth()->id())
                                        ]))"
                                        class="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                                        title="Edit Data Pengguna">
                                        <i data-lucide="pencil" class="w-4 h-4"></i>
                                    </button>

                                    <!-- Reset Password Button -->
                                    <button type="button"
                                        onclick="openResetPasswordModal({{ $user->id }}, '{{ addslashes($user->name) }}')"
                                        class="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                                        title="Reset Password Akun">
                                        <i data-lucide="key" class="w-4 h-4"></i>
                                    </button>

                                    <!-- Delete Button (Disabled for self) -->
                                    @if($user->id !== auth()->id())
                                        <button type="button"
                                            onclick="openDeleteUserModal({{ $user->id }}, '{{ addslashes($user->name) }}', '{{ $user->role->value }}', {{ $user->orders_count }})"
                                            class="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                            title="Hapus Pengguna">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    @endif

                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="py-12 px-4 text-center">
                                <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                                    <i data-lucide="user-x" class="w-6 h-6"></i>
                                </div>
                                <h3 class="text-sm font-bold text-slate-800">Tidak ada pengguna ditemukan</h3>
                                <p class="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau pilih filter role lain.</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if($users->hasPages())
            <div class="p-4 border-t border-slate-100 bg-slate-50/50">
                {{ $users->links() }}
            </div>
        @endif
    </div>

</div>

<!-- ============================================================== -->
<!-- MODAL DETAIL PENGGUNA (QUICK VIEW) -->
<!-- ============================================================== -->
<div id="modal-detail-user" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs hidden">
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in duration-150">
        
        <!-- Header Modal Detail -->
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div class="flex items-center gap-3">
                <div id="detail-user-avatar" class="w-10 h-10 rounded-full bg-primary-100 text-primary-800 font-bold text-sm flex items-center justify-center uppercase">
                    --
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <h3 id="detail-user-name" class="font-bold text-slate-900 text-base">Nama Pengguna</h3>
                        <span id="detail-user-role-badge" class="px-2 py-0.5 rounded-full text-[10px] font-bold">Role</span>
                    </div>
                    <p id="detail-user-email" class="text-xs text-slate-500">email@example.com</p>
                </div>
            </div>
            <button type="button" onclick="closeDetailUserModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <!-- Body Modal Detail (Scrollable) -->
        <div class="p-6 overflow-y-auto space-y-6">
            
            <!-- Grid Informasi Identitas -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                    <span class="text-slate-400 block font-medium">WhatsApp:</span>
                    <span id="detail-user-whatsapp" class="font-bold text-slate-800">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block font-medium">Terdaftar Pada:</span>
                    <span id="detail-user-created-at" class="font-bold text-slate-800">-</span>
                </div>
                <div id="detail-author-box" class="hidden">
                    <span class="text-slate-400 block font-medium">Nama Byline / Author:</span>
                    <span id="detail-user-author" class="font-bold text-slate-800">-</span>
                </div>
            </div>

            <!-- Bagian Khusus Klien (Riwayat Pesanan) -->
            <div id="detail-klien-section" class="hidden space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <i data-lucide="shopping-bag" class="w-4 h-4 text-emerald-600"></i>
                        <span>Riwayat Pesanan Website (<span id="detail-klien-order-count">0</span>)</span>
                    </h4>
                    <span class="text-xs font-bold text-emerald-700">
                        Total Belanja: Rp <span id="detail-klien-total-spent">0</span>
                    </span>
                </div>

                <div id="detail-klien-orders-list" class="space-y-2 max-h-56 overflow-y-auto pr-1">
                    <!-- Populated by JS -->
                </div>
            </div>

            <!-- Bagian Khusus Mitra (Afiliasi & Komisi) -->
            <div id="detail-mitra-section" class="hidden space-y-3">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <i data-lucide="award" class="w-4 h-4 text-cyan-600"></i>
                    <span>Informasi Kemitraan & Kupon</span>
                </h4>
                <div class="p-4 rounded-xl border border-cyan-100 bg-cyan-50/40 space-y-3">
                    <div class="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <span class="text-slate-400 block">Tipe Komisi:</span>
                            <span id="detail-mitra-type" class="font-bold text-cyan-900">-</span>
                        </div>
                        <div>
                            <span class="text-slate-400 block">Nilai Komisi Dasar:</span>
                            <span id="detail-mitra-amount" class="font-bold text-cyan-900">-</span>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs text-slate-400 block mb-1.5">Daftar Kupon Afiliasi:</span>
                        <div id="detail-mitra-coupons-list" class="flex flex-wrap gap-1.5">
                            <!-- Populated by JS -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bagian Khusus Media (Artikel Blog) -->
            <div id="detail-media-section" class="hidden space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <i data-lucide="newspaper" class="w-4 h-4 text-amber-600"></i>
                        <span>Artikel Blog yang Ditulis (<span id="detail-media-article-count">0</span>)</span>
                    </h4>
                </div>

                <div id="detail-media-articles-list" class="space-y-2 max-h-56 overflow-y-auto pr-1">
                    <!-- Populated by JS -->
                </div>
            </div>

        </div>

        <!-- Footer Modal Detail -->
        <div class="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span class="text-xs text-slate-400">Bidtech User Management</span>
            <button type="button" onclick="closeDetailUserModal()"
                class="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer">
                Tutup
            </button>
        </div>

    </div>
</div>

<!-- ============================================================== -->
<!-- MODAL 1: TAMBAH USER BARU -->
<!-- ============================================================== -->
<div id="modal-add-user" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs hidden">
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                    <i data-lucide="user-plus" class="w-4 h-4"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-base">Tambah Pengguna Baru</h3>
            </div>
            <button type="button" onclick="closeAddUserModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <form action="{{ route('dashboard.users.store') }}" method="POST" class="p-6 space-y-4">
            @csrf

            <!-- Nama Lengkap -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Lengkap <span class="text-rose-500">*</span></label>
                <input type="text" name="name" required placeholder="Contoh: John Doe"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <!-- Email & WhatsApp -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Email <span class="text-rose-500">*</span></label>
                    <input type="email" name="email" required placeholder="nama@email.com"
                        class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">No. WhatsApp</label>
                    <input type="text" name="whatsapp" placeholder="081234567890"
                        class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
            </div>

            <!-- Role Selection -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Pilih Role <span class="text-rose-500">*</span></label>
                <select name="role" id="add-user-role-select" required onchange="toggleAuthorNameField('add')"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                    <option value="" disabled selected>-- Pilih Role Pengguna --</option>
                    @foreach($roles as $roleEnum)
                        <option value="{{ $roleEnum->value }}">{{ ucfirst(strtolower($roleEnum->value)) }} ({{ $roleEnum->value }})</option>
                    @endforeach
                </select>
            </div>

            <!-- Author Name (Khusus jika role MEDIA) -->
            <div id="add-author-name-wrapper" class="hidden">
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Pena / Byline (Khusus Media)</label>
                <input type="text" name="author_name" placeholder="Nama penulis artikel publik"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                <p class="text-[11px] text-slate-400 mt-1">Nama ini akan tercantum sebagai penulis artikel di blog publik.</p>
            </div>

            <!-- Password -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Password Akun <span class="text-rose-500">*</span></label>
                <input type="password" name="password" required minlength="6" placeholder="Minimal 6 karakter"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="closeAddUserModal()"
                    class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer">
                    Batal
                </button>
                <button type="submit"
                    class="px-5 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition cursor-pointer">
                    Simpan User
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ============================================================== -->
<!-- MODAL 2: EDIT USER -->
<!-- ============================================================== -->
<div id="modal-edit-user" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs hidden">
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <i data-lucide="user-check" class="w-4 h-4"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-base">Edit Pengguna</h3>
            </div>
            <button type="button" onclick="closeEditUserModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <form id="edit-user-form" action="" method="POST" class="p-6 space-y-4">
            @csrf
            @method('PUT')

            <!-- Nama Lengkap -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Lengkap <span class="text-rose-500">*</span></label>
                <input type="text" name="name" id="edit-user-name" required
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <!-- Email & WhatsApp -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Email <span class="text-rose-500">*</span></label>
                    <input type="email" name="email" id="edit-user-email" required
                        class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">No. WhatsApp</label>
                    <input type="text" name="whatsapp" id="edit-user-whatsapp"
                        class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                </div>
            </div>

            <!-- Role Selection -->
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Role Pengguna <span class="text-rose-500">*</span></label>
                <select name="role" id="edit-user-role-select" required onchange="toggleAuthorNameField('edit')"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                    @foreach($roles as $roleEnum)
                        <option value="{{ $roleEnum->value }}">{{ ucfirst(strtolower($roleEnum->value)) }} ({{ $roleEnum->value }})</option>
                    @endforeach
                </select>
                <input type="hidden" name="role" id="edit-user-role-hidden" disabled value="">
                <p id="edit-role-warning" class="text-[11px] text-amber-600 mt-1 hidden">
                    Catatan: Anda sedang mengedit akun Anda sendiri. Role tidak dapat diubah ke role lain saat sedang login.
                </p>
            </div>

            <!-- Author Name (Khusus jika role MEDIA) -->
            <div id="edit-author-name-wrapper" class="hidden">
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Pena / Byline (Khusus Media)</label>
                <input type="text" name="author_name" id="edit-user-author-name"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="closeEditUserModal()"
                    class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer">
                    Batal
                </button>
                <button type="submit"
                    class="px-5 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition cursor-pointer">
                    Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ============================================================== -->
<!-- MODAL 3: RESET PASSWORD -->
<!-- ============================================================== -->
<div id="modal-reset-password" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs hidden">
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-md overflow-hidden animate-in fade-in duration-150">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <i data-lucide="key" class="w-4 h-4"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-base">Reset Password User</h3>
            </div>
            <button type="button" onclick="closeResetPasswordModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <form id="reset-password-form" action="" method="POST" class="p-6 space-y-4">
            @csrf
            @method('PUT')

            <p class="text-xs text-slate-500 leading-relaxed">
                Ubah password akun untuk <span id="reset-password-user-name" class="font-bold text-slate-800"></span>. User akan login menggunakan password baru ini.
            </p>

            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Password Baru <span class="text-rose-500">*</span></label>
                <input type="password" name="password" required minlength="6" placeholder="Minimal 6 karakter"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="closeResetPasswordModal()"
                    class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer">
                    Batal
                </button>
                <button type="submit"
                    class="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition cursor-pointer">
                    Update Password
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ============================================================== -->
<!-- MODAL 4: HAPUS USER -->
<!-- ============================================================== -->
<div id="modal-delete-user" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs hidden">
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-md overflow-hidden animate-in fade-in duration-150">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-base">Hapus Pengguna</h3>
            </div>
            <button type="button" onclick="closeDeleteUserModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <form id="delete-user-form" action="" method="POST" class="p-6 space-y-4">
            @csrf
            @method('DELETE')

            <p class="text-sm text-slate-600">
                Apakah Anda yakin ingin menghapus pengguna <span id="delete-user-name" class="font-bold text-slate-900"></span> (<span id="delete-user-role" class="font-mono text-xs font-semibold text-slate-700"></span>)?
            </p>

            <div id="delete-user-orders-warning" class="hidden p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-800 space-y-1">
                <div class="flex items-center gap-1.5 font-bold">
                    <i data-lucide="info" class="w-4 h-4 text-amber-600"></i>
                    <span>Pengguna Memiliki Riwayat Pesanan:</span>
                </div>
                <p>Pengguna ini memiliki <span id="delete-user-orders-count" class="font-bold"></span> pesanan website. Menghapus akun ini akan melepaskan keterkaitan akun klien dari transaksi pesanan tersebut.</p>
            </div>

            <p class="text-xs text-rose-600 font-medium">
                Tindakan ini permanen dan tidak dapat dibatalkan.
            </p>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="closeDeleteUserModal()"
                    class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer">
                    Batal
                </button>
                <button type="submit"
                    class="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition cursor-pointer">
                    Ya, Hapus Pengguna
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ============================================================== -->
<!-- JAVASCRIPT MODAL & QUICK VIEW LOGIC -->
<!-- ============================================================== -->
<script>
    // Toggle Author Name Field
    function toggleAuthorNameField(prefix) {
        const select = document.getElementById(prefix + '-user-role-select');
        const wrapper = document.getElementById(prefix + '-author-name-wrapper');
        if (!select || !wrapper) return;

        if (select.value === 'MEDIA') {
            wrapper.classList.remove('hidden');
        } else {
            wrapper.classList.add('hidden');
        }
    }

    // Modal Quick View Detail User
    function openDetailUserModal(data) {
        document.getElementById('detail-user-name').textContent = data.name;
        document.getElementById('detail-user-email').textContent = data.email;
        document.getElementById('detail-user-avatar').textContent = (data.name || 'US').substring(0, 2).toUpperCase();
        
        const badge = document.getElementById('detail-user-role-badge');
        badge.textContent = data.role;
        badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold border ';
        if (data.role === 'ADMIN') badge.className += 'bg-purple-100 text-purple-800 border-purple-200';
        else if (data.role === 'MARKETING') badge.className += 'bg-blue-100 text-blue-800 border-blue-200';
        else if (data.role === 'KLIEN') badge.className += 'bg-emerald-100 text-emerald-800 border-emerald-200';
        else if (data.role === 'MEDIA') badge.className += 'bg-amber-100 text-amber-800 border-amber-200';
        else if (data.role === 'MITRA') badge.className += 'bg-cyan-100 text-cyan-800 border-cyan-200';

        document.getElementById('detail-user-whatsapp').textContent = data.whatsapp || '-';
        document.getElementById('detail-user-created-at').textContent = data.created_at || '-';

        // Author Name Box
        const authorBox = document.getElementById('detail-author-box');
        if (data.role === 'MEDIA' && data.author_name) {
            authorBox.classList.remove('hidden');
            document.getElementById('detail-user-author').textContent = data.author_name;
        } else {
            authorBox.classList.add('hidden');
        }

        // Section Klien
        const klienSec = document.getElementById('detail-klien-section');
        const ordersList = document.getElementById('detail-klien-orders-list');
        ordersList.innerHTML = '';
        if (data.role === 'KLIEN') {
            klienSec.classList.remove('hidden');
            document.getElementById('detail-klien-order-count').textContent = data.orders_count;
            document.getElementById('detail-klien-total-spent').textContent = data.total_spent;

            if (data.orders && data.orders.length > 0) {
                data.orders.forEach(function(o) {
                    const item = document.createElement('div');
                    item.className = 'p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs hover:border-slate-300 transition';
                    item.innerHTML = `
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-800">${o.order_number}</span>
                                <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold ${o.status_val === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}">${o.status}</span>
                            </div>
                            <p class="text-[11px] text-slate-500 font-mono mt-0.5">${o.domain_name}</p>
                        </div>
                        <div class="text-right">
                            <span class="font-bold text-slate-900 block">Rp ${o.total_price}</span>
                            <span class="text-[10px] text-slate-400">${o.created_at}</span>
                        </div>
                    `;
                    ordersList.appendChild(item);
                });
            } else {
                ordersList.innerHTML = '<p class="text-xs text-slate-400 italic py-2">Belum ada pesanan yang tercatat.</p>';
            }
        } else {
            klienSec.classList.add('hidden');
        }

        // Section Mitra
        const mitraSec = document.getElementById('detail-mitra-section');
        const couponsList = document.getElementById('detail-mitra-coupons-list');
        couponsList.innerHTML = '';
        if (data.role === 'MITRA') {
            mitraSec.classList.remove('hidden');
            if (data.partner) {
                document.getElementById('detail-mitra-type').textContent = data.partner.type_commission;
                document.getElementById('detail-mitra-amount').textContent = data.partner.amount_commission;
                if (data.partner.coupons && data.partner.coupons.length > 0) {
                    data.partner.coupons.forEach(function(c) {
                        const span = document.createElement('span');
                        span.className = 'px-2 py-1 rounded-lg text-xs font-mono font-bold ' + (c.is_active ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' : 'bg-slate-100 text-slate-500');
                        span.textContent = c.code + (c.is_active ? '' : ' (Nonaktif)');
                        couponsList.appendChild(span);
                    });
                } else {
                    couponsList.innerHTML = '<span class="text-xs text-slate-400 italic">Belum ada kupon terdaftar.</span>';
                }
            } else {
                document.getElementById('detail-mitra-type').textContent = 'Default';
                document.getElementById('detail-mitra-amount').textContent = '0';
                couponsList.innerHTML = '<span class="text-xs text-slate-400 italic">Profil kemitraan belum dibuat.</span>';
            }
        } else {
            mitraSec.classList.add('hidden');
        }

        // Section Media
        const mediaSec = document.getElementById('detail-media-section');
        const articlesList = document.getElementById('detail-media-articles-list');
        articlesList.innerHTML = '';
        if (data.role === 'MEDIA') {
            mediaSec.classList.remove('hidden');
            document.getElementById('detail-media-article-count').textContent = data.articles_count;

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(function(a) {
                    const item = document.createElement('div');
                    item.className = 'p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs hover:border-slate-300 transition';
                    item.innerHTML = `
                        <div class="truncate max-w-[360px]">
                            <p class="font-bold text-slate-800 truncate">${a.title || 'Draft Tanpa Judul'}</p>
                            <span class="text-[10px] text-slate-400">${a.published_at !== '-' ? 'Tayang: ' + a.published_at : 'Belum dipublikasikan'}</span>
                        </div>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${a.status === 'published' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'} uppercase">
                            ${a.status}
                        </span>
                    `;
                    articlesList.appendChild(item);
                });
            } else {
                articlesList.innerHTML = '<p class="text-xs text-slate-400 italic py-2">Belum ada artikel yang ditulis.</p>';
            }
        } else {
            mediaSec.classList.add('hidden');
        }

        document.getElementById('modal-detail-user').classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }

    function closeDetailUserModal() {
        document.getElementById('modal-detail-user').classList.add('hidden');
    }

    // Modal Tambah User
    function openAddUserModal() {
        document.getElementById('modal-add-user').classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }
    function closeAddUserModal() {
        document.getElementById('modal-add-user').classList.add('hidden');
    }

    // Modal Edit User
    function openEditUserModal(user) {
        const form = document.getElementById('edit-user-form');
        form.action = "{{ url('dashboard/users') }}/" + user.id;

        document.getElementById('edit-user-name').value = user.name || '';
        document.getElementById('edit-user-email').value = user.email || '';
        document.getElementById('edit-user-whatsapp').value = user.whatsapp || '';
        
        const roleSelect = document.getElementById('edit-user-role-select');
        roleSelect.value = user.role || '';

        const roleWarning = document.getElementById('edit-role-warning');
        const hiddenRole = document.getElementById('edit-user-role-hidden');
        if (user.is_self) {
            roleWarning.classList.remove('hidden');
            roleSelect.setAttribute('disabled', 'disabled');
            if (hiddenRole) {
                hiddenRole.removeAttribute('disabled');
                hiddenRole.value = user.role;
            }
        } else {
            roleWarning.classList.add('hidden');
            roleSelect.removeAttribute('disabled');
            if (hiddenRole) {
                hiddenRole.setAttribute('disabled', 'disabled');
            }
        }

        const authorInput = document.getElementById('edit-user-author-name');
        if (authorInput) authorInput.value = user.author_name || '';

        toggleAuthorNameField('edit');

        document.getElementById('modal-edit-user').classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }
    function closeEditUserModal() {
        document.getElementById('modal-edit-user').classList.add('hidden');
    }

    // Modal Reset Password
    function openResetPasswordModal(id, name) {
        const form = document.getElementById('reset-password-form');
        form.action = "{{ url('dashboard/users') }}/" + id + "/password";
        document.getElementById('reset-password-user-name').textContent = name;

        document.getElementById('modal-reset-password').classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }
    function closeResetPasswordModal() {
        document.getElementById('modal-reset-password').classList.add('hidden');
    }

    // Modal Hapus User
    function openDeleteUserModal(id, name, role, ordersCount) {
        const form = document.getElementById('delete-user-form');
        form.action = "{{ url('dashboard/users') }}/" + id;
        document.getElementById('delete-user-name').textContent = name;
        document.getElementById('delete-user-role').textContent = role;

        const warningBox = document.getElementById('delete-user-orders-warning');
        const countSpan = document.getElementById('delete-user-orders-count');
        if (ordersCount > 0) {
            countSpan.textContent = ordersCount;
            warningBox.classList.remove('hidden');
        } else {
            warningBox.classList.add('hidden');
        }

        document.getElementById('modal-delete-user').classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }
    function closeDeleteUserModal() {
        document.getElementById('modal-delete-user').classList.add('hidden');
    }

    // Close on Backdrop Click or ESC Key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetailUserModal();
            closeAddUserModal();
            closeEditUserModal();
            closeResetPasswordModal();
            closeDeleteUserModal();
        }
    });

    ['modal-detail-user', 'modal-add-user', 'modal-edit-user', 'modal-reset-password', 'modal-delete-user'].forEach(function(modalId) {
        const modal = document.getElementById(modalId);
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
