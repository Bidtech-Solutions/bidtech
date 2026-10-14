<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Services\DomainService;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Langkah 1 alur template-first: cari dan pilih domain untuk template yang sudah dipilih.
 */
class PilihDomainController extends Controller
{
    public function show(Template $template, Request $request, OrderService $orders, DomainService $domains): View
    {
        $session = $request->session();
        $orders->selectTemplate($session, $template, OrderService::FLOW_TEMPLATE_FIRST);

        $query = trim($request->input('q', ''));

        // Tanpa query (pertama kali membuka halaman) tampilkan hasil bawaan.
        $searchData = $domains->search($query !== '' ? $query : 'namabisnismu');
        $session->put('checkout.domain_results', $searchData['domains']);

        if ($query !== '') {
            $session->put('checkout.domain_query', $query);
        } else {
            $session->forget('checkout.domain_query');
        }

        $tab = $request->query('tab');
        $checkoutSession = $session->get('checkout', []);
        $activeTab = $tab === 'own' || (! empty($checkoutSession['is_own_domain']) && $tab !== 'new')
            ? 'own'
            : 'new';

        return view('pages.domain', [
            'template' => $template,
            'checkout' => $checkoutSession,
            'domainResults' => $searchData['domains'] ?? [],
            'searchMeta' => $searchData,
            'step' => 1,
            'flow' => OrderService::FLOW_TEMPLATE_FIRST,
            'activeTab' => $activeTab,
        ]);
    }

    /**
     * Live search (AJAX) saat pengguna mengetik.
     */
    public function search(Template $template, Request $request, DomainService $domains): JsonResponse
    {
        $query = trim($request->input('q', ''));
        $searchData = $domains->search($query);

        if (! empty($searchData['domains'])) {
            $request->session()->put('checkout.domain_results', $searchData['domains']);
        }

        return response()->json([
            'status' => 'success',
            'query' => $query,
            'domains' => $searchData['domains'],
            'is_live_api' => $searchData['is_live_api'],
            'source' => $searchData['source'],
            'status_label' => $searchData['status_label'],
            'has_api_key' => $searchData['has_api_key'],
            'select_url' => route('checkout.domain.select', $template),
            'csrf_token' => csrf_token(),
        ]);
    }

