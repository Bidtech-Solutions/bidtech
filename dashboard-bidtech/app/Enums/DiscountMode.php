<?php

namespace App\Enums;

enum DiscountMode: string
{
    case SubtotalDomain = 'SUBTOTAL_DOMAIN';
    case SubtotalNonDomain = 'SUBTOTAL_NON_DOMAIN';
    case PerComponent = 'PER_COMPONENT';

    public function label(): string
    {
        return match ($this) {
            self::SubtotalDomain => 'Sub total + Domain',
            self::SubtotalNonDomain => 'Subtotal Non Domain',
            self::PerComponent => 'Per Komponen',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::SubtotalDomain => 'Diskon dihitung dari total seluruh pesanan termasuk biaya registrasi domain.',
            self::SubtotalNonDomain => 'Diskon hanya memotong harga paket website (Template, Hosting, & Setup), harga domain tetap penuh.',
            self::PerComponent => 'Tentukan diskon spesifik untuk masing-masing item (Template, Server, Layanan, atau Domain).',
        };
    }

    public function badgeClasses(): string
    {
        return match ($this) {
            self::SubtotalDomain => 'bg-purple-50 text-purple-700 border-purple-200/60',
            self::SubtotalNonDomain => 'bg-sky-50 text-sky-700 border-sky-200/60',
            self::PerComponent => 'bg-amber-50 text-amber-700 border-amber-200/60',
        };
    }
}
