<?php

namespace App\Services;

use App\Enums\Role;
use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class UserService
{
    private const DEFAULT_PASSWORD = 'Password123!';

    // ---- Authentication ----

    public function login(array $credentials, bool $remember, Session $session): void
    {
        if (! Auth::attempt($credentials, $remember)) {
            throw ValidationException::withMessages(['email' => 'Email atau password salah.']);
        }
        $session->regenerate();
    }

    public function logout(Session $session): void
    {
        Auth::logout();
        $session->invalidate();
        $session->regenerateToken();
    }

    // ---- Account settings ----

    public function updateProfile(User $user, array $data): void
    {
        $user->update($data);
    }

    public function updatePassword(User $user, string $newPassword): void
    {
        $user->update(['password' => Hash::make($newPassword)]);
    }

    public function updateAuthorProfile(User $user, array $data): void
    {
        $user->update($data);
    }

    /**
     * Simpan file foto profil pengguna (S3/RustFS atau fallback disk public).
     */
    public function uploadProfilePhoto(User $user, UploadedFile $file): string
    {
        $ext = $file->getClientOriginalExtension() ?: 'webp';
        $filename = Str::uuid()->toString() . '.' . strtolower($ext);

        // Hapus foto kustom lama jika ada
        $this->removeOldPhotoFile($user->photo);

        $storedPath = null;

        // Coba simpan ke S3/RustFS jika endpoint aktif
        $s3Available = false;
        $endpoint = config('filesystems.disks.s3.endpoint');
        if ($endpoint) {
            $parsed = parse_url($endpoint);
            $host = $parsed['host'] ?? '127.0.0.1';
            $port = $parsed['port'] ?? (($parsed['scheme'] ?? 'http') === 'https' ? 443 : 80);
            $fp = @fsockopen($host, $port, $errno, $errstr, 0.5);
            if ($fp) {
                fclose($fp);
                $s3Available = true;
            }
        } elseif (! empty(config('filesystems.disks.s3.bucket'))) {
            $s3Available = true;
        }

        if ($s3Available) {
            try {
                $disk = Storage::disk('s3');
                $path = $disk->putFileAs('profiles', $file, $filename);
                if ($path) {
                    $storedPath = $path;
                }
            } catch (Throwable) {
                $storedPath = null;
            }
        }

        // Fallback simpan ke storage public lokal jika S3 tidak aktif
        if (! $storedPath) {
            $publicPath = Storage::disk('public')->putFileAs('profiles', $file, $filename);
            $storedPath = '/storage/' . $publicPath;
        }

        $user->update(['photo' => $storedPath]);

        return $storedPath;
    }

    /**
     * Hapus foto profil kustom dan kembalikan ke avatar placeholder default.
     */
    public function deleteProfilePhoto(User $user): void
    {
        $this->removeOldPhotoFile($user->photo);
        $user->update(['photo' => 'profiles/placeholder_profile.webp']);
    }

    /**
     * Perbarui data profil lengkap pengguna (nama, author_name, whatsapp, dan foto).
     */
    public function updateMediaProfile(User $user, array $data, ?UploadedFile $photo = null, bool $removePhoto = false): void
    {
        if ($removePhoto) {
            $this->deleteProfilePhoto($user);
        } elseif ($photo instanceof UploadedFile) {
            $this->uploadProfilePhoto($user, $photo);
        }

        $attributes = [
            'name' => $data['name'],
        ];

        if (array_key_exists('author_name', $data)) {
            $attributes['author_name'] = $data['author_name'] ?: null;
        }

        if (array_key_exists('whatsapp', $data)) {
            $attributes['whatsapp'] = $data['whatsapp'] ?: null;
        }

        $user->update($attributes);
    }

    private function removeOldPhotoFile(?string $currentPhoto): void
    {
        if (empty($currentPhoto) || $currentPhoto === 'profiles/placeholder_profile.webp') {
            return;
        }

        try {
            if (str_starts_with($currentPhoto, '/storage/') || str_starts_with($currentPhoto, 'storage/')) {
                $rel = preg_replace('#^/?storage/#', '', $currentPhoto);
                Storage::disk('public')->delete($rel);
            } elseif (str_starts_with($currentPhoto, 'profiles/')) {
                Storage::disk('s3')->delete($currentPhoto);
                Storage::disk('public')->delete($currentPhoto);
            }
        } catch (Throwable) {
            // Abaikan kesalahan penghapusan file lama jika storage sedang tidak tersedia
        }
    }

    // ---- Client accounts ----

    public function createClientAccount(Order $order): User
    {
        return $order->client ?? $this->createClient($order);
    }

    public function normalizeClientEmail(Order $order, User $user): void
    {
        $expected = $order->clientEmail();
        if ($user->email === $expected) {
            return;
        }
        if (User::where('email', $expected)->where('id', '!=', $user->id)->exists()) {
            return;
        }
        $user->update(['email' => $expected]);
    }

    public function syncClientAccountFromOrder(Order $order): User
    {
        $user = $order->client;
        if (! $user) {
            return $this->createClientAccount($order);
        }

        $user->update([
            'name' => $order->full_name,
            'email' => $order->clientEmail(),
            'whatsapp' => $order->whatsapp,
        ]);

        return $user;
    }

    private function createClient(Order $order): User
    {
        $name = $order->clientEmailName();
        $email = $order->clientEmail($name);
        if (User::where('email', $email)->exists()) {
            $email = $order->clientEmailWithOrderNumber($name);
        }

        $user = User::create([
            'name' => $order->full_name,
            'email' => $email,
            'whatsapp' => $order->whatsapp,
            'password' => Hash::make(self::DEFAULT_PASSWORD),
            'role' => Role::Klien,
        ]);
        $order->update(['client_id' => $user->id, 'domain_final' => $order->domain_name]);
        return $user;
    }
}
