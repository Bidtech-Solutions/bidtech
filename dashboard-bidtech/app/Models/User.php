<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Database\Factories\UserFactory;
use App\Enums\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'role',
        'name',
        'email',
        'whatsapp',
        'password',
        'author_name',
        'photo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password'          => 'hashed',
            'role'              => Role::class,
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'client_id');
    }

    public function latestOrder(): HasOne
    {
        return $this->hasOne(Order::class, 'client_id')->latestOfMany();
    }

    public function partner(): HasOne
    {
        return $this->hasOne(Partner::class);
    }

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'created_by');
    }

    /**
     * Cek apakah user adalah admin
     */
    public function isAdmin(): bool
    {
        return $this->role === Role::Admin;
    }

    /**
     * Cek apakah user adalah tim media (penulis/editor artikel)
     */
    public function isMedia(): bool
    {
        return $this->role === Role::Media;
    }

    public function isMarketing(): bool { return $this->role === Role::Marketing; }
    public function isKlien(): bool { return $this->role === Role::Klien; }
    public function isMitra(): bool { return $this->role === Role::Mitra; }

    /**
     * Hanya media yang boleh membuat, mengedit, dan mempublikasikan artikel (termasuk unggah gambarnya).
     */
    public function canWriteArticles(): bool
    {
        return $this->isMedia();
    }

    /**
     * Media dan admin bisa melihat semua artikel serta menonaktifkan, mengaktifkan, dan menghapusnya
     * (tidak ada pengecekan kepemilikan).
     */
    public function canModerateArticles(): bool
    {
        return $this->isMedia() || $this->isAdmin();
    }

    /**
     * Nama byline publik yang tampil di artikel. Fallback ke nama akun bila belum diisi.
     */
    public function displayAuthorName(): string
    {
        return $this->author_name ?: $this->name;
    }

    /**
     * URL foto profil pada object storage S3-compatible (prefix "profiles/"), fallback ke placeholder.
     */
    public function getPhotoUrlAttribute(): string
    {
        if (str_starts_with($this->photo ?? '', 'http://') || str_starts_with($this->photo ?? '', 'https://')) {
            return $this->photo;
        }

        if (str_starts_with($this->photo ?? '', '/storage/') || str_starts_with($this->photo ?? '', 'storage/')) {
            return asset($this->photo);
        }

        $path = !empty($this->photo) ? ltrim($this->photo, '/') : 'profiles/placeholder_profile.webp';

        try {
            $bucket = config('filesystems.disks.s3.bucket');
            $url = config('filesystems.disks.s3.url');

            if (empty($bucket) && empty($url)) {
                return 'https://media.bidtech.co.id/bidtech/' . $path;
            }

            return Storage::disk('s3')->url($path);
        } catch (\Throwable) {
            return 'https://media.bidtech.co.id/bidtech/' . $path;
        }
    }
}
