<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\View\View;

/**
 * Pengaturan akun milik pengguna yang sedang login.
 */
class PengaturanController extends Controller
{
    /**
     * Tampilkan halaman edit profil mandiri.
     */
    public function edit(Request $request, OrderService $orders): View
    {
        $user = $request->user();
        $portal = $user->isKlien()
            ? $orders->clientPortal($user)
            : [
                'domainName' => '-',
                'isDomainRegistered' => false,
                'domainExpiryDate' => '-',
            ];

        return view('pages.edit-profil', [
            'user' => $user,
            'domainName' => $portal['domainName'],
            'isDomainRegistered' => $portal['isDomainRegistered'],
            'domainExpiryDate' => $portal['domainExpiryDate'],
        ]);
    }

    /**
     * Perbarui profil akun (Nama, Byline, WhatsApp, dan Foto Profil)
     */
    public function updateProfile(Request $request, UserService $users): RedirectResponse
    {
        $user = $request->user();

        $rules = [
            'name' => ['required', 'string', 'max:150'],
            'whatsapp' => $user->isKlien() ? ['required', 'string', 'max:30'] : ['nullable', 'string', 'max:30'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:2048'],
            'remove_photo' => ['nullable', 'boolean'],
        ];

        if ($user->isMedia() || $user->isAdmin()) {
            $rules['author_name'] = ['nullable', 'string', 'max:150'];
        }

        $validated = $request->validate($rules, [
            'name.required' => 'Nama lengkap wajib diisi.',
            'whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
            'photo.image' => 'File yang diunggah harus berupa gambar.',
            'photo.mimes' => 'Format foto profil harus JPG, PNG, atau WebP.',
            'photo.max' => 'Ukuran foto profil maksimal 2 MB.',
        ]);

        $users->updateMediaProfile(
            $user,
            $validated,
            $request->file('photo'),
            $request->boolean('remove_photo')
        );

        return $this->backToSettings()
            ->with('profile_success', 'Profil akun dan foto berhasil diperbarui.');
    }

    /**
     * Alias pembaruan byline publik milik akun media.
     */
    public function updateAuthorProfile(Request $request, UserService $users): RedirectResponse
    {
        return $this->updateProfile($request, $users);
    }

    /**
     * Perbarui kata sandi akun
     */
    public function updatePassword(Request $request, UserService $users): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ], [
            'current_password.required' => 'Kata sandi saat ini wajib diisi.',
            'current_password.current_password' => 'Kata sandi saat ini tidak sesuai.',
            'password.required' => 'Kata sandi baru wajib diisi.',
            'password.confirmed' => 'Konfirmasi kata sandi baru tidak cocok.',
            'password.min' => 'Kata sandi baru minimal 8 karakter.',
        ]);

        $users->updatePassword($request->user(), $validated['password']);

        return $this->backToSettings()
            ->with('password_success', 'Kata sandi akun Anda berhasil diperbarui.');
    }

    private function backToSettings(): RedirectResponse
    {
        return redirect()->back();
    }
}
