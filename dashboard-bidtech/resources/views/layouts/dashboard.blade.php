<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Dashboard Admin - Bidtech')</title>

    <!-- Google Fonts: Inter & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest" defer></script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
@php($immersive = trim($__env->yieldContent('immersive')) === 'true')
<body class="bg-canvas text-ink antialiased min-h-screen font-sans {{ $immersive ? 'block' : 'flex' }}">

    @unless($immersive)
    {{-- Initial Page Load Skeleton Screen --}}
    <div id="dashboard-page-skeleton" class="page-skeleton-overlay fixed inset-0 z-[100] bg-canvas flex overflow-hidden" aria-hidden="true">
        <!-- Sidebar Skeleton -->
        <aside class="w-64 bg-surface border-r border-border p-6 flex flex-col justify-between shrink-0 hidden md:flex">
            <div class="space-y-6">
                <div class="h-8 w-32 rounded-lg bg-slate-200 animate-shimmer"></div>
                <div class="space-y-2.5 pt-4">
                    @foreach([1, 2, 3] as $item)
                        <div class="h-11 w-full rounded-2xl bg-slate-100 animate-shimmer flex items-center gap-3 px-3.5">
                            <div class="size-5 rounded-lg bg-slate-200"></div>
                            <div class="h-4 w-28 rounded-md bg-slate-200"></div>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="pt-4 border-t border-border flex items-center gap-3">
                <div class="size-10 rounded-full bg-slate-200 animate-shimmer shrink-0"></div>
                <div class="space-y-1.5 flex-1">
                    <div class="h-3.5 w-24 rounded bg-slate-200 animate-shimmer"></div>
                    <div class="h-3 w-32 rounded bg-slate-100 animate-shimmer"></div>
                </div>
            </div>
        </aside>
        <!-- Main Content Skeleton -->
        <main class="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto space-y-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="space-y-2">
                    <div class="h-8 w-64 rounded-xl bg-slate-200 animate-shimmer"></div>
                    <div class="h-4 w-48 rounded-md bg-slate-100 animate-shimmer"></div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="h-10 w-28 rounded-xl bg-slate-200 animate-shimmer"></div>
                    <div class="h-10 w-36 rounded-xl bg-emerald-100 animate-shimmer"></div>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach([1, 2, 3] as $stat)
                    <div class="rounded-3xl border border-border bg-surface p-6 space-y-4 shadow-xs">
                        <div class="flex items-center justify-between">
                            <div class="h-4 w-24 rounded bg-slate-200 animate-shimmer"></div>
                            <div class="size-10 rounded-2xl bg-emerald-50 animate-shimmer"></div>
                        </div>
                        <div class="h-8 w-36 rounded-lg bg-slate-200 animate-shimmer"></div>
                        <div class="h-3.5 w-28 rounded bg-slate-100 animate-shimmer"></div>
                    </div>
                @endforeach
            </div>
            <div class="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">
                <div class="flex items-center justify-between border-b border-border pb-5">
                    <div class="space-y-1.5">
                        <div class="h-6 w-44 rounded-lg bg-slate-200 animate-shimmer"></div>
                        <div class="h-3.5 w-60 rounded bg-slate-100 animate-shimmer"></div>
                    </div>
                    <div class="h-9 w-24 rounded-xl bg-slate-100 animate-shimmer"></div>
                </div>
                <div class="space-y-3">
                    @foreach([1, 2, 3, 4] as $row)
                        <div class="h-14 w-full rounded-2xl bg-slate-50 animate-shimmer border border-border-light flex items-center justify-between px-4">
                            <div class="flex items-center gap-3">
                                <div class="size-8 rounded-xl bg-slate-200"></div>
                                <div class="h-4 w-32 rounded bg-slate-200"></div>
                            </div>
                            <div class="h-4 w-20 rounded bg-slate-200"></div>
                        </div>
                    @endforeach
                </div>
            </div>
        </main>
    </div>

    <!-- ================= SIDEBAR ================= -->
    @include('components.sidebar')
    @endunless

    <!-- ================= KONTEN UTAMA ================= -->
    <main class="{{ $immersive ? 'min-h-screen w-full' : 'flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto min-h-screen' }}">
        @unless($immersive)
        <!-- Flash Message Alerts -->
        @if(session('success'))
            <div class="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-success-surface border border-primary-200 text-success text-sm font-medium shadow-xs">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-success shrink-0"></i>
                <span>{{ session('success') }}</span>
            </div>
        @endif

        @if(session('warning'))
            <div class="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-warning-surface border border-warning/20 text-warning-text text-sm font-medium shadow-xs">
                <i data-lucide="alert-triangle" class="w-5 h-5 text-warning shrink-0"></i>
                <span>{{ session('warning') }}</span>
            </div>
        @endif

        @if(session('error'))
            <div class="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-danger-bg border border-danger/20 text-danger-text text-sm font-medium shadow-xs">
                <i data-lucide="alert-circle" class="w-5 h-5 text-danger shrink-0"></i>
                <span>{{ session('error') }}</span>
            </div>
        @endif

        @if(isset($errors) && $errors->any())
            <div class="mb-6 p-4 rounded-2xl bg-danger-bg border border-danger/20 text-danger-text text-sm font-medium shadow-xs">
                <div class="flex items-center gap-2 mb-2 font-semibold">
                    <i data-lucide="alert-circle" class="w-5 h-5 text-danger shrink-0"></i>
                    <span>Terdapat beberapa kesalahan pengisian:</span>
                </div>
                <ul class="list-disc list-inside space-y-1 text-xs text-danger-text">
                    @foreach($errors->all() as $err)
                        <li>{{ $err }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @endunless

        @yield('content')
    </main>

    <script>
        // Toggle Sidebar (Kecilkan / Besarkan)
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            if (!sidebar) return;

            const isCollapsed = sidebar.classList.toggle('collapsed');
            localStorage.setItem('bidtech_sidebar_collapsed', isCollapsed ? 'true' : 'false');

            if (window.lucide) {
                lucide.createIcons();
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Pulihkan status sidebar jika sebelumnya diciutkan
            if (localStorage.getItem('bidtech_sidebar_collapsed') === 'true') {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.classList.add('collapsed');
                }
            }

            if (window.lucide) {
                lucide.createIcons();
            }

            // Hilangkan Dashboard Skeleton secara instan tanpa delay artifisial
            const skeleton = document.getElementById('dashboard-page-skeleton');
            if (skeleton) {
                skeleton.classList.add('fade-out');
                setTimeout(function() {
                    if (skeleton && skeleton.parentNode) {
                        skeleton.parentNode.removeChild(skeleton);
                    }
                }, 80);
            }
        });
    </script>

    <!-- Realtime Live Update View Counter -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const totalViewsDashboardEl = document.getElementById('dashboard-total-views');
            const totalViewsKelolaEl = document.getElementById('kelola-total-views');
            const hasBadges = document.querySelector('.template-view-badge');

            if (!totalViewsDashboardEl && !totalViewsKelolaEl && !hasBadges) return;

            function formatNumber(num) {
                return new Intl.NumberFormat('id-ID').format(num);
            }

            function triggerPulse(el) {
                el.classList.add('transition-all', 'duration-300', 'scale-110', 'text-emerald-600');
                setTimeout(() => {
                    el.classList.remove('scale-110', 'text-emerald-600');
                }, 800);
            }

            let isPolling = false;

            async function syncTemplateViews() {
                if (isPolling || document.hidden) return;
                isPolling = true;

                try {
                    const res = await fetch('/dashboard/api/template-views', {
                        headers: { 'Accept': 'application/json' },
                        cache: 'no-store'
                    });

                    if (!res.ok) return;
                    const data = await res.json();
                    if (data.status !== 'success') return;

                    // 1. Update KPI total views
                    const newTotal = Number(data.total_views);
                    if (totalViewsDashboardEl && !isNaN(newTotal)) {
                        const current = parseInt(totalViewsDashboardEl.textContent.replace(/\D/g, ''), 10) || 0;
                        if (current !== newTotal) {
                            totalViewsDashboardEl.textContent = formatNumber(newTotal);
                            triggerPulse(totalViewsDashboardEl);
                        }
                    }

                    if (totalViewsKelolaEl && !isNaN(newTotal)) {
                        const current = parseInt(totalViewsKelolaEl.textContent.replace(/\D/g, ''), 10) || 0;
                        if (current !== newTotal) {
                            totalViewsKelolaEl.textContent = formatNumber(newTotal);
                            triggerPulse(totalViewsKelolaEl);
                        }
                    }

                    // 2. Update badge tiap template
                    if (Array.isArray(data.templates)) {
                        data.templates.forEach(tpl => {
                            const badges = document.querySelectorAll(`.template-view-badge[data-template-id="${tpl.id}"]`);
                            badges.forEach(badge => {
                                const currentViews = parseInt(badge.textContent.replace(/\D/g, ''), 10) || 0;
                                const newViews = Number(tpl.views);
                                if (currentViews !== newViews) {
                                    const suffix = badge.getAttribute('data-suffix') || '';
                                    badge.textContent = formatNumber(newViews) + suffix;
                                    triggerPulse(badge);
                                }
                            });
                        });
                    }
                } catch (e) {
                    // Non-blocking
                } finally {
                    isPolling = false;
                }
            }

            // Polling interval 10 detik agar tidak memonopoli thread server lokal
            const pollInterval = setInterval(syncTemplateViews, 10000);

            // Re-sync saat tab aktif kembali
            document.addEventListener('visibilitychange', function () {
                if (!document.hidden) {
                    syncTemplateViews();
                }
            });
        });
    </script>
    @stack('scripts')
</body>
</html>
