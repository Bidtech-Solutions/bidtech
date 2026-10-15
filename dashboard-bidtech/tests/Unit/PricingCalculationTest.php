<?php

namespace Tests\Unit;

use App\Enums\DiscountMode;
use App\Enums\DiscountType;
use App\Models\Coupon;
use App\Models\Template;
use PHPUnit\Framework\TestCase;

class PricingCalculationTest extends TestCase
{
    public function test_template_breakdown_multi_year_scales_server_and_sums_correctly(): void
    {
        // 1 Tahun: Template 1.000.000, Server 500.000, Service 500.000, Domain 200.000
        $oneYear = Template::breakdown(1000000, 500000, 500000, 200000, 0);
        $this->assertSame(1000000, $oneYear['templatePrice']);
        $this->assertSame(500000, $oneYear['serverPrice']);
        $this->assertSame(500000, $oneYear['servicePrice']);
        $this->assertSame(200000, $oneYear['domainPrice']);
        $this->assertSame(2000000, $oneYear['packageTotal']);
        $this->assertSame(2200000, $oneYear['subtotal']);
        $this->assertSame(2200000, $oneYear['totalPrice']);

        // 2 Tahun: Template 2.000.000, Server 1.000.000, Service 1.000.000, Domain 400.000
        $twoYear = Template::breakdown(2000000, 1000000, 1000000, 400000, 0);
        $this->assertSame(2000000, $twoYear['templatePrice']);
        $this->assertSame(1000000, $twoYear['serverPrice']);
        $this->assertSame(1000000, $twoYear['servicePrice']);
        $this->assertSame(400000, $twoYear['domainPrice']);
        $this->assertSame(4000000, $twoYear['packageTotal']);
        $this->assertSame(4400000, $twoYear['subtotal']);
        $this->assertSame(4400000, $twoYear['totalPrice']);

        // 3 Tahun: Template 3.000.000, Server 1.500.000, Service 1.500.000, Domain 600.000, Diskon 100.000
        $threeYear = Template::breakdown(3000000, 1500000, 1500000, 600000, 100000);
        $this->assertSame(3000000, $threeYear['templatePrice']);
        $this->assertSame(1500000, $threeYear['serverPrice']);
        $this->assertSame(1500000, $threeYear['servicePrice']);
        $this->assertSame(600000, $threeYear['domainPrice']);
        $this->assertSame(100000, $threeYear['discountAmount']);
        $this->assertSame(6000000, $threeYear['packageTotal']);
        $this->assertSame(6600000, $threeYear['subtotal']);
        $this->assertSame(6500000, $threeYear['totalPrice']);
    }

    public function test_template_instance_price_breakdown_with_duration(): void
    {
        $template = new Template([
            'template_price' => 1000000,
            'server_price' => 500000,
            'service_price' => 500000,
        ]);

        // Durasi 1 Tahun
        $calc1 = $template->priceBreakdown(185000, 0, 1);
        $this->assertSame(1000000, $calc1['templatePrice']);
        $this->assertSame(500000, $calc1['serverPrice']);
        $this->assertSame(500000, $calc1['servicePrice']);
        $this->assertSame(185000, $calc1['domainPrice']);
        $this->assertSame(2000000, $calc1['packageTotal']);
        $this->assertSame(2185000, $calc1['totalPrice']);

        // Durasi 2 Tahun: semua komponen paket dikali 2
        $calc2 = $template->priceBreakdown(370000, 0, 2);
        $this->assertSame(2000000, $calc2['templatePrice']);
        $this->assertSame(1000000, $calc2['serverPrice']);
        $this->assertSame(1000000, $calc2['servicePrice']);
        $this->assertSame(370000, $calc2['domainPrice']);
        $this->assertSame(4000000, $calc2['packageTotal']);
        $this->assertSame(4370000, $calc2['totalPrice']);

        // Durasi 3 Tahun dengan diskon 50.000: semua komponen paket dikali 3
        $calc3 = $template->priceBreakdown(555000, 50000, 3);
        $this->assertSame(3000000, $calc3['templatePrice']);
        $this->assertSame(1500000, $calc3['serverPrice']);
        $this->assertSame(1500000, $calc3['servicePrice']);
        $this->assertSame(555000, $calc3['domainPrice']);
        $this->assertSame(6000000, $calc3['packageTotal']);
        $this->assertSame(6505000, $calc3['totalPrice']);
    }

    public function test_coupon_percentage_meta_extraction(): void
    {
        // 1. Kupon Persentase Subtotal dengan Max Cap
        $couponPercentMax = new Coupon([
            'discount_mode' => DiscountMode::SubtotalDomain,
            'subtotal_discount_type' => DiscountType::Percentage,
            'subtotal_discount_amount' => 25,
            'subtotal_discount_max' => 500000,
        ]);

        // Subtotal 2.500.000 -> 25% = 625.000 -> cap reached
        $meta1 = $couponPercentMax->getDiscountMeta(['subtotal' => 2500000], 500000);
        $this->assertTrue($meta1['is_percentage']);
        $this->assertSame(25, $meta1['percentage']);
        $this->assertSame('25%', $meta1['formatted_percentage']);
        $this->assertSame('25% OFF', $meta1['badge_text']);
        $this->assertTrue($meta1['is_max_reached']);
        $this->assertSame(500000, $meta1['max_discount']);
        $this->assertSame('Rp500.000', $meta1['formatted_max_discount']);

        // Subtotal 1.000.000 -> 25% = 250.000 -> cap not reached
        $meta2 = $couponPercentMax->getDiscountMeta(['subtotal' => 1000000], 250000);
        $this->assertFalse($meta2['is_max_reached']);

        // 2. Kupon Nominal Biasa
        $couponNominal = new Coupon([
            'discount_mode' => DiscountMode::SubtotalDomain,
            'subtotal_discount_type' => DiscountType::Nominal,
            'subtotal_discount_amount' => 200000,
        ]);
        $metaNominal = $couponNominal->getDiscountMeta(['subtotal' => 2200000], 200000);
        $this->assertFalse($metaNominal['is_percentage']);
        $this->assertNull($metaNominal['percentage']);
        $this->assertSame('HEMAT', $metaNominal['badge_text']);
        $this->assertSame('Potongan Rp200.000', $metaNominal['discount_label']);
    }