    /**
     * Pilih salah satu domain yang tersedia.
     */
    public function select(Template $template, Request $request, OrderService $orders): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string'],
            'price' => ['nullable', 'numeric'],
            'duration' => ['nullable', 'integer', 'in:1,2,3'],
            'tax_amount' => ['nullable', 'numeric'],
            'price_base' => ['nullable', 'numeric'],
        ]);

        $domain = $validated['domain'];
        $duration = (int) ($validated['duration'] ?? $request->session()->get('checkout.domain_duration', 1));
        $chosen = $orders->selectDomain($request->session(), $domain, (int) ($validated['price'] ?? 0), $duration);

        if ($request->ajax() || $request->wantsJson()) {
            $total = $chosen['total'];
            $prices = $template->priceBreakdown($total['price'], 0, $chosen['duration']);

            return response()->json([
                'status' => 'success',
                'domain_name' => $domain,
                'domain_duration' => $chosen['duration'],
                'domain_price_per_year' => $chosen['price_per_year'],
                'formatted_price_year' => $this->rupiah($chosen['price_per_year']),
                'domain_price' => $total['price'],
                'formatted_price' => $this->rupiah($total['price']),
                'domain_tax' => $total['tax'],
                'domain_price_base' => $total['base'],
                'template_price' => $prices['templatePrice'],
                'formatted_template_price' => $this->rupiah($prices['templatePrice']),
                'server_price' => $prices['serverPrice'],
                'formatted_server_price' => $this->rupiah($prices['serverPrice']),
                'service_price' => $prices['servicePrice'],
                'formatted_service_price' => $this->rupiah($prices['servicePrice']),
                'package_total' => $prices['packageTotal'],
                'formatted_package_total' => $this->rupiah($prices['packageTotal']),
                'total_price' => $prices['totalPrice'],
                'formatted_total' => $this->rupiah($prices['totalPrice']),
            ]);
        }

        return redirect()->route('checkout.domain', $template)->with('success', "Domain {$domain} berhasil dipilih!");
    }

    /**
     * Pilih opsi "Saya Sudah Memiliki Domain"
     */
    public function selectOwn(Template $template, Request $request, OrderService $orders): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'domain' => [
                'required',
                'string',
                'min:3',
                'max:255',
                'regex:/^(?!:\/\/)([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/',
            ],
            'duration' => ['nullable', 'integer', 'in:1,2,3'],
        ], [
            'domain.required' => 'Nama domain wajib diisi.',
            'domain.regex' => 'Format nama domain tidak valid. Contoh yang benar: bisnissaya.com atau tokoanda.id (tanpa http:// atau www)',
        ]);

        $domain = $orders->sanitizeDomain($validated['domain']);
        $duration = (int) ($validated['duration'] ?? $request->session()->get('checkout.domain_duration', 1));
        $duration = in_array($duration, [1, 2, 3], true) ? $duration : 1;
        $orders->selectOwnDomain($request->session(), $domain, $duration);

        $prices = $template->priceBreakdown(0, 0, $duration);
        $promoSession = session('checkout.promo');
        $discAmount = (int) ($promoSession['discount_amount'] ?? 0);
        $estTotal = max(0, $prices['subtotal'] - $discAmount);

        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'is_own_domain' => true,
                'domain_name' => $domain,
                'domain_duration' => $duration,
                'domain_price' => 0,
                'formatted_price' => 'Rp0',
                'formatted_price_year' => 'Rp0',
                'domain_tax' => 0,
                'domain_price_base' => 0,
                'template_price' => $prices['templatePrice'],
                'formatted_template_price' => $this->rupiah($prices['templatePrice']),
                'server_price' => $prices['serverPrice'],
                'formatted_server_price' => $this->rupiah($prices['serverPrice']),
                'service_price' => $prices['servicePrice'],
                'formatted_service_price' => $this->rupiah($prices['servicePrice']),
                'package_total' => $prices['packageTotal'],
                'formatted_package_total' => $this->rupiah($prices['packageTotal']),
                'total_price' => $estTotal,
                'formatted_total' => $this->rupiah($estTotal),
                'next_url' => route('checkout.data-diri', $template),
                'message' => "Domain {$domain} berhasil dipilih sebagai domain milik Anda!",
            ]);
        }

        return redirect()->route('checkout.data-diri', $template)->with('success', "Domain {$domain} berhasil dipilih sebagai domain milik Anda!");
    }

    /**
     * Ubah durasi pendaftaran paket domain & server (AJAX).
     */
    public function updateDuration(Template $template, Request $request, OrderService $orders): JsonResponse
    {
        $validated = $request->validate([
            'duration' => ['required', 'integer', 'in:1,2,3'],
        ]);

        $duration = (int) $validated['duration'];
        $result = $orders->updateDomainDuration($request->session(), $duration);

        if (! $result) {
            return response()->json([
                'status' => 'error',
                'message' => 'Silakan pilih domain terlebih dahulu.',
            ], 400);
        }

        $total = $result['total'];
        $prices = $template->priceBreakdown($total['price'], 0, $duration);

        return response()->json([
            'status' => 'success',
            'domain_name' => $result['domain'],
            'domain_duration' => $result['duration'],
            'domain_price_per_year' => $result['price_per_year'],
            'formatted_price_year' => $this->rupiah($result['price_per_year']),
            'domain_price' => $total['price'],
            'formatted_price' => $this->rupiah($total['price']),
            'template_price' => $prices['templatePrice'],
            'formatted_template_price' => $this->rupiah($prices['templatePrice']),
            'server_price' => $prices['serverPrice'],
            'formatted_server_price' => $this->rupiah($prices['serverPrice']),
            'service_price' => $prices['servicePrice'],
            'formatted_service_price' => $this->rupiah($prices['servicePrice']),
            'package_total' => $prices['packageTotal'],
            'formatted_package_total' => $this->rupiah($prices['packageTotal']),
            'total_price' => $prices['totalPrice'],
            'formatted_total' => $this->rupiah($prices['totalPrice']),
        ]);
    }

    private function rupiah(int $amount): string
    {
        return 'Rp'.number_format($amount, 0, ',', '.');
    }
}
