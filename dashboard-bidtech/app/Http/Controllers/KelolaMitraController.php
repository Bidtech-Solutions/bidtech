<?php

namespace App\Http\Controllers;

use App\Enums\CommissionType;
use App\Models\Partner;
use App\Services\PromoService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\View\View;

class KelolaMitraController extends Controller
{
    /**
     * Tampilkan halaman kelola mitra, rekapitulasi afiliasi, dan komisi.
     */
    public function index(Request $request, PromoService $promos): View
    {
        return view('pages.kelola-mitra', $promos->partners(
            $request->only(['search', 'status', 'commission_type', 'has_promo', 'sort'])
        ));
    }

    /**
     * Simpan mitra baru beserta akun user dan konfigurasi komisinya.
     */
    public function store(Request $request, PromoService $promos): RedirectResponse
    {
        $this->cleanCommissionInput($request);

        $validated = $request->validate([
            'name'              => ['required', 'string', 'max:150'],
            'email'             => ['required', 'string', 'email', 'max:150', 'unique:users,email'],
            'whatsapp'          => ['nullable', 'string', 'max:30'],
            'password'          => ['required', 'string', 'min:6'],
            'type_commission'   => ['required', new Enum(CommissionType::class)],
            'amount_commission' => [
                'required',
                'integer',
                'min:0',
                Rule::when(
                    $request->input('type_commission') === CommissionType::Percentage->value,
                    ['max:100']
                ),
            ],
        ], [
            'name.required'              => 'Nama lengkap mitra wajib diisi.',
            'email.required'             => 'Alamat email wajib diisi.',
            'email.email'                => 'Format email tidak valid.',
            'email.unique'               => 'Alamat email sudah terdaftar di sistem.',
            'password.required'          => 'Password akun mitra wajib diisi.',
            'password.min'               => 'Password minimal terdiri dari 6 karakter.',
            'type_commission.required'   => 'Tipe komisi wajib dipilih.',
            'amount_commission.required' => 'Besaran komisi wajib diisi.',
            'amount_commission.max'      => 'Komisi persentase maksimal 100%.',
        ]);

        $userData = [
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'whatsapp' => $validated['whatsapp'],
            'password' => $validated['password'],
        ];

        $partnerData = [
            'type_commission'   => $validated['type_commission'],
            'amount_commission' => $validated['amount_commission'],
        ];

        $partner = $promos->createPartner($userData, $partnerData);

        return redirect()->route('dashboard.partners.index')
            ->with('success', "Mitra '{$partner->user->name}' berhasil ditambahkan!");
    }

    /**
     * Perbarui data profil dan besar komisi mitra.
     */
    public function update(Request $request, Partner $partner, PromoService $promos): RedirectResponse
    {
        $this->cleanCommissionInput($request);

        $validated = $request->validate([
            'name'              => ['required', 'string', 'max:150'],
            'email'             => ['required', 'string', 'email', 'max:150', Rule::unique('users', 'email')->ignore($partner->user_id)],
            'whatsapp'          => ['nullable', 'string', 'max:30'],
            'password'          => ['nullable', 'string', 'min:6'],
            'type_commission'   => ['required', new Enum(CommissionType::class)],
            'amount_commission' => [
                'required',
                'integer',
                'min:0',
                Rule::when(
                    $request->input('type_commission') === CommissionType::Percentage->value,
                    ['max:100']
                ),
            ],
        ], [
            'name.required'              => 'Nama lengkap mitra wajib diisi.',
            'email.required'             => 'Alamat email wajib diisi.',
            'email.email'                => 'Format email tidak valid.',
            'email.unique'               => 'Alamat email sudah digunakan akun lain.',
            'password.min'               => 'Password baru minimal 6 karakter.',
            'type_commission.required'   => 'Tipe komisi wajib dipilih.',
            'amount_commission.required' => 'Besaran komisi wajib diisi.',
            'amount_commission.max'      => 'Komisi persentase maksimal 100%.',
        ]);

        $userData = [
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'whatsapp' => $validated['whatsapp'],
            'password' => $validated['password'] ?? null,
        ];

        $partnerData = [
            'type_commission'   => $validated['type_commission'],
            'amount_commission' => $validated['amount_commission'],
        ];

        $promos->updatePartner($partner, $userData, $partnerData);

        return redirect()->route('dashboard.partners.index')
            ->with('success', "Data dan komisi mitra '{$partner->user->name}' berhasil diperbarui!");
    }

    /**
     * Toggle status aktif/nonaktif mitra.
     */
    public function toggleActive(Partner $partner, PromoService $promos): RedirectResponse
    {
        $promos->toggleActivePartner($partner);

        $status = $partner->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Mitra '{$partner->user->name}' berhasil {$status}.");
    }

    /**
     * Hapus mitra dari sistem.
     */
    public function destroy(Partner $partner, PromoService $promos): RedirectResponse
    {
        $result = $promos->deletePartner($partner);

        if (! $result['success']) {
            return back()->with('error', $result['message']);
        }

        return redirect()->route('dashboard.partners.index')
            ->with('success', $result['message']);
    }

    /**
     * Bersihkan input amount_commission dari format rupiah (misal "200.000" jadi 200000).
     */
    private function cleanCommissionInput(Request $request): void
    {
        if ($request->has('amount_commission') && ! is_null($request->input('amount_commission'))) {
            $raw = (string) $request->input('amount_commission');
            $digits = preg_replace('/[^0-9]/', '', $raw);
            $request->merge([
                'amount_commission' => $digits === '' ? null : (int) $digits,
            ]);
        }
    }
}
