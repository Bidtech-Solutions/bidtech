"use client";

export function HeroWaves({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none ${className}`}
    >
      {/* ========================================================= */}
      {/* 1. MOBILE AMBIENT AURA (Pencahayaan lembut responsif)     */}
      {/* ========================================================= */}
      <div className="block sm:hidden absolute inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-4 w-[280px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.22)_0%,rgba(187,247,208,0.12)_50%,transparent_70%)] filter blur-2xl" />
        <div className="absolute -left-12 top-1/4 w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.16)_0%,transparent_70%)] filter blur-2xl" />
        <div className="absolute -left-16 bottom-0 w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,rgba(69,160,46,0.18)_0%,transparent_70%)] filter blur-xl" />
      </div>

      {/* ========================================================= */}
      {/* 2. VECTOR SVG: KURVA BERGELOMBANG HIJAU SESUAI DESAIN     */}
      {/* ========================================================= */}
      <svg
        viewBox="0 0 1440 700"
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-80 sm:opacity-100"
      >
        <defs>
          {/* Latar Belakang Bukit Hijau Lembut di Kiri Bawah */}
          <linearGradient id="bottomLeftHill" x1="0%" y1="100%" x2="45%" y2="25%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.28" />
            <stop offset="35%" stopColor="#45a02e" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#86efac" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </linearGradient>

          {/* Aura Kiri Tengah di Belakang Teks */}
          <radialGradient id="leftAura" cx="30%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#45a02e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </radialGradient>

          {/* Pencahayaan Halus di Bagian Tengah Atas */}
          <radialGradient id="topCenterAura" cx="50%" cy="12%" r="55%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.12" />
            <stop offset="40%" stopColor="#45a02e" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </radialGradient>

          {/* Bentuk Organik Hijau di Belakang Karakter (Sisi Kanan) - Transparan Lembut */}
          <linearGradient id="modelOrganicShape" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.08" />
            <stop offset="45%" stopColor="#45a02e" stopOpacity="0.05" />
            <stop offset="85%" stopColor="#86efac" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.01" />
          </linearGradient>

          {/* Gradien Garis Gelombang 1 (Garis Putus-Putus Atas Melengkung di Atas Kepala) */}
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.30" />
            <stop offset="30%" stopColor="#45a02e" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#5fc94a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.35" />
          </linearGradient>

          {/* Gradien Garis Gelombang 2 (Garis Utuh Halus di Belakang Pena & Bahu) */}
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.25" />
            <stop offset="35%" stopColor="#3ea023" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#65d44f" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.30" />
          </linearGradient>

          {/* Gradien Garis Gelombang 3 (Garis Putus-Putus Tengah di Belakang Dada/Buku) */}
          <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#45a02e" stopOpacity="0.70" />
            <stop offset="80%" stopColor="#5fc94a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.25" />
          </linearGradient>

          {/* Gradien Garis Gelombang 4 (Garis Utuh Halus Bagian Bawah) */}
          <linearGradient id="waveGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.20" />
            <stop offset="40%" stopColor="#48b02c" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#65d44f" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.20" />
          </linearGradient>

          {/* Gradien Garis Kontur Bukit Kiri Bawah */}
          <linearGradient id="waveGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#45a02e" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#5fc94a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.10" />
          </linearGradient>
        </defs>

        {/* ========================================================================= */}
        {/* LAPISAN DASAR: GLOW LEMBUT & BENTUK ORGANIK HIJAU                         */}
        {/* ========================================================================= */}
        <ellipse cx="720" cy="120" rx="550" ry="240" fill="url(#topCenterAura)" />
        <ellipse cx="260" cy="320" rx="360" ry="280" fill="url(#leftAura)" />

        {/* Bukit Latar Hijau di Kiri Bawah */}
        <path
          d="M -60 720 L -60 470 C 140 450, 320 510, 480 610 C 600 685, 720 720, 860 720 Z"
          fill="url(#bottomLeftHill)"
        />

        {/* Bentuk Organik Hijau di Belakang Model Karakter (Sesuai Desain Screenshot) */}
        <path
          d="M 800 680 C 760 520, 750 360, 810 210 C 870 90, 990 35, 1140 35 C 1300 35, 1430 110, 1480 250 C 1520 370, 1490 530, 1440 680 Z"
          fill="url(#modelOrganicShape)"
        />

        {/* ========================================================================= */}
        {/* 4 GARIS KONTUR SINUSOIDAL DENGAN LEKUKAN NYATA SESUAI DESAIN              */}
        {/* ========================================================================= */}

        {/* Garis 1: PUTUS-PUTUS ATAS (Melengkung naik dan memuncak tepat di atas kepala model) */}
        <g className="wave-undulate-1">
          <path
            d="M -60 230 C 140 220, 340 245, 520 230 C 700 215, 870 155, 1020 95 C 1170 40, 1330 85, 1540 165"
            stroke="url(#waveGrad1)"
            strokeWidth="1.15"
            strokeDasharray="6 8"
            strokeLinecap="round"
            className="wave-dash-anim-1"
          />
        </g>

        {/* Garis 2: UTUH TIPIS (Melengkung naik tepat di belakang pena & bahu model) */}
        <g className="wave-undulate-2">
          <path
            d="M -60 310 C 160 300, 360 330, 540 315 C 720 300, 890 240, 1040 185 C 1190 130, 1340 170, 1540 245"
            stroke="url(#waveGrad2)"
            strokeWidth="1.0"
            strokeLinecap="round"
          />
        </g>

        {/* Garis 3: PUTUS-PUTUS TENGAH (Melengkung di belakang dada & buku yang dipegang) */}
        <g className="wave-undulate-3">
          <path
            d="M -60 400 C 150 390, 350 420, 530 410 C 710 400, 880 350, 1030 305 C 1180 260, 1330 290, 1540 355"
            stroke="url(#waveGrad3)"
            strokeWidth="1.05"
            strokeDasharray="6 8"
            strokeLinecap="round"
            className="wave-dash-anim-2"
          />
        </g>

        {/* Garis 4: UTUH TIPIS BAWAH */}
        <g className="wave-undulate-4">
          <path
            d="M -60 495 C 170 485, 370 515, 550 510 C 730 505, 900 460, 1050 425 C 1200 390, 1350 415, 1540 455"
            stroke="url(#waveGrad4)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </g>

        {/* Garis 5: Garis Kontur Putus-putus Melengkung di Sepanjang Bukit Kiri Bawah */}
        <path
          d="M -60 470 C 140 450, 320 510, 480 610 C 580 670, 680 705, 800 720"
          stroke="url(#waveGrad5)"
          strokeWidth="0.95"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
      </svg>

      <style jsx>{`
        /* 1. Animasi Gelombang Berombak Naik-Turun (Smooth Wave Undulation) */
        .wave-undulate-1 {
          animation: wave-bob-1 7.5s ease-in-out infinite;
          transform-origin: 50% 50%;
        }
        .wave-undulate-2 {
          animation: wave-bob-2 9s ease-in-out infinite;
          transform-origin: 50% 50%;
        }
        .wave-undulate-3 {
          animation: wave-bob-3 8s ease-in-out infinite;
          transform-origin: 50% 50%;
        }
        .wave-undulate-4 {
          animation: wave-bob-4 10s ease-in-out infinite;
          transform-origin: 50% 50%;
        }

        @keyframes wave-bob-1 {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(-12px) scaleY(1.03);
          }
        }

        @keyframes wave-bob-2 {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(10px) scaleY(0.97);
          }
        }

        @keyframes wave-bob-3 {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(-14px) scaleY(1.04);
          }
        }

        @keyframes wave-bob-4 {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(9px) scaleY(0.96);
          }
        }

        /* 2. Animasi Garis Putus-Putus Mengalir Halus */
        .wave-dash-anim-1 {
          animation: wave-dash 24s linear infinite;
        }
        .wave-dash-anim-2 {
          animation: wave-dash 28s linear infinite;
        }
        @keyframes wave-dash {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -200;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wave-undulate-1,
          .wave-undulate-2,
          .wave-undulate-3,
          .wave-undulate-4,
          .wave-dash-anim-1,
          .wave-dash-anim-2 {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
