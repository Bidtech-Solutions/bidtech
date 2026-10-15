<?php

namespace Database\Seeders;

use App\Enums\CommissionType;
use App\Enums\DiscountType;
use App\Enums\Role;
use App\Models\Coupon;
use App\Models\Partner;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CouponSeeder extends Seeder
{
    public function run(): void
    {
        $general = [
            ['code' => 'BIDTECHHEMAT', 'name' => 'Promo Diskon Bidtech Hemat', 'min_order_amount' => 0, 'subtotal_discount_type' => DiscountType::Nominal, 'subtotal_discount_amount' => 200_000, 'usage_limit' => 100],
            ['code' => 'SUPERDEAL', 'name' => 'Super Deal Diskon 25%', 'min_order_amount' => 0, 'subtotal_discount_type' => DiscountType::Percentage, 'subtotal_discount_amount' => 25, 'subtotal_discount_max' => 500_000, 'usage_limit' => 50],
            ['code' => 'FREESETUP', 'name' => 'Gratis Biaya Setup & Deployment Cloud', 'min_order_amount' => 0, 'service_discount_type' => DiscountType::Nominal, 'service_discount_amount' => 500_000, 'usage_limit' => 30],
        ];
        foreach ($general as $coupon) {
            Coupon::updateOrCreate(['code' => $coupon['code']], $coupon + ['user_usage_limit' => 1, 'valid_from' => now()->subDay(), 'valid_until' => now()->addMonths(3), 'is_active' => true]);
        }

        foreach ([
            ['code' => 'MITRABATAM', 'name' => 'Komunitas Tech Batam', 'email' => 'mitra-batam@bidtech.co.id', 'discount_type' => DiscountType::Nominal, 'discount' => 300_000, 'commission_type' => CommissionType::Fixed, 'commission' => 100_000],
            ['code' => 'AGENSIPARTNER', 'name' => 'Agensi Kreatif Nusantara', 'email' => 'agensi-partner@bidtech.co.id', 'discount_type' => DiscountType::Nominal, 'discount' => 500_000, 'commission_type' => CommissionType::Fixed, 'commission' => 200_000],
            ['code' => 'KAMPUSMERDEKA', 'name' => 'Aliansi Kampus Merdeka', 'email' => 'kampus-merdeka@bidtech.co.id', 'discount_type' => DiscountType::Percentage, 'discount' => 20, 'commission_type' => CommissionType::Fixed, 'commission' => 0],
        ] as $data) {
            $user = User::updateOrCreate(['email' => $data['email']], ['name' => $data['name'], 'whatsapp' => '081100000000', 'password' => Hash::make('password123'), 'role' => Role::Mitra]);
            $partner = Partner::updateOrCreate(['user_id' => $user->id], ['type_commission' => $data['commission_type'], 'amount_commission' => $data['commission']]);
            Coupon::updateOrCreate(['code' => $data['code']], ['name' => "Kemitraan {$data['name']}", 'partner_id' => $partner->id, 'min_order_amount' => 0, 'subtotal_discount_type' => $data['discount_type'], 'subtotal_discount_amount' => $data['discount'], 'subtotal_discount_max' => $data['code'] === 'KAMPUSMERDEKA' ? 400_000 : null, 'usage_limit' => 100, 'user_usage_limit' => 1, 'valid_from' => now()->subDay(), 'valid_until' => now()->addYear(), 'is_active' => true]);
        }
    }
}
