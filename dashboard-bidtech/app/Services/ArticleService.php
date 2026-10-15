<?php

namespace App\Services;

use App\Enums\ArticleImageStatus;
use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Models\ArticleImage;
use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Throwable;

class ArticleService
{
    private const CONTENT_FIELDS = ['title', 'content', 'cover_image_url', 'cover_alt_text'];

    private const MIME_EXTENSIONS = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/avif' => 'avif',
        'image/gif' => 'gif',
    ];

    public function list(?int $createdBy = null, ?string $status = null, ?string $search = null): array
    {
        $query = Article::query()->with(['creator']);
        if ($createdBy !== null) {
            $query->where('created_by', $createdBy);
        }
        if ($status !== null) {
            $query->where('status', $status);
        }
        if ($search !== null && $search !== '') {
            $query->where('title', 'like', "%{$search}%");
        }

        return [
            'articles' => $query->orderByDesc('id')->paginate(15)->withQueryString(),
            'creators' => User::where('role', Role::Media)->orderBy('name')->get(['id', 'name']),
            'filters' => ['created_by' => $createdBy, 'status' => $status, 'search' => $search],
        ];
    }

    public function publicList(?string $search = null, int $perPage = 9): array
    {
        $query = Article::query()
            ->where('status', ArticleStatus::Terbit)
            ->with(['creator']);

        if ($search !== null && trim($search) !== '') {
            $query->where('title', 'like', '%'.trim($search).'%');
        }

        $paginator = $query->orderByDesc('published_at')->orderByDesc('id')->paginate($perPage);

        return [
            'data' => collect($paginator->items())->map(fn (Article $a) => $this->articleSummaryData($a))->values()->all(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
            ],
        ];
    }

    public function publicFind(string $slug): ?array
    {
        $article = Article::query()
            ->where('status', ArticleStatus::Terbit)
            ->where('slug', $slug)
            ->with(['creator'])
            ->first();

        if ($article) {
            return [
                'status' => 200,
                'data' => $this->articleData($article),
            ];
        }

        $inactiveOrTrashed = Article::withTrashed()->where('slug', $slug)->first();
        if ($inactiveOrTrashed) {
            if ($inactiveOrTrashed->trashed()) {
                return [
                    'status' => 410,
                    'message' => 'Artikel telah dihapus.',
                ];
            }

            return [
                'status' => 404,
                'message' => 'Artikel tidak tersedia atau belum dipublikasikan.',
            ];
        }

        return [
            'status' => 404,
            'message' => 'Artikel tidak ditemukan.',
        ];
    }

    public function articleSummaryData(Article $article): array
    {
        $article->loadMissing('creator');
        $derived = $this->deriveContentMetadata($article->content ?? []);

        return [
            'id' => $article->id,
            'title' => $article->title ?? '',
            'slug' => $article->slug,
            'excerpt' => $article->excerpt ?: $derived['meta_description'],
            'cover_image_url' => $article->cover_image_url,
            'cover_display_url' => $article->cover_image_url ?: config('articles.cover_placeholder_url'),
            'cover_alt_text' => $article->cover_image_url ? ($article->title ?? '') : '',
            'author' => [
                'name' => $article->creator?->displayAuthorName() ?? 'Bidtech Media',
                'photo_url' => $article->creator?->photo_url,
            ],
            'published_at' => $article->published_at?->toIso8601String(),
            'reading_minutes' => $derived['reading_minutes'],
        ];
    }

    public function create(array $data, User $user): Article
    {
        return $this->createDraft($data, $user);
    }

    public function createDraft(array $data, User $user): Article
    {
        $title = $this->cleanTitle($data['title'] ?? null);
        $coverUrl = $this->resolveCoverUrl(null, $data, $user);

        return DB::transaction(function () use ($data, $user, $title, $coverUrl) {
            $article = Article::create([
                'title' => $title,
                'slug' => $this->generateUniqueSlug($title),
                'excerpt' => null,
                'content' => $data['content'] ?? [],
                'cover_image_url' => $coverUrl,
                'cover_alt_text' => $coverUrl ? $title : null,
                'status' => ArticleStatus::Draft,
                'content_updated_at' => now(),
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ]);
            return $article->load('creator');
        });
    }

    /** Autosave is intentionally silent in the audit log. */
    public function autosaveDraft(Article $article, array $data, User $user): Article
    {
        if ($article->status !== ArticleStatus::Draft) {
            throw ValidationException::withMessages([
                'status' => 'Autosave hanya tersedia untuk artikel berstatus draf.',
            ]);
        }

        return DB::transaction(function () use ($article, $data, $user) {
            $this->fillEditableFields($article, $data, $user, regenerateDraftSlug: true);
            $article->save();

            return $article->load('creator');
        });
    }

    /** Explicit save used by published/non-active articles. */
    public function update(Article $article, array $data, User $user): Article
    {
        return DB::transaction(function () use ($article, $data, $user) {
            $this->fillEditableFields(
                $article,
                $data,
                $user,
                regenerateDraftSlug: $article->status === ArticleStatus::Draft,
            );
            $article->save();
            return $article->load('creator');
        });
    }

    public function publish(Article $article, User $user): Article
    {
        if (blank($article->slug) && filled($article->title)) {
            $article->slug = $this->generateUniqueSlug($article->title, $article->id);
        }

        $contentErrors = $this->checkContent($article->content);
        if (blank($article->title) || blank($article->slug) || $contentErrors !== [] || ! $this->hasMeaningfulContent($article->content)) {
            $messages = ['status' => 'Artikel belum bisa diterbitkan: judul dan isi artikel wajib terisi dengan benar.'];
            if ($contentErrors !== []) {
                $messages['content'] = $contentErrors;
            }
            throw ValidationException::withMessages($messages);
        }

        return DB::transaction(function () use ($article, $user) {
            $article->status = ArticleStatus::Terbit;
            $article->cover_alt_text = $article->cover_image_url ? $article->title : null;
            $article->updated_by = $user->id;
            if ($article->published_at === null) {
                $article->published_at = now();
            }
            $article->save();
            return $article->load('creator');
        });
    }

    public function deactivate(Article $article, User $user): Article
    {
        return DB::transaction(function () use ($article, $user) {
            $article->status = ArticleStatus::Nonaktif;
            $article->updated_by = $user->id;
            $article->save();
            return $article;
        });
    }

    public function activate(Article $article, User $user): Article
    {
        return DB::transaction(function () use ($article, $user) {
            $article->status = ArticleStatus::Terbit;
            $article->updated_by = $user->id;
            $article->content_updated_at = now();
            $article->save();
            return $article;
        });
    }

    public function delete(Article $article, User $user): void
    {
        DB::transaction(function () use ($article, $user) {
            $article->delete();
        });
    }

    /** Canonical editor representation with system-derived metadata. */
    public function articleData(Article $article): array
    {
        $article->loadMissing('creator');
        $derived = $this->deriveContentMetadata($article->content ?? []);

        return [
            'id' => $article->id,
            'title' => $article->title ?? '',
            'slug' => $article->slug,
            'status' => $article->status->value,
            'status_label' => $article->status->label(),
            'content' => $article->content ?? [],
            'cover_image_url' => $article->cover_image_url,
            'cover_display_url' => $article->cover_image_url ?: config('articles.cover_placeholder_url'),
            'cover_alt_text' => $article->cover_image_url ? ($article->title ?? '') : '',
            'cover_placeholder_url' => config('articles.cover_placeholder_url'),
            'author' => [
                'name' => $article->creator?->displayAuthorName() ?? 'Bidtech Media',
                'photo_url' => $article->creator?->photo_url,
            ],
            'published_at' => $article->published_at?->toIso8601String(),
            'created_at' => $article->created_at?->toIso8601String(),
            'updated_at' => $article->updated_at?->toIso8601String(),
            'meta_title' => $article->title ?? '',
            'meta_description' => $derived['meta_description'],
            'character_count' => $derived['character_count'],
            'reading_minutes' => $derived['reading_minutes'],
        ];
    }

    public function deriveContentMetadata(array $blocks): array
    {
        $parts = [];
        $this->collectText($blocks, $parts);
        $plainText = trim((string) preg_replace('/\s+/u', ' ', implode(' ', $parts)));
        $characters = mb_strlen($plainText);

        return [
            'plain_text' => $plainText,
            'meta_description' => $characters === 0 ? '' : mb_substr($plainText, 0, 120),
            'character_count' => $characters,
            'reading_minutes' => $characters === 0 ? 0 : max(1, (int) ceil($characters / 2500)),
        ];
    }

    // ---- Images ----

    public function uploadImage(UploadedFile $file, User $user): ArticleImage
    {
        $config = config('articles.image_upload');
        $mime = $file->getMimeType();
        $size = $file->getSize();

        if (! in_array($mime, $config['allowed_mimes'], true)) {
            throw ValidationException::withMessages(['image' => 'Tipe file tidak diizinkan. Hanya JPG, PNG, WebP, AVIF, atau GIF.']);
        }
        $maxBytes = $config['max_size_kb'] * 1024;
        if ($size <= 0 || $size > $maxBytes) {
            throw ValidationException::withMessages([
                'image' => 'Ukuran file melebihi batas maksimum '.($config['max_size_kb'] / 1024).' MB.',
            ]);
        }

        $dimensions = @getimagesize($file->getRealPath());
        if ($dimensions === false || ($dimensions[0] ?? 0) < 1 || ($dimensions[1] ?? 0) < 1) {
            throw ValidationException::withMessages(['image' => 'Isi file bukan gambar yang valid.']);
        }

        $filename = Str::uuid().'.'.self::MIME_EXTENSIONS[$mime];
        $storedPath = null;

        $isFake = Storage::disk('s3') instanceof \Illuminate\Support\Testing\Fakes\StorageFake;
        $hasCredentials = !empty(config('filesystems.disks.s3.key')) && !empty(config('filesystems.disks.s3.secret'));
        $endpoint = config('filesystems.disks.s3.endpoint');

        $tryS3 = $isFake || $hasCredentials;
        if ($tryS3 && ! $isFake && $endpoint) {
            $parsed = parse_url($endpoint);
            $host = $parsed['host'] ?? '127.0.0.1';
            $port = $parsed['port'] ?? (($parsed['scheme'] ?? 'http') === 'https' ? 443 : 80);
            $fp = @fsockopen($host, $port, $errno, $errstr, 0.5);
            if (! $fp) {
                $tryS3 = false;
            } else {
                fclose($fp);
            }
        }

        // Coba upload ke S3 terlebih dahulu
        if ($tryS3) {
            try {
                $disk = Storage::disk('s3');
                $path = $disk->putFileAs($config['final_prefix'], $file, $filename);
                if ($path) {
                    $storedPath = $path;
                }
            } catch (Throwable $exception) {
                report($exception);
                $storedPath = null;
            }
        }

        // Fallback: Jika S3/RustFS tidak aktif atau kredensial kosong, simpan ke storage public lokal
        if (! $storedPath) {
            try {
                $publicPath = Storage::disk('public')->putFileAs('articles', $file, $filename);
                if ($publicPath) {
                    $storedPath = '/storage/' . $publicPath;
                }
            } catch (Throwable $exception) {
                report($exception);
                throw ValidationException::withMessages(['image' => 'Gagal menyimpan gambar. Silakan coba kembali.']);
            }
        }

        if (! $storedPath) {
            Log::error('Gagal menyimpan gambar artikel ke storage.', [
                'bucket' => config('filesystems.disks.s3.bucket'),
                'endpoint' => config('filesystems.disks.s3.endpoint'),
                'path' => $config['final_prefix'].'/'.$filename,
            ]);
            throw ValidationException::withMessages(['image' => 'Gagal menyimpan gambar. Silakan coba kembali.']);
        }

        try {
            return ArticleImage::create([
                'uploaded_by' => $user->id,
                'tmp_path' => null,
                'disk_path' => $storedPath,
                'original_filename' => $file->getClientOriginalName(),
                'mime_type' => $mime,
                'size' => $size,
                'width' => (int) $dimensions[0],
                'height' => (int) $dimensions[1],
                'status' => ArticleImageStatus::Ready,
            ]);
        } catch (Throwable $exception) {
            if (str_starts_with($storedPath, '/storage/') || str_starts_with($storedPath, 'storage/')) {
                $rel = preg_replace('#^/?storage/#', '', $storedPath);
                Storage::disk('public')->delete($rel);
            } else {
                Storage::disk('s3')->delete($storedPath);
            }
            throw $exception;
        }
    }

    // ---- Validation ----

    public function checkSlug(string $slug, ?int $ignoreArticleId = null): ?string
    {
        $articles = Article::withTrashed()->where('slug', $slug);
        if ($ignoreArticleId) {
            $articles->where('id', '!=', $ignoreArticleId);
        }
        if ($articles->exists()) {
            return 'Slug ini sudah dipakai artikel lain.';
        }

        return null;
    }

    public function checkContent(mixed $blocks, bool $allowEmpty = false): array
    {
        if (! is_array($blocks)) {
            return ['Isi artikel tidak valid.'];
        }
        if ($blocks === []) {
            return $allowEmpty ? [] : ['Isi artikel tidak boleh kosong.'];
        }

        $errors = [];
        foreach ($blocks as $index => $block) {
            $this->checkBlock($block, (string) ($index + 1), $errors, $allowEmpty);
        }

        return $errors;
    }

    private function fillEditableFields(Article $article, array $data, User $user, bool $regenerateDraftSlug): void
    {
        $title = $this->cleanTitle($data['title'] ?? null);
        $coverUrl = $this->resolveCoverUrl($article, $data, $user);
        $next = [
            'title' => $title,
            'content' => $data['content'] ?? [],
            'cover_image_url' => $coverUrl,
            'cover_alt_text' => $coverUrl ? $title : null,
        ];

        if ($regenerateDraftSlug) {
            $next['slug'] = $this->generateUniqueSlug($title, $article->id);
        } elseif (blank($article->slug)) {
            $next['slug'] = $this->generateUniqueSlug($title, $article->id);
        }

        if ($this->contentChanged($article, $next)) {
            $article->content_updated_at = now();
        }

        $article->fill($next);
        $article->updated_by = $user->id;
    }

    private function resolveCoverUrl(?Article $article, array $data, User $user): ?string
    {
        if (($data['remove_cover'] ?? false) === true) {
            return null;
        }

        if (! empty($data['cover_image_id'])) {
            $image = ArticleImage::find($data['cover_image_id']);
            if (! $image || $image->status !== ArticleImageStatus::Ready || blank($image->disk_path)) {
                throw ValidationException::withMessages(['cover_image_id' => 'Aset cover belum siap atau tidak ditemukan.']);
            }

            return $image->publicUrl();
        }

        if (($data['cover_image'] ?? null) instanceof UploadedFile) {
            return $this->uploadCoverImage($data['cover_image'], $user);
        }

        // Internal callers such as seeders may provide a known public URL. HTTP
        // FormRequests never whitelist this key, so browsers cannot inject it.
        if (array_key_exists('cover_image_url', $data)) {
            return $data['cover_image_url'] ?: null;
        }

        return $article?->cover_image_url;
    }

    private function cleanTitle(mixed $title): ?string
    {
        $value = trim((string) ($title ?? ''));

        return $value === '' ? null : $value;
    }

    private function generateUniqueSlug(?string $title, ?int $ignoreArticleId = null): ?string
    {
        $base = rtrim(substr(Str::slug((string) $title), 0, 210), '-');
        if ($base === '') {
            return null;
        }

        $candidate = $base;
        $suffix = 2;
        while ($this->checkSlug($candidate, $ignoreArticleId) !== null) {
            $suffixText = '-'.$suffix++;
            $candidate = rtrim(substr($base, 0, 220 - strlen($suffixText)), '-').$suffixText;
        }

        return $candidate;
    }

    private function contentChanged(Article $article, array $data): bool
    {
        foreach (self::CONTENT_FIELDS as $field) {
            if (array_key_exists($field, $data) && $data[$field] !== $article->{$field}) {
                return true;
            }
        }

        return false;
    }

    private function uploadCoverImage(UploadedFile $file, User $user): string
    {
        try {
            return (string) $this->uploadImage($file, $user)->publicUrl();
        } catch (ValidationException $exception) {
            throw ValidationException::withMessages([
                'cover_image' => $exception->errors()['image'] ?? ['Gagal mengunggah cover.'],
            ]);
        }
    }

    private function checkBlock(mixed $block, string $position, array &$errors, bool $allowIncomplete): void
    {
        if (! is_array($block) || ! isset($block['type'])) {
            $errors[] = "Blok ke-{$position} tidak memiliki struktur yang valid.";

            return;
        }

        $type = $block['type'];
        if (! in_array($type, config('articles.allowed_block_types', []), true)) {
            $errors[] = "Blok ke-{$position} memakai tipe '{$type}' yang tidak diizinkan.";

            return;
        }

        if ($type === 'heading') {
            $level = $block['props']['level'] ?? null;
            if ($level === 1 || $level === '1') {
                $errors[] = "Blok ke-{$position}: heading H1 tidak diperbolehkan di isi artikel (judul H1 diisi manual di hero).";
            } elseif ($level !== null && ! in_array((int) $level, config('articles.allowed_heading_levels', []), true)) {
                $errors[] = "Blok ke-{$position}: level heading tidak diizinkan.";
            }
        }

        if (! $allowIncomplete && $type === 'image') {
            $alt = $block['props']['alt'] ?? $block['props']['caption'] ?? null;
            if (blank($alt)) {
                $errors[] = "Blok ke-{$position}: gambar dalam isi artikel wajib memiliki caption/alt text.";
            }
        }

        foreach (($block['children'] ?? []) as $childIndex => $child) {
            $this->checkBlock($child, $position.'.'.($childIndex + 1), $errors, $allowIncomplete);
        }
    }

    private function collectText(mixed $value, array &$parts): void
    {
        if (! is_array($value)) {
            return;
        }

        if (($value['type'] ?? null) === 'text' && isset($value['text']) && is_string($value['text'])) {
            $parts[] = $value['text'];

            return;
        }

        foreach ($value as $key => $nested) {
            if ($key === 'url') {
                continue;
            }
            $this->collectText($nested, $parts);
        }
    }

    private function hasMeaningfulContent(array $blocks): bool
    {
        if ($this->deriveContentMetadata($blocks)['character_count'] > 0) {
            return true;
        }

        foreach ($blocks as $block) {
            if (($block['type'] ?? null) === 'image' && filled($block['props']['url'] ?? null)) {
                return true;
            }
            if ($this->hasMeaningfulContent($block['children'] ?? [])) {
                return true;
            }
        }

        return false;
    }
}
