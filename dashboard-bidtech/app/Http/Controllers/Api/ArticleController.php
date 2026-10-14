<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * API publik artikel untuk frontend Next.js (CORS terbuka, read-only).
 * Hanya menyajikan artikel berstatus Terbit.
 */
class ArticleController extends Controller
{
    /**
     * Daftar artikel publik (hanya berstatus Terbit).
     */
    public function index(Request $request, ArticleService $articles): JsonResponse
    {
        $search = $request->filled('search') ? (string) $request->search : null;
        $perPage = min(max($request->integer('per_page', 9), 1), 30);

        $result = $articles->publicList($search, $perPage);

        return $this->corsResponse([
            'status' => 'success',
            'message' => 'Daftar artikel publik berhasil diambil',
            'data' => $result['data'],
            'meta' => $result['meta'],
        ]);
    }

    /**
     * Detail artikel publik berdasarkan slug (hanya berstatus Terbit).
     */
    public function show(string $slug, ArticleService $articles): JsonResponse
    {
        $result = $articles->publicFind($slug);

        if (! $result || $result['status'] !== 200) {
            $code = $result['status'] ?? 404;
            $msg = $result['message'] ?? 'Artikel tidak ditemukan';

            return $this->corsResponse([
                'status' => 'error',
                'message' => $msg,
            ], $code);
        }

        return $this->corsResponse([
            'status' => 'success',
            'data' => $result['data'],
        ]);
    }

    private function corsResponse(array $data, int $status = 200): JsonResponse
    {
        return response()->json($data, $status, [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, OPTIONS',
            'Access-Control-Allow-Headers' => 'Origin, Content-Type, Accept, Authorization, X-Requested-With',
        ]);
    }
}
