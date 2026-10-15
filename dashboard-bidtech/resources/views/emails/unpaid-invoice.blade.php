@php
    $duration = (int) ($order->domain_duration ?: 1);
    $template = $order->template ?? $template;
    $templatePrice = (int) ($order->template_price ?? (($template?->template_price ?? 1000000) * $duration));
    $serverPrice = (int) ($order->server_price ?? (($template?->server_price ?? 500000) * $duration));
    $servicePrice = (int) ($order->service_price ?? (($template?->service_price ?? 500000) * $duration));
    $domainPrice = (int) ($order->domain_price ?? 0);
    $discountAmount = (int) ($order->discount_amount ?? 0);

    if (!isset($pricingStructure)) {
        $paymentService = app(\App\Services\PaymentService::class);
        $pricingStructure = $paymentService->buildPricingStructure(
            $order->priceBreakdown(),
            $order->coupon,
            $discountAmount,
            $duration,
            (bool) $order->is_own_domain
        );
    }
    $struct = $pricingStructure;
@endphp
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tagihan Invoice Pesanan - Bidtech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F5; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: #0B1B17;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F4F6F5; padding: 30px 15px;">
        <tr>
            <td align="center">
                <!-- Wrapper Box -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #E4E9E6; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #E4E9E6;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td>
                                        <div style="font-size: 22px; font-weight: 900; color: #1E7A53; letter-spacing: -0.5px;">
                                            Bidtech
                                        </div>
                                        <div style="font-size: 11px; color: #6B7B75; margin-top: 2px;">
                                            Jasa Pembuatan Website & Domain
                                        </div>
                                    </td>
                                    <td align="right">
                                        <span style="display: inline-block; background-color: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                                            UNPAID
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 32px;">
                            <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #0B1B17;">
                                Tagihan Menunggu Pembayaran
                            </h1>
                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #4A5551; line-height: 1.5;">
                                Halo <strong>{{ $order->full_name }}</strong>, terima kasih telah melakukan pemesanan di Bidtech. Silakan selesaikan pembayaran Anda sebelum batas waktu berakhir untuk memulai pembuatan website.
                            </p>

                            <!-- Alert 24 Jam -->
                            <div style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 14px 16px; margin-bottom: 24px;">
                                <div style="font-size: 13px; font-weight: 700; color: #92400E; margin-bottom: 2px;">
                                    ⏱️ Batas Waktu Pembayaran: 1x24 Jam
                                </div>
                                <div style="font-size: 12px; color: #78350F; line-height: 1.4;">
                                    Pesanan akan otomatis kedaluwarsa jika belum diselesaikan sebelum <strong>{{ $order->payment_expires_at ? $order->payment_expires_at->format('d M Y, H:i') . ' WIB' : '1x24 jam ke depan' }}</strong>.
                                </div>
                            </div>

                            <!-- Detail Ringkas -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E4E9E6; border-radius: 12px; margin-bottom: 24px; border-collapse: separate; border-spacing: 0; overflow: hidden;">
                                <tr style="background-color: #F8FAF9;">
                                    <td style="padding: 12px 16px; font-size: 12px; color: #6B7B75; font-weight: 600; border-bottom: 1px solid #E4E9E6;">Nomor Invoice</td>
                                    <td align="right" style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #0B1B17; font-family: monospace; border-bottom: 1px solid #E4E9E6;">
                                        {{ $order->order_number }}
                                    </td>
                                </tr>
                                @php
                                    $templateDesc = $order->template_desc ?? $template->template_desc ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean';
                                    $serverDesc = $order->server_desc ?? $template->server_desc ?? ('Cloud Server Hosting ' . $duration . ' Tahun, NVMe High Speed & Free SSL');
                                    $serviceDesc = $order->service_desc ?? $template->service_desc ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan';
                                @endphp

                                @if(($struct['mode'] ?? 'umum') === 'per_component')
                                    {{-- MODE 3: DISKON PER KOMPONEN --}}
                                    @php
                                        $comps = $struct['components'] ?? [];
                                        $discountComps = [];
                                        foreach(['template', 'server', 'service'] as $cKey) {
                                            if (!empty($comps[$cKey]['has_discount'])) {
                                                $discountComps[$cKey] = $comps[$cKey];
                                            }
                                        }
                                    @endphp

                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">1. Lisensi Template Website</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $templateDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($comps['template']['price'] ?? $templatePrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">2. Cloud Server Hosting ({{ $duration }} Tahun)</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $serverDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($comps['server']['price'] ?? $serverPrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">3. Setup Deployment & Layanan Teknis</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $serviceDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($comps['service']['price'] ?? $servicePrice, 0, ',', '.') }}
                                        </td>
                                    </tr>

                                    <tr style="background-color: #F8FAF9;">
                                        <td style="padding: 10px 16px; font-size: 12px; color: #0B1B17; font-weight: 700; border-bottom: 1px solid #E4E9E6;">
                                            Subtotal 3 Item
                                        </td>
                                        <td align="right" style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($struct['package_subtotal'], 0, ',', '.') }}
                                        </td>
                                    </tr>

                                    @foreach($discountComps as $cKey => $comp)
                                        <tr style="background-color: #F2FBF5;">
                                            <td style="padding: 10px 16px; font-size: 12px; color: #166534; font-weight: 600; border-bottom: 1px solid #E4E9E6;">
                                                🟢 Potongan Diskon Promo (Diskon {{ $comp['name'] }})
                                            </td>
                                            <td align="right" style="padding: 10px 16px; font-size: 12px; font-weight: 800; color: #166534; border-bottom: 1px solid #E4E9E6;">
                                                {{ $comp['discount_label'] }}
                                            </td>
                                        </tr>
                                    @endforeach

                                    <tr style="background-color: #EAF7EE;">
                                        <td style="padding: 11px 16px; font-size: 13px; font-weight: 800; color: #065F46; border-bottom: 1px solid #D1F2DE;">
                                            Total 3 Item Setelah Diskon
                                        </td>
                                        <td align="right" style="padding: 11px 16px; font-size: 13px; font-weight: 800; color: #065F46; border-bottom: 1px solid #D1F2DE;">
                                            Rp{{ number_format($struct['package_promo_price'], 0, ',', '.') }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            @if($order->is_own_domain)
                                                <strong style="color: #0B1B17; display: block;">4. Setup Domain Milik Sendiri</strong>
                                                <span style="font-size: 11px; color: #2563EB;">{{ $order->domain_name }} &bull; Konfigurasi DNS Server (Gratis)</span>
                                            @else
                                                <strong style="color: #0B1B17; display: block;">4. Registrasi Domain ({{ $duration }} Tahun)</strong>
                                                <span style="font-size: 11px; color: #2E6806;">{{ $order->domain_name }} &bull; Termasuk PPN 11%</span>
                                            @endif
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($domainPrice, 0, ',', '.') }}
                                        </td>
                                    </tr>

                                @elseif(($struct['mode'] ?? 'umum') === 'subtotal')
                                    {{-- MODE 2: DISKON SUBTOTAL --}}
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">1. Lisensi Template Website</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $templateDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($templatePrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">2. Cloud Server Hosting ({{ $duration }} Tahun)</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $serverDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($serverPrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">3. Setup Deployment & Layanan Teknis</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $serviceDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($servicePrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr style="background-color: #F8FAF9;">
                                        <td style="padding: 10px 16px; font-size: 12px; color: #0B1B17; font-weight: 700; border-bottom: 1px solid #E4E9E6;">
                                            Subtotal 3 Item
                                        </td>
                                        <td align="right" style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($struct['package_subtotal'], 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr style="background-color: #F2FBF5;">
                                        <td style="padding: 10px 16px; font-size: 12px; color: #166534; font-weight: 600; border-bottom: 1px solid #E4E9E6;">
                                            🟢 Potongan Diskon Promo ({{ $order->promo_code ?? $order->coupon_code }})
                                            @if($order->is_partner_order)
                                                <br><small style="color: #15803d; font-weight: bold;">🤝 Mitra: {{ $order->partner_name }}</small>
                                            @endif
                                        </td>
                                        <td align="right" style="padding: 10px 16px; font-size: 12px; font-weight: 800; color: #166534; border-bottom: 1px solid #E4E9E6;">
                                            {{ $struct['package_discount_label'] ?? ('-Rp' . number_format($struct['package_discount'], 0, ',', '.')) }}
                                        </td>
                                    </tr>
                                    <tr style="background-color: #EAF7EE;">
                                        <td style="padding: 11px 16px; font-size: 13px; font-weight: 800; color: #065F46; border-bottom: 1px solid #D1F2DE;">
                                            Total 3 Item Setelah Diskon
                                        </td>
                                        <td align="right" style="padding: 11px 16px; font-size: 13px; font-weight: 800; color: #065F46; border-bottom: 1px solid #D1F2DE;">
                                            Rp{{ number_format($struct['package_promo_price'], 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            @if($order->is_own_domain)
                                                <strong style="color: #0B1B17; display: block;">4. Setup Domain Milik Sendiri</strong>
                                                <span style="font-size: 11px; color: #2563EB;">{{ $order->domain_name }} &bull; Konfigurasi DNS Server (Gratis)</span>
                                            @else
                                                <strong style="color: #0B1B17; display: block;">4. Registrasi Domain ({{ $duration }} Tahun)</strong>
                                                <span style="font-size: 11px; color: #2E6806;">{{ $order->domain_name }} &bull; Termasuk PPN 11%</span>
                                            @endif
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($domainPrice, 0, ',', '.') }}
                                        </td>
                                    </tr>

                                @else
                                    {{-- MODE 1: UMUM (TANPA PROMO) --}}
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">1. Lisensi Template Website</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $templateDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($templatePrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">2. Cloud Server Hosting ({{ $duration }} Tahun)</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $serverDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($serverPrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            <strong style="color: #0B1B17; display: block;">3. Setup Deployment & Layanan Teknis</strong>
                                            <span style="font-size: 11px; color: #6B7B75;">{{ $serviceDesc }}</span>
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($servicePrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr style="background-color: #F8FAF9;">
                                        <td style="padding: 10px 16px; font-size: 12px; color: #0B1B17; font-weight: 700; border-bottom: 1px solid #E4E9E6;">
                                            Subtotal 3 Item
                                        </td>
                                        <td align="right" style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($templatePrice + $serverPrice + $servicePrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">
                                            @if($order->is_own_domain)
                                                <strong style="color: #0B1B17; display: block;">4. Setup Domain Milik Sendiri</strong>
                                                <span style="font-size: 11px; color: #2563EB;">{{ $order->domain_name }} &bull; Konfigurasi DNS Server (Gratis)</span>
                                            @else
                                                <strong style="color: #0B1B17; display: block;">4. Registrasi Domain ({{ $duration }} Tahun)</strong>
                                                <span style="font-size: 11px; color: #2E6806;">{{ $order->domain_name }} &bull; Termasuk PPN 11%</span>
                                            @endif
                                        </td>
                                        <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                            Rp{{ number_format($domainPrice, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                @endif
                                <tr style="background-color: #F8FAF9;">
                                    <td style="padding: 14px 16px; border-top: 1.5px solid #E4E9E6;">
                                        <div style="font-size: 14px; font-weight: 800; color: #0B1B17;">Total Biaya Pembayaran</div>
                                        <div style="font-size: 11px; color: #6B7B75; margin-top: 2px;">Sudah termasuk PPN 11% & garansi pengerjaan</div>
                                    </td>
                                    <td align="right" style="padding: 14px 16px; font-size: 18px; font-weight: 900; color: #046A38; border-top: 1.5px solid #E4E9E6;">
                                        Rp{{ number_format($order->total_price, 0, ',', '.') }}
                                    </td>
                                </tr>
                            </table>

                            <!-- Tombol Bayar -->
                            <div style="text-align: center; margin-bottom: 24px;">
                                <a href="{{ $bayarUrl }}" style="display: inline-block; background-color: #22C55E; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 800; padding: 14px 32px; border-radius: 12px; box-shadow: 0 2px 6px rgba(34,197,94,0.3);">
                                    Bayar Tagihan Sekarang &rarr;
                                </a>
                            </div>

                            <div style="text-align: center; margin-bottom: 24px;">
                                <a href="{{ $pdfUrl }}" style="font-size: 12px; font-weight: 700; color: #1E7A53; text-decoration: underline;">
                                    Unduh Salinan Invoice (PDF)
                                </a>
                            </div>

                            <p style="margin: 0; font-size: 12px; color: #6B7B75; line-height: 1.5; text-align: center;">
                                Jika tombol di atas tidak dapat diklik, salin dan buka tautan berikut di browser Anda:<br>
                                <a href="{{ $bayarUrl }}" style="color: #1E7A53; word-break: break-all;">{{ $bayarUrl }}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 32px; background-color: #F8FAF9; border-top: 1px solid #E4E9E6; text-align: center; font-size: 11px; color: #6B7B75; line-height: 1.6;">
                            Email ini dikirim otomatis oleh sistem pembayaran <strong>Bidtech</strong> ke {{ $order->email }}.<br>
                            Butuh bantuan? Hubungi kami via WhatsApp atau balas email ke support@bidtech.co.id.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
