@extends('layouts.dashboard')

@section('title', $mode === 'create' ? 'Tulis Artikel Baru - Bidtech' : ($mode === 'edit' ? 'Edit Artikel - Bidtech' : 'Kelola Artikel - Bidtech'))

@if($mode === 'create' || $mode === 'edit')
    @section('immersive', 'true')
@endif

@section('content')
@if($mode === 'create' || $mode === 'edit')
    <div id="article-editor-root" data-article-editor-root>
        <div class="min-h-dvh bg-canvas" aria-label="Memuat editor artikel">
            <div class="flex h-18 items-center justify-between border-b border-border bg-white px-8 max-md:h-15 max-md:px-4">
                <span class="h-3.5 w-28 animate-pulse rounded-full bg-border"></span>
                <span class="h-3.5 w-20 animate-pulse rounded-full bg-border max-md:hidden"></span>
                <span class="h-3.5 w-36 animate-pulse rounded-full bg-border"></span>
            </div>
            <div class="overflow-hidden border border-border bg-white max-md:border-0">
                <div class="min-h-[31rem] animate-pulse bg-gradient-to-r from-[#dfe6e2] via-[#edf1ef] to-[#dfe6e2] md:max-xl:min-h-[25rem] max-md:min-h-[29rem]"></div>
                <div class="mx-auto grid w-full max-w-[47.5rem] gap-4 px-5 py-16">
                    <span class="h-3.5 w-full animate-pulse rounded-full bg-[#edf1ef]"></span>
                    <span class="h-3.5 w-[86%] animate-pulse rounded-full bg-[#edf1ef]"></span>
                    <span class="h-3.5 w-[94%] animate-pulse rounded-full bg-[#edf1ef]"></span>
                    <span class="h-3.5 w-[62%] animate-pulse rounded-full bg-[#edf1ef]"></span>
                </div>
            </div>
        </div>
    </div>
    <script id="article-editor-data" type="application/json">{!! json_encode($editorData, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@else
    <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Kelola Artikel</h1>
                <p class="text-sm text-slate-500 mt-1">Daftar artikel blog dan publikasi media Bidtech.</p>
            </div>
            @if(auth()->user()->canWriteArticles())
                <a href="{{ route('dashboard.articles.create') }}"
                   class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-xs">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                    <span>Tulis Artikel Baru</span>
                </a>
            @endif
        </div>

        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <form method="GET" action="{{ route('dashboard.articles.index') }}" class="flex flex-wrap gap-3">
                <div class="relative flex-1 min-w-[200px]">
                    <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                    <input type="text" name="search" value="{{ $filters['search'] }}"
                           placeholder="Cari judul artikel..."
                           class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50">
                </div>
                <select name="created_by" onchange="this.form.submit()"
                        class="px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 text-slate-700">
                    <option value="">Semua Penulis</option>
                    @foreach($creators as $creator)
                        <option value="{{ $creator->id }}" {{ (string) $filters['created_by'] === (string) $creator->id ? 'selected' : '' }}>
                            {{ $creator->name }}
                        </option>
                    @endforeach
                </select>
                <select name="status" onchange="this.form.submit()"
                        class="px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 text-slate-700">
                    <option value="">Semua Status</option>
                    @foreach(\App\Enums\ArticleStatus::cases() as $statusOption)
                        <option value="{{ $statusOption->value }}" {{ $filters['status'] === $statusOption->value ? 'selected' : '' }}>
                            {{ $statusOption->label() }}
                        </option>
                    @endforeach
                </select>
                <button type="submit" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-semibold transition">Filter</button>
                @if(request()->anyFilled(['search', 'status']) || request()->has('created_by'))
                    <a href="{{ route('dashboard.articles.index') }}" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition text-center">Reset</a>
                @endif
            </form>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div class="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4 flex-wrap">
                <p class="text-xs font-bold text-slate-600 uppercase tracking-wider">Daftar Artikel ({{ $articles->total() }})</p>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <th class="py-3.5 px-4">Judul Artikel</th>
                            <th class="py-3.5 px-4">Status</th>
                            <th class="py-3.5 px-4">Penulis</th>
                            <th class="py-3.5 px-4">Tanggal</th>
                            <th class="py-3.5 px-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm">
                        @forelse($articles as $article)
                            <tr class="hover:bg-slate-50/80 transition">
                                <td class="py-3.5 px-4">
                                    <a href="{{ route('dashboard.articles.edit', $article) }}" class="font-semibold text-slate-900 hover:text-emerald-600 transition">
                                        {{ $article->title ?: 'Artikel tanpa judul' }}
                                    </a>
                                    <p class="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                                        <span class="font-mono text-slate-500">{{ $article->slug ? '/blog/'.$article->slug : 'Slug dibuat setelah judul diisi' }}</span>
                                        @if($article->slug && $article->status === \App\Enums\ArticleStatus::Terbit)
                                            <a href="{{ rtrim(config('app.frontend_url', 'http://localhost:3000'), '/') . '/blog/' . $article->slug }}"
                                               target="_blank" rel="noopener noreferrer"
                                               title="Lihat artikel di website publik"
                                               class="inline-flex items-center gap-0.5 text-[11px] text-emerald-600 hover:text-emerald-800 hover:underline">
                                                <i data-lucide="external-link" class="w-3 h-3"></i>
                                                <span>Buka di Web</span>
                                            </a>
                                        @endif
                                    </p>
                                </td>
                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        {{ $article->status === \App\Enums\ArticleStatus::Terbit ? 'bg-emerald-100 text-emerald-800' : ($article->status === \App\Enums\ArticleStatus::Draft ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-800') }}">
                                        {{ $article->status->label() }}
                                    </span>
                                </td>
                                <td class="py-3.5 px-4 whitespace-nowrap text-xs text-slate-600">
                                    {{ $article->creator?->displayAuthorName() ?? 'Bidtech Media' }}
                                </td>
                                <td class="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                                    {{ $article->created_at->format('d M Y') }}
                                </td>
                                <td class="py-3.5 px-4 text-right whitespace-nowrap">
                                    <a href="{{ route('dashboard.articles.edit', $article) }}"
                                       class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition">
                                        <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                                        <span>{{ auth()->user()->canWriteArticles() ? 'Edit' : 'Lihat' }}</span>
                                    </a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="py-12 text-center text-slate-400">
                                    <i data-lucide="newspaper" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                    <p class="text-sm font-medium">Belum ada artikel yang dibuat.</p>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            @if($articles->hasPages())
                <div class="p-4 border-t border-slate-100">
                    {{ $articles->links() }}
                </div>
            @endif
        </div>
    </div>
@endif
@endsection

@push('scripts')
@if($mode === 'create' || $mode === 'edit')
    @vite('resources/js/articles/editor.jsx')
@endif
@endpush
