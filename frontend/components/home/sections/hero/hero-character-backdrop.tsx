import type { CSSProperties } from "react";

/**
 * Latar glow organik di belakang karakter hero sesuai desain.
 *
 * Menggunakan gradien halus transparan dan kurva organik yang lembut
 * agar menyatu elegan dengan latar putih tanpa warna hijau yang terlalu pekat.
 */
export function HeroCharacterBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center select-none overflow-visible"
    >
      {/* 1. Bentuk Organik Hijau (Lapisan dalam) - transparan lembut */}
      <div
        className="hero-orb absolute top-[48%] left-[50%] w-[114%] h-[110%] min-w-[330px] max-w-[620px] min-h-[370px] max-h-[640px]"
        style={{
          borderRadius: "52% 48% 62% 38% / 54% 46% 54% 46%",
          background:
            "linear-gradient(135deg, rgba(163, 230, 53, 0.11) 0%, rgba(74, 222, 128, 0.07) 42%, rgba(34, 197, 94, 0.04) 75%, transparent 100%)",
        }}
      />

      {/* 2. Soft aura luar - sangat halus dan transparan */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[420px] xs:size-[500px] sm:size-[580px] lg:size-[660px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(163, 230, 53, 0.06) 0%, rgba(34, 197, 94, 0.02) 40%, transparent 65%)",
        }}
      />
    </div>
  );
}
