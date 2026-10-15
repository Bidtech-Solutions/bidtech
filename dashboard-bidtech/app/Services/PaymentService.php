<?php

namespace App\Services;

use App\Enums\CommissionType;
use App\Enums\DiscountMode;
use App\Enums\OrderStatus;
use App\Mail\InvoiceUnpaidMail;
use App\Mail\PaymentSuccessAndAccountMail;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class PaymentService
{
    private const XENDIT_API_URL = 'https://api.xendit.co/v2/invoices';

    private const FONNTE_API_URL = 'https://api.fonnte.com/send';

    public function __construct(
        private readonly OrderService $orders,
        private readonly UserService $users,
        private readonly WhatsappNotificationService $whatsapp,
    ) {}

    // ---- Confirmation and checkout promos ----

    public function showSummary(Session $session, Template $template): array
    {
        $checkout = $session->get('checkout', []);
        $isOwnDomain = (bool) ($checkout['is_own_domain'] ?? false);
        $domainPrice = $isOwnDomain ? 0 : (int) ($checkout['domain_price'] ?? config('domain.default_price'));
        $duration = (int) ($checkout['domain_duration'] ?? 1);
        $promo = $session->get('checkout.promo');
        $couponModel = null;
        $discountAmount = 0;

        if (! empty($promo['code'])) {
            $validation = $this->validatePromo(
                $promo['code'],
                $template,
                $domainPrice,
                $checkout['customer']['email'] ?? null,
                $duration,
                $isOwnDomain
            );
            if ($validation['valid']) {
                $discountAmount = $validation['discount_amount'];
                $promo['discount_amount'] = $discountAmount;
                $promo['partner_commission_amount'] = $validation['partner_commission_amount'];
                $session->put('checkout.promo', $promo);
                $couponModel = Coupon::find($validation['coupon_id']);
            } else {
                $session->forget('checkout.promo');
                $promo = null;
            }
        }

        $prices = $template->priceBreakdown($domainPrice, $discountAmount, $duration);
        $pricingStructure = $this->buildPricingStructure($prices, $couponModel, $discountAmount, $duration, $isOwnDomain);

        return $prices + [
            'template' => $template,
            'checkout' => $checkout,
            'promo' => $promo,
            'pricingStructure' => $pricingStructure,
            'step' => 3,
            'flow' => $session->get('checkout.flow', OrderService::FLOW_TEMPLATE_FIRST),
        ];
    }

    public function validatePromo(string $code, Template $template, int $domainPrice, ?string $email = null, int $duration = 1, bool $isOwnDomain = false): array
    {
        try {
            $cleanCode = strtoupper(trim($code));
            if ($cleanCode === '') {
                throw new \DomainException('Silakan masukkan kode promo.');
            }
            $promo = Coupon::with('partner.user')->where('code', $cleanCode)->first();
            if (! $promo) {
                throw new \DomainException('Kode promo tidak ditemukan. Periksa kembali penulisan kode promo Anda.');
            }

            $prices = $template->priceBreakdown($domainPrice, 0, $duration);
            $subtotal = $prices['subtotal'];
            $this->checkPromoEligibility($promo, $template, $email, $subtotal);
            $discount = $this->calculatePromoDiscount($promo, $prices);
            $newTotal = max(0, $subtotal - $discount);
            $meta = $promo->getDiscountMeta($prices, $discount);
            $pricingStructure = $this->buildPricingStructure($prices, $promo, $discount, $duration, $isOwnDomain);

            // Basis komisi mitra = harga paket website setelah diskon klien (tanpa domain)
            $packagePromoPrice = $pricingStructure['package_promo_price'] ?? max(0, $prices['packageTotal'] - $discount);

            return [
                'valid' => true,
                'coupon_id' => $promo->id,
                'promo_id' => $promo->id,
                'code' => $promo->code,
                'name' => $promo->name,
                'description' => null,
                'is_partner' => $promo->partner_id !== null,
                'partner_name' => $promo->partner?->user?->name,
                'partner_code' => null,
                'discount_amount' => $discount,
                'formatted_discount' => $this->rupiah($discount),
                'partner_commission_amount' => $this->partnerCommission($promo, $packagePromoPrice),
                'new_total' => $newTotal,
                'formatted_new_total' => $this->rupiah($newTotal),
                'is_percentage' => $meta['is_percentage'],
                'percentage' => $meta['percentage'],
                'formatted_percentage' => $meta['formatted_percentage'],
                'badge_text' => $meta['badge_text'],
                'discount_label' => $meta['discount_label'],
                'max_discount' => $meta['max_discount'],
                'formatted_max_discount' => $meta['formatted_max_discount'],
                'is_max_reached' => $meta['is_max_reached'],
                'pricing_structure' => $pricingStructure,
                'message' => $this->promoSuccessMessage($promo, $discount, $meta),
            ];
        } catch (\DomainException $e) {
            return ['valid' => false, 'message' => $e->getMessage()];
        }
    }

    public function checkPromoEligibility(Coupon $promo, Template $template, ?string $email, int $subtotal): void
    {
        if (! $promo->is_active) {
            throw new \DomainException('Kode promo ini sedang tidak aktif.');
        }
        if ($promo->partner_id && $promo->partner && ! $promo->partner->is_active) {
            throw new \DomainException('Mitra untuk kode promo ini sedang tidak aktif.');
        }
        if ($promo->isExpired()) {
            throw new \DomainException('Masa berlaku kode promo ini telah berakhir atau belum dimulai.');
        }
        if (! $promo->hasQuota($email)) {
            throw new \DomainException('Mohon maaf, kuota penggunaan kode promo ini sudah habis.');
        }
        if ($promo->min_order_amount !== null && $subtotal < $promo->min_order_amount) {
            throw new \DomainException(
                'Minimal pemesanan untuk menggunakan kode promo ini adalah Rp'.number_format($promo->min_order_amount, 0, ',', '.').'.'
            );
        }
    }

    public function calculatePromoDiscount(Coupon $promo, array $prices): int
    {
        return match ($promo->discount_mode) {
            DiscountMode::SubtotalDomain => $promo->discountFor('subtotal', $prices['subtotal']),
            DiscountMode::SubtotalNonDomain => min($prices['packageTotal'], $promo->discountFor('subtotal', $prices['packageTotal'])),
            DiscountMode::PerComponent => $promo->discountFor('template', $prices['templatePrice'])
                + $promo->discountFor('server', $prices['serverPrice'])
                + $promo->discountFor('service', $prices['servicePrice'])
                + $promo->discountFor('domain', $prices['domainPrice']),
            default => $promo->discountFor('subtotal', $prices['subtotal'])
                + $promo->discountFor('template', $prices['templatePrice'])
                + $promo->discountFor('server', $prices['serverPrice'])
                + $promo->discountFor('service', $prices['servicePrice'])
                + $promo->discountFor('domain', $prices['domainPrice']),
        };
    }

    public function applyPromo(Session $session, Template $template, string $code, string $fallbackEmail = ''): array
    {
        $checkout = $session->get('checkout', []);
        $isOwnDomain = (bool) ($checkout['is_own_domain'] ?? false);
        $domainPrice = $isOwnDomain ? 0 : (int) ($checkout['domain_price'] ?? config('domain.default_price'));
        $duration = (int) ($checkout['domain_duration'] ?? 1);
        $customerEmail = $checkout['customer']['email'] ?? $fallbackEmail;
        $result = $this->validatePromo(trim($code), $template, $domainPrice, $customerEmail, $duration, $isOwnDomain);
        if ($result['valid']) {
            $session->put('checkout.promo', [
                'coupon_id' => $result['coupon_id'],
                'promo_id' => $result['coupon_id'],
                'code' => $result['code'],
                'name' => $result['name'],
                'description' => $result['description'],
                'is_partner' => $result['is_partner'],
                'partner_name' => $result['partner_name'],
                'partner_code' => $result['partner_code'],
                'discount_amount' => $result['discount_amount'],
                'partner_commission_amount' => $result['partner_commission_amount'],
                'is_percentage' => $result['is_percentage'] ?? false,
                'percentage' => $result['percentage'] ?? null,
                'formatted_percentage' => $result['formatted_percentage'] ?? null,
                'badge_text' => $result['badge_text'] ?? null,
                'discount_label' => $result['discount_label'] ?? null,
                'max_discount' => $result['max_discount'] ?? null,
                'formatted_max_discount' => $result['formatted_max_discount'] ?? null,
                'is_max_reached' => $result['is_max_reached'] ?? false,
            ]);
        }

        return $result;
    }

    public function removePromo(Session $session, Template $template): int
    {
        $session->forget('checkout.promo');
        $domainPrice = (int) ($session->get('checkout.domain_price') ?? config('domain.default_price'));
        $duration = (int) ($session->get('checkout.domain_duration') ?? 1);

        return $template->priceBreakdown($domainPrice, 0, $duration)['totalPrice'];
    }

    public function claimPromoQuota(int|string $promoId, string $email): Coupon
    {
        $promo = Coupon::with('partner.user')->where('id', $promoId)->lockForUpdate()->first();
        if (! $promo) {
            throw new \RuntimeException('Kode promo tidak ditemukan. Promo mungkin telah dihapus.');
        }
        if (! $promo->hasQuota($email)) {
            throw new \RuntimeException("Mohon maaf, kuota kode promo {$promo->code} telah habis. Checkout Anda diproses tanpa promo.");
        }
        return $promo;
    }

    public function recordPromoUsage(Coupon $promo, Order $order, int $discountAmount, int $commissionAmount = 0): void
    {
        // Pemakaian merupakan snapshot pada orders; tidak ada tabel usage terpisah.
    }

    // ---- Payment lifecycle ----

    public function placeOrder(Template $template, array $checkout): Order
    {
        $promo = $checkout['promo'] ?? null;
        $promoId = $promo['coupon_id'] ?? $promo['promo_id'] ?? null;
        $discount = (int) ($promo['discount_amount'] ?? 0);
        $commission = (int) ($promo['partner_commission_amount'] ?? 0);

        $order = DB::transaction(function () use ($template, $checkout, $promoId, $discount, $commission) {
            $claimedPromo = $promoId
                ? $this->claimPromoQuota($promoId, $checkout['customer']['email'])
                : null;
            $order = $this->orders->create($template, $checkout);
            if ($claimedPromo) {
                $this->recordPromoUsage($claimedPromo, $order, $discount, $commission);
            }

            return $order;
        });

        $this->createInvoice($order, $template, $checkout['customer']);
        $this->sendInvoiceMail($order);
        $this->sendInvoiceWhatsapp($order);

        return $order;
    }

    public function createInvoice(Order $order, Template $template, array $customer): void
    {
        $invoice = $this->createXenditInvoice($order, $template, $customer);
        if ($invoice && ! empty($invoice['invoice_url'])) {
            $order->update([
                'xendit_invoice_id' => $invoice['id'] ?? null,
                'xendit_payment_url' => $invoice['invoice_url'],
                'payment_expires_at' => ! empty($invoice['expiry_date'])
                    ? Carbon::parse($invoice['expiry_date'])
                    : now()->addDay(),
            ]);

            return;
        }
        $order->update([
            'xendit_payment_url' => route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]),
            'payment_expires_at' => now()->addDay(),
        ]);
    }

    public function showPayment(Order $order, Template $template, string $flow): array
    {
        $orderTemplate = $order->template ?? $template;
        $this->orders->ensureExpiry($order);
        $this->refreshStatus($order);
        $user = $order->isPaid()
            ? $this->activatePaidOrder($order, withWhatsapp: false)
            : $order->client;

        $orderPrices = $order->priceBreakdown($orderTemplate);
        $pricingStructure = $this->buildPricingStructure(
            $orderPrices,
            $order->coupon,
            (int) ($order->discount_amount ?? 0),
            (int) ($order->domain_duration ?: 1),
            (bool) $order->is_own_domain
        );

        return $orderPrices + [
            'template' => $orderTemplate,
            'order' => $order,
            'user' => $user,
            'isExistingUser' => false,
            'step' => 4,
            'flow' => $flow,
            'pricingStructure' => $pricingStructure,
        ];
    }

    public function refreshStatus(Order $order): void
    {
        if ($order->isExpired() && $order->status !== OrderStatus::Invalid && ! $order->isPaid()) {
            $this->orders->markInvalid($order);
        }
        if ($order->isPaid() || $order->status === OrderStatus::Invalid || empty($order->xendit_invoice_id)) {
            return;
        }
        $invoice = $this->getXenditInvoice($order->xendit_invoice_id);
        if (! $invoice) {
            return;
        }
        $status = strtoupper($invoice['status'] ?? '');
        if (in_array($status, ['PAID', 'SETTLED'])) {
            $this->orders->markPaid($order);
        } elseif ($status === 'EXPIRED') {
            $this->orders->markInvalid($order);
        }
    }

    public function activatePaidOrder(Order $order, bool $withWhatsapp = true): User
    {
        $existing = $order->client_id !== null;
        $user = $this->users->createClientAccount($order);
        if ($existing) {
            $this->users->normalizeClientEmail($order, $user);
        }
        $this->notifyOrderPaid($order, $user, $withWhatsapp);

        return $user;
    }

    public function handleXenditWebhook(Order $order, string $status): void
    {
        $status = strtoupper($status);
        if (in_array($status, ['PAID', 'SETTLED'])) {
            $this->orders->markPaid($order);
            $user = $this->users->syncClientAccountFromOrder($order);
            $this->notifyOrderPaid($order, $user);
            Log::info("Xendit webhook: order {$order->order_number} mark as PAID & user activated with email {$user->email}");
        } elseif ($status === 'EXPIRED') {
            $this->orders->markInvalid($order);
            Log::info("Xendit webhook: order {$order->order_number} mark as EXPIRED");
        }
    }

    public function renderInvoice(Order $order): string
    {
        $orderPrices = $order->priceBreakdown();
        $pricingStructure = $this->buildPricingStructure(
            $orderPrices,
            $order->coupon,
            (int) ($order->discount_amount ?? 0),
            (int) ($order->domain_duration ?: 1),
            (bool) $order->is_own_domain
        );

        return view('pdf.invoice', [
            'order' => $order,
            'template' => $order->template,
            'pricingStructure' => $pricingStructure,
            'autoPrint' => true,
        ])->render();
    }

    // ---- Notifications ----

    public function sendInvoiceMail(Order $order): void
    {
        try {
            Mail::to($order->email)->send(new InvoiceUnpaidMail($order));
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim email tagihan unpaid untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    public function sendInvoiceWhatsapp(Order $order): void
    {
        try {
            $this->whatsapp->sendInvoice($order);
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim WhatsApp invoice via Fonnte untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    public function sendPaymentSuccessMail(Order $order, User $user): void
    {
        try {
            Mail::to($order->email)->send(new PaymentSuccessAndAccountMail($order, $user));
            $order->update(['paid_email_sent_at' => now()]);
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim email lunas & kredensial untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    public function sendPaymentSuccessWhatsapp(Order $order, User $user): void
    {
        try {
            $this->whatsapp->sendPaymentSuccess($order, $user);
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim WhatsApp lunas via Fonnte untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    public function notifyOrderPaid(Order $order, User $user, bool $withWhatsapp = true): void
    {
        if (! empty($order->paid_email_sent_at)) {
            return;
        }
        $this->sendPaymentSuccessMail($order, $user);
        if ($withWhatsapp) {
            $this->sendPaymentSuccessWhatsapp($order, $user);
        }
        $this->notifyAdminOrderPaid($order);
    }

    public function notifyAdminOrderPaid(Order $order): void
    {
        if (! empty($order->admin_paid_wa_sent_at)) {
            return;
        }
        try {
            $result = $this->whatsapp->sendAdminOrderPaid($order);
            if (! empty($result['status'])) {
                $order->update(['admin_paid_wa_sent_at' => now()]);
            }
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim WhatsApp admin pesanan lunas untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    // ---- Xendit (internal) ----

    private function createXenditInvoice(Order $order, Template $template, array $customer): ?array
    {
        $secretKey = config('services.xendit.key');
        if (empty($secretKey)) {
            Log::error('CreateXenditInvoice: XENDIT_SECRET_KEY belum dikonfigurasi.');

            return null;
        }

        $prices = $order->priceBreakdown($template);
        $discount = $prices['discountAmount'];
        $description = "Pemesanan Website {$template->name} + Domain {$order->domain_name}";
        if ($discount > 0 && ! empty($order->coupon_code)) {
            $description .= ' (Hemat Rp '.number_format($discount, 0, ',', '.')." via {$order->coupon_code})";
        }
        $returnUrl = route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]);
        $payload = [
            'external_id' => $order->order_number,
            'amount' => $prices['totalPrice'],
            'payer_email' => $customer['email'],
            'description' => $description,
            'customer' => [
                'given_names' => $customer['name'],
                'email' => $customer['email'],
                'mobile_number' => $customer['whatsapp'],
            ],
            'customer_notification_preference' => [
                'invoice_created' => [],
                'invoice_reminder' => [],
                'invoice_paid' => [],
            ],
            'success_redirect_url' => $returnUrl,
            'failure_redirect_url' => $returnUrl,
            'currency' => 'IDR',
            'items' => $discount > 0
                ? $this->discountedItems($order, $template, $prices)
                : $this->fullPriceItems($order, $template, $prices),
        ];

        try {
            $response = Http::withBasicAuth($secretKey, '')
                ->withHeaders(['Accept' => 'application/json', 'Content-Type' => 'application/json'])
                ->timeout(15)
                ->post(self::XENDIT_API_URL, $payload);
            if ($response->successful()) {
                return $response->json();
            }
            Log::error('Xendit createInvoice failed', [
                'status' => $response->status(),
                'body' => $response->body(),
                'payload' => $payload,
            ]);

            return null;
        } catch (\Throwable $e) {
            Log::error('Xendit createInvoice exception: '.$e->getMessage(), ['order_number' => $order->order_number]);

            return null;
        }
    }

    private function getXenditInvoice(string $invoiceId): ?array
    {
        $secretKey = config('services.xendit.key');
        if (empty($secretKey) || empty($invoiceId)) {
            return null;
        }
        try {
            $response = Http::withBasicAuth($secretKey, '')
                ->withHeaders(['Accept' => 'application/json'])
                ->timeout(10)
                ->get(self::XENDIT_API_URL."/{$invoiceId}");
            if ($response->successful()) {
                return $response->json();
            }
            Log::warning('Xendit getInvoice failed: '.$response->body());

            return null;
        } catch (\Throwable $e) {
            Log::warning('Xendit getInvoice exception: '.$e->getMessage());

            return null;
        }
    }

    // ---- Internal helpers ----

    /**
     * Hitung komisi mitra berdasarkan tipe komisi.
     * - Fixed: nominal tetap (Rupiah) per order.
     * - Percentage: persentase dari harga paket website setelah diskon klien (tidak termasuk domain).
     */
    private function partnerCommission(Coupon $promo, int $packagePromoPrice): int
    {
        $partner = $promo->partner;
        if (! $partner) {
            return 0;
        }

        return match ($partner->type_commission) {
            CommissionType::Fixed => (int) $partner->amount_commission,
            CommissionType::Percentage => (int) round(($packagePromoPrice * $partner->amount_commission) / 100),
        };
    }

    private function promoSuccessMessage(Coupon $promo, int $discount, ?array $meta = null): string
    {
        $partner = $promo->partner?->user?->name;
        $label = $meta && ! empty($meta['formatted_percentage'])
            ? " ({$meta['badge_text']})"
            : '';
        $cappedInfo = ($meta['is_max_reached'] ?? false)
            ? ' (maksimal promo tercapai)'
            : '';

        return $partner
            ? "Kode kupon kemitraan {$partner}{$label} berhasil digunakan! Anda hemat {$this->rupiah($discount)}{$cappedInfo}"
            : "Kode kupon {$promo->code}{$label} berhasil diterapkan! Anda hemat {$this->rupiah($discount)}{$cappedInfo}";
    }

    private function fullPriceItems(Order $order, Template $template, array $prices): array
    {
        $duration = $order->domain_duration ?: 1;
        $templateTitle = "Lisensi Template: {$template->name} ({$duration} Tahun)";
        $serverTitle = "Cloud Server & Hosting ({$duration} Tahun)";
        $serviceTitle = "Setup & Layanan Deployment ({$duration} Tahun)";
        $domainTitle = $order->is_own_domain
            ? "Setup Domain (Milik Sendiri: {$order->domain_name})"
            : "Domain {$order->domain_name} ({$duration} Tahun)";

        return [
            ['name' => $templateTitle, 'quantity' => 1, 'price' => $prices['templatePrice'], 'category' => 'Website Template'],
            ['name' => $serverTitle, 'quantity' => 1, 'price' => $prices['serverPrice'], 'category' => 'Cloud Server'],
            ['name' => $serviceTitle, 'quantity' => 1, 'price' => $prices['servicePrice'], 'category' => 'Service & Setup'],
            ['name' => $domainTitle, 'quantity' => 1, 'price' => $prices['domainPrice'], 'category' => 'Domain Registration'],
        ];
    }

    private function discountedItems(Order $order, Template $template, array $prices): array
    {
        $discount = $prices['discountAmount'];
        $packageDiscount = min($prices['packageTotal'], $discount);
        $domainDiscount = max(0, $discount - $packageDiscount);
        $packageNet = max(0, $prices['packageTotal'] - $packageDiscount);
        $domainNet = max(0, $prices['domainPrice'] - $domainDiscount);
        $items = [];
        if ($packageNet > 0) {
            $items[] = ['name' => "Paket Website {$template->name} (Diskon {$order->coupon_code})", 'quantity' => 1, 'price' => $packageNet, 'category' => 'Website Package'];
        }
        if ($domainNet > 0) {
            $items[] = [
                'name' => "Domain {$order->domain_name} (".($order->domain_duration ?: 1).' Tahun)'.($domainDiscount > 0 ? " (Diskon {$order->coupon_code})" : ''),
                'quantity' => 1,
                'price' => $domainNet,
                'category' => 'Domain Registration',
            ];
        }
        if ($items === []) {
            $items[] = ['name' => "Paket Website {$template->name} + Domain {$order->domain_name}", 'quantity' => 1, 'price' => $prices['totalPrice'], 'category' => 'Website Package'];
        }

        return $items;
    }

    private function invoiceWhatsappMessage(Order $order): string
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

    private function paymentSuccessWhatsappMessage(Order $order, User $user): string
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

    private function sendWhatsapp(string $target, string $message, ?string $url = null, ?string $filename = null): array
    {
        return $this->whatsapp->send($target, $message, $url, $filename);
    }

    private function normalizePhone(string $phone): string
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);
        if (str_starts_with($phone, '0')) {
            return '62'.substr($phone, 1);
        }
        if (str_starts_with($phone, '8')) {
            return '62'.$phone;
        }

        return $phone;
    }

    /**
     * Membangun struktur tata letak harga komprehensif sesuai 3 mode:
     * 1. 'umum' (Normal tanpa diskon)
     * 2. 'subtotal' (Diskon paket website)
     * 3. 'per_component' (Diskon spesifik komponen)
     */
    public function buildPricingStructure(array $prices, ?Coupon $promo, int $calculatedDiscount = 0, int $duration = 1, bool $isOwnDomain = false): array
    {
        $duration = max(1, $duration);
        $templatePrice = (int) ($prices['templatePrice'] ?? 0);
        $serverPrice = (int) ($prices['serverPrice'] ?? 0);
        $servicePrice = (int) ($prices['servicePrice'] ?? 0);
        $domainPrice = $isOwnDomain ? 0 : (int) ($prices['domainPrice'] ?? 0);
        $packageSubtotal = $templatePrice + $serverPrice + $servicePrice;

        if (! $promo || $calculatedDiscount <= 0) {
            return [
                'mode' => 'umum',
                'package_subtotal' => $packageSubtotal,
                'package_discount' => 0,
                'package_discount_label' => null,
                'package_promo_price' => $packageSubtotal,
                'domain_price' => $domainPrice,
                'domain_discount' => 0,
                'total' => $packageSubtotal + $domainPrice,
                'formatted_package_subtotal' => $this->rupiah($packageSubtotal),
                'formatted_package_promo_price' => $this->rupiah($packageSubtotal),
                'formatted_domain_price' => $this->rupiah($domainPrice),
                'formatted_total' => $this->rupiah($packageSubtotal + $domainPrice),
                'components' => [
                    'template' => ['name' => 'Lisensi Template Website', 'price' => $templatePrice, 'formatted_price' => $this->rupiah($templatePrice), 'discount' => 0, 'discount_label' => null, 'net' => $templatePrice, 'formatted_net' => $this->rupiah($templatePrice), 'has_discount' => false],
                    'server'   => ['name' => 'Cloud Server Hosting', 'price' => $serverPrice, 'formatted_price' => $this->rupiah($serverPrice), 'discount' => 0, 'discount_label' => null, 'net' => $serverPrice, 'formatted_net' => $this->rupiah($serverPrice), 'has_discount' => false],
                    'service'  => ['name' => 'Setup Deployment & Layanan Teknis', 'price' => $servicePrice, 'formatted_price' => $this->rupiah($servicePrice), 'discount' => 0, 'discount_label' => null, 'net' => $servicePrice, 'formatted_net' => $this->rupiah($servicePrice), 'has_discount' => false],
                    'domain'   => ['name' => 'Registrasi Domain Resmi', 'price' => $domainPrice, 'formatted_price' => $this->rupiah($domainPrice), 'discount' => 0, 'discount_label' => null, 'net' => $domainPrice, 'formatted_net' => $this->rupiah($domainPrice), 'has_discount' => false],
                ],
            ];
        }

        $mode = $promo->discount_mode ?? \App\Enums\DiscountMode::SubtotalDomain;

        if ($mode === \App\Enums\DiscountMode::PerComponent) {
            $templateDisc = min($templatePrice, $promo->discountFor('template', $templatePrice));
            $serverDisc = min($serverPrice, $promo->discountFor('server', $serverPrice));
            $serviceDisc = min($servicePrice, $promo->discountFor('service', $servicePrice));
            $domainDisc = $isOwnDomain ? 0 : min($domainPrice, $promo->discountFor('domain', $domainPrice));

            $templateMeta = $this->componentDiscountMeta($promo, 'template', $templatePrice, $templateDisc);
            $serverMeta = $this->componentDiscountMeta($promo, 'server', $serverPrice, $serverDisc);
            $serviceMeta = $this->componentDiscountMeta($promo, 'service', $servicePrice, $serviceDisc);
            $domainMeta = $this->componentDiscountMeta($promo, 'domain', $domainPrice, $domainDisc);

            $netTemplate = max(0, $templatePrice - $templateDisc);
            $netServer = max(0, $serverPrice - $serverDisc);
            $netService = max(0, $servicePrice - $serviceDisc);
            $netDomain = max(0, $domainPrice - $domainDisc);

            $promoPackagePrice = $netTemplate + $netServer + $netService;
            $total = $promoPackagePrice + $netDomain;

            return [
                'mode' => 'per_component',
                'package_subtotal' => $packageSubtotal,
                'package_discount' => $templateDisc + $serverDisc + $serviceDisc,
                'package_discount_label' => null,
                'package_promo_price' => $promoPackagePrice,
                'domain_price' => $domainPrice,
                'domain_discount' => $domainDisc,
                'domain_discount_label' => $domainMeta['label'],
                'domain_net' => $netDomain,
                'total' => $total,
                'formatted_package_subtotal' => $this->rupiah($packageSubtotal),
                'formatted_package_promo_price' => $this->rupiah($promoPackagePrice),
                'formatted_domain_price' => $this->rupiah($domainPrice),
                'formatted_total' => $this->rupiah($total),
                'components' => [
                    'template' => [
                        'name' => 'Lisensi Template Website',
                        'price' => $templatePrice,
                        'formatted_price' => $this->rupiah($templatePrice),
                        'discount' => $templateDisc,
                        'discount_label' => $templateMeta['label'],
                        'net' => $netTemplate,
                        'formatted_net' => $this->rupiah($netTemplate),
                        'has_discount' => $templateDisc > 0,
                    ],
                    'server' => [
                        'name' => 'Cloud Server Hosting',
                        'price' => $serverPrice,
                        'formatted_price' => $this->rupiah($serverPrice),
                        'discount' => $serverDisc,
                        'discount_label' => $serverMeta['label'],
                        'net' => $netServer,
                        'formatted_net' => $this->rupiah($netServer),
                        'has_discount' => $serverDisc > 0,
                    ],
                    'service' => [
                        'name' => 'Setup Deployment & Layanan Teknis',
                        'price' => $servicePrice,
                        'formatted_price' => $this->rupiah($servicePrice),
                        'discount' => $serviceDisc,
                        'discount_label' => $serviceMeta['label'],
                        'net' => $netService,
                        'formatted_net' => $this->rupiah($netService),
                        'has_discount' => $serviceDisc > 0,
                    ],
                    'domain' => [
                        'name' => 'Registrasi Domain Resmi',
                        'price' => $domainPrice,
                        'formatted_price' => $this->rupiah($domainPrice),
                        'discount' => $domainDisc,
                        'discount_label' => $domainMeta['label'],
                        'net' => $netDomain,
                        'formatted_net' => $this->rupiah($netDomain),
                        'has_discount' => $domainDisc > 0,
                    ],
                ],
            ];
        }

        // Subtotal mode (SubtotalDomain atau SubtotalNonDomain)
        $meta = $promo->getDiscountMeta($prices, $calculatedDiscount);
        $discLabel = '-'.$this->rupiah($calculatedDiscount);
        if ($meta['is_percentage'] && ! empty($meta['percentage'])) {
            $discLabel .= ' ('.$meta['percentage'].'%)';
        }

        $packageDiscount = min($packageSubtotal, $calculatedDiscount);
        $packagePromoPrice = max(0, $packageSubtotal - $packageDiscount);
        $remainingDiscount = max(0, $calculatedDiscount - $packageDiscount);
        $domainNet = max(0, $domainPrice - $remainingDiscount);
        $total = $packagePromoPrice + $domainNet;

        return [
            'mode' => 'subtotal',
            'package_subtotal' => $packageSubtotal,
            'package_discount' => $calculatedDiscount,
            'package_discount_label' => $discLabel,
            'package_promo_price' => $packagePromoPrice,
            'domain_price' => $domainPrice,
            'domain_discount' => $remainingDiscount,
            'domain_net' => $domainNet,
            'total' => $total,
            'formatted_package_subtotal' => $this->rupiah($packageSubtotal),
            'formatted_package_promo_price' => $this->rupiah($packagePromoPrice),
            'formatted_domain_price' => $this->rupiah($domainPrice),
            'formatted_total' => $this->rupiah($total),
            'components' => [
                'template' => ['name' => 'Lisensi Template Website', 'price' => $templatePrice, 'formatted_price' => $this->rupiah($templatePrice), 'discount' => 0, 'discount_label' => null, 'net' => $templatePrice, 'formatted_net' => $this->rupiah($templatePrice), 'has_discount' => false],
                'server'   => ['name' => 'Cloud Server Hosting', 'price' => $serverPrice, 'formatted_price' => $this->rupiah($serverPrice), 'discount' => 0, 'discount_label' => null, 'net' => $serverPrice, 'formatted_net' => $this->rupiah($serverPrice), 'has_discount' => false],
                'service'  => ['name' => 'Setup Deployment & Layanan Teknis', 'price' => $servicePrice, 'formatted_price' => $this->rupiah($servicePrice), 'discount' => 0, 'discount_label' => null, 'net' => $servicePrice, 'formatted_net' => $this->rupiah($servicePrice), 'has_discount' => false],
                'domain'   => ['name' => 'Registrasi Domain Resmi', 'price' => $domainPrice, 'formatted_price' => $this->rupiah($domainPrice), 'discount' => $remainingDiscount, 'discount_label' => null, 'net' => $domainNet, 'formatted_net' => $this->rupiah($domainNet), 'has_discount' => $remainingDiscount > 0],
            ],
        ];
    }

    private function componentDiscountMeta(Coupon $promo, string $component, int $price, int $discount): array
    {
        if ($discount <= 0) {
            return ['has_discount' => false, 'label' => null];
        }

        $type = $promo->{"{$component}_discount_type"};
        $amount = (int) ($promo->{"{$component}_discount_amount"} ?? 0);
        $label = '-'.$this->rupiah($discount);

        if ($type === \App\Enums\DiscountType::Percentage && $amount > 0) {
            $label .= " ({$amount}%)";
        }

        return [
            'has_discount' => true,
            'label' => $label,
            'amount' => $amount,
            'type' => $type,
        ];
    }

    private function rupiah(int $amount): string
    {
        return 'Rp'.number_format($amount, 0, ',', '.');
    }
}
