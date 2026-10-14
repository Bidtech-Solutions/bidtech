<?php

namespace Tests\Feature\Checkout;

use App\Enums\OrderStatus;
use App\Mail\InvoiceUnpaidMail;
use App\Mail\PaymentSuccessAndAccountMail;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

/**
 * Test karakterisasi alur checkout: mengunci perilaku saat ini agar refactor aman.
 */
class CheckoutFlowTest extends TestCase
{
    use RefreshDatabase;

    private Template $template;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.xendit.key' => 'test-xendit-key',
            'services.fonnte.token' => null,
            'app.frontend_url' => 'http://frontend.test',
        ]);

        Mail::fake();

        $this->template = Template::create([
            'slug' => 'template-uji',
            'name' => 'Template Uji',
            'category' => 'Umum',
            'price' => 2000000,
            'template_price' => 1000000,
            'server_price' => 500000,
            'service_price' => 500000,
        ]);
    }

    private function fakeExternalHttp(array $xenditGet = ['status' => 'PENDING']): void
    {
        Http::fake([
            'frontend.test/*' => Http::response(['data' => []], 200),
            'api.xendit.co/v2/invoices/inv_1' => Http::response($xenditGet, 200),
            'api.xendit.co/*' => Http::response([
                'id' => 'inv_1',
                'invoice_url' => 'https://pay.test/inv_1',
                'expiry_date' => now()->addDay()->toIso8601String(),
            ], 200),
            '*' => Http::response([], 500),
        ]);
    }

    private function checkoutSession(array $extra = []): array
    {
        return ['checkout' => array_merge([
            'template_id' => 1,
            'domain_name' => 'tokoku.com',
            'domain_price' => 185000,
            'customer' => [
                'name' => 'Budi',
                'email' => 'budi@example.com',
                'whatsapp' => '08123456789',
                'notes' => '',
            ],
        ], $extra)];
    }

    private function makeOrder(array $overrides = []): Order
    {
        return Order::create(array_merge([
            'order_number' => 'ORD-TEST-00001',
            'template_id' => 1,
            'domain_name' => 'tokoku.com',
            'domain_price' => 185000,
            'domain_duration' => 1,
            'template_price' => 1000000,
            'server_price' => 500000,
            'service_price' => 500000,
            'discount_amount' => 0,
            'full_name' => 'Budi',
            'email' => 'budi@example.com',
            'whatsapp' => '08123456789',
            'status' => OrderStatus::Unpaid,
            'payment_expires_at' => now()->addDay(),
        ], $overrides));
    }

    public function test_domain_search_api_rejects_empty_query_with_cors_headers(): void
    {
        $response = $this->getJson('/api/domain/search');

        $response->assertStatus(400)
            ->assertJson(['status' => 'error', 'domains' => []])
            ->assertHeader('Access-Control-Allow-Origin', '*');
    }

    public function test_template_page_stores_domain_and_derives_tax_in_session(): void
    {
        $this->fakeExternalHttp();

        $this->get('/checkout/pilih-template?domain=tokoku.com&price=150000')->assertOk();

        $this->assertSame('tokoku.com', session('checkout.domain_name'));
        $this->assertSame(150000, session('checkout.domain_price'));
        $this->assertSame(135135, session('checkout.domain_price_base'));
        $this->assertSame(14865, session('checkout.domain_tax'));
        $this->assertSame('domain-first', session('checkout.flow'));
    }

    public function test_selecting_template_without_domain_redirects_back_with_error(): void
    {
        $this->fakeExternalHttp();

        $this->post(route('checkout.pilih-template.select', $this->template))
            ->assertRedirect(route('checkout.pilih-template'))
            ->assertSessionHas('error');
    }

    public function test_selecting_template_with_domain_continues_to_customer_details(): void
    {
        $this->fakeExternalHttp();

        $this->withSession($this->checkoutSession(['template_id' => null]))
            ->post(route('checkout.pilih-template.select', $this->template))
            ->assertRedirect(route('checkout.data-diri', $this->template));

        $this->assertSame(1, session('checkout.template_id'));
    }

    public function test_switching_template_keeps_chosen_domain_but_drops_other_data(): void
    {
        $this->fakeExternalHttp();
        Template::create(['slug' => 'lain', 'name' => 'Lain', 'category' => 'Umum', 'price' => 1]);

        $this->withSession($this->checkoutSession(['flow' => 'domain-first']))
            ->post(route('checkout.pilih-template.select', 2))
            ->assertRedirect(route('checkout.data-diri', 2));

        $this->assertSame('tokoku.com', session('checkout.domain_name'));
        $this->assertSame(2, session('checkout.template_id'));
        $this->assertNull(session('checkout.customer'));
    }

    public function test_update_domain_ajax_uses_default_price_by_extension_and_splits_tax(): void
    {
        $response = $this->postJson(route('checkout.pilih-template.domain.update'), [
            'domain' => 'namaku.zzz',
        ]);

        $response->assertOk()->assertJson([
            'status' => 'success',
            'domain_name' => 'namaku.zzz',
            'domain_price' => 185000,
        ]);
        $this->assertSame(166667, session('checkout.domain_price_base'));
        $this->assertSame(18333, session('checkout.domain_tax'));
    }

    public function test_choose_domain_supports_custom_duration_and_scales_server_and_domain_price(): void
    {
        // Pilihan 3 Tahun
        $response3 = $this->postJson(route('checkout.domain.select', $this->template), [
            'domain' => 'tokoku.com',
            'price' => 200000,
            'duration' => 3,
        ]);

        $response3->assertOk()->assertJson([
            'domain_duration' => 3,
            'domain_price' => 600000,
            'server_price' => 1500000,
            'total_price' => 1000000 + 1500000 + 500000 + 600000,
        ]);
        $this->assertSame('template-first', session('checkout.flow'));
        $this->assertSame(3, session('checkout.domain_duration'));

        // Pilihan 1 Tahun
        $response1 = $this->postJson(route('checkout.domain.select', $this->template), [
            'domain' => 'tokoku.com',
            'price' => 200000,
            'duration' => 1,
        ]);

        $response1->assertOk()->assertJson([
            'domain_duration' => 1,
            'domain_price' => 200000,
            'server_price' => 500000,
            'total_price' => 1000000 + 500000 + 500000 + 200000,
        ]);
        $this->assertSame(1, session('checkout.domain_duration'));
    }

    public function test_duration_update_requires_a_chosen_domain(): void
    {
        $this->postJson(route('checkout.domain.duration', $this->template), ['duration' => 2])
            ->assertStatus(400)
            ->assertJson(['status' => 'error']);
    }

    public function test_update_duration_scales_both_server_and_domain(): void
    {
        // Pilih domain awal
        $this->postJson(route('checkout.domain.select', $this->template), [
            'domain' => 'tokoku.com',
            'price' => 185000,
            'duration' => 1,
        ])->assertOk();

        // Update ke 2 tahun
        $response = $this->postJson(route('checkout.domain.duration', $this->template), [
            'duration' => 2,
        ]);

        $response->assertOk()->assertJson([
            'domain_duration' => 2,
            'domain_price' => 370000,
            'server_price' => 1000000,
            'total_price' => 1000000 + 1000000 + 500000 + 370000, // 2.870.000
        ]);
        $this->assertSame(2, session('checkout.domain_duration'));
    }

    public function test_own_domain_scales_server_duration_with_zero_domain_fee(): void
    {
        $response = $this->postJson(route('checkout.domain.own', $this->template), [
            'domain' => 'bisnissaya.com',
            'duration' => 3,
        ]);

        $response->assertOk()->assertJson([
            'is_own_domain' => true,
            'domain_duration' => 3,
            'domain_price' => 0,
            'server_price' => 1500000,
            'total_price' => 1000000 + 1500000 + 500000 + 0, // 3.000.000
        ]);
        $this->assertSame(3, session('checkout.domain_duration'));
        $this->assertTrue(session('checkout.is_own_domain'));
    }

    public function test_customer_details_page_redirects_when_no_domain(): void
    {
        $this->get(route('checkout.data-diri', $this->template))
            ->assertRedirect(route('checkout.domain', $this->template));
    }

    public function test_customer_details_are_validated_and_stored(): void
    {
        $this->post(route('checkout.data-diri.store', $this->template), [])
            ->assertSessionHasErrors(['name', 'email', 'whatsapp']);

        $this->post(route('checkout.data-diri.store', $this->template), [
            'name' => 'Budi', 'email' => 'budi@example.com', 'whatsapp' => '0812',
        ])->assertRedirect(route('checkout.ringkasan', $this->template));

        $this->assertSame('budi@example.com', session('checkout.customer.email'));
        $this->assertSame('', session('checkout.customer.notes'));
    }

    public function test_summary_redirects_until_domain_and_customer_are_present(): void
    {
        $this->get(route('checkout.ringkasan', $this->template))
            ->assertRedirect(route('checkout.domain', $this->template));

        $this->withSession(['checkout' => ['domain_name' => 'tokoku.com']])
            ->get(route('checkout.ringkasan', $this->template))
            ->assertRedirect(route('checkout.data-diri', $this->template));
    }

    public function test_summary_computes_subtotal_and_total(): void
    {
        $this->withSession($this->checkoutSession())
            ->get(route('checkout.ringkasan', $this->template))
            ->assertOk()
            ->assertViewHas('subtotal', 2185000)
            ->assertViewHas('discountAmount', 0)
            ->assertViewHas('totalPrice', 2185000);
    }

    public function test_apply_promo_rejects_unknown_code(): void
    {
        $this->withSession($this->checkoutSession())
            ->postJson(route('checkout.promo.apply', $this->template), ['code' => 'TIDAKADA'])
            ->assertStatus(422)
            ->assertJson(['status' => 'error']);
    }

    public function test_remove_promo_clears_session_and_returns_full_total(): void
    {
        $this->withSession($this->checkoutSession(['promo' => ['code' => 'X']]))
            ->postJson(route('checkout.promo.remove', $this->template))
            ->assertOk()
            ->assertJson(['status' => 'success', 'total_price' => 2185000]);

        $this->assertNull(session('checkout.promo'));
    }

    public function test_pay_redirect_without_session_goes_back_to_domain_step(): void
    {
        $this->get(route('checkout.bayar.redirect', $this->template))
            ->assertRedirect(route('checkout.domain', $this->template))
            ->assertSessionHas('error');
    }

    public function test_pay_redirect_creates_order_invoice_and_sends_notifications(): void
    {
        $this->fakeExternalHttp();

        $response = $this->withSession($this->checkoutSession())
            ->get(route('checkout.bayar.redirect', $this->template));

        $order = Order::firstOrFail();

        $response->assertRedirect(route('checkout.bayar', [
            'template' => $this->template->id,
            'order' => $order->order_number,
        ]));

        $this->assertMatchesRegularExpression('/^ORD-\d{8}-[A-Z0-9]{5}$/', $order->order_number);
        $this->assertSame(OrderStatus::Unpaid, $order->status);
        $this->assertSame('tokoku.com', $order->domain_name);
        $this->assertSame(185000, $order->domain_price);
        $this->assertSame(1000000, $order->template_price);
        $this->assertSame('budi@example.com', $order->email);
        $this->assertSame('inv_1', $order->xendit_invoice_id);
        $this->assertSame('https://pay.test/inv_1', $order->xendit_payment_url);
        $this->assertSame(2185000, $order->total_price);

        Mail::assertSent(InvoiceUnpaidMail::class);
        $this->assertSame($order->order_number, session('checkout.order_number'));
    }

    public function test_pay_redirect_reuses_existing_order_from_session(): void
    {
        $order = $this->makeOrder();

        $this->withSession($this->checkoutSession(['order_number' => $order->order_number]))
            ->get(route('checkout.bayar.redirect', $this->template))
            ->assertRedirect(route('checkout.bayar', [
                'template' => 1,
                'order' => $order->order_number,
            ]));

        $this->assertSame(1, Order::count());
    }

    public function test_pay_redirect_falls_back_to_local_url_when_xendit_fails(): void
    {
        Http::fake(['*' => Http::response([], 500)]);

        $this->withSession($this->checkoutSession())
            ->get(route('checkout.bayar.redirect', $this->template));

        $order = Order::firstOrFail();
        $this->assertNull($order->xendit_invoice_id);
        $this->assertSame(
            route('checkout.bayar', ['template' => 1, 'order' => $order->order_number]),
            $order->xendit_payment_url
        );
    }

    public function test_direct_and_legacy_invoice_urls_redirect_to_payment_page(): void
    {
        $order = $this->makeOrder();
        $target = route('checkout.bayar', ['template' => 1, 'order' => $order->order_number]);

        $this->get(route('checkout.bayar.direct', $order))->assertRedirect($target);
        $this->get(route('checkout.invoice', $order))->assertRedirect($target);
        $this->post(route('checkout.bayar.process', $this->template))
            ->assertRedirect(route('checkout.bayar.redirect', $this->template));
    }

    public function test_pdf_invoice_download_renders_html(): void
    {
        $order = $this->makeOrder();

        $this->get(route('checkout.invoice.download', $order))
            ->assertOk()
            ->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_payment_page_shows_unpaid_order_with_price_breakdown(): void
    {
        $this->fakeExternalHttp();
        $order = $this->makeOrder(['discount_amount' => 100000]);

        $this->get(route('checkout.bayar', ['template' => 1, 'order' => $order->order_number]))
            ->assertOk()
            ->assertViewHas('subtotal', 2185000)
            ->assertViewHas('totalPrice', 2085000);
    }

    public function test_payment_page_marks_overdue_order_invalid(): void
    {
        $this->fakeExternalHttp();
        $order = $this->makeOrder(['payment_expires_at' => now()->subHour()]);

        $this->get(route('checkout.bayar', ['template' => 1, 'order' => $order->order_number]))->assertOk();

        $this->assertSame(OrderStatus::Invalid, $order->fresh()->status);
    }

    public function test_status_check_marks_paid_creates_account_and_sends_email(): void
    {
        $this->fakeExternalHttp(['status' => 'PAID']);
        $order = $this->makeOrder(['xendit_invoice_id' => 'inv_1']);

        $this->getJson(route('checkout.status.check', ['template' => 1, 'order' => $order->order_number]))
            ->assertOk()
            ->assertJson(['status' => 'paid', 'is_paid' => true, 'is_expired' => false]);

        $order->refresh();
        $this->assertSame(OrderStatus::Paid, $order->status);
        $this->assertNotNull($order->paid_at);
        $this->assertNotNull($order->paid_email_sent_at);

        $user = $order->client;
        $this->assertNotNull($user);
        $this->assertSame('tokoku@bidtech.co.id', $user->email);
        $this->assertSame('tokoku.com', $order->domain_final);
        $this->assertAuthenticatedAs($user);
        Mail::assertSent(PaymentSuccessAndAccountMail::class, 1);
    }

    public function test_status_check_marks_order_invalid_when_xendit_reports_expired(): void
    {
        $this->fakeExternalHttp(['status' => 'EXPIRED']);
        $order = $this->makeOrder(['xendit_invoice_id' => 'inv_1']);

        $this->getJson(route('checkout.status.check', ['template' => 1, 'order' => $order->order_number]))
            ->assertOk()
            ->assertJson(['status' => 'invalid', 'is_paid' => false, 'is_expired' => true]);
    }

    public function test_status_check_does_not_resend_email_or_duplicate_account(): void
    {
        $this->fakeExternalHttp(['status' => 'PAID']);
        $order = $this->makeOrder(['xendit_invoice_id' => 'inv_1']);
        $url = route('checkout.status.check', ['template' => 1, 'order' => $order->order_number]);

        $this->getJson($url);
        $this->getJson($url);

        $this->assertSame(1, User::count());
        Mail::assertSent(PaymentSuccessAndAccountMail::class, 1);
    }

    public function test_paid_account_email_gets_order_suffix_when_base_is_taken(): void
    {
        $this->fakeExternalHttp(['status' => 'PAID']);
        $other = $this->makeOrder(['order_number' => 'ORD-OTHER-1', 'status' => OrderStatus::Paid]);
        app(UserService::class)->createClientAccount($other);

        $order = $this->makeOrder(['xendit_invoice_id' => 'inv_1']);
        $this->getJson(route('checkout.status.check', ['template' => 1, 'order' => $order->order_number]));

        $user = $order->fresh()->client;
        $this->assertSame('tokoku.ordtest00001@bidtech.co.id', $user->email);
    }

    public function test_payment_page_of_paid_order_logs_the_client_in(): void
    {
        $this->fakeExternalHttp();
        $order = $this->makeOrder(['status' => OrderStatus::Paid, 'paid_at' => now()]);

        $this->get(route('checkout.bayar', ['template' => 1, 'order' => $order->order_number]))
            ->assertOk();

        $user = $order->fresh()->client;
        $this->assertAuthenticatedAs($user);
        Mail::assertSent(PaymentSuccessAndAccountMail::class, 1);
    }
}
