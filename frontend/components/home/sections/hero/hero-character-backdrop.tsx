import type { CSSProperties } from "react";

/**
 * Latar glow + partikel di belakang karakter hero.
 *
 * Performa: semua animasi memakai CSS keyframes (transform/opacity) yang dikerjakan compositor/GPU,
 * bukan animasi JS per frame. Sebelumnya animasi berulang via motion membebani main thread di mobile.
 * Tanpa filter blur: gradient radial yang memudar ke transparan sudah memberi kesan glow lembut.
 */
export function HeroCharacterBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center select-none overflow-visible"
    >
      {/* 1. Glow utama (aurora orb) */}
      <div
        className="hero-orb absolute top-1/2 left-1/2 size-[420px] xs:size-[500px] sm:size-[600px] lg:size-[680px] xl:size-[720px]"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(163, 230, 53, 0.26) 0%, rgba(69, 160, 46, 0.18) 24%, rgba(34, 197, 94, 0.09) 42%, rgba(74, 222, 128, 0.04) 56%, transparent 68%)",
        }}
      />

      {/* 2. Titik partikel berkilau */}
      <div
        className="hero-twinkle absolute top-[22%] left-[20%] size-2 rounded-full bg-[#a3e635] shadow-[0_0_10px_#a3e635]"
        style={{ "--float-y": "-6px", animationDuration: "3.5s" } as CSSProperties}
      />
      <div
        className="hero-twinkle absolute bottom-[28%] right-[16%] size-2.5 rounded-full bg-[#45a02e] shadow-[0_0_12px_#45a02e]"
        style={{ "--float-y": "8px", animationDuration: "4.2s", animationDelay: "0.8s" } as CSSProperties}
      />
      <div
        className="hero-twinkle absolute top-[32%] right-[22%] size-1.5 rounded-full bg-[#86efac] shadow-[0_0_8px_#86efac]"
        style={{ "--float-y": "-4px", animationDuration: "3s", animationDelay: "1.5s" } as CSSProperties}
      />
    </div>
  );
}
