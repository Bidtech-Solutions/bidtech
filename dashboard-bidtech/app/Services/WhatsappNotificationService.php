<?php

namespace App\Services;

use App\Enums\Role;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Service pengiriman notifikasi WhatsApp otomatis melalui Fonnte API Gateway.
 */
class WhatsappNotificationService
{
    public const FONNTE_API_URL = 'https://api.fonnte.com/send';

    /**
     * Kirim pesan WhatsApp generik ke nomor tujuan.
     */
    public function send(string $target, string $message, ?string $url = null, ?string $filename = null): array
    {
        $token = config('services.fonnte.token');
        if (empty($token)) {
            Log::warning('SendWhatsappMessage: FONNTE_TOKEN belum dikonfigurasi di .env');

            return ['status' => false, 'message' => 'Token not configured'];
        }

        $cleanTarget = $this->normalizePhone($target);
        if (empty($cleanTarget)) {
            Log::warning("SendWhatsappMessage: Nomor target WhatsApp tidak valid: '{$target}'");

            return ['status' => false, 'message' => 'Invalid phone number'];
        }

        $payload = [
            'target' => $cleanTarget,
            'message' => $message,
            'countryCode' => '62',
        ];

        if (! empty($url)) {
            $payload['url'] = $url;
            if (! empty($filename)) {
                $payload['filename'] = $filename;
            }
        }

        try {
            $response = Http::withHeaders(['Authorization' => $token])
                ->timeout(15)
                ->asForm()
                ->post(self::FONNTE_API_URL, $payload);

            $result = $response->json() ?? [];
            Log::info("SendWhatsappMessage: Pesan WA terkirim ke {$cleanTarget}", ['response' => $result]);

            return $result;
        } catch (\Throwable $e) {
            Log::error("SendWhatsappMessage: Gagal mengirim pesan WA ke {$cleanTarget}: ".$e->getMessage());

            return ['status' => false, 'message' => $e->getMessage()];
        }
    }

    /**
     * Kirim invoice belum lunas ke WhatsApp klien saat checkout.
     */
    public function sendInvoice(Order $order): array
    {
        return $this->send($order->whatsapp, $this->invoiceWhatsappMessage($order));
    }

    /**
     * Kirim notifikasi pembayaran lunas & kredensial akun ke WhatsApp klien.
     */
    public function sendPaymentSuccess(Order $order, User $user): array
    {
        return $this->send($order->whatsapp, $this->paymentSuccessWhatsappMessage($order, $user));
    }

    /**
     * Kirim broadcast WhatsApp ke Klien saat status domain resmi AKTIF (registered).
     */
    public function sendDomainReady(Order $order): array
    {
        return $this->send($order->whatsapp, $this->domainReadyWhatsappMessage($order));
    }

    /**
     * Kirim broadcast WhatsApp ke Klien saat status website resmi LIVE (deployed).
     */
    public function sendWebsiteReady(Order $order): array
    {
        return $this->send($order->whatsapp, $this->websiteReadyWhatsappMessage($order));
    }

    /**
     * Kirim notifikasi WhatsApp ke Admin saat terdapat pesanan LUNAS.
     */
    public function sendAdminOrderPaid(Order $order): array
    {
        $adminPhones = $this->resolveAdminPhones();
        if (empty($adminPhones)) {
            Log::warning("sendAdminOrderPaid: Tidak ada nomor WhatsApp admin yang terkonfigurasi untuk order {$order->order_number}");

            return ['status' => false, 'message' => 'No admin phone configured'];
        }

        $message = $this->adminOrderPaidWhatsappMessage($order);
        $results = [];

        foreach ($adminPhones as $phone) {
            $results[$phone] = $this->send($phone, $message);
        }

        return ['status' => true, 'sent_to' => $adminPhones, 'results' => $results];
    }

    /**
     * Ambil daftar nomor telepon Admin dari konfigurasi .env atau fallback tabel users (Role: ADMIN).
     */
    public function resolveAdminPhones(): array
    {
        $configured = config('services.whatsapp.admin_phone');
        if (! empty($configured)) {
            $phones = array_map('trim', explode(',', $configured));
            $cleaned = array_filter(array_map([$this, 'normalizePhone'], $phones));
            if (! empty($cleaned)) {
                return array_values(array_unique($cleaned));
            }
        }

        // Fallback: Ambil dari user role ADMIN di database yang memiliki nomor WhatsApp
        $dbPhones = User::query()
            ->where('role', Role::Admin)
            ->whereNotNull('whatsapp')
            ->where('whatsapp', '!=', '')
            ->pluck('whatsapp')
            ->all();

        $cleanedDb = array_filter(array_map([$this, 'normalizePhone'], $dbPhones));

        return array_values(array_unique($cleanedDb));
    }

