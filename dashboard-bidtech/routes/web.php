<?php

use App\Http\Controllers\Api\TemplateController as ApiTemplateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IsiDataDiriController;
use App\Http\Controllers\KelolaArtikelController;
use App\Http\Controllers\KelolaMitraController;
use App\Http\Controllers\KelolaPesananController;
use App\Http\Controllers\KelolaPromoController;
use App\Http\Controllers\KelolaTemplateController;
use App\Http\Controllers\KelolaUserController;
use App\Http\Controllers\KonfirmasiController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PengaturanController;
use App\Http\Controllers\PilihDomainController;
use App\Http\Controllers\PilihTemplateController;
use App\Http\Controllers\Webhook\IdCloudHostController;
use App\Http\Controllers\Webhook\XenditController;
use Illuminate\Support\Facades\Route;

// API publik untuk Next.js ada di routes/api.php (prefix /api). Sisanya di file ini.

// ==========================================
// DASAR & LOGIN
// ==========================================
Route::get('/', function () {
    return redirect()->route('login.view');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'view'])->name('login.view');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
});

// DEPRECATED: dipanggil frontend Next.js tanpa prefix /api.
// Bentuk kanonik: POST /api/templates/view/{id} (routes/api.php). Hapus setelah frontend dipindah.
Route::post('/templates/view/{id}', [ApiTemplateController::class, 'trackView']);
Route::get('/dashboard/api/template-views', [ApiTemplateController::class, 'realtimeStats'])->name('dashboard.template-views');

// ==========================================
// DASHBOARD TERPADU (/dashboard/*)
// Dilindungi middleware auth; menu kelola juga butuh admin.
// ==========================================
Route::middleware('auth')->group(function () {
    // Dashboard utama (Admin = KPI overview, Klien = stepper progres)
    Route::get('/dashboard', [DashboardController::class, 'view'])->name('dashboard');
    Route::get('/dashboard/index', [DashboardController::class, 'view'])->name('dashboard.index');

    // Pesanan (Admin = kelola seluruh klien, Klien = detail order & invoice)
    Route::get('/dashboard/order', [KelolaPesananController::class, 'index'])->name('dashboard.order');
    Route::get('/dashboard/orders', fn () => redirect()->route('dashboard.order'))->name('dashboard.orders');
    Route::get('/dashboard/order/export', [KelolaPesananController::class, 'exportExcel'])->middleware('role:ADMIN,MARKETING')->name('dashboard.order.export');
    Route::post('/dashboard/order/{order}/update-status', [KelolaPesananController::class, 'updateStatus'])->middleware('role:ADMIN')->name('dashboard.order.update-status');

    // Admin CMS (Templates, Promos, Usages, Partners)
    Route::middleware('role:ADMIN')->prefix('dashboard')->name('dashboard.')->group(function () {
        Route::post('/templates/{template}/toggle-active', [KelolaTemplateController::class, 'toggleActive'])->name('templates.toggle-active');
        Route::resource('templates', KelolaTemplateController::class);

        // Afiliasi & Kelola Mitra
        Route::get('/partners', [KelolaMitraController::class, 'index'])->name('partners.index');
        Route::get('/promos/partners', fn () => redirect()->route('dashboard.partners.index'))->name('promos.partners');
        Route::post('/partners', [KelolaMitraController::class, 'store'])->name('partners.store');
        Route::put('/partners/{partner}', [KelolaMitraController::class, 'update'])->name('partners.update');
        Route::post('/partners/{partner}/toggle-active', [KelolaMitraController::class, 'toggleActive'])->name('partners.toggle-active');
        Route::delete('/partners/{partner}', [KelolaMitraController::class, 'destroy'])->name('partners.destroy');

        Route::get('/promos/all-usages', [KelolaPromoController::class, 'allUsages'])->name('promos.all-usages');
        Route::get('/promos/{promo}/usages', [KelolaPromoController::class, 'usages'])->name('promos.usages');
        Route::post('/promos/{promo}/toggle-active', [KelolaPromoController::class, 'toggleActive'])->name('promos.toggle-active');
        Route::resource('promos', KelolaPromoController::class);

        // Kelola Pengguna (Admin, Marketing, Klien, Media, Mitra)
        Route::put('/users/{user}/password', [KelolaUserController::class, 'updatePassword'])->name('users.password');
        Route::resource('users', KelolaUserController::class)->except(['create', 'show', 'edit']);
    });

    // Modul Artikel (Media & Admin). Gerbang kasar role lewat middleware 'role:MEDIA,ADMIN';
    // izin rinci per-aksi (tulis vs moderasi, status draft) tetap abort_unless() manual di controller.
    Route::middleware('role:MEDIA,ADMIN')->prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/blog', [KelolaArtikelController::class, 'index'])->name('blog.index');
        Route::post('/articles/drafts', [KelolaArtikelController::class, 'storeDraft'])->name('articles.drafts.store');
        Route::patch('/articles/{article}/autosave', [KelolaArtikelController::class, 'autosave'])->name('articles.autosave');
        Route::resource('articles', KelolaArtikelController::class)->except(['show']);
        Route::post('/articles/{article}/publish', [KelolaArtikelController::class, 'publish'])->name('articles.publish');
        Route::post('/articles/{article}/deactivate', [KelolaArtikelController::class, 'deactivate'])->name('articles.deactivate');
        Route::post('/articles/{article}/activate', [KelolaArtikelController::class, 'activate'])->name('articles.activate');

        // Gambar inline dikirim ke Laravel, lalu ArticleService menyimpannya ke RustFS lewat driver S3.
        Route::post('/articles/images', [KelolaArtikelController::class, 'uploadImage'])->name('articles.images.store');
    });

    // Profil & pengaturan akun
    Route::get('/dashboard/profile', [PengaturanController::class, 'edit'])->name('dashboard.profile.edit');
    Route::put('/dashboard/profile', [PengaturanController::class, 'updateProfile'])->name('dashboard.profile.update');
    Route::put('/dashboard/password', [PengaturanController::class, 'updatePassword'])->name('dashboard.password.update');
    Route::put('/dashboard/author-profile', [PengaturanController::class, 'updateAuthorProfile'])->middleware('role:MEDIA')->name('dashboard.author-profile.update');
    Route::match(['get', 'post'], '/logout', [LoginController::class, 'logout'])->name('logout');
});

