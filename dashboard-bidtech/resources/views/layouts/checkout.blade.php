<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', 'Checkout - Bidtech')</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
</head>
<body class="min-h-screen bg-[#F4F6F5] font-sans text-[#0B1B17] antialiased">

    {{-- Initial Page Load Skeleton Screen --}}
    <div id="checkout-page-skeleton" class="page-skeleton-overlay fixed inset-0 z-[100] bg-[#F4F6F5] overflow-hidden pointer-events-none" aria-hidden="true">
        <header class="border-b border-[#E4E9E6] bg-white sticky top-0 z-50">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
                <div class="h-8 w-28 sm:w-36 rounded-lg bg-slate-200 animate-shimmer"></div>
                <div class="flex items-center gap-2 sm:gap-4">
                    @foreach([1, 2, 3, 4] as $n)
                        <div class="flex items-center gap-2 shrink-0">
                            <div class="size-6 sm:size-7 rounded-full bg-slate-200 animate-shimmer"></div>
                            <div class="hidden sm:block h-3.5 w-14 rounded-md bg-slate-200 animate-shimmer"></div>
                        </div>
                    @endforeach
                </div>
            </div>
        </header>
    </div>

    {{-- Main Page Content Container --}}
    <div id="page-content-wrapper" class="page-content-wrapper loading">
        @include('components.header')

        <main class="w-full">        
            @yield('content')
        </main>
    </div>

    <script>
        (function() {
            var skeletonHandled = false;
            function removeSkeleton() {
                if (skeletonHandled) return;
                skeletonHandled = true;

                var skeleton = document.getElementById('checkout-page-skeleton');
                var content = document.getElementById('page-content-wrapper');
                if (!skeleton) {
                    if (content) {
                        content.classList.remove('loading');
                        content.classList.add('loaded');
                    }
                    return;
                }

                // Micro delay (350ms) to ensure smooth shimmer perception without flashing
                setTimeout(function() {
                    skeleton.classList.add('fade-out');
                    if (content) {
                        content.classList.remove('loading');
                        content.classList.add('loaded');
                    }
                    if (window.lucide) {
                        lucide.createIcons();
                    }
                    setTimeout(function() {
                        if (skeleton && skeleton.parentNode) {
                            skeleton.parentNode.removeChild(skeleton);
                        }
                    }, 400);
                }, 350);
            }

            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                removeSkeleton();
            } else {
                document.addEventListener('DOMContentLoaded', removeSkeleton);
                window.addEventListener('load', removeSkeleton);
            }

            // Fallback timeout in case DOMContentLoaded was missed
            setTimeout(removeSkeleton, 1500);
        })();
    </script>
</body>
</html>