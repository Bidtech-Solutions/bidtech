"use client";

export function HeroWaves({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none ${className}`}
    >
      {/* ========================================================= */}
      {/* 1. MOBILE AMBIENT AURA (Garis dihapus di mobile agar bersih) */}
      {/* ========================================================= */}
      <div className="block sm:hidden absolute inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-4 w-[280px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.12)_0%,rgba(187,247,208,0.06)_50%,transparent_70%)] filter blur-2xl" />
        <div className="absolute -left-12 top-1/4 w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.09)_0%,transparent_70%)] filter blur-2xl" />
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP & TABLET SVG: KURVA BERGELOMBANG NYATA (SINE WAVE) */}
      {/* ========================================================= */}
      <svg
        viewBox="0 0 1440 700"
        fill="none"
        preserveAspectRatio="none"
        className="hidden sm:block absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="modelAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#45a02e" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#65d44f" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="leftAura" cx="40%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#45a02e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="bottomLeftHill" x1="0%" y1="100%" x2="50%" y2="20%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#45a02e" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#45a02e" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#5fc94a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.18" />
            <stop offset="30%" stopColor="#3ea023" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#65d44f" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.2" />
            <stop offset="45%" stopColor="#45a02e" stopOpacity="0.65" />
            <stop offset="80%" stopColor="#5fc94a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="waveGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#48b02c" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#65d44f" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Latar Belakang Desktop */}
        <ellipse cx="1180" cy="360" rx="400" ry="340" fill="url(#modelAura)" />
        <ellipse cx="220" cy="280" rx="340" ry="260" fill="url(#leftAura)" />
        <path
          d="M -60 720 L -60 510 C 180 480, 380 540, 540 630 C 660 700, 740 720, 860 720 Z"
          fill="url(#bottomLeftHill)"
        />

        {/* ========================================================================= */}
        {/* 4 KURVA DENGAN LEKUKAN SINUSOIDAL NYATA (PUNCAK & LEMBAH BERGELOMBANG)     */}
        {/* Ketebalan tipis halus (0.85px - 1.0px) dengan animasi ombak naik-turun     */}
        {/* ========================================================================= */}

        {/* Garis 1: PUTUS-PUTUS DENGAN BENTUK GELOMBANG SINE NYATA */}
        <g className="wave-undulate-1">
          <path
            d="M -60 290 C 120 180, 320 220, 480 320 C 640 420, 820 400, 980 240 C 1140 100, 1340 160, 1540 220"
            stroke="url(#waveGrad1)"
            strokeWidth="1.0"
            strokeDasharray="6 8"
            strokeLinecap="round"
            className="wave-dash-anim-1"
          />
        </g>

        {/* Garis 2: UTUH TIPIS DENGAN BENTUK GELOMBANG SINE NYATA */}
        <g className="wave-undulate-2">
          <path
            d="M -60 370 C 140 260, 340 300, 500 400 C 660 500, 840 470, 1000 310 C 1160 170, 1360 220, 1540 290"
            stroke="url(#waveGrad2)"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
        </g>

        {/* Garis 3: PUTUS-PUTUS DENGAN BENTUK GELOMBANG SINE NYATA */}
        <g className="wave-undulate-3">
          <path
            d="M -60 450 C 130 350, 330 380, 490 480 C 650 570, 830 540, 990 380 C 1150 250, 1350 300, 1540 370"
            stroke="url(#waveGrad3)"
            strokeWidth="1.0"
            strokeDasharray="6 8"
            strokeLinecap="round"
            className="wave-dash-anim-2"
          />
        </g>

        {/* Garis 4: UTUH TIPIS DENGAN BENTUK GELOMBANG SINE NYATA */}
        <g className="wave-undulate-4">
          <path
            d="M -60 530 C 150 430, 350 460, 510 560 C 670 650, 850 610, 1010 460 C 1170 330, 1370 370, 1540 440"
            stroke="url(#waveGrad4)"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <style jsx>{`
        /* 1. Animasi Gelombang Berombak Naik-Turun (Real Wave Undulation) */
        .wave-undulate-1 {
          animation: wave-bob-1 7s ease-in-out infinite;
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
            transform: translateY(-16px) scaleY(1.05);
          }
        }

        @keyframes wave-bob-2 {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(14px) scaleY(0.96);
          }
        }

        @keyframes wave-bob-3 {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(-18px) scaleY(1.06);
          }
        }

        @keyframes wave-bob-4 {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(12px) scaleY(0.95);
          }
        }

        /* 2. Animasi Garis Putus-Putus Berjalan Seiring Ombak Berayun */
        .wave-dash-anim-1 {
          animation: wave-dash 22s linear infinite;
        }
        .wave-dash-anim-2 {
          animation: wave-dash 26s linear infinite;
        }
        @keyframes wave-dash {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -200;
          }
        }
      `}</style>
    </div>
  );
}
