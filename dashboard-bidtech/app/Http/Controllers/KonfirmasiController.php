<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Langkah 3: ringkasan pesanan dan penerapan kode promo.
 */
class KonfirmasiController extends Controller
{
    public function show(Template $template, Request $request, PaymentService $payments): View|RedirectResponse
    {
        $session = $request->session();
        $checkout = $session->get('checkout', []);

        if (empty($checkout['domain_name'])) {
            return redirect()->route('checkout.domain', $template);
        }

        if (empty($checkout['customer'])) {
            return redirect()->route('checkout.data-diri', $template);
        }

        return view('pages.konfirmasi', $payments->showSummary($session, $template));
    }

    /**
     * AJAX: terapkan kode promo (umum atau khusus mitra).
     */
    public function applyPromo(Template $template, Request $request, PaymentService $payments): JsonResponse
    {
        $result = $payments->applyPromo(
            $request->session(),
            $template,
            (string) $request->input('code', ''),
            (string) $request->input('email', ''),
        );

        if (! $result['valid']) {
            return response()->json([
                'status' => 'error',
                'message' => $result['message'],
            ], 422);
        }

        return response()->json([
            'status' => 'success',
            'promo_code' => $result['code'],
            'is_partner' => $result['is_partner'],
            'partner_name' => $result['partner_name'],
            'discount_amount' => $result['discount_amount'],
            'formatted_discount' => $result['formatted_discount'],
            'new_total' => $result['new_total'],
            'formatted_total' => $result['formatted_new_total'],
            'message' => $result['message'],
            'is_percentage' => $result['is_percentage'] ?? false,
            'percentage' => $result['percentage'] ?? null,
            'formatted_percentage' => $result['formatted_percentage'] ?? null,
            'badge_text' => $result['badge_text'] ?? null,
            'discount_label' => $result['discount_label'] ?? null,
            'max_discount' => $result['max_discount'] ?? null,
            'formatted_max_discount' => $result['formatted_max_discount'] ?? null,
            'is_max_reached' => $result['is_max_reached'] ?? false,
            'pricing_structure' => $result['pricing_structure'] ?? null,
        ]);
    }

    /**
     * AJAX: hapus kode promo dari sesi checkout.
     */
    public function removePromo(Template $template, Request $request, PaymentService $payments): JsonResponse
    {
        $total = $payments->removePromo($request->session(), $template);

        return response()->json([
            'status' => 'success',
            'message' => 'Kode promo berhasil dihapus.',
            'total_price' => $total,
            'formatted_total' => 'Rp'.number_format($total, 0, ',', '.'),
        ]);
    }
}
