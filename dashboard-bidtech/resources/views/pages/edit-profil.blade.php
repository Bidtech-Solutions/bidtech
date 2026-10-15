@extends('layouts.dashboard')

@section('title', 'Edit Profil - Bidtech')

@section('content')
@php
    $user = $user ?? auth()->user();
    $defaultPlaceholder = 'https://media.bidtech.co.id/bidtech/profiles/placeholder_profile.webp';
@endphp

<div class="max-w-6xl">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <div class="flex items-center gap-2 mb-1">
                <h1 class="text-2xl lg:text-3xl font-bold text-ink">Pengaturan Profil</h1>
                @if($user->isMedia())
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Tim Media & Penulis
                    </span>
                @elseif($user->isAdmin())
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 border border-primary-200">
                        Admin
                    </span>
                @endif
            </div>
            <p class="text-sm text-ink-muted">
                {{ $user->isMedia() ? 'Kelola identitas akun media, byline publik penulis artikel, dan keamanan kata sandi Anda.' : 'Kelola data profil, kontak notifikasi proyek, dan keamanan kata sandi Anda.' }}
            </p>
        </div>
    </div>

    <!-- Alert Notifications -->
    @if(session('profile_success'))
        <div class="mt-6 flex items-center gap-3 bg-success-surface border border-success/20 text-success px-5 py-3.5 rounded-2xl text-sm shadow-2xs">
            <i data-lucide="check-circle" class="w-5 h-5 shrink-0"></i>
            <span>{{ session('profile_success') }}</span>
        </div>
    @endif

    @if(session('password_success'))
        <div class="mt-6 flex items-center gap-3 bg-success-surface border border-success/20 text-success px-5 py-3.5 rounded-2xl text-sm shadow-2xs">
            <i data-lucide="check-circle" class="w-5 h-5 shrink-0"></i>
            <span>{{ session('password_success') }}</span>
        </div>
    @endif

    @if(isset($errors) && $errors->any())
        <div class="mt-6 flex items-start gap-3 bg-warning-surface border border-warning/20 text-warning px-5 py-3.5 rounded-2xl text-sm shadow-2xs">
            <i data-lucide="alert-circle" class="w-5 h-5 shrink-0 mt-0.5"></i>
            <div>
                <p class="font-semibold mb-1">Terdapat kesalahan pada formulir:</p>
                <ul class="list-disc list-inside space-y-0.5 text-xs">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endif

    <!-- 2 Columns Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <!-- Left Column (7 Cols): Profile Info & Photo Upload -->
        <div class="lg:col-span-7 bg-surface border border-border rounded-3xl p-7 shadow-xs">
            <h2 class="text-lg font-bold text-ink mb-1.5 flex items-center gap-2">
                <i data-lucide="user-check" class="w-5 h-5 text-primary"></i>
                <span>Informasi Profil & Penulis</span>
            </h2>
            <p class="text-xs text-ink-muted mb-6">
                {{ $user->isMedia() ? 'Foto profil dan nama ini tampil di setiap artikel yang Anda terbitkan pada blog Bidtech.' : 'Data identitas akun dan kontak Anda pada sistem Bidtech.' }}
            </p>

            <form method="POST" action="{{ route('dashboard.profile.update') }}" enctype="multipart/form-data" class="space-y-6">
                @csrf
                @method('PUT')

                <!-- Foto Profil Uploader -->
                <div class="p-5 bg-canvas/70 border border-border/80 rounded-2xl">
                    <div class="flex flex-col sm:flex-row items-center gap-5">
                        <div class="relative group shrink-0 rounded-full overflow-hidden border-2 border-surface shadow-sm ring-2 ring-primary/20"
                            style="width: 96px; height: 96px; min-width: 96px; min-height: 96px; max-width: 96px; max-height: 96px;">
                            <img id="avatar-preview-img"
                                src="{{ $user->photo_url }}"
                                alt="Foto profil {{ $user->name }}"
                                class="w-full h-full object-cover block"
                                style="width: 100%; height: 100%; object-fit: cover; aspect-ratio: 1/1;"
                                width="96"
                                height="96">
                            <button type="button" onclick="document.getElementById('photo-file-input').click()"
                                class="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                title="Ganti foto profil">
                                <i data-lucide="camera" class="w-5 h-5"></i>
                                <span class="text-[10px] font-semibold mt-1">Ubah Foto</span>
                            </button>
                        </div>

                        <div class="flex-1 text-center sm:text-left space-y-2 min-w-0">
                            <div>
                                <h3 class="font-bold text-sm text-ink">Foto Profil Akun</h3>
                                <p class="text-xs text-ink-muted mt-0.5">Format JPG, PNG, atau WebP (Maksimal 2 MB).</p>
                            </div>

                            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                                <input type="file" id="photo-file-input" name="photo" accept="image/png,image/jpeg,image/webp" class="hidden">
                                <input type="hidden" id="remove-photo-input" name="remove_photo" value="0">

                                <button type="button" onclick="document.getElementById('photo-file-input').click()"
                                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface border border-border hover:bg-canvas text-ink transition shadow-2xs cursor-pointer">
                                    <i data-lucide="upload" class="w-3.5 h-3.5 text-primary"></i>
                                    <span>Pilih Foto Baru</span>
                                </button>

                                <button type="button" id="btn-remove-photo" onclick="handleRemovePhoto()"
                                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface border border-danger/20 text-danger hover:bg-danger-bg transition cursor-pointer">
                                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                                    <span>Reset Foto</span>
                                </button>
                            </div>
                            <p id="photo-status-text" class="text-[11px] text-primary font-semibold hidden"></p>
                        </div>
                    </div>

                    @if($user->isMedia() || $user->isAdmin())
                    <!-- Live Preview Box khusus Penulis Artikel -->
                    <div class="mt-4 pt-4 border-t border-border/60 flex items-center gap-3">
                        <div class="relative shrink-0 rounded-full overflow-hidden border border-primary/30"
                            style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; max-width: 36px; max-height: 36px;">
                            <img id="byline-avatar-preview"
                                src="{{ $user->photo_url }}"
                                alt="Byline"
                                class="w-full h-full object-cover block"
                                style="width: 100%; height: 100%; object-fit: cover; aspect-ratio: 1/1;"
                                width="36"
                                height="36">
                        </div>
                        <div class="min-w-0 flex-1">
                            <span class="text-[10px] uppercase font-bold text-primary tracking-wider">Preview Byline Artikel Publik</span>
                            <p id="byline-name-preview" class="text-xs font-bold text-ink truncate">{{ $user->displayAuthorName() }}</p>
                        </div>
                        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                            Byline Penulis
                        </span>
                    </div>
                    @endif
                </div>

                <!-- Input Nama Akun -->
                <div>
                    <label for="name" class="block text-xs font-semibold text-ink mb-1.5">
                        Nama Lengkap (Akun) <span class="text-danger">*</span>
                    </label>
                    <input type="text" id="name" name="name" value="{{ old('name', $user->name) }}" required
                        class="w-full h-11 px-4 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                    <p class="text-[11px] text-ink-muted mt-1.5">Nama resmi pengguna untuk keperluan login dan administrasi internal.</p>
                </div>

                @if($user->isMedia() || $user->isAdmin())
                <!-- Input Nama Penulis / Byline -->
                <div>
                    <label for="author_name" class="block text-xs font-semibold text-ink mb-1.5">
                        Nama Penulis / Byline Publik (Opsional)
                    </label>
                    <input type="text" id="author_name" name="author_name" value="{{ old('author_name', $user->author_name) }}"
                        placeholder="{{ $user->name }}"
                        class="w-full h-11 px-4 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                    <p class="text-[11px] text-ink-muted mt-1.5">
                        Nama pena yang dicantumkan pada artikel blog publik. Kosongkan jika ingin sama persis dengan nama akun Anda.
                    </p>
                </div>
                @endif

                <!-- Input Email (Locked) -->
                <div>
                    <label for="email" class="block text-xs font-semibold text-ink mb-1.5">
                        Alamat Email
                    </label>
                    <div class="relative">
                        <input type="email" id="email" value="{{ $user->email }}" disabled
                            class="w-full h-11 px-4 text-sm bg-canvas text-ink-muted border border-border rounded-xl cursor-not-allowed">
                        <span class="absolute right-3 top-2.5 text-[11px] font-semibold text-ink-muted bg-surface px-2 py-0.5 rounded-md border border-border">
                            Terkunci
                        </span>
                    </div>
                    <p class="text-[11px] text-ink-muted mt-1.5">Email akun terikat dengan autentikasi sistem. Hubungi administrator jika perlu penggantian email.</p>
                </div>

                <!-- Input WhatsApp -->
                <div>
                    <label for="whatsapp" class="block text-xs font-semibold text-ink mb-1.5">
                        Nomor WhatsApp @if($user->isKlien()) <span class="text-danger">*</span> @else <span class="text-ink-muted font-normal">(Opsional)</span> @endif
                    </label>
                    <input type="text" id="whatsapp" name="whatsapp" value="{{ old('whatsapp', $user->whatsapp) }}" placeholder="08xxxxxxxxxx"
                        {{ $user->isKlien() ? 'required' : '' }}
                        class="w-full h-11 px-4 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                    <p class="text-[11px] text-ink-muted mt-1.5">
                        {{ $user->isMedia() ? 'Nomor kontak untuk koordinasi cepat antar tim redaksi dan admin.' : 'Tim IT Bidtech akan menghubungi Anda melalui nomor ini saat kickoff dan review.' }}
                    </p>
                </div>

                <div class="pt-2">
                    <button type="submit" class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer shadow-xs">
                        <i data-lucide="check" class="w-4 h-4 stroke-[2.5]"></i>
                        <span>Simpan Perubahan Profil</span>
                    </button>
                </div>
            </form>
        </div>

        <!-- Right Column (5 Cols): Password Security & Optional Domain Info -->
        <div class="lg:col-span-5 space-y-6">
            <!-- Password Card -->
            <div class="bg-surface border border-border rounded-3xl p-7 shadow-xs">
                <h2 class="text-lg font-bold text-ink mb-1.5 flex items-center gap-2">
                    <i data-lucide="shield-check" class="w-5 h-5 text-primary"></i>
                    <span>Keamanan Kata Sandi</span>
                </h2>
                <p class="text-xs text-ink-muted mb-5">Perbarui kata sandi secara berkala untuk menjaga keamanan akun Anda.</p>

                <form method="POST" action="{{ route('dashboard.password.update') }}" class="space-y-4">
                    @csrf
                    @method('PUT')

                    <div>
                        <label for="current_password" class="block text-xs font-semibold text-ink mb-1.5">
                            Kata Sandi Saat Ini <span class="text-danger">*</span>
                        </label>
                        <div class="relative">
                            <input type="password" id="current_password" name="current_password" required
                                class="w-full h-10 pl-3.5 pr-10 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                            <button type="button" onclick="togglePasswordVisibility('current_password', this)"
                                class="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink p-0.5 cursor-pointer" title="Tampilkan/sembunyikan kata sandi">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-xs font-semibold text-ink mb-1.5">
                            Kata Sandi Baru <span class="text-danger">*</span>
                        </label>
                        <div class="relative">
                            <input type="password" id="password" name="password" required placeholder="Minimal 8 karakter"
                                class="w-full h-10 pl-3.5 pr-10 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                            <button type="button" onclick="togglePasswordVisibility('password', this)"
                                class="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink p-0.5 cursor-pointer" title="Tampilkan/sembunyikan kata sandi">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-xs font-semibold text-ink mb-1.5">
                            Konfirmasi Kata Sandi Baru <span class="text-danger">*</span>
                        </label>
                        <div class="relative">
                            <input type="password" id="password_confirmation" name="password_confirmation" required
                                class="w-full h-10 pl-3.5 pr-10 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                            <button type="button" onclick="togglePasswordVisibility('password_confirmation', this)"
                                class="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink p-0.5 cursor-pointer" title="Tampilkan/sembunyikan kata sandi">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="w-full inline-flex items-center justify-center gap-2 bg-surface border border-border hover:bg-canvas text-ink px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer shadow-2xs">
                            <i data-lucide="key-round" class="w-4 h-4 text-primary"></i>
                            <span>Perbarui Kata Sandi</span>
                        </button>
                    </div>
                </form>
            </div>

            @if($user->isKlien())
            <!-- Domain Info Card (Khusus Klien dengan pesanan website) -->
            <div class="bg-surface border border-border rounded-3xl p-6 shadow-xs">
                <div class="flex items-center gap-2 mb-3">
                    <i data-lucide="globe" class="w-4 h-4 text-primary"></i>
                    <h3 class="font-bold text-sm text-ink">Kepemilikan domain</h3>
                </div>
                <div class="space-y-2.5 text-xs">
                    <div class="flex justify-between items-center py-1">
                        <span class="text-ink-muted">Domain utama</span>
                        <span class="font-semibold text-ink">{{ $domainName }}</span>
                    </div>
                    <div class="flex justify-between items-center py-1 border-t border-canvas">
                        <span class="text-ink-muted">Status registrasi</span>
                        <span class="font-semibold {{ $isDomainRegistered ? 'text-success' : 'text-warning' }}">
                            {{ $isDomainRegistered ? 'Aktif' : 'Dalam Proses' }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center py-1 border-t border-canvas">
                        <span class="text-ink-muted">Registrar</span>
                        <span class="font-semibold text-ink">IdCloudHost via Bidtech</span>
                    </div>
                    <div class="flex justify-between items-center py-1 border-t border-canvas">
                        <span class="text-ink-muted">Masa aktif hingga</span>
                        <span class="font-semibold text-ink">{{ $domainExpiryDate }}</span>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>
</div>

<script>
    const defaultPlaceholderUrl = @json($defaultPlaceholder);

    // Live preview avatar saat file dipilih
    const fileInput = document.getElementById('photo-file-input');
    const avatarImg = document.getElementById('avatar-preview-img');
    const bylineImg = document.getElementById('byline-avatar-preview');
    const removeInput = document.getElementById('remove-photo-input');
    const statusText = document.getElementById('photo-status-text');

    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            // Validasi ukuran client side (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Ukuran gambar terlalu besar! Maksimal 2 MB.');
                fileInput.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(evt) {
                if (avatarImg) avatarImg.src = evt.target.result;
                if (bylineImg) bylineImg.src = evt.target.result;
                if (removeInput) removeInput.value = '0';
                if (statusText) {
                    statusText.textContent = 'Foto baru terpilih: ' + file.name + ' (Klik simpan untuk menerapkan)';
                    statusText.classList.remove('hidden');
                }
            };
            reader.readAsDataURL(file);
        });
    }

    // Reset foto ke default placeholder
    function handleRemovePhoto() {
        if (!confirm('Apakah Anda yakin ingin mereset foto profil ke avatar default?')) return;

        if (fileInput) fileInput.value = '';
        if (avatarImg) avatarImg.src = defaultPlaceholderUrl;
        if (bylineImg) bylineImg.src = defaultPlaceholderUrl;
        if (removeInput) removeInput.value = '1';
        if (statusText) {
            statusText.textContent = 'Foto akan direset ke avatar default saat disimpan.';
            statusText.classList.remove('hidden');
        }
    }

    // Live update byline preview saat mengetik nama
    const nameInput = document.getElementById('name');
    const authorInput = document.getElementById('author_name');
    const bylinePreview = document.getElementById('byline-name-preview');

    function updateBylineText() {
        if (!bylinePreview) return;
        const authorVal = authorInput && authorInput.value.trim();
        const nameVal = nameInput && nameInput.value.trim();
        bylinePreview.textContent = authorVal || nameVal || 'Penulis Bidtech';
    }

    if (authorInput) authorInput.addEventListener('input', updateBylineText);
    if (nameInput) nameInput.addEventListener('input', updateBylineText);

    // Toggle Password Visibility
    function togglePasswordVisibility(fieldId, btn) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        const isPassword = field.type === 'password';
        field.type = isPassword ? 'text' : 'password';

        const icon = btn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
            if (window.lucide) {
                lucide.createIcons();
            }
        }
    }
</script>
@endsection
