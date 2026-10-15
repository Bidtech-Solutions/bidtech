@extends('layouts.dashboard')

@section('title', $mode === 'create' ? 'Tambah Template - Admin CMS Bidtech' : ($mode === 'edit' ? 'Edit Template - Admin CMS Bidtech' : 'Katalog Template - Admin CMS Bidtech'))

@section('content')
@if($mode === 'create')
<div class="max-w-4xl mx-auto space-y-6">
    <!-- Breadcrumb & Title -->
    <div>
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <a href="{{ route('dashboard.templates.index') }}" class="hover:text-emerald-600 transition">Katalog Template</a>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            <span class="text-slate-700">Tambah Template Baru</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Formulir Tambah Template</h1>
        <p class="text-sm text-slate-500 mt-1">Input data desain website baru. Begitu disimpan, template langsung dapat diakses di Next.js dan alur checkout tanpa koding.</p>
    </div>

    <!-- Main Card Form -->
    <form action="{{ route('dashboard.templates.store') }}" method="POST" enctype="multipart/form-data" 
          class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8">
        @csrf

        <!-- SECTION 1: INFORMASI DASAR -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="info" class="w-4 h-4 text-emerald-600"></i>
                <span>Informasi Dasar Template</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nama Template <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="name" value="{{ old('name') }}" required
                           placeholder="Contoh: Rentcar - Sewa Mobil #1" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-900">
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Kategori <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="category" list="category-list" value="{{ old('category') }}" required
                           placeholder="Pilih atau ketik kategori baru" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-900">
                    <datalist id="category-list">
                        @foreach($existingCategories as $cat)
                            <option value="{{ $cat }}">
                        @endforeach
                    </datalist>
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        URL Live Demo / Preview
                    </label>
                    <input type="text" name="demo_url" value="{{ old('demo_url') }}"
                           placeholder="Contoh: /demo/automotive atau https://demo.bidtech.com" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Deskripsi Singkat / Subcategory
                    </label>
                    <textarea name="description" rows="2" 
                              placeholder="Penjelasan keunggulan template dalam 1-2 kalimat..." 
                              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">{{ old('description') }}</textarea>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tags (Pisahkan dengan koma)
                    </label>
                    <input type="text" name="tags" value="{{ old('tags') }}"
                           placeholder="Contoh: Automotive, Rental Mobil, Responsive, Landing Page" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>
            </div>
        </div>

        <!-- SECTION 2: PEMERINGKATAN & RINCIAN HARGA PAKET -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="tag" class="w-4 h-4 text-emerald-600"></i>
                <span>Pemecahan Rincian Harga Paket (3 Komponen)</span>
            </h2>

            <!-- Total Preview Badge -->
            <div class="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                <div>
                    <span class="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Total Harga Paket (Otomatis)</span>
                    <p class="text-xs text-emerald-600">Dihitung otomatis dari: Harga Template + Server + Layanan</p>
                </div>
                <div class="text-right">
                    <span id="display-total-price" class="text-2xl font-extrabold text-emerald-800 font-mono">Rp 2.000.000</span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                <!-- Komponen 1: Template -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            1. Harga Template (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_template_price" name="template_price" value="{{ old('template_price', 1000000) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Template</label>
                        <input type="text" name="template_desc" value="{{ old('template_desc', 'Lisensi Desain UI/UX Eksklusif & Source Code Clean') }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>

                <!-- Komponen 2: Server -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            2. Harga Server (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_server_price" name="server_price" value="{{ old('server_price', 500000) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Server</label>
                        <input type="text" name="server_desc" value="{{ old('server_desc', 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL') }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>

                <!-- Komponen 3: Layanan -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            3. Harga Layanan (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_service_price" name="service_price" value="{{ old('service_price', 500000) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Layanan</label>
                        <input type="text" name="service_desc" value="{{ old('service_desc', 'Setup Domain, Deployment Instan & Garansi Pemeliharaan') }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 3: GAMBAR PREVIEW & STATUS -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="image" class="w-4 h-4 text-emerald-600"></i>
                <span>Thumbnail Preview & Status</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Upload File Gambar Preview
                    </label>
                    <input type="file" name="preview_file" accept="image/*" id="preview_file_input"
                           class="w-full px-3.5 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer">
                    <p class="text-[11px] text-slate-400 mt-1">Format: WEBP, PNG, JPG (Rasio 16:9 disarankan, maks 4MB)</p>
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Atau URL Path Gambar yang Ada
                    </label>
                    <input type="text" name="preview_url" value="{{ old('preview_url') }}"
                           placeholder="Contoh: images/design_thumbnail/rentcar.webp" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>

                <div class="sm:col-span-2 pt-2">
                    <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                               class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300">
                        <span class="text-sm font-semibold text-slate-800">Aktifkan Template (Langsung tampil di katalog website dan alur checkout)</span>
                    </label>
                </div>
            </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <a href="{{ route('dashboard.templates.index') }}" 
               class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition">
                Batal
            </a>
            <button type="submit" 
                    class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2">
                <i data-lucide="save" class="w-4 h-4"></i>
                <span>Simpan Template Baru</span>
            </button>
        </div>
    </form>
</div>

<script>
    // Live Kalkulator Total Harga Paket
    function updateTotalPrice() {
        const tpl = parseInt(document.getElementById('input_template_price').value) || 0;
        const srv = parseInt(document.getElementById('input_server_price').value) || 0;
        const svc = parseInt(document.getElementById('input_service_price').value) || 0;
        const total = tpl + srv + svc;
        document.getElementById('display-total-price').innerText = 'Rp ' + total.toLocaleString('id-ID');
    }

    document.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('input', updateTotalPrice);
    });
</script>
@elseif($mode === 'edit')
<div class="max-w-4xl mx-auto space-y-6">
    <!-- Breadcrumb & Title -->
    <div>
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <a href="{{ route('dashboard.templates.index') }}" class="hover:text-emerald-600 transition">Katalog Template</a>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            <span class="text-slate-700">Edit Template #{{ $template->id }}</span>
        </div>
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Edit Template: {{ $template->name }}</h1>
                <p class="text-sm text-slate-500 mt-1">Perbarui data paket, rincian harga, atau gambar preview.</p>
            </div>
            <div class="flex items-center gap-2 bg-purple-50 text-purple-700 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                <i data-lucide="eye" class="w-4 h-4"></i>
                <span class="template-view-badge" data-template-id="{{ $template->id }}" data-suffix=" Penayangan">{{ number_format($template->views, 0, ',', '.') }} Penayangan</span>
            </div>
        </div>
    </div>

    <!-- Main Card Form -->
    <form action="{{ route('dashboard.templates.update', $template) }}" method="POST" enctype="multipart/form-data" 
          class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8">
        @csrf
        @method('PUT')

        <!-- SECTION 1: INFORMASI DASAR -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="info" class="w-4 h-4 text-emerald-600"></i>
                <span>Informasi Dasar Template</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nama Template <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="name" value="{{ old('name', $template->name) }}" required
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-900">
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Kategori <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="category" list="category-list" value="{{ old('category', $template->category) }}" required
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-900">
                    <datalist id="category-list">
                        @foreach($existingCategories as $cat)
                            <option value="{{ $cat }}">
                        @endforeach
                    </datalist>
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        URL Live Demo / Preview
                    </label>
                    <input type="text" name="demo_url" value="{{ old('demo_url', $template->demo_url) }}"
                           placeholder="Contoh: /demo/automotive" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Deskripsi Singkat / Subcategory
                    </label>
                    <textarea name="description" rows="2" 
                              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">{{ old('description', $template->description) }}</textarea>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tags (Pisahkan dengan koma)
                    </label>
                    <input type="text" name="tags" value="{{ old('tags', $template->tags) }}"
                           placeholder="Contoh: Automotive, Rental Mobil, Responsive" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>
            </div>
        </div>

        <!-- SECTION 2: PEMERINGKATAN & RINCIAN HARGA PAKET -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="tag" class="w-4 h-4 text-emerald-600"></i>
                <span>Pemecahan Rincian Harga Paket (3 Komponen)</span>
            </h2>

            <!-- Total Preview Badge -->
            <div class="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                <div>
                    <span class="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Total Harga Paket (Otomatis)</span>
                    <p class="text-xs text-emerald-600">Dihitung otomatis dari: Template + Server + Layanan</p>
                </div>
                <div class="text-right">
                    <span id="display-total-price" class="text-2xl font-extrabold text-emerald-800 font-mono">
                        Rp {{ number_format($template->total_package_price, 0, ',', '.') }}
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                <!-- Komponen 1: Template -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            1. Harga Template (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_template_price" name="template_price" value="{{ old('template_price', $template->template_price) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Template</label>
                        <input type="text" name="template_desc" value="{{ old('template_desc', $template->template_desc) }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>

                <!-- Komponen 2: Server -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            2. Harga Server (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_server_price" name="server_price" value="{{ old('server_price', $template->server_price) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Server</label>
                        <input type="text" name="server_desc" value="{{ old('server_desc', $template->server_desc) }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>

                <!-- Komponen 3: Layanan -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            3. Harga Layanan (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_service_price" name="service_price" value="{{ old('service_price', $template->service_price) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Layanan</label>
                        <input type="text" name="service_desc" value="{{ old('service_desc', $template->service_desc) }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 3: GAMBAR PREVIEW & STATUS -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="image" class="w-4 h-4 text-emerald-600"></i>
                <span>Thumbnail Preview & Status</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <!-- Current Thumbnail Preview -->
                <div class="sm:col-span-2 flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div class="w-24 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                        <img src="{{ $template->preview_url }}" alt="{{ $template->name }}" class="w-full h-full object-cover object-top">
                    </div>
                    <div>
                        <p class="text-xs font-bold text-slate-700">Gambar Thumbnail Saat Ini</p>
                        <p class="text-xs text-slate-500 font-mono mt-0.5">{{ $template->preview }}</p>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Ganti File Gambar (Opsional)
                    </label>
                    <input type="file" name="preview_file" accept="image/*"
                           class="w-full px-3.5 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer">
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Atau Ubah Path Gambar
                    </label>
                    <input type="text" name="preview_url" value="{{ old('preview_url', $template->preview) }}"
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>

                <div class="sm:col-span-2 pt-2">
                    <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <input type="checkbox" name="is_active" value="1" {{ old('is_active', $template->is_active) ? 'checked' : '' }}
                               class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300">
                        <span class="text-sm font-semibold text-slate-800">Status Aktif (Tampil di katalog Next.js dan alur checkout)</span>
                    </label>
                </div>
            </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <a href="{{ route('dashboard.templates.index') }}" 
               class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition">
                Batal
            </a>
            <button type="submit" 
                    class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2">
                <i data-lucide="save" class="w-4 h-4"></i>
                <span>Simpan Perubahan</span>
            </button>
        </div>
    </form>
</div>

<script>
    function updateTotalPrice() {
        const tpl = parseInt(document.getElementById('input_template_price').value) || 0;
        const srv = parseInt(document.getElementById('input_server_price').value) || 0;
        const svc = parseInt(document.getElementById('input_service_price').value) || 0;
        const total = tpl + srv + svc;
        document.getElementById('display-total-price').innerText = 'Rp ' + total.toLocaleString('id-ID');
    }

    document.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('input', updateTotalPrice);
    });
</script>
@else
<div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Top Bar Title & Quick Action -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Katalog Desain Template</h1>
            <p class="text-sm text-slate-500 mt-1">Kelola master data template website, harga paket, dan pemantauan view counter secara visual tanpa perlu koding.</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('dashboard.templates.create') }}" 
               class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Tambah Template Baru</span>
            </a>
        </div>
    </div>

    <!-- Quick Stats Bento Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <i data-lucide="layout" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Template</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i data-lucide="check-circle" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Template Aktif</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['active'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <i data-lucide="shopping-bag" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Terjual</p>
                <p class="text-2xl font-bold text-emerald-700 mt-0.5">{{ $stats['total_sales'] }} <span class="text-xs font-normal text-slate-500">Unit</span></p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <i data-lucide="eye" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Penayangan</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5" id="kelola-total-views">{{ number_format($stats['total_views'], 0, ',', '.') }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <i data-lucide="layers" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kategori</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['categories_count'] }}</p>
            </div>
        </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <form method="GET" action="{{ route('dashboard.templates.index') }}" class="flex flex-1 flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="text" name="search" value="{{ request('search') }}" 
                       placeholder="Cari nama template, tag, atau deskripsi..." 
                       class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50">
            </div>

            <div class="sm:w-48">
                <select name="category" onchange="this.form.submit()"
                        class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 text-slate-700">
                    <option value="all">Semua Kategori</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat }}" {{ request('category') === $cat ? 'selected' : '' }}>{{ $cat }}</option>
                    @endforeach
                </select>
            </div>

            <div class="sm:w-56">
                <select name="sort" onchange="this.form.submit()"
                        class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 text-slate-700 font-medium">
                    <option value="newest" {{ request('sort', 'newest') === 'newest' ? 'selected' : '' }}>Urut: Terbaru</option>
                    <option value="sales" {{ request('sort') === 'sales' ? 'selected' : '' }}>Urut: Paling Laku (Terlaris)</option>
                    <option value="views" {{ request('sort') === 'views' ? 'selected' : '' }}>Urut: Paling Banyak Dilihat</option>
                    <option value="price_high" {{ request('sort') === 'price_high' ? 'selected' : '' }}>Urut: Harga Tertinggi</option>
                    <option value="price_low" {{ request('sort') === 'price_low' ? 'selected' : '' }}>Urut: Harga Terendah</option>
                </select>
            </div>

            <button type="submit" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-semibold transition">
                Filter
            </button>
            
            @if(request('search') || request('category') || request('sort'))
                <a href="{{ route('dashboard.templates.index') }}" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition text-center">
                    Reset
                </a>
            @endif
        </form>
    </div>

    <!-- Tabel Daftar Template -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-600">
                <thead class="bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                    <tr>
                        <th class="py-3.5 px-4 w-12 text-center">ID</th>
                        <th class="py-3.5 px-4">Template & Preview</th>
                        <th class="py-3.5 px-4">Kategori</th>
                        <th class="py-3.5 px-4">Rincian Paket Harga</th>
                        <th class="py-3.5 px-4 text-center">Terjual (Laku)</th>
                        <th class="py-3.5 px-4 text-center">Views</th>
                        <th class="py-3.5 px-4 text-center">Status</th>
                        <th class="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($templates as $template)
                        <tr class="hover:bg-slate-50/70 transition">
                            <td class="py-4 px-4 text-center font-mono font-bold text-xs text-slate-400">
                                #{{ $template->id }}
                            </td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-3.5">
                                    <div class="w-16 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative group">
                                        <img src="{{ $template->preview_url }}" alt="{{ $template->name }}" class="w-full h-full object-cover object-top">
                                    </div>
                                    <div class="max-w-xs">
                                        <div class="flex items-center gap-1.5">
                                            <p class="font-bold text-slate-900 text-sm leading-snug">{{ $template->name }}</p>
                                            @if($template->sales_count >= 10)
                                                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-100 text-rose-700 uppercase tracking-wider shrink-0" title="Top Seller">Best Seller</span>
                                            @endif
                                        </div>
                                        <p class="text-xs text-slate-500 truncate mt-0.5">{{ $template->description ?? $template->template_desc }}</p>
                                        @if(!empty($template->tags_list))
                                            <div class="flex flex-wrap gap-1 mt-1">
                                                @foreach(array_slice($template->tags_list, 0, 3) as $tag)
                                                    <span class="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-medium">{{ $tag }}</span>
                                                @endforeach
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                                    {{ $template->category }}
                                </span>
                            </td>
                            <td class="py-4 px-4">
                                <p class="font-bold text-slate-900 text-sm">Rp {{ number_format($template->total_package_price, 0, ',', '.') }}</p>
                                <div class="text-[11px] text-slate-500 space-y-0.5 mt-1 font-mono">
                                    <p>Tpl: Rp {{ number_format($template->template_price, 0, ',', '.') }}</p>
                                    <p>Srv: Rp {{ number_format($template->server_price, 0, ',', '.') }}</p>
                                    <p>Lay: Rp {{ number_format($template->service_price, 0, ',', '.') }}</p>
                                </div>
                            </td>
                            <td class="py-4 px-4 text-center">
                                <div class="inline-flex flex-col items-center">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold {{ $template->sales_count > 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/60' : 'bg-slate-100 text-slate-500' }}">
                                        <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
                                        <span>{{ $template->sales_count }} Terjual</span>
                                    </span>
                                    @if($template->sales_count > 0)
                                        <span class="text-[11px] text-slate-500 font-mono font-bold mt-1">Rp {{ number_format($template->total_sales_revenue, 0, ',', '.') }}</span>
                                    @else
                                        <span class="text-[10px] text-slate-400 mt-0.5">Belum laku</span>
                                    @endif
                                </div>
                            </td>
                            <td class="py-4 px-4 text-center">
                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700">
                                    <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                                    <span class="template-view-badge" data-template-id="{{ $template->id }}">{{ number_format($template->views, 0, ',', '.') }}</span>
                                </span>
                            </td>

                            <td class="py-4 px-4 text-center">
                                <form action="{{ route('dashboard.templates.toggle-active', $template) }}" method="POST" class="inline">
                                    @csrf
                                    <button type="submit" title="Klik untuk ubah status"
                                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition {{ $template->is_active ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' }}">
                                        <span class="w-1.5 h-1.5 rounded-full {{ $template->is_active ? 'bg-emerald-600' : 'bg-slate-400' }}"></span>
                                        <span>{{ $template->is_active ? 'Aktif' : 'Non-aktif' }}</span>
                                    </button>
                                </form>
                            </td>
                            <td class="py-4 px-4 text-right">
                                <div class="flex items-center justify-end gap-1.5">
                                    <a href="{{ $template->landing_url }}" target="_blank" title="Lihat Demo"
                                       class="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition">
                                        <i data-lucide="external-link" class="w-4 h-4"></i>
                                    </a>
                                    <a href="{{ route('dashboard.templates.edit', $template) }}" title="Edit Template"
                                       class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition">
                                        <i data-lucide="edit-3" class="w-4 h-4"></i>
                                    </a>
                                    <form action="{{ route('dashboard.templates.destroy', $template) }}" method="POST" 
                                          onsubmit="return confirm('Apakah Anda yakin ingin menghapus template {{ $template->name }}?');" class="inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" title="Hapus Template"
                                                class="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="py-12 text-center text-slate-400">
                                <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                <p class="text-sm font-medium">Tidak ada template ditemukan.</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($templates->hasPages())
            <div class="p-4 border-t border-slate-100">
                {{ $templates->links() }}
            </div>
        @endif
    </div>
</div>
@endif
@endsection
