<?php

namespace Tests\Feature\Checkout;

use App\Enums\CommissionType;
use App\Enums\DiscountMode;
use App\Enums\DiscountType;
use App\Enums\Role;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Partner;
use App\Models\Template;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test karakterisasi aturan kupon lewat endpoint terapkan-promo.
 * Paket template = 1.000.000 + 500.000 + 500.000 = 2.000.000; domain 185.000; subtotal 2.185.000.
 */
class PromoCalculationTest extends TestCase
{
    use RefreshDatabase;

    private Template $template;

    protected function setUp(): void
    {
        parent::setUp();

        $this->template = Template::create([
            'slug' => 'template-uji', 'name' => 'Template Uji', 'category' => 'Umum', 'price' => 2000000,
            'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000,
        ]);
    }

    private function coupon(array $overrides = []): Coupon
    {
        return Coupon::create(array_merge([
            'code' => 'PROMO', 'name' => 'Promo Uji',
            'subtotal_discount_type' => DiscountType::Nominal, 'subtotal_discount_amount' => 100000,
            'is_active' => true, 'usage_limit' => null, 'user_usage_limit' => 1,
        ], $overrides));
    }

    private function partner(CommissionType $type, int $amount, string $name = 'Mitra A'): Partner
    {
        $user = User::factory()->create(['role' => Role::Mitra, 'name' => $name]);

        return Partner::create(['user_id' => $user->id, 'type_commission' => $type, 'amount_commission' => $amount]);
    }

    private function apply(string $code = 'PROMO', ?string $email = null): \Illuminate\Testing\TestResponse
    {
        $payload = ['code' => $code];
        if ($email) {
            $payload['email'] = $email;
        }

        return $this->withSession(['checkout' => ['domain_price' => 185000]])
            ->postJson(route('checkout.promo.apply', $this->template), $payload);
    }

    private function assertDiscount(int $discount, \Illuminate\Testing\TestResponse $response): void
    {
        $response->assertOk()->assertJson([
            'status'          => 'success',
            'discount_amount' => $discount,
            'new_total'       => 2185000 - $discount,
        ]);
    }

    private function existingOrder(Coupon $coupon, string $email = 'lain@example.com'): Order
    {
        return Order::create([
            'order_number' => 'ORD-X-'.$coupon->id.'-'.$email,
            'template_id' => 1, 'domain_name' => 'a.com', 'domain_price' => 1,
            'full_name' => 'A', 'email' => $email, 'whatsapp' => '1', 'status' => 'unpaid',
            'coupon_id' => $coupon->id, 'coupon_code' => $coupon->code, 'discount_amount' => 1,
        ]);
    }

    public function test_empty_code_is_rejected(): void
    {
        $this->apply('')->assertStatus(422)->assertJson(['message' => 'Silakan masukkan kode promo.']);
    }

    public function test_code_is_case_insensitive_and_trimmed(): void
    {
        $this->coupon();

        $this->assertDiscount(100000, $this->apply('  promo '));
    }

    public function test_inactive_promo_is_rejected(): void
    {
        $this->coupon(['is_active' => false]);

        $this->apply()->assertStatus(422)->assertJson(['message' => 'Kode promo ini sedang tidak aktif.']);
    }

    public function test_expired_and_not_yet_started_promos_are_rejected(): void
    {
        $this->coupon(['code' => 'LEWAT', 'valid_until' => now()->subDay()]);
        $this->coupon(['code' => 'BELUM', 'valid_from' => now()->addDay()]);

        $this->apply('LEWAT')->assertStatus(422)->assertJsonFragment(['message' => 'Masa berlaku kode promo ini telah berakhir atau belum dimulai.']);
        $this->apply('BELUM')->assertStatus(422);
    }

    public function test_exhausted_global_quota_is_rejected(): void
    {
        $coupon = $this->coupon(['usage_limit' => 1]);
        $this->existingOrder($coupon);

        $this->apply()->assertStatus(422)->assertJsonFragment(['message' => 'Mohon maaf, kuota penggunaan kode promo ini sudah habis.']);
    }

    public function test_per_email_usage_limit_is_enforced(): void
    {
        $coupon = $this->coupon(['user_usage_limit' => 1]);
        $this->existingOrder($coupon, 'a@example.com');

        $this->apply('PROMO', 'A@Example.com')->assertStatus(422);
        $this->assertDiscount(100000, $this->apply('PROMO', 'b@example.com'));
    }

    public function test_minimum_order_amount_is_enforced(): void
    {
        $this->coupon(['min_order_amount' => 3000000]);

        $this->apply()->assertStatus(422)->assertJsonFragment(['message' => 'Minimal pemesanan untuk menggunakan kode promo ini adalah Rp3.000.000.']);
    }

    public function test_partner_fixed_commission_is_returned(): void
    {
        $partner = $this->partner(CommissionType::Fixed, 5000);
        $this->coupon(['partner_id' => $partner->id]);

        $this->assertDiscount(100000, $this->apply());
        $this->assertSame(5000, session('checkout.promo.partner_commission_amount'));
    }

