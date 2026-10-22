export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return;

  // Tandai html root agar CSS scroll reveal aktif
  document.documentElement.classList.add('js-reveal');

  let intersectionObserver: IntersectionObserver | null = null;
  let mutationObserver: MutationObserver | null = null;

  const handleIntersect: IntersectionObserverCallback = (entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');

        const onEnd = () => {
          el.classList.add('anim-done');
          el.removeEventListener('animationend', onEnd);
        };
        el.addEventListener('animationend', onEnd, { once: true });

        obs.unobserve(el);
      }
    }
  };

  const scanAndObserve = () => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.anim-fade-up, .anim-card, .anim-fade-in').forEach((el) => {
        el.classList.add('is-visible', 'anim-done');
      });
      return;
    }

    if (!intersectionObserver) {
      intersectionObserver = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      });
    }

    const elements = document.querySelectorAll<HTMLElement>(
      '.anim-fade-up:not(.is-visible), .anim-card:not(.is-visible), .anim-fade-in:not(.is-visible)'
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Elemen yang sudah masuk dalam viewport saat ini langsung dimunculkan
      if (rect.top <= window.innerHeight - 20) {
        el.classList.add('is-visible');
        const onEnd = () => {
          el.classList.add('anim-done');
          el.removeEventListener('animationend', onEnd);
        };
        el.addEventListener('animationend', onEnd, { once: true });
      } else {
        intersectionObserver?.observe(el);
      }
    });
  };

  const setup = () => {
    scanAndObserve();

    if (!mutationObserver && typeof MutationObserver !== 'undefined' && document.body) {
      let timeoutId: any = null;
      mutationObserver = new MutationObserver(() => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(scanAndObserve, 50);
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
  };

  // Dengarkan event navigasi perpindahan halaman di Nuxt
  nuxtApp.hook('page:finish', () => {
    nextTick(() => {
      setTimeout(setup, 60);
    });
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setup();
  } else {
    window.addEventListener('DOMContentLoaded', setup);
  }
});
