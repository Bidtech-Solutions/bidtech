<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TemplateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * API publik katalog template untuk frontend Next.js (CORS terbuka).
 */
class TemplateController extends Controller
{
    /**
     * Daftar template aktif beserta kategori dan rincian harga.
     */
    public function index(Request $request, TemplateService $templates): JsonResponse
    {
        $result = $templates->listPublic(
            $request->has('include_inactive'),
            $request->filled('category') ? (string) $request->category : null,
            $request->filled('search') ? (string) $request->search : null,
        );

        return $this->corsResponse([
            'status' => 'success',
            'message' => 'Data template berhasil diambil',
            'count' => $result['data']->count(),
            'categories' => $result['categories'],
            'data' => $result['data'],
        ]);
    }

    /**
     * Detail satu template.
     */
    public function show(int $id, TemplateService $templates): JsonResponse
    {
        $template = $templates->findPublic($id);

        if (! $template) {
            return $this->notFound();
        }

        return $this->corsResponse(['status' => 'success', 'data' => $template]);
    }

    /**
     * Hitung penayangan (view counter) template.
     */
    public function trackView(int $id, TemplateService $templates): JsonResponse
    {
        $result = $templates->trackView($id);

        if (! $result) {
            return $this->notFound();
        }

        return $this->corsResponse([
            'status' => 'success',
            'message' => 'View count berhasil diperbarui',
            'id' => $result['id'],
            'name' => $result['name'],
            'views' => $result['views'],
        ]);
    }

    /**
     * Data realtime views untuk live polling dashboard admin.
     */
    public function realtimeStats(): JsonResponse
    {
        $totalViews = (int) \App\Models\Template::sum('views');
        $items = \App\Models\Template::select('id', 'name', 'views')->get();

        return $this->corsResponse([
            'status' => 'success',
            'total_views' => $totalViews,
            'templates' => $items,
        ]);
    }

    private function notFound(): JsonResponse
    {
        return $this->corsResponse(['status' => 'error', 'message' => 'Template tidak ditemukan'], 404);
    }

    private function corsResponse(array $data, int $status = 200): JsonResponse
    {
        return response()->json($data, $status, [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Origin, Content-Type, Accept, Authorization, X-Requested-With',
        ]);
    }
}
