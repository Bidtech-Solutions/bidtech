<?php

namespace App\Http\Controllers;

use App\Enums\DiscountMode;
use App\Models\Coupon;
use App\Services\PromoService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

/**
 * Kode kupon & afiliasi di Admin CMS (khusus admin; dijaga middleware 'role:ADMIN').
 */
class KelolaPromoController extends Controller
{
    private const COMPONENTS = ['subtotal', 'service', 'template', 'server', 'domain'];

    private const CURRENCY_FIELDS = ['min_order_amount'];

    public function index(Request $request, PromoService $promos): View
    {
        return view('pages.kelola-promo', array_merge(['mode' => 'index'], $promos->list($request->only(['search', 'is_partner', 'is_active', 'discount_mode']))));
    }

    public function create(PromoService $promos): View
    {
        return view('pages.kelola-promo', ['mode' => 'create', 'partners' => $promos->partnersList()]);
    }

    public function store(Request $request, PromoService $promos): RedirectResponse
    {
        $this->cleanPromoCurrency($request);
        $validated = $request->validate($this->promoRules());

        $promos->create($this->promoData($validated, $request));

        return redirect()->route('dashboard.promos.index')
            ->with('success', "Kode promo '{$validated['code']}' berhasil dibuat!");
    }

    public function edit(Coupon $promo, PromoService $promos): View
    {
        return view('pages.kelola-promo', ['mode' => 'edit', 'promo' => $promo, 'partners' => $promos->partnersList()]);
    }

    public function update(Request $request, Coupon $promo, PromoService $promos): RedirectResponse
    {
        $this->cleanPromoCurrency($request);
        $validated = $request->validate($this->promoRules($promo));

        $promos->update($promo, $this->promoData($validated, $request));

        return redirect()->route('dashboard.promos.index')
            ->with('success', "Kode promo '{$promo->code}' berhasil diperbarui!");
    }

    public function destroy(Coupon $promo, PromoService $promos): RedirectResponse
    {
        $code = $promo->code;

        if (! $promos->delete($promo)) {
            return redirect()->route('dashboard.promos.index')
                ->with('warning', "Promo '{$code}' tidak dapat dihapus karena sudah pernah digunakan. Nonaktifkan saja.");
        }

        return redirect()->route('dashboard.promos.index')
            ->with('success', "Kode promo '{$code}' berhasil dihapus.");
    }

    public function toggleActive(Coupon $promo, PromoService $promos): RedirectResponse
    {
        $promos->toggleActive($promo);

        $status = $promo->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Promo '{$promo->code}' berhasil {$status}.");
    }

    /**
     * Detail promo dialihkan ke halaman edit.
     */
    public function show(Coupon $promo): RedirectResponse
    {
        return redirect()->route('dashboard.promos.edit', $promo);
    }

    /**
     * Riwayat siapa yang memakai kode promo ini.
     */
    public function usages(Request $request, Coupon $promo, PromoService $promos): View
    {
        return view('pages.riwayat-redeem', array_merge(
            ['mode' => 'usages'],
            $promos->usages($promo, $request->only(['search', 'status']))
        ));
    }

    /**
     * Seluruh riwayat pemakaian kode promo di sistem.
     */
    public function allUsages(Request $request, PromoService $promos): View
    {
        return view('pages.riwayat-redeem', array_merge(['mode' => 'all_usages'], $promos->allUsages(
            $request->filled('promo_id') ? $request->integer('promo_id') : null,
            $request->filled('search') ? (string) $request->search : null,
            $request->filled('status') ? (string) $request->status : null,
        )));
    }

    /**
     * Rekapitulasi afiliasi dan komisi mitra.
     */
    public function partners(Request $request, PromoService $promos): View
    {
        return view('pages.kelola-mitra', $promos->partners(
            $request->only(['search', 'status', 'commission_type', 'has_promo', 'sort'])
        ));
    }

    /**
     * Bersihkan input rupiah dari pemisah ribuan (mis. "1.000" menjadi 1000).
     */
    private function cleanPromoCurrency(Request $request): void
    {
        $fields = self::CURRENCY_FIELDS;
        foreach (self::COMPONENTS as $component) {
            $fields[] = "{$component}_discount_amount";
            $fields[] = "{$component}_discount_max";
        }

        $clean = [];
        foreach ($fields as $field) {
            if (! $request->has($field) || is_null($request->input($field))) {
                continue;
            }
            $raw = (string) $request->input($field);
            if (trim($raw) === '') {
                $clean[$field] = null;
                continue;
            }
            $digits = preg_replace('/[^0-9]/', '', $raw);
            $clean[$field] = $digits === '' ? null : (int) $digits;
        }

        if ($clean !== []) {
            $request->merge($clean);
        }
    }

    private function promoRules(?Coupon $ignore = null): array
    {
        $rules = [
            'code' => ['required', 'string', 'max:50', Rule::unique('coupons', 'code')->ignore($ignore)],
            'name' => 'required|string|max:150',
            'discount_mode' => ['required', Rule::enum(DiscountMode::class)],
            'min_order_amount' => 'nullable|integer|min:0',
            'partner_id' => 'nullable|exists:partners,id',
            'usage_limit' => 'nullable|integer|min:1',
            'user_usage_limit' => 'nullable|integer|min:1',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'nullable|boolean',
        ];

        foreach (self::COMPONENTS as $component) {
            $rules["{$component}_discount_type"] = 'nullable|in:PERCENTAGE,FIXED,NOMINAL';
            $rules["{$component}_discount_amount"] = "nullable|required_with:{$component}_discount_type|integer|min:0";
            $rules["{$component}_discount_max"] = 'nullable|integer|min:0';
        }

        return $rules;
    }

    /**
     * Data tervalidasi ditambah status aktif; normalisasi data sesuai mode diskon yang dipilih.
     */
    private function promoData(array $validated, Request $request): array
    {
        $mode = $validated['discount_mode'];
        if ($mode instanceof DiscountMode) {
            $mode = $mode->value;
        }

        if (in_array($mode, [DiscountMode::SubtotalDomain->value, DiscountMode::SubtotalNonDomain->value], true)) {
            // Bersihkan field per komponen agar tidak ada data sampah di database
            foreach (['service', 'template', 'server', 'domain'] as $comp) {
                $validated["{$comp}_discount_type"] = null;
                $validated["{$comp}_discount_amount"] = null;
                $validated["{$comp}_discount_max"] = null;
            }
            if (empty($validated['subtotal_discount_type'])) {
                $validated['subtotal_discount_type'] = null;
                $validated['subtotal_discount_amount'] = null;
                $validated['subtotal_discount_max'] = null;
            }
        } elseif ($mode === DiscountMode::PerComponent->value) {
            // Bersihkan field subtotal
            $validated['subtotal_discount_type'] = null;
            $validated['subtotal_discount_amount'] = null;
            $validated['subtotal_discount_max'] = null;

            // Normalisasi komponen kosong
            foreach (['service', 'template', 'server', 'domain'] as $comp) {
                if (empty($validated["{$comp}_discount_type"])) {
                    $validated["{$comp}_discount_type"] = null;
                    $validated["{$comp}_discount_amount"] = null;
                    $validated["{$comp}_discount_max"] = null;
                }
            }
        }

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['code'] = strtoupper($validated['code']);

        return $validated;
    }
}