    /**
     * Normalisasi nomor telepon ke format internasional Indonesia (awalan 62).
     */
    public function normalizePhone(string $phone): string
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);
        if (empty($phone)) {
            return '';
        }

        if (str_starts_with($phone, '0')) {
            return '62'.substr($phone, 1);
        }

        if (str_starts_with($phone, '8')) {
            return '62'.$phone;
        }

        return $phone;
    }

    // ---- Template Pesan WhatsApp ----

    public function invoiceWhatsappMessage(Order $order): string
    {
        $order->loadMissing('template');
        $template = $order->template;
        $total = number_format($order->total_price, 0, ',', '.');
        $duration = $order->domain_duration ?: 1;
        $paymentUrl = $order->xendit_payment_url ?: route('checkout.bayar', ['template' => $order->template_id, 'order' => $order->order_number]);
        $pdfUrl = route('checkout.invoice.download', $order);
        $promoInfo = ! empty($order->discount_amount) && $order->discount_amount > 0
            ? '🏷️ *Diskon Promo:* -Rp '.number_format($order->discount_amount, 0, ',', '.')." ({$order->coupon_code})\n"
            : '';
        $partnerInfo = $order->is_partner_order && ! empty($order->partner_name)
            ? "🤝 *Program Kemitraan:* {$order->partner_name}\n"
            : '';

        return "Halo *{$order->full_name}*, terima kasih telah melakukan pemesanan di *Bidtech*! 🚀\n\n"
            ."Berikut rincian tagihan pesanan website Anda:\n"
            ."━━━━━━━━━━━━━━━━━━━━\n"
            ."📄 *No. Invoice:* #{$order->order_number}\n"
            .'🎨 *Template:* '.($template->name ?? 'Bidtech Template')."\n"
            ."🌐 *Domain:* {$order->domain_name} ({$duration} Tahun)\n"
            .$partnerInfo.$promoInfo
            ."💰 *Total Tagihan:* *Rp {$total}*\n"
            ."━━━━━━━━━━━━━━━━━━━━\n\n"
            ."💳 *Tautan Pembayaran Resmi (QRIS / Virtual Account):*\n👉 {$paymentUrl}\n\n"
            ."📄 *Unduh Dokumen Invoice (PDF):*\n👉 {$pdfUrl}\n\n"
            ."⚠️ _Batas waktu pembayaran berlaku 1x24 jam._\n"
            ."Jika Anda sudah menyelesaikan pembayaran atau memiliki pertanyaan, Anda dapat langsung membalas pesan WhatsApp ini.\n\n"
            ."Salam hangat,\n*Tim Bidtech Official*";
    }

    public function paymentSuccessWhatsappMessage(Order $order, User $user): string
    {
        $order->loadMissing('template');
        $total = number_format($order->total_price, 0, ',', '.');
        $loginUrl = url('/login');

        return "🎉 *PEMBAYARAN BERHASIL & TERKONFIRMASI!*\n\n"
            ."Halo *{$order->full_name}*,\n"
            ."Pembayaran untuk pesanan website Anda dengan nomor invoice *#{$order->order_number}* sebesar *Rp {$total}* telah kami terima.\n\n"
            ."━━━━━━━━━━━━━━━━━━━━\n"
            ."🔐 *AKUN KLIEN & AKSES PROYEK:*\n"
            ."🌐 *Domain:* {$order->domain_name}\n"
            ."📧 *Email Login:* `{$user->email}`\n"
            ."🔑 *Password Default:* `Password123!`\n"
            ."🔗 *Tautan Login:* {$loginUrl}\n"
            ."━━━━━━━━━━━━━━━━━━━━\n\n"
            ."🛠️ Tim teknis Bidtech saat ini sedang menyiapkan instalasi template dan konfigurasi domain Anda. Anda dapat memantau progres pengerjaan website secara berkala di Dashboard Klien.\n\n"
            ."Terima kasih atas kepercayaan Anda bermitra bersama *Bidtech*!\n\n"
            ."Salam hangat,\n*Tim Bidtech Official*";
    }

    public function domainReadyWhatsappMessage(Order $order): string
    {
        $domain = $order->domain_final ?: ($order->domain_name ?: 'Domain');
        $duration = $order->domain_duration ?: 1;
        $loginUrl = url('/login');

        return "🌐 *KABAR BAIK: DOMAIN ANDA TELAH AKTIF!* 🚀\n\n"
            ."Halo *{$order->full_name}*,\n"
            ."Kami menginformasikan bahwa pendaftaran domain untuk pesanan *#{$order->order_number}* telah berhasil dan domain Anda kini telah *AKTIF*! 🎉\n\n"
            ."━━━━━━━━━━━━━━━━━━━━\n"
            ."📌 *RINCIAN DOMAIN:*\n"
            ."🌐 *Nama Domain:* {$domain}\n"
            ."⏳ *Masa Aktif:* {$duration} Tahun\n"
            ."⚡ *Status Server:* Terhubung ke Server Cloud Bidtech\n"
            ."━━━━━━━━━━━━━━━━━━━━\n\n"
            ."Saat ini tim developer kami sedang menyelesaikan konfigurasi website Anda agar segera siap diluncurkan.\n\n"
            ."Pantau linimasa pengerjaan website secara berkala di Dashboard Klien:\n"
            ."🔗 *Dashboard Klien:* {$loginUrl}\n\n"
            ."Terima kasih atas kepercayaan Anda bermitra bersama *Bidtech*!\n\n"
            ."Salam hangat,\n*Tim Bidtech Official*";
    }

    public function websiteReadyWhatsappMessage(Order $order): string
    {
        $order->loadMissing(['template', 'client']);
        $domain = $order->domain_final ?: ($order->domain_name ?: 'Domain');
        $templateName = $order->template->name ?? 'Bidtech Premium Template';
        $clientEmail = $order->client?->email ?? $order->email;
        $websiteUrl = str_starts_with($domain, 'http') ? $domain : 'https://'.$domain;
        $loginUrl = url('/login');

        return "🎉 *SELAMAT! WEBSITE ANDA TELAH RESMI LIVE!* 🚀\n\n"
            ."Halo *{$order->full_name}*,\n"
            ."Kabar gembira! Pengerjaan website untuk pesanan *#{$order->order_number}* telah rampung 100% dan saat ini telah *LIVE* dan dapat diakses oleh publik.\n\n"
            ."━━━━━━━━━━━━━━━━━━━━\n"
            ."📌 *INFORMASI WEBSITE:*\n"
            ."🌐 *Tautan Website:* {$websiteUrl}\n"
            ."🎨 *Template:* {$templateName}\n"
            ."📊 *Status:* Online & Siap Digunakan\n"
            ."━━━━━━━━━━━━━━━━━━━━\n\n"
            ."🔑 *PANDUAN & PENGELOLAAN:*\n"
            ."Anda dapat masuk ke Dashboard Klien untuk melihat detail proyek dan panduan pengelolaan website Anda:\n"
            ."🔗 *Portal Klien:* {$loginUrl}\n"
            ."📧 *Email Login:* `{$clientEmail}`\n\n"
            ."Jika Anda membutuhkan bantuan teknis atau penyesuaian konten, tim support kami siap membantu Anda.\n\n"
            ."Sukses selalu untuk bisnis dan kehadiran digital Anda bersama *Bidtech*! 🌟\n\n"
            ."Salam hangat,\n*Tim Bidtech Official*";
    }

    public function adminOrderPaidWhatsappMessage(Order $order): string
    {
        $order->loadMissing('template');
        $templateName = $order->template->name ?? 'Bidtech Template';
        $domain = $order->domain_final ?: ($order->domain_name ?: 'Domain');
        $duration = $order->domain_duration ?: 1;
        $totalPrice = number_format($order->total_price, 0, ',', '.');
        $paidTime = ($order->paid_at ?? now())->timezone('Asia/Jakarta')->format('d M Y, H:i').' WIB';
        $adminOrderUrl = url('/dashboard/order');

        $promoInfo = ! empty($order->discount_amount) && $order->discount_amount > 0
            ? '🏷️ *Promo:* -Rp '.number_format($order->discount_amount, 0, ',', '.')." ({$order->coupon_code})\n"
            : '';
        $partnerInfo = $order->is_partner_order && ! empty($order->partner_name)
            ? "🤝 *Mitra:* {$order->partner_name}\n"
            : '';

        return "🔔 *NOTIFIKASI PESANAN LUNAS (ADMIN BIDTECH)* 💰\n\n"
            ."Halo Tim Admin,\n"
            ."Terdapat pesanan baru yang telah *LUNAS* dan terverifikasi. Berikut rinciannya:\n\n"
            ."━━━━━━━━━━━━━━━━━━━━\n"
            ."📄 *No. Pesanan:* #{$order->order_number}\n"
            ."👤 *Nama Klien:* {$order->full_name}\n"
            ."📱 *WhatsApp Klien:* {$order->whatsapp}\n"
            ."🎨 *Template:* {$templateName}\n"
            ."🌐 *Domain:* {$domain} ({$duration} Tahun)\n"
            .$partnerInfo.$promoInfo
            ."💰 *Total Lunas:* *Rp {$totalPrice}*\n"
            ."⏰ *Waktu Lunas:* {$paidTime}\n"
            ."━━━━━━━━━━━━━━━━━━━━\n\n"
            ."⚡ *TINDAKAN DIBUTUHKAN:*\n"
            ."Silakan segera lakukan verifikasi pendaftaran domain dan konfigurasi website klien melalui panel Admin:\n"
            ."👉 *Buka Kelola Pesanan:* {$adminOrderUrl}\n\n"
            ."Semangat dan selamat memproses pesanan! 🚀\n"
            ."_Bidtech Automated System_";
    }
}
