<?php

namespace App\Services;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
use App\Models\Order;
use App\Models\Coupon;
use App\Enums\Role;
use App\Models\Template;
use App\Models\User;
use App\Models\OrderStatusHistory;
use Illuminate\Contracts\Session\Session;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public const FLOW_DOMAIN_FIRST = 'domain-first';

    public const FLOW_TEMPLATE_FIRST = 'template-first';

    private const DOMAIN_KEYS = ['domain_name', 'domain_price', 'domain_tax', 'domain_price_base', 'is_own_domain'];

    private const MONTHS = [
        1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
        5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
        9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
    ];

    public function __construct(
        private readonly DomainService $domains,
        private readonly TemplateService $templates,
        private readonly UserService $users,
        private readonly WhatsappNotificationService $whatsapp,
    ) {}

    // ---- Checkout session ----

    public function selectTemplate(Session $session, Template $template, string $flow): void
    {
        $current = (int) $session->get('checkout.template_id');
        if ($current && $current !== $template->id) {
            $domain = [];
            foreach (self::DOMAIN_KEYS as $key) {
                $domain[$key] = $session->get("checkout.{$key}");
            }
            $session->forget('checkout');
            if (! empty($domain['domain_name'])) {
                foreach ($domain as $key => $value) {
                    $session->put("checkout.{$key}", $value);
                }
            }
        }
        $session->put('checkout.template_id', $template->id);
        $session->put('checkout.flow', $flow);
    }

    public function changeDomain(
        Session $session,
        string $domain,
        int $price = 0,
        int $base = 0,
        int $tax = 0,
        string $flow = self::FLOW_DOMAIN_FIRST,
    ): array {
        $quote = $this->domains->quotePrice($domain, $price, $base, $tax);
        $session->put('checkout.domain_name', $domain);
        $session->put('checkout.domain_price', $quote['price']);
        $session->put('checkout.domain_tax', $quote['tax']);
        $session->put('checkout.domain_price_base', $quote['base']);
        $session->put('checkout.is_own_domain', false);
        $session->put('checkout.flow', $flow);

        return $quote;
    }

    public function selectDomain(Session $session, string $domain, int $pricePerYear = 0, int $duration = 1): array
    {
        $duration = in_array($duration, [1, 2, 3], true) ? $duration : 1;
        $pricePerYear = $this->domains->quotePrice($domain, $pricePerYear)['price'];
        $total = $this->domains->quotePrice($domain, $pricePerYear * $duration);
        $this->changeDomain($session, $domain, $total['price'], $total['base'], $total['tax'], self::FLOW_TEMPLATE_FIRST);
        $session->put('checkout.domain_duration', $duration);
        $session->put('checkout.domain_price_per_year', $pricePerYear);
        $session->put('checkout.is_own_domain', false);

        return [
            'price_per_year' => $pricePerYear,
            'duration' => $duration,
            'total' => $total,
        ];
    }

    /**
     * Memilih opsi "Saya Sudah Memiliki Domain" (bebas biaya registrasi domain).
     * Domain wajib sudah terdaftar (punya record NS/A) agar salah ketik atau domain
     * yang belum dibeli tidak lolos ke order.
     *
     * @throws ValidationException
     */
    public function selectOwnDomain(Session $session, string $domain, int $duration = 1): array
    {
        $cleanDomain = $this->sanitizeDomain($domain);
        $duration = in_array($duration, [1, 2, 3], true) ? $duration : 1;

        $isRegistered = $this->domains->isRegistered($cleanDomain);
        if (! $isRegistered && ! app()->environment('local', 'testing')) {
            throw ValidationException::withMessages([
                'domain' => "Domain {$cleanDomain} belum terdaftar atau belum aktif. Pastikan ejaannya benar dan domain sudah dibeli di registrar, atau pilih \"Beli Domain Baru\".",
            ]);
        }

        $session->put('checkout.domain_name', $cleanDomain);
        $session->put('checkout.domain_price', 0);
        $session->put('checkout.domain_tax', 0);
        $session->put('checkout.domain_price_base', 0);
        $session->put('checkout.domain_duration', $duration);
        $session->put('checkout.domain_price_per_year', 0);
        $session->put('checkout.is_own_domain', true);
        $session->put('checkout.flow', self::FLOW_TEMPLATE_FIRST);

        return [
            'domain' => $cleanDomain,
            'is_own_domain' => true,
            'price' => 0,
            'formatted_price' => 'Rp0',
            'duration' => $duration,
        ];
    }

    /**
     * Membersihkan nama domain dari spasi, protokol (http/https), www, dan trailing slash.
     */
    public function sanitizeDomain(string $domain): string
    {
        $clean = strtolower(trim($domain));
        $clean = preg_replace('#^https?://#i', '', $clean);
        $clean = preg_replace('#^www\.#i', '', $clean);
        return rtrim($clean, '/');
    }

    public function updateDomainDuration(Session $session, int $duration = 1): ?array
    {
        $domain = $session->get('checkout.domain_name');
        if (! $domain) {
            return null;
        }
        $duration = in_array($duration, [1, 2, 3], true) ? $duration : 1;
        $isOwn = (bool) $session->get('checkout.is_own_domain', false);

        if ($isOwn) {
            $session->put('checkout.domain_duration', $duration);
            $session->put('checkout.domain_price', 0);
            $session->put('checkout.domain_tax', 0);
            $session->put('checkout.domain_price_base', 0);
            $session->put('checkout.domain_price_per_year', 0);

            return [
                'domain' => $domain,
                'price_per_year' => 0,
                'duration' => $duration,
                'is_own_domain' => true,
                'total' => ['price' => 0, 'base' => 0, 'tax' => 0],
            ];
        }

        $pricePerYear = (int) ($session->get('checkout.domain_price_per_year') ?: config('domain.default_price'));
        $total = $this->domains->quotePrice($domain, $pricePerYear * $duration);
        $session->put('checkout.domain_duration', $duration);
        $session->put('checkout.domain_price', $total['price']);
        $session->put('checkout.domain_tax', $total['tax']);
        $session->put('checkout.domain_price_base', $total['base']);

        return [
            'domain' => $domain,
            'price_per_year' => $pricePerYear,
            'duration' => $duration,
            'is_own_domain' => false,
            'total' => $total,
        ];
    }

    public function saveCustomerDetails(Session $session, array $customer): void
    {
        $session->put('checkout.customer', [
            'name' => $customer['name'],
            'email' => $customer['email'],
            'whatsapp' => $customer['whatsapp'],
            'notes' => $customer['notes'] ?? '',
        ]);
    }

    // ---- Orders ----

    public function create(Template $template, array $checkout): Order
    {
        $customer = $checkout['customer'];
        $isOwnDomain = (bool) ($checkout['is_own_domain'] ?? false);
        $domainPrice = $isOwnDomain ? 0 : (int) ($checkout['domain_price'] ?? config('domain.default_price'));
        $duration = (int) ($checkout['domain_duration'] ?? 1);
        $pricePerYear = $isOwnDomain ? 0 : (int) ($checkout['domain_price_per_year'] ?? round($domainPrice / max(1, $duration)));
        $promo = $checkout['promo'] ?? null;
        $prices = $template->priceBreakdown($domainPrice, 0, $duration);

        $templateDesc = $template->template_desc ?: 'Lisensi Desain UI/UX Eksklusif & Source Code Clean';
        $serverDesc = $template->server_desc ?: 'High Speed NVMe, Dedicated Cloud Resources & Free SSL HTTPS';
        $serviceDesc = $template->service_desc ?: 'Instalasi, Konfigurasi DNS Domain & Garansi Sistem';

        if ($duration > 1) {
            $templateDesc .= " ({$duration} Tahun)";
            $serverDesc .= " ({$duration} Tahun)";
            $serviceDesc .= " ({$duration} Tahun)";
        }

        return Order::create([
            'order_number' => 'ORD-'.date('Ymd').'-'.strtoupper(Str::random(5)),
            'template_id' => $template->id,
            'domain_name' => $checkout['domain_name'],
            'domain_price' => $domainPrice,
            'domain_duration' => $duration,
            'domain_price_per_year' => $pricePerYear,
            'is_own_domain' => $isOwnDomain,
            'template_price' => $prices['templatePrice'],
            'server_price' => $prices['serverPrice'],
            'service_price' => $prices['servicePrice'],
            'template_desc' => $templateDesc,
            'server_desc' => $serverDesc,
            'service_desc' => $serviceDesc,
            'coupon_id' => $promo['coupon_id'] ?? $promo['promo_id'] ?? null,
            'coupon_code' => $promo['code'] ?? null,
            'discount_amount' => (int) ($promo['discount_amount'] ?? 0),
            'is_partner_order' => (bool) ($promo['is_partner'] ?? false),
            'partner_name' => $promo['partner_name'] ?? null,
            'partner_commission_amount' => (int) ($promo['partner_commission_amount'] ?? 0),
            'full_name' => $customer['name'],
            'email' => $customer['email'],
            'whatsapp' => $customer['whatsapp'],
            'status' => OrderStatus::Unpaid,
            'paid_at' => null,
            'xendit_invoice_id' => null,
            'xendit_payment_url' => null,
            'payment_expires_at' => now()->addDay(),
        ]);
    }

    public function list(array $filters = []): array
    {
        $category = $filters['category'] ?? 'all';
        $status = $filters['status'] ?? 'all';
        $period = $filters['period'] ?? 'all';
        $month = (int) ($filters['month'] ?? date('n'));
        $year = (int) ($filters['year'] ?? date('Y'));
        $search = trim((string) ($filters['search'] ?? ''));
        $orders = Order::with(['template', 'client']);
        if ($search !== '') {
            $orders->where(function ($query) use ($search) {
                $query->where('order_number', 'like', "%{$search}%")
                    ->orWhere('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('whatsapp', 'like', "%{$search}%")
                    ->orWhere('domain_name', 'like', "%{$search}%");
            });
        }
        if ($status !== 'all') {
            $orders->where('status', $status);
        }
        if ($category !== 'all') {
            $orders->whereHas('template', fn ($query) => $query->where('category', $category));
        }
        $this->limitToPeriod($orders, $period, $year, $month);
        $periodQuery = Order::query();
        $this->limitToPeriod($periodQuery, $period, $year, $month);
        $paidOrders = (clone $periodQuery)->where('status', OrderStatus::Paid)->get();

        return [
            'orders' => $orders->latest()->paginate(10)->withQueryString(),
            'stats' => [
                'period_omzet' => $paidOrders->sum(fn ($order) => $order->total_price),
                'period_total' => (clone $periodQuery)->count(),
                'period_paid' => $paidOrders->count(),
                'period_unpaid' => (clone $periodQuery)->where('status', OrderStatus::Unpaid)->count(),
                'period_invalid' => (clone $periodQuery)->where('status', OrderStatus::Invalid)->count(),
                'period' => $period,
                'status' => $status,
                'category' => $category,
                'selected_month' => $month,
                'selected_year' => $year,
                'search' => $search,
                'available_years' => $this->availableYears(),
                'available_categories' => Template::distinct('category')->pluck('category')->filter()->values()->all(),
            ],
            'monthsMap' => self::MONTHS,
        ];
    }

    public function logStatusChange(Order $order, string $type, ?string $from, string $to, ?string $notes = null, ?User $actor = null): OrderStatusHistory
    {
        return OrderStatusHistory::create([
            'order_id' => $order->id,
            'user_id' => $actor?->id ?? auth()->id(),
            'type' => $type,
            'status_from' => $from,
            'status_to' => $to,
            'notes' => $notes,
        ]);
    }

    public function updateStatus(Order $order, array $data, ?User $actor = null): void
    {
        $actor = $actor ?? auth()->user();
        $oldOrderStatus = $order->status;
        $oldDomainStatus = $order->domain_status;
        $oldWebsiteStatus = $order->website_status;
        $customNotes = ! empty($data['notes']) ? trim($data['notes']) : null;
        $shouldNotifyClient = array_key_exists('notify_client_whatsapp', $data)
            ? (bool) $data['notify_client_whatsapp']
            : true;

        $newStatus = ! empty($data['order_status'])
            ? OrderStatus::from($data['order_status'])
            : $order->status;
        $order->status = $newStatus;
        if ($newStatus === OrderStatus::Paid) {
            if (! $order->paid_at) {
                $order->paid_at = now();
            }
            $user = $this->users->createClientAccount($order);
        } else {
            $order->paid_at = null;
            if ($newStatus === OrderStatus::Invalid && $order->client_id) {
                $clientUser = $order->client;
                $order->client_id = null;
                if ($clientUser) {
                    $hasOtherPaidOrders = Order::where('client_id', $clientUser->id)
                        ->where('id', '!=', $order->id)
                        ->where('status', OrderStatus::Paid)
                        ->exists();
                    if (! $hasOtherPaidOrders) {
                        $clientUser->delete();
                    }
                }
            }
            $user = $order->client;
        }

        if (! empty($data['domain_final'])) {
            $order->domain_name = trim($data['domain_final']);
            $order->domain_final = trim($data['domain_final']);
        }

        $newDomainStatus = ! empty($data['domain_status'])
            ? DomainStatus::from($data['domain_status'])
            : $order->domain_status;
        $order->domain_status = $newDomainStatus;

        $newWebsiteStatus = ! empty($data['website_status'])
            ? WebsiteStatus::from($data['website_status'])
            : $order->website_status;
        $order->website_status = $newWebsiteStatus;

        $order->save();

        // 1. Catat log perubahan status domain (hanya jika pesanan lunas)
        if ($order->isPaid() && $newDomainStatus !== $oldDomainStatus) {
            $domainTarget = $order->domain_final ?: ($order->domain_name ?: 'Domain');
            $defaultDomainNote = match ($newDomainStatus) {
                DomainStatus::Registered => "Domain resmi ({$domainTarget}) telah berhasil didaftarkan dan terhubung ke server cloud.",
                DomainStatus::PendingRegistration => "Domain sedang diajukan dan dalam proses konfigurasi propagasi DNS registrar.",
            };

            $this->logStatusChange(
                order: $order,
                type: 'domain',
                from: $oldDomainStatus?->value,
                to: $newDomainStatus->value,
                notes: $customNotes ?: $defaultDomainNote,
                actor: $actor,
            );
        }

        // 2. Catat log perubahan status website (hanya jika pesanan lunas)
        if ($order->isPaid() && $newWebsiteStatus !== $oldWebsiteStatus) {
            $defaultWebsiteNote = match ($newWebsiteStatus) {
                WebsiteStatus::Deployed => "Pengerjaan website telah rampung 100%. Website sudah live dan dapat diakses publik.",
                WebsiteStatus::InProgress => "Tim developer sedang menyesuaikan source code, tata letak, dan konten website.",
                WebsiteStatus::Maintenance => "Website sedang dalam pemeliharaan berkala atau pembaruan konfigurasi server.",
            };

            $this->logStatusChange(
                order: $order,
                type: 'website',
                from: $oldWebsiteStatus?->value,
                to: $newWebsiteStatus->value,
                notes: $customNotes ?: $defaultWebsiteNote,
                actor: $actor,
            );
        }

        // 3. Catat log perubahan status pesanan
        if ($newStatus !== $oldOrderStatus) {
            $defaultOrderNote = match ($newStatus) {
                OrderStatus::Paid => 'Pembayaran pesanan telah diverifikasi oleh tim admin.',
                OrderStatus::Unpaid => 'Status pesanan diubah menjadi belum dibayar.',
                OrderStatus::Invalid => 'Pesanan dibatalkan atau kedaluwarsa.',
            };

            $this->logStatusChange(
                order: $order,
                type: 'order',
                from: $oldOrderStatus?->value,
                to: $newStatus->value,
                notes: $customNotes ?: $defaultOrderNote,
                actor: $actor,
            );
        }

        // 4. Jika status tidak berubah tapi ada catatan progres baru yang diinput (hanya jika pesanan lunas)
        if ($order->isPaid() && $customNotes && $newDomainStatus === $oldDomainStatus && $newWebsiteStatus === $oldWebsiteStatus && $newStatus === $oldOrderStatus) {
            $lastHistory = $order->statusHistories()->first();
            if (! $lastHistory || $lastHistory->notes !== $customNotes) {
                $this->logStatusChange(
                    order: $order,
                    type: 'general',
                    from: null,
                    to: $newWebsiteStatus?->value ?? 'update',
                    notes: $customNotes,
                    actor: $actor,
                );
            }
        }

        // 5. Broadcast WhatsApp ke Klien ketika status Domain resmi AKTIF (registered)
        if ($order->isPaid() && $shouldNotifyClient && $newDomainStatus === DomainStatus::Registered && $oldDomainStatus !== DomainStatus::Registered) {
            try {
                $result = $this->whatsapp->sendDomainReady($order);
                if (! empty($result['status'])) {
                    $order->update(['domain_wa_sent_at' => now()]);
                }
            } catch (\Throwable $e) {
                Log::warning("Gagal mengirim WhatsApp domain ready untuk order {$order->order_number}: ".$e->getMessage());
            }
        }

        // 6. Broadcast WhatsApp ke Klien ketika status Website resmi LIVE (deployed)
        if ($order->isPaid() && $shouldNotifyClient && $newWebsiteStatus === WebsiteStatus::Deployed && $oldWebsiteStatus !== WebsiteStatus::Deployed) {
            try {
                $result = $this->whatsapp->sendWebsiteReady($order);
                if (! empty($result['status'])) {
                    $order->update(['website_wa_sent_at' => now()]);
                }
            } catch (\Throwable $e) {
                Log::warning("Gagal mengirim WhatsApp website ready untuk order {$order->order_number}: ".$e->getMessage());
            }
        }

        // 7. Broadcast WhatsApp ke Admin ketika terdapat pesanan baru yang LUNAS
        if ($newStatus === OrderStatus::Paid && $oldOrderStatus !== OrderStatus::Paid && empty($order->admin_paid_wa_sent_at)) {
            try {
                $result = $this->whatsapp->sendAdminOrderPaid($order);
                if (! empty($result['status'])) {
                    $order->update(['admin_paid_wa_sent_at' => now()]);
                }
            } catch (\Throwable $e) {
                Log::warning("Gagal mengirim WhatsApp admin pesanan lunas untuk order {$order->order_number}: ".$e->getMessage());
            }
        }
    }

    public function ensureExpiry(Order $order): void
    {
        if (! $order->payment_expires_at) {
            $order->update(['payment_expires_at' => $order->created_at ? $order->created_at->addDay() : now()->addDay()]);
        }
    }

    public function markPaid(Order $order): void
    {
        $order->update(['status' => OrderStatus::Paid, 'paid_at' => now()]);
    }

    public function markInvalid(Order $order): void
    {
        $order->update(['status' => OrderStatus::Invalid]);
    }

    // ---- Dashboards ----

    public function dashboardAdmin(User $user): array
    {
        return $this->clientPortal($user) + ['adminStats' => $this->adminStats(), 'isMarketing' => false];
    }

    public function dashboardMarketing(User $user): array
    {
        $data = $this->clientPortal($user);
        $data['isAdmin'] = false;
        $data['isMarketing'] = true;
        $data['marketingStats'] = $this->marketingStats();

        return $data;
    }

    public function dashboardClient(User $user): array
    {
        return $this->clientPortal($user) + ['adminStats' => null, 'isMarketing' => false];
    }

    public function clientOrder(User $user): array
    {
        return $this->clientPortal($user, fallbackToCreatedAt: true);
    }

    public function clientPortal(User $user, bool $fallbackToCreatedAt = false): array
    {
        $user->loadMissing('orders.template');
        $order = $user->orders()->latest('paid_at')->latest('id')->first();
        if ($order) {
            $order->loadMissing('statusHistories.user');
        }
        $template = $order?->template;
        $isAdmin = $user->isAdmin();
        $nameParts = explode(' ', trim($user->name));
        $prices = Template::breakdown(
            $order?->template_price ?? $template?->template_price ?? Template::DEFAULT_TEMPLATE_PRICE,
            $order?->server_price ?? $template?->server_price ?? Template::DEFAULT_SERVER_PRICE,
            $order?->service_price ?? $template?->service_price ?? Template::DEFAULT_SERVICE_PRICE,
            $order?->domain_price ?? config('domain.default_price'),
            (int) ($order?->discount_amount ?? 0),
        );
        $paidAt = $order?->paid_at ?? ($fallbackToCreatedAt ? ($order?->created_at ?? now()) : now());

        $histories = $order?->statusHistories ?? collect();
        $domainHistory = $histories->first(fn ($h) => $h->type === 'domain' && $h->status_to === DomainStatus::Registered->value);
        $websiteProgressHistory = $histories->first(fn ($h) => $h->type === 'website' && $h->status_to === WebsiteStatus::InProgress->value);
        $websiteLiveHistory = $histories->first(fn ($h) => $h->type === 'website' && $h->status_to === WebsiteStatus::Deployed->value);

        $domainRegisteredAt = $domainHistory?->created_at ?? ($order?->domain_status === DomainStatus::Registered ? ($order->updated_at ?? $order->paid_at) : null);
        $websiteProgressAt = $websiteProgressHistory?->created_at ?? (in_array($order?->website_status, [WebsiteStatus::InProgress, WebsiteStatus::Deployed], true) ? ($order->paid_at ?? $order->created_at) : null);
        $websiteLiveAt = $websiteLiveHistory?->created_at ?? ($order?->website_status === WebsiteStatus::Deployed ? ($order->updated_at ?? now()) : null);

        $domainName = $order?->domain_final ?: ($order?->domain_name ?: ($isAdmin ? 'admin.bidtech.id' : 'bisnis.com'));
        $domainUrl = str_starts_with($domainName, 'http://') || str_starts_with($domainName, 'https://') ? $domainName : 'https://' . $domainName;

        $orderDuration = (int) ($order?->domain_duration ?: 1);

        return [
            'user' => $user,
            'order' => $order,
            'template' => $template,
            'statusHistories' => $histories,
            'isAdmin' => $isAdmin,
            'firstName' => $nameParts[0] ?? ($isAdmin ? 'Admin' : 'Klien'),
            'initials' => $this->initials($nameParts) ?: ($isAdmin ? 'AD' : 'BK'),
            'domainName' => $domainName,
            'domainUrl' => $domainUrl,
            'templatePrice' => $prices['templatePrice'],
            'serverPrice' => $prices['serverPrice'],
            'servicePrice' => $prices['servicePrice'],
            'domainPrice' => $prices['domainPrice'],
            'discountAmount' => $prices['discountAmount'],
            'totalPaid' => $order ? $order->total_price : $prices['totalPrice'],
            'paidAtFormatted' => $paidAt->locale('id')->translatedFormat('j M Y, H:i').' WIB',
            'paidDateShort' => $paidAt->locale('id')->translatedFormat('j M Y'),
            'domainExpiryDate' => $paidAt->copy()->addYears($orderDuration)->locale('id')->translatedFormat('j M Y'),
            'domainRegisteredAtFormatted' => $domainRegisteredAt?->locale('id')->translatedFormat('j M Y, H:i').' WIB',
            'websiteProgressAtFormatted' => $websiteProgressAt?->locale('id')->translatedFormat('j M Y, H:i').' WIB',
            'websiteLiveAtFormatted' => $websiteLiveAt?->locale('id')->translatedFormat('j M Y, H:i').' WIB',
            'orderNumber' => $order?->order_number ?? ($isAdmin ? 'PORTAL-ADMIN' : '#BT-'.date('Ymd').'-001'),
            'domainStatus' => $order?->domain_status?->value ?? 'pending_registration',
            'websiteStatus' => $order?->website_status?->value ?? 'in_progress',
            'isDomainRegistered' => $order?->domain_status === DomainStatus::Registered,
            'isWebsiteLive' => $order?->website_status === WebsiteStatus::Deployed,
            'isWebsiteInProgress' => $order?->website_status === WebsiteStatus::InProgress,
            'isWebsiteMaintenance' => $order?->website_status === WebsiteStatus::Maintenance,
        ];
    }

    private function limitToPeriod(Builder $query, string $period, int $year, int $month): void
    {
        if ($period === 'monthly') {
            $query->whereYear('created_at', $year)->whereMonth('created_at', $month);
        } elseif ($period === 'yearly') {
            $query->whereYear('created_at', $year);
        }
    }

    private function availableYears(): array
    {
        $years = Order::query()->pluck('created_at')->filter()
            ->map(fn ($date) => (int) $date->format('Y'))
            ->unique()->sortDesc()->values()->all();

        return $years ?: [(int) date('Y')];
    }

    private function initials(array $nameParts): string
    {
        $initials = '';
        foreach (array_slice($nameParts, 0, 2) as $part) {
            if (! empty($part)) {
                $initials .= strtoupper(substr($part, 0, 1));
            }
        }

        return $initials;
    }

    private function adminStats(): array
    {
        $paidOrders = Order::where('status', OrderStatus::Paid)->get();
        $topTemplates = Template::withCount(['orders as sales_count' => function ($query) {
            $query->where('status', OrderStatus::Paid);
        }])->orderBy('sales_count', 'desc')->take(5)->get();

        return [
            'total_users' => User::where('role', Role::Klien)->count(),
            'total_orders' => Order::count(),
            'paid_orders' => $paidOrders->count(),
            'unpaid_orders' => Order::where('status', OrderStatus::Unpaid)->count(),
            'invalid_orders' => Order::where('status', OrderStatus::Invalid)->count(),
            'total_omzet' => $paidOrders->sum(fn ($order) => $order->total_price),
            'total_templates' => Template::count(),
            'active_templates' => Template::where('is_active', true)->count(),
            'total_views' => (int) Template::sum('views'),
            'total_promos' => Coupon::count(),
            'active_promos' => Coupon::where('is_active', true)->count(),
            'top_templates' => $topTemplates,
            'recent_orders' => Order::with(['template', 'client'])->latest()->take(5)->get(),
        ];
    }

    private function marketingStats(): array
    {
        $paidOrders = Order::where('status', OrderStatus::Paid)->get();
        $unpaidOrders = Order::where('status', OrderStatus::Unpaid)->get();
        $thisMonth = now()->startOfMonth();

        $topTemplates = Template::withCount(['orders as sales_count' => function ($query) {
            $query->where('status', OrderStatus::Paid);
        }])->orderBy('sales_count', 'desc')->take(5)->get();

        return [
            'total_nasabah' => User::where('role', Role::Klien)->count(),
            'new_nasabah_month' => User::where('role', Role::Klien)->where('created_at', '>=', $thisMonth)->count(),
            'total_omzet' => $paidOrders->sum(fn ($order) => $order->total_price),
            'paid_orders' => $paidOrders->count(),
            'unpaid_orders' => $unpaidOrders->count(),
            'invalid_orders' => Order::where('status', OrderStatus::Invalid)->count(),
            'active_promos' => Coupon::where('is_active', true)->count(),
            'promos_used_count' => Order::whereNotNull('coupon_id')->count(),
            'top_templates' => $topTemplates,
            'recent_leads' => Order::with(['template', 'client'])->latest()->take(6)->get(),
        ];
    }
}
