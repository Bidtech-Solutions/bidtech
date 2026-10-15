<?php

namespace App\Models;

use App\Enums\ArticleImageStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ArticleImage extends Model
{
    protected $fillable = [
        'uploaded_by',
        'tmp_path',
        'disk_path',
        'original_filename',
        'mime_type',
        'size',
        'width',
        'height',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => ArticleImageStatus::class,
        ];
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /** URL publik gambar artikel pada object storage S3-compatible. */
    public function publicUrl(): ?string
    {
        if (! $this->disk_path) {
            return null;
        }

        if (str_starts_with($this->disk_path, 'http://') || str_starts_with($this->disk_path, 'https://')) {
            return $this->disk_path;
        }

        if (str_starts_with($this->disk_path, '/storage/') || str_starts_with($this->disk_path, 'storage/')) {
            return asset($this->disk_path);
        }

        try {
            $bucket = config('filesystems.disks.s3.bucket');
            $url = config('filesystems.disks.s3.url');

            if (empty($bucket) && empty($url)) {
                return 'https://media.bidtech.co.id/bidtech/' . ltrim($this->disk_path, '/');
            }

            return Storage::disk('s3')->url($this->disk_path);
        } catch (\Throwable) {
            return 'https://media.bidtech.co.id/bidtech/' . ltrim($this->disk_path, '/');
        }
    }
}