// ==========================================
// CHECKOUT (publik)
// ==========================================
Route::prefix('checkout')->name('checkout.')->group(function () {
    // Alur Domain-First (domain dipilih di landing page, lalu pilih template di sini)
    Route::get('/pilih-template', [PilihTemplateController::class, 'index'])->name('pilih-template');
    // Harus sebelum /pilih-template/{template}, kalau tidak "domain" atau "duration" tertangkap sebagai id template
    Route::post('/pilih-template/domain', [PilihTemplateController::class, 'updateDomain'])->name('pilih-template.domain.update');
    Route::post('/pilih-template/duration', [PilihTemplateController::class, 'updateDuration'])->name('pilih-template.duration');
    Route::match(['get', 'post'], '/pilih-template/{template}', [PilihTemplateController::class, 'select'])->name('pilih-template.select');

    // Langkah 1 (template-first): cari dan pilih domain
    Route::get('/{template}/domain', [PilihDomainController::class, 'show'])->name('domain');
    Route::get('/{template}/domain/search', [PilihDomainController::class, 'search'])->name('domain.search');
    Route::post('/{template}/domain/select', [PilihDomainController::class, 'select'])->name('domain.select');
    Route::post('/{template}/domain/own', [PilihDomainController::class, 'selectOwn'])->name('domain.own');
    Route::post('/{template}/domain/duration', [PilihDomainController::class, 'updateDuration'])->name('domain.duration');

    // Langkah 2: data diri
    Route::get('/{template}/data-diri', [IsiDataDiriController::class, 'show'])->name('data-diri');
    Route::post('/{template}/data-diri', [IsiDataDiriController::class, 'store'])->name('data-diri.store');

    // Langkah 3: ringkasan + promo
    Route::get('/{template}/ringkasan', [KonfirmasiController::class, 'show'])->name('ringkasan');
    Route::post('/{template}/promo/apply', [KonfirmasiController::class, 'applyPromo'])->name('promo.apply');
    Route::post('/{template}/promo/remove', [KonfirmasiController::class, 'removePromo'])->name('promo.remove');

    // Langkah 4: bayar, dengan nomor order di URL: /checkout/{template}/bayar/{order_number}
    Route::get('/{template}/bayar/{order:order_number}', [PembayaranController::class, 'show'])->name('bayar');
    Route::get('/{template}/bayar', [PembayaranController::class, 'start'])->name('bayar.redirect');
    Route::post('/{template}/bayar', [PembayaranController::class, 'process'])->name('bayar.process');
    Route::get('/{template}/status/{order:order_number}', [PembayaranController::class, 'status'])->name('status.check');

    // Akses langsung via nomor order (link invoice di email: /checkout/bayar/{order_number})
    Route::get('/bayar/{order:order_number}', [PembayaranController::class, 'openByOrderNumber'])->name('bayar.direct');

    // Invoice: unduh/cetak PDF (Belum Lunas & Sudah Lunas) dan redirect URL lama
    Route::get('/invoice/{order:order_number}/download', [PembayaranController::class, 'downloadInvoice'])->name('invoice.download');
    Route::get('/invoice/{order:order_number}', [PembayaranController::class, 'invoice'])->name('invoice');
});

// ==========================================
// WEBHOOK
// ==========================================
Route::post('/webhook/xendit', [XenditController::class, 'handle'])->name('webhook.xendit');
Route::post('/webhook/idcloudhost', [IdCloudHostController::class, 'handle'])->name('webhook.idcloudhost');