    public function test_partner_percentage_commission_is_based_on_discounted_package_price_excluding_domain(): void
    {
        $partner = $this->partner(CommissionType::Percentage, 10);
        $this->coupon(['partner_id' => $partner->id]);

        $this->apply()->assertOk();
        // Paket = 2.000.000, diskon = 100.000 -> package_promo_price = 1.900.000.
        // Komisi mitra 10% x 1.900.000 = 190.000 (tidak termasuk domain 185.000).
        $this->assertSame(190000, session('checkout.promo.partner_commission_amount'));
    }

    public function test_partner_percentage_commission_exact_user_scenario(): void
    {
        // Kasus user: Template 1.750.000, diskon 10% (175.000), domain 200.000 (total dibayar klien 1.775.000).
        // Komisi mitra 40% dari 1.575.000 (omset kotor paket website setelah diskon klien) = 630.000.
        $template = Template::create([
            'slug' => 'template-1750k',
            'name' => 'Template Kasus User',
            'category' => 'Bisnis',
            'price' => 1750000,
            'template_price' => 1000000,
            'server_price' => 500000,
            'service_price' => 250000,
        ]);

        $partner = $this->partner(CommissionType::Percentage, 40, 'Mitra Bidtech');
        Coupon::create([
            'code' => 'MITRA40',
            'name' => 'Kupon Mitra 40%',
            'discount_mode' => DiscountMode::SubtotalNonDomain,
            'subtotal_discount_type' => DiscountType::Percentage,
            'subtotal_discount_amount' => 10,
            'is_active' => true,
            'partner_id' => $partner->id,
        ]);

        $response = $this->withSession(['checkout' => ['domain_price' => 200000]])
            ->postJson(route('checkout.promo.apply', $template), ['code' => 'MITRA40']);

        $response->assertOk();
        $this->assertSame(175000, $response->json('discount_amount'));
        $this->assertSame(1775000, $response->json('new_total'));
        $this->assertSame(630000, session('checkout.promo.partner_commission_amount'));
    }

    public function test_percentage_discount_on_subtotal_with_and_without_cap(): void
    {
        $this->coupon(['code' => 'PERSEN', 'subtotal_discount_type' => DiscountType::Percentage, 'subtotal_discount_amount' => 10]);
        $this->coupon(['code' => 'CAP', 'subtotal_discount_type' => DiscountType::Percentage, 'subtotal_discount_amount' => 10, 'subtotal_discount_max' => 150000]);

        $this->assertDiscount(218500, $this->apply('PERSEN'));
        $this->assertDiscount(150000, $this->apply('CAP'));
    }

    public function test_nominal_discount_is_capped_at_the_component_price_instead_of_being_rejected(): void
    {
        $this->coupon(['discount_mode' => DiscountMode::PerComponent, 'template_discount_type' => DiscountType::Nominal, 'template_discount_amount' => 5000000, 'subtotal_discount_type' => null, 'subtotal_discount_amount' => null]);

        $this->assertDiscount(1000000, $this->apply());
    }

    public function test_fixed_discount_sets_the_component_price(): void
    {
        $this->coupon(['discount_mode' => DiscountMode::PerComponent, 'server_discount_type' => DiscountType::Fixed, 'server_discount_amount' => 100000, 'subtotal_discount_type' => null, 'subtotal_discount_amount' => null]);

        $this->assertDiscount(400000, $this->apply());
    }

    public function test_component_scoped_percentage_uses_only_that_component_price(): void
    {
        $this->coupon(['discount_mode' => DiscountMode::PerComponent, 'template_discount_type' => DiscountType::Percentage, 'template_discount_amount' => 50, 'subtotal_discount_type' => null, 'subtotal_discount_amount' => null]);

        $this->assertDiscount(500000, $this->apply());
    }

    public function test_discounts_across_components_are_summed(): void
    {
        $this->coupon([
            'discount_mode' => DiscountMode::PerComponent,
            'subtotal_discount_type' => null, 'subtotal_discount_amount' => null,
            'server_discount_type' => DiscountType::Nominal, 'server_discount_amount' => 100000,
            'domain_discount_type' => DiscountType::Nominal, 'domain_discount_amount' => 50000,
        ]);

        $this->assertDiscount(150000, $this->apply());
    }

    public function test_success_messages_for_general_and_partner_coupons(): void
    {
        $this->coupon();
        $this->assertSame('Kode kupon PROMO berhasil diterapkan! Anda hemat Rp100.000', $this->apply()->json('message'));

        Coupon::query()->delete();
        $partner = $this->partner(CommissionType::Fixed, 0);
        $this->coupon(['partner_id' => $partner->id]);
        $this->assertSame('Kode kupon kemitraan Mitra A berhasil digunakan! Anda hemat Rp100.000', $this->apply()->json('message'));
    }
}
