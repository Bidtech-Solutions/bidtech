<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Template extends Model
{
    public const DEFAULT_TEMPLATE_PRICE = 1000000;
    public const DEFAULT_SERVER_PRICE = 500000;
    public const DEFAULT_SERVICE_PRICE = 500000;

    protected $fillable = [
        'slug',
        'name',
        'category',
        'price',
        'template_price',
        'server_price',
        'service_price',
        'template_desc',
        'server_desc',
        'service_desc',
        'preview',
        'views',
        'demo_url',
        'description',
        'tags',
        'is_active',
    ];

    protected $casts = [
        'price'          => 'integer',
        'template_price' => 'integer',
        'server_price'   => 'integer',
        'service_price'  => 'integer',
        'views'          => 'integer',
        'is_active'      => 'boolean',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Hitung total pesanan lunas untuk template ini (Laku)
     */
    public function getSalesCountAttribute(): int
    {
        if (array_key_exists('sales_count', $this->attributes)) {
            return (int) $this->attributes['sales_count'];
        }
        return (int) $this->orders()->where('status', \App\Enums\OrderStatus::Paid)->count();
    }

    /**
     * Hitung total pendapatan dari pesanan lunas untuk template ini
     */
    public function getTotalSalesRevenueAttribute(): int
    {
        return (int) $this->orders()->where('status', \App\Enums\OrderStatus::Paid)->get()->sum(function ($order) {
            return $order->total_price;
        });
    }

    /**
     * Hitung total harga paket dari rincian komponen harga (fallback ke $price jika komponen bernilai 0/null)
     */
    public function getTotalPackagePriceAttribute(): int
    {
        $breakdownSum = ($this->template_price ?? 0) + ($this->server_price ?? 0) + ($this->service_price ?? 0);
        return $breakdownSum > 0 ? $breakdownSum : ($this->price ?? 2000000);
    }

    /**
     * URL landing page / live demo resmi di website Bidtech
     */
    public function getLandingUrlAttribute(): string
    {
        if (!empty($this->demo_url)) {
            if (str_starts_with($this->demo_url, 'http://') || str_starts_with($this->demo_url, 'https://')) {
                return $this->demo_url;
            }
            $baseUrl = config('app.frontend_url');
            return rtrim($baseUrl, '/') . '/' . ltrim($this->demo_url, '/');
        }

        $baseUrl = config('app.frontend_url');
        $paths = [
            'rentcar-sewa-mobil' => '/demo/automotive',
            'deny-restaurant' => '/demo/restaurant-cafe-2',
            'chefs-table' => '/demo/restaurant-cafe',
            'ironforce' => '/demo/beauty-wellness',
            'yayasan-bakti-nusantara' => '/demo/community-pro',
            'harapan-kita' => '/demo/organization',
            'konterku' => '/demo/e-commerce',
            'denn-house' => '/demo/property',
            'chulla' => '/demo/beauty-wellness-2',
            'smartbelajar' => '/demo/smartbelajar',
            'nivora-academy' => '/demo/nivoraacademy',
            'aliansi-kepemimpinan-indonesia' => '/demo/aliansi-kepemimpinan-indonesia',
            'tehin' => '/demo/tehin',
            'agak-rapi' => '/demo/agak-rapi',
            'pinjammobil' => '/demo/pinjammobil',
            'forcevault' => '/demo/forcevault',
            'elevasi' => '/demo/elevasi',
        ];

        return rtrim($baseUrl, '/') . ($paths[$this->slug] ?? '/template-website');
    }

    /**
     * URL preview gambar template pada object storage S3-compatible (prefix "templates/").
     */
    public function getPreviewUrlAttribute(): string
    {
        if (empty($this->preview)) {
            return 'https://media.bidtech.co.id/bidtech/templates/rentcar.webp';
        }
        if (str_starts_with($this->preview, 'http://') || str_starts_with($this->preview, 'https://')) {
            return $this->preview;
        }

        try {
            $bucket = config('filesystems.disks.s3.bucket');
            $url = config('filesystems.disks.s3.url');

            if (empty($bucket) && empty($url)) {
                return 'https://media.bidtech.co.id/bidtech/templates/rentcar.webp';
            }

            return Storage::disk('s3')->url(ltrim($this->preview, '/'));
        } catch (\Throwable) {
            return 'https://media.bidtech.co.id/bidtech/templates/rentcar.webp';
        }
    }

    /**
     * Array tags hasil pemisahan koma
     */
    public function getTagsListAttribute(): array
    {
        if (empty($this->tags)) {
            return [];
        }
        return array_values(array_filter(array_map('trim', explode(',', $this->tags))));
    }

    /**
     * Increment view counter secara atomic
     */
    public function incrementView(): int
    {
        $this->increment('views');
        return (int) $this->fresh()->views;
    }

    /**
     * Bentuk JSON untuk API publik yang dikonsumsi frontend Next.js.
     *
     * @param  bool  $listing  true untuk item di daftar (memakai teks/tag cadangan); false untuk detail
     */
    public function toPublicArray(bool $listing): array
    {
        $tags = $this->tags_list;

        if ($listing && empty($tags)) {
            $tags = [$this->category, 'Responsive'];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'subcategory' => $this->description ?? $this->template_desc ?? ($listing ? 'Website profesional modern siap pakai' : null),
            'description' => $this->description,
            'image' => $this->preview_url,
            'previewHref' => $this->landing_url,
            'demo_url' => $this->landing_url,
            'tags' => $tags,
            'views' => (int) $this->views,
            'pricing' => [
                'total' => $this->total_package_price,
                'formatted_total' => 'Rp ' . number_format($this->total_package_price, 0, ',', '.'),
                'template_price' => (int) $this->template_price,
                'server_price' => (int) $this->server_price,
                'service_price' => (int) $this->service_price,
                'template_desc' => $this->template_desc,
                'server_desc' => $this->server_desc,
                'service_desc' => $this->service_desc,
            ],
            'is_active' => (bool) $this->is_active,
            'checkout_url' => url('/checkout/' . $this->id . '/domain'),
        ];
    }

    /**
     * Rincian harga pesanan template ini bersama harga domain, dikurangi diskon.
     * Satu-satunya rumus subtotal/total: Order::priceBreakdown() memakai rumus yang sama dari snapshot harganya.
     *
     * @return array{templatePrice: int, serverPrice: int, servicePrice: int, domainPrice: int, discountAmount: int,
     *     packageTotal: int, subtotal: int, totalPrice: int}
     */
    public function priceBreakdown(int $domainPrice, int $discountAmount = 0, int $duration = 1): array
    {
        $duration = max(1, $duration);
        $templatePerYear = (int) ($this->template_price ?? self::DEFAULT_TEMPLATE_PRICE);
        $serverPerYear = (int) ($this->server_price ?? self::DEFAULT_SERVER_PRICE);
        $servicePerYear = (int) ($this->service_price ?? self::DEFAULT_SERVICE_PRICE);

        return static::breakdown(
            $templatePerYear * $duration,
            $serverPerYear * $duration,
            $servicePerYear * $duration,
            $domainPrice,
            $discountAmount,
        );
    }

    /**
     * Rumus harga: paket = template + server + layanan; subtotal = paket + domain; total = subtotal - diskon (min 0).
     * Kunci hasilnya sama dengan variabel yang dibaca view checkout.
     */
    public static function breakdown(int $template, int $server, int $service, int $domain, int $discount = 0): array
    {
        $package = $template + $server + $service;
        $subtotal = $package + $domain;

        return [
            'templatePrice'  => $template,
            'serverPrice'    => $server,
            'servicePrice'   => $service,
            'domainPrice'    => $domain,
            'discountAmount' => $discount,
            'packageTotal'   => $package,
            'subtotal'       => $subtotal,
            'totalPrice'     => max(0, $subtotal - $discount),
        ];
    }
}
