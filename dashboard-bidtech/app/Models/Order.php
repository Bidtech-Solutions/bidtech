<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Enums\DomainStatus;
use App\Enums\WebsiteStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    public const CLIENT_EMAIL_DOMAIN = 'bidtech.co.id';

    protected $fillable = [
        'order_number',
        'template_id',
        'client_id',
        'domain_name',
        'domain_price',
        'domain_duration',
        'domain_price_per_year',
        'is_own_domain',

        // Snapshot Rincian Harga
        'template_price',
        'server_price',
        'service_price',
        'template_desc',
        'server_desc',
        'service_desc',

        // Snapshot Promo & Diskon
        'coupon_id',
        'coupon_code',
        'discount_amount',

        // Snapshot Mitra
        'is_partner_order',
        'partner_name',
        'partner_commission_amount',
        'commission_paid_out_at',
        'domain_status',
        'domain_final',
        'website_status',

        'full_name',
        'email',
        'whatsapp',
        'xendit_invoice_id',
        'xendit_payment_url',
        'status',
        'payment_expires_at',
        'paid_at',
        'paid_email_sent_at',
        'domain_wa_sent_at',
        'website_wa_sent_at',
        'admin_paid_wa_sent_at',
    ];

    protected function casts(): array
    {
        return [
            'domain_price'              => 'integer',
            'domain_duration'           => 'integer',
            'domain_price_per_year'     => 'integer',
            'is_own_domain'             => 'boolean',
            'template_price'            => 'integer',
            'server_price'              => 'integer',
            'service_price'             => 'integer',
            'discount_amount'           => 'integer',
            'is_partner_order'          => 'boolean',
            'partner_commission_amount' => 'integer',
            'commission_paid_out_at'     => 'datetime',
            'domain_status'              => DomainStatus::class,
            'website_status'             => WebsiteStatus::class,
            'status'                    => OrderStatus::class,
            'payment_expires_at'        => 'datetime',
            'paid_at'                   => 'datetime',
            'paid_email_sent_at'        => 'datetime',
            'domain_wa_sent_at'         => 'datetime',
            'website_wa_sent_at'        => 'datetime',
            'admin_paid_wa_sent_at'     => 'datetime',
        ];
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function statusHistories(): HasMany
    {
        return $this->hasMany(OrderStatusHistory::class)->latest();
    }

    public function isPaid(): bool
    {
        return $this->status === OrderStatus::Paid;
    }

    public function isExpired(): bool
    {
        return $this->status === OrderStatus::Invalid 
            || ($this->status === OrderStatus::Unpaid && $this->payment_expires_at && now()->greaterThan($this->payment_expires_at));
    }

    /**
     * Rincian harga dari snapshot di order ini; komponen yang kosong jatuh ke harga template
     * (`$fallbackTemplate`, atau relasi template order), lalu ke harga bawaan.
     *
     * @return array{templatePrice: int, serverPrice: int, servicePrice: int, domainPrice: int, discountAmount: int,
     *     packageTotal: int, subtotal: int, totalPrice: int}
     */
    public function priceBreakdown(?Template $fallbackTemplate = null): array
    {
        $template = $fallbackTemplate ?? $this->template;

        return Template::breakdown(
            (int) ($this->template_price ?? $template?->template_price ?? Template::DEFAULT_TEMPLATE_PRICE),
            (int) ($this->server_price ?? $template?->server_price ?? Template::DEFAULT_SERVER_PRICE),
            (int) ($this->service_price ?? $template?->service_price ?? Template::DEFAULT_SERVICE_PRICE),
            (int) $this->domain_price,
            (int) ($this->discount_amount ?? 0),
        );
    }

    /**
     * Subtotal kotor sebelum diskon (Template + Server + Layanan + Domain)
     */
    public function getSubtotalAttribute(): int
    {
        return $this->priceBreakdown()['subtotal'];
    }

    /**
     * Total tagihan bersih setelah dipotong diskon kode promo (digunakan di Fonnte & Invoice)
     */
    public function getTotalPriceAttribute(): int
    {
        return $this->priceBreakdown()['totalPrice'];
    }

    /**
     * Bagian depan email akun klien: nama domain sebelum titik pertama, hanya huruf kecil/angka/strip
     * (sat.org.id -> "sat"). Kosong setelah dibersihkan -> "proyek-xxxx".
     */
    public function clientEmailName(): string
    {
        $domain = strtolower(trim((string) $this->domain_name));
        $name = preg_replace('/[^a-z0-9\-]/', '', explode('.', $domain)[0] ?? 'proyek');

        return $name !== '' ? $name : 'proyek-' . strtolower(Str::random(4));
    }

    /**
     * Email akun klien: {nama-domain}@bidtech.co.id. Email di order hanya untuk mengirim invoice;
     * login memakai email ini.
     */
    public function clientEmail(?string $name = null): string
    {
        return ($name ?? $this->clientEmailName()) . '@' . self::CLIENT_EMAIL_DOMAIN;
    }

    /**
     * Varian bila email dasar sudah dipakai order lain: {nama}.{nomor-order}@bidtech.co.id
     */
    public function clientEmailWithOrderNumber(string $name): string
    {
        $orderPart = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $this->order_number));

        return $this->clientEmail("{$name}.{$orderPart}");
    }
}
