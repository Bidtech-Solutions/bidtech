<?php

namespace Tests\Feature\Admin;

use App\Enums\CommissionType;
use App\Enums\DiscountType;
use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Partner;
use App\Models\Template;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test karakterisasi CRUD kupon, riwayat pemakaian, dan laporan mitra di Admin CMS.
 */
class PromoManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    private static int $orderSeq = 0;

    private static int $partnerSeq = 0;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => Role::Admin]);
        Template::create(['slug' => 't', 'name' => 'T', 'category' => 'Umum', 'price' => 1]);
    }

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'code' => 'hemat50',
            'name' => 'Hemat 50rb',
            'subtotal_discount_type' => 'NOMINAL',
            'subtotal_discount_amount' => '50.000',
        ], $overrides);
    }

    private function coupon(array $overrides = []): Coupon
    {
        return Coupon::create(array_merge([
            'code' => 'ADA', 'name' => 'Promo Ada',
            'subtotal_discount_type' => DiscountType::Nominal, 'subtotal_discount_amount' => 1000,
            'is_active' => true, 'user_usage_limit' => 1,
        ], $overrides));
    }

    private function partner(string $name = 'Mitra Satu', CommissionType $type = CommissionType::Fixed, int $amount = 0): Partner
    {
        $n = ++self::$partnerSeq;
        $user = User::factory()->create(['role' => Role::Mitra, 'name' => $name, 'email' => "mitra{$n}@bidtech.co.id"]);

        return Partner::create(['user_id' => $user->id, 'type_commission' => $type, 'amount_commission' => $amount]);
    }

    private function orderForCoupon(Coupon $coupon, string $email = 'a@example.com', int $discount = 1000, int $commission = 0, OrderStatus $status = OrderStatus::Paid): Order
    {
        return Order::create([
            'order_number' => 'ORD-P-'.(++self::$orderSeq), 'template_id' => 1, 'domain_name' => 'a.com', 'domain_price' => 1,
            'full_name' => 'A', 'email' => $email, 'whatsapp' => '1', 'status' => $status,
            'coupon_id' => $coupon->id, 'coupon_code' => $coupon->code,
            'discount_amount' => $discount, 'partner_commission_amount' => $commission,
            'is_partner_order' => $coupon->partner_id !== null,
        ]);
    }

    public function test_only_admins_can_access(): void
    {
        $client = User::factory()->create();

        $this->get(route('dashboard.promos.index'))->assertRedirect(route('login.view'));
        $this->actingAs($client)->get(route('dashboard.promos.index'))->assertRedirect(route('dashboard'));
    }

    public function test_index_filters_and_shows_stats(): void
    {
        $partner = $this->partner('Mitra Satu');
        $this->coupon(['code' => 'A1', 'partner_id' => $partner->id]);
        $this->coupon(['code' => 'B2', 'is_active' => false, 'valid_until' => now()->subDay()]);

        $all = $this->actingAs($this->admin)->get(route('dashboard.promos.index'))->assertOk()->assertViewIs('pages.kelola-promo');
        $this->assertSame(['total' => 2, 'active' => 1, 'partner' => 1, 'expired' => 1], $all->viewData('stats'));

        $partnerOnly = $this->actingAs($this->admin)->get(route('dashboard.promos.index', ['is_partner' => '1']));
        $this->assertSame(['A1'], $partnerOnly->viewData('promos')->pluck('code')->all());

        $search = $this->actingAs($this->admin)->get(route('dashboard.promos.index', ['search' => 'mitra satu']));
        $this->assertSame(['A1'], $search->viewData('promos')->pluck('code')->all());

        $inactive = $this->actingAs($this->admin)->get(route('dashboard.promos.index', ['is_active' => '0']));
        $this->assertSame(['B2'], $inactive->viewData('promos')->pluck('code')->all());
    }

    public function test_create_and_edit_pages_render(): void
    {
        $promo = $this->coupon();

        $this->actingAs($this->admin)->get(route('dashboard.promos.create'))->assertOk()->assertViewIs('pages.kelola-promo');
        $this->actingAs($this->admin)->get(route('dashboard.promos.edit', $promo))->assertOk()->assertViewIs('pages.kelola-promo');
        $this->actingAs($this->admin)->get(route('dashboard.promos.show', $promo))->assertRedirect(route('dashboard.promos.edit', $promo));
    }

    public function test_store_validates_and_rejects_duplicate_code(): void
    {
        $this->actingAs($this->admin)->post(route('dashboard.promos.store'), [])
            ->assertSessionHasErrors(['code', 'name']);

        $this->coupon(['code' => 'HEMAT50']);
        $this->actingAs($this->admin)->post(route('dashboard.promos.store'), $this->payload(['code' => 'HEMAT50']))
            ->assertSessionHasErrors('code');

        $this->actingAs($this->admin)->post(route('dashboard.promos.store'), $this->payload(['subtotal_discount_type' => 'GRATIS']))
            ->assertSessionHasErrors('subtotal_discount_type');
    }

    public function test_store_strips_thousand_separators_and_defaults_active(): void
    {
        $this->actingAs($this->admin)->post(route('dashboard.promos.store'), $this->payload([
            'subtotal_discount_max' => '1.500.000', 'usage_limit' => 10,
        ]))->assertRedirect(route('dashboard.promos.index'))->assertSessionHas('success');

        $promo = Coupon::where('code', 'HEMAT50')->firstOrFail();
        $this->assertSame(50000, $promo->subtotal_discount_amount);
        $this->assertSame(1500000, $promo->subtotal_discount_max);
        $this->assertSame(10, $promo->usage_limit);
        $this->assertNull($promo->partner_id);
        $this->assertTrue($promo->is_active);
    }

    public function test_store_partner_coupon_and_date_order_validation(): void
    {
        $partner = $this->partner();

        $this->actingAs($this->admin)->post(route('dashboard.promos.store'), $this->payload([
            'partner_id' => $partner->id, 'valid_from' => '2026-10-10', 'valid_until' => '2026-10-01',
        ]))->assertSessionHasErrors('valid_until');

        $this->actingAs($this->admin)->post(route('dashboard.promos.store'), $this->payload([
            'partner_id' => $partner->id,
        ]))->assertSessionHasNoErrors();

        $promo = Coupon::firstOrFail();
        $this->assertSame($partner->id, $promo->partner_id);
    }

    public function test_update_allows_keeping_own_code_and_changes_fields(): void
    {
        $promo = $this->coupon(['code' => 'ADA']);

        $this->actingAs($this->admin)->put(route('dashboard.promos.update', $promo), $this->payload([
            'code' => 'ada', 'name' => 'Nama Baru', 'subtotal_discount_amount' => '75000',
        ]))->assertRedirect(route('dashboard.promos.index'))->assertSessionHas('success');

        $promo->refresh();
        $this->assertSame('ADA', $promo->code);
        $this->assertSame('Nama Baru', $promo->name);
        $this->assertSame(75000, $promo->subtotal_discount_amount);
    }

    public function test_destroy_deletes_unused_promo_but_keeps_used_one(): void
    {
        $unused = $this->coupon(['code' => 'BEBAS']);
        $used = $this->coupon(['code' => 'PAKAI']);
        $this->orderForCoupon($used);

        $this->actingAs($this->admin)->delete(route('dashboard.promos.destroy', $unused))->assertSessionHas('success');
        $this->actingAs($this->admin)->delete(route('dashboard.promos.destroy', $used))->assertSessionHas('warning');

        $this->assertNull(Coupon::where('code', 'BEBAS')->first());
        $this->assertNotNull(Coupon::where('code', 'PAKAI')->first());
    }

    public function test_toggle_active_flips_the_flag(): void
    {
        $promo = $this->coupon(['is_active' => true]);

        $this->actingAs($this->admin)->post(route('dashboard.promos.toggle-active', $promo))->assertSessionHas('success');
        $this->assertFalse($promo->fresh()->is_active);
    }

    public function test_usages_page_totals_discount_and_commission_only_for_paid_orders(): void
    {
        $partner = $this->partner('Mitra Satu', CommissionType::Fixed, 100);
        $promo = $this->coupon(['partner_id' => $partner->id]);
        $this->orderForCoupon($promo, 'a@example.com', 1000, 100, OrderStatus::Paid);
        $this->orderForCoupon($promo, 'b@example.com', 2000, 200, OrderStatus::Unpaid);

        $response = $this->actingAs($this->admin)->get(route('dashboard.promos.usages', $promo))
            ->assertOk()->assertViewIs('pages.riwayat-redeem');

        $this->assertSame(3000, (int) $response->viewData('totalDiscount'));
        $this->assertSame(100, (int) $response->viewData('totalCommission'));
        $this->assertCount(2, $response->viewData('usages'));
    }

    public function test_all_usages_page_filters_and_computes_stats(): void
    {
        $one = $this->coupon(['code' => 'SATU']);
        $two = $this->coupon(['code' => 'DUA']);
        $this->orderForCoupon($one, 'a@example.com', 1000, 0, OrderStatus::Paid);
        $this->orderForCoupon($two, 'a@example.com', 2000, 0, OrderStatus::Paid);
        $this->orderForCoupon($two, 'b@example.com', 3000, 0, OrderStatus::Paid);

        $all = $this->actingAs($this->admin)->get(route('dashboard.promos.all-usages'))
            ->assertOk()->assertViewIs('pages.riwayat-redeem');
        $this->assertSame(3, $all->viewData('stats')['total_redeem']);
        $this->assertSame(6000, (int) $all->viewData('stats')['total_discount']);
        $this->assertSame(2, $all->viewData('stats')['unique_users']);

        $byPromo = $this->actingAs($this->admin)->get(route('dashboard.promos.all-usages', ['promo_id' => $two->id]));
        $this->assertCount(2, $byPromo->viewData('usages'));

        $bySearch = $this->actingAs($this->admin)->get(route('dashboard.promos.all-usages', ['search' => 'satu']));
        $this->assertCount(1, $bySearch->viewData('usages'));
    }

    public function test_partners_report_groups_coupons_by_partner(): void
    {
        $partnerA = $this->partner('Mitra A', CommissionType::Fixed, 0);
        $a1 = $this->coupon(['code' => 'A1', 'partner_id' => $partnerA->id]);
        $a2 = $this->coupon(['code' => 'A2', 'partner_id' => $partnerA->id]);
        $partnerX = $this->partner('Mitra X', CommissionType::Fixed, 0);
        $anon = $this->coupon(['code' => 'X', 'partner_id' => $partnerX->id]);
        $this->coupon(['code' => 'UMUM']);

        $this->orderForCoupon($a1, 'a@example.com', 1000, 100, OrderStatus::Paid);
        $this->orderForCoupon($a2, 'b@example.com', 1000, 250, OrderStatus::Paid);
        $this->orderForCoupon($anon, 'c@example.com', 500, 50, OrderStatus::Paid);

        $response = $this->actingAs($this->admin)->get(route('dashboard.partners.index'))
            ->assertOk()->assertViewIs('pages.kelola-mitra');

        $grouped = $response->viewData('partnersGrouped');
        $this->assertSame(2, $response->viewData('stats')['total_partners']);
        $this->assertSame(3, $response->viewData('stats')['total_promos']);
        $this->assertSame(400, (int) $response->viewData('stats')['total_commission']);

        $mitraA = $grouped->first(fn ($row) => $row['partner']->id === $partnerA->id);
        $this->assertSame(2, $mitraA['coupons']->count());
        $this->assertSame(350, (int) $mitraA['total_commission']);
    }
}