    public function test_pricing_structure_umum_mode(): void
    {
        $service = (new \ReflectionClass(\App\Services\PaymentService::class))->newInstanceWithoutConstructor();
        $prices = Template::breakdown(1000000, 500000, 500000, 200000, 0);

        $struct = $service->buildPricingStructure($prices, null, 0, 1, false);

        $this->assertSame('umum', $struct['mode']);
        $this->assertSame(2000000, $struct['package_subtotal']);
        $this->assertSame(0, $struct['package_discount']);
        $this->assertSame(2000000, $struct['package_promo_price']);
        $this->assertSame(200000, $struct['domain_price']);
        $this->assertSame(2200000, $struct['total']);
        $this->assertSame('Rp2.200.000', $struct['formatted_total']);
        $this->assertFalse($struct['components']['template']['has_discount']);
        $this->assertFalse($struct['components']['server']['has_discount']);
        $this->assertFalse($struct['components']['service']['has_discount']);
        $this->assertFalse($struct['components']['domain']['has_discount']);
    }

    public function test_pricing_structure_subtotal_mode_percentage(): void
    {
        $service = (new \ReflectionClass(\App\Services\PaymentService::class))->newInstanceWithoutConstructor();
        $prices = Template::breakdown(1000000, 500000, 500000, 200000, 0);

        $coupon = new Coupon([
            'code' => 'DISKON10',
            'discount_mode' => DiscountMode::SubtotalDomain,
            'subtotal_discount_type' => DiscountType::Percentage,
            'subtotal_discount_amount' => 10,
        ]);

        $calculatedDiscount = 220000; // 10% dari 2.200.000
        $struct = $service->buildPricingStructure($prices, $coupon, $calculatedDiscount, 1, false);

        $this->assertSame('subtotal', $struct['mode']);
        $this->assertSame(2000000, $struct['package_subtotal']);
        $this->assertSame(220000, $struct['package_discount']);
        $this->assertStringContainsString('-Rp220.000', $struct['package_discount_label']);
        $this->assertStringContainsString('10%', $struct['package_discount_label']);
        $this->assertSame(1780000, $struct['package_promo_price']); // 2.000.000 - 220.000
        $this->assertSame(200000, $struct['domain_price']);
        $this->assertSame(1980000, $struct['total']);
        $this->assertSame('Rp1.780.000', $struct['formatted_package_promo_price']);
        $this->assertSame('Rp1.980.000', $struct['formatted_total']);
    }

    public function test_pricing_structure_per_component_mode(): void
    {
        $service = (new \ReflectionClass(\App\Services\PaymentService::class))->newInstanceWithoutConstructor();
        $prices = Template::breakdown(1000000, 500000, 500000, 200000, 0);

        $coupon = new Coupon([
            'code' => 'KOMPONENHEMAT',
            'discount_mode' => DiscountMode::PerComponent,
            'template_discount_type' => DiscountType::Percentage,
            'template_discount_amount' => 50,
            'server_discount_type' => DiscountType::Nominal,
            'server_discount_amount' => 100000,
        ]);

        $struct = $service->buildPricingStructure($prices, $coupon, 600000, 1, false);

        $this->assertSame('per_component', $struct['mode']);
        // Template: 50% dari 1.000.000 = 500.000 disc, net 500.000
        $this->assertTrue($struct['components']['template']['has_discount']);
        $this->assertSame(500000, $struct['components']['template']['discount']);
        $this->assertSame(500000, $struct['components']['template']['net']);
        $this->assertStringContainsString('50%', $struct['components']['template']['discount_label']);

        // Server: 100.000 nominal disc, net 400.000
        $this->assertTrue($struct['components']['server']['has_discount']);
        $this->assertSame(100000, $struct['components']['server']['discount']);
        $this->assertSame(400000, $struct['components']['server']['net']);

        // Service: tanpa diskon, net 500.000
        $this->assertFalse($struct['components']['service']['has_discount']);
        $this->assertSame(500000, $struct['components']['service']['net']);

        // Harga Promo Paket Website = 500.000 + 400.000 + 500.000 = 1.400.000
        $this->assertSame(1400000, $struct['package_promo_price']);
        $this->assertSame('Rp1.400.000', $struct['formatted_package_promo_price']);

        // Domain: 200.000
        $this->assertSame(200000, $struct['domain_price']);

        // Total = 1.400.000 + 200.000 = 1.600.000
        $this->assertSame(1600000, $struct['total']);
        $this->assertSame('Rp1.600.000', $struct['formatted_total']);
    }
}
