<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    code: string;
    alt?: string;
  }>(),
  {
    alt: '',
  }
);

const normalized = computed(() => {
  const c = String(props.code || '').toLowerCase().trim();
  if (c === 'id' || c === 'idr') return 'id';
  if (c === 'en' || c === 'gb' || c === 'uk') return 'gb';
  if (c === 'ms' || c === 'my' || c === 'myr') return 'my';
  if (c === 'sg' || c === 'sgd') return 'sg';
  if (c === 'zh' || c === 'cn') return 'cn';
  return 'id';
});
</script>

<template>
  <span
    class="inline-flex items-center justify-center shrink-0 overflow-hidden rounded-[3px] border border-black/10 dark:border-white/15 shadow-xs align-middle leading-none select-none"
    :aria-label="alt || `${code.toUpperCase()} flag`"
  >
    <!-- INDONESIA (ID / IDR) -->
    <svg
      v-if="normalized === 'id'"
      viewBox="0 0 640 480"
      class="w-full h-full object-cover block"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path fill="#e70011" d="M0 0h640v240H0z" />
      <path fill="#ffffff" d="M0 240h640v240H0z" />
    </svg>

    <!-- UNITED KINGDOM (EN / GB) -->
    <svg
      v-else-if="normalized === 'gb'"
      viewBox="0 0 640 480"
      class="w-full h-full object-cover block"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <clipPath id="clip-gb"><path d="M0 0v480h640V0z" /></clipPath>
      <clipPath id="clip-gb-diag"><path d="M320 240 0 0v480zM320 240 640 480V0z" /></clipPath>
      <g clip-path="url(#clip-gb)">
        <path fill="#012169" d="M0 0v480h640V0z" />
        <path stroke="#ffffff" stroke-width="64" d="m0 0 640 480M640 0 0 480" />
        <path stroke="#c8102e" stroke-width="42.7" d="m0 0 640 480M640 0 0 480" clip-path="url(#clip-gb-diag)" />
        <path stroke="#ffffff" stroke-width="106.7" d="M320 0v480M0 240h640" />
        <path stroke="#c8102e" stroke-width="64" d="M320 0v480M0 240h640" />
      </g>
    </svg>

    <!-- MALAYSIA (MS / MY / MYR) -->
    <svg
      v-else-if="normalized === 'my'"
      viewBox="0 0 640 480"
      class="w-full h-full object-cover block"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path fill="#cc0001" d="M0 0h640v480H0z" />
      <path fill="#ffffff" d="M0 34.3h640v34.3H0zm0 68.6h640v34.3H0zm0 68.5h640v34.3H0zm0 68.6h640v34.3H0zm0 68.6h640v34.3H0zm0 68.6h640v34.2H0z" />
      <path fill="#000066" d="M0 0h320v274.3H0z" />
      <path fill="#ffcc00" d="M192 68.6a68.6 68.6 0 1 0 0 137.1 68.6 68.6 0 0 1 0-137.1zm-8 68.6 12.3-3.2-8.5-9.6 12.7 1.3-3.6-12.2 11.2 5.8 2-12.6 7.9 9.9 7.4-10.4 3.7 12.2 11.4-5.5-2.2 12.5 12.6-1.5-8.2 9.7 12.1 3.4-12.1 3.4 8.2 9.7-12.6-1.5 2.2 12.5-11.4-5.5-3.7 12.2-7.4-10.4-7.9 9.9-2-12.6-11.2 5.8 3.6-12.2-12.7 1.3 8.5-9.6z" />
    </svg>

    <!-- SINGAPORE (SG / SGD) -->
    <svg
      v-else-if="normalized === 'sg'"
      viewBox="0 0 640 480"
      class="w-full h-full object-cover block"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <polygon id="sg-star" points="0,-10 3.1,-3.1 9.5,-3.1 4.3,1.5 6.2,8.1 0,4.2 -6.2,8.1 -4.3,1.5 -9.5,-3.1 -3.1,-3.1" />
      </defs>
      <rect width="640" height="240" fill="#ed2939" />
      <rect y="240" width="640" height="240" fill="#ffffff" />
      <!-- Crescent Moon -->
      <path fill="#ffffff" d="M 140,48 A 72,72 0 1,0 140,192 A 62,62 0 1,1 140,48 Z" />
      <!-- 5 Stars in circle -->
      <g fill="#ffffff">
        <use href="#sg-star" x="182" y="85" />
        <use href="#sg-star" x="215" y="109" />
        <use href="#sg-star" x="202" y="150" />
        <use href="#sg-star" x="162" y="150" />
        <use href="#sg-star" x="149" y="109" />
      </g>
    </svg>

    <!-- CHINA (ZH / CN) -->
    <svg
      v-else-if="normalized === 'cn'"
      viewBox="0 0 640 480"
      class="w-full h-full object-cover block"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path fill="#de2910" d="M0 0h640v480H0z" />
      <polygon fill="#ffde00" points="106.7,48 119.5,87.6 161,87.6 127.4,112.1 140.2,151.7 106.7,127.3 73.1,151.7 85.9,112.1 52.3,87.6 93.8,87.6" />
      <g fill="#ffde00" transform="translate(213.3, 32) rotate(-120.96)">
        <polygon points="0,-16 4.9,-4.9 16.8,-4.9 7.2,2.1 10.9,13.2 0,6.4 -10.9,13.2 -7.2,2.1 -16.8,-4.9 -4.9,-4.9" />
      </g>
      <g fill="#ffde00" transform="translate(256, 64) rotate(-98.13)">
        <polygon points="0,-16 4.9,-4.9 16.8,-4.9 7.2,2.1 10.9,13.2 0,6.4 -10.9,13.2 -7.2,2.1 -16.8,-4.9 -4.9,-4.9" />
      </g>
      <g fill="#ffde00" transform="translate(256, 128) rotate(-74.05)">
        <polygon points="0,-16 4.9,-4.9 16.8,-4.9 7.2,2.1 10.9,13.2 0,6.4 -10.9,13.2 -7.2,2.1 -16.8,-4.9 -4.9,-4.9" />
      </g>
      <g fill="#ffde00" transform="translate(213.3, 160) rotate(-51.34)">
        <polygon points="0,-16 4.9,-4.9 16.8,-4.9 7.2,2.1 10.9,13.2 0,6.4 -10.9,13.2 -7.2,2.1 -16.8,-4.9 -4.9,-4.9" />
      </g>
    </svg>
  </span>
</template>
