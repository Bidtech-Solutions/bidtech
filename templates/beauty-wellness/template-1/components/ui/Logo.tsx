import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type LogoProps = {
  /** Ukuran logo */
  size?: "sm" | "md" | "lg";
  /** Tampilkan hanya icon mark monogram tanpa teks */
  iconOnly?: boolean;
  /** Tampilkan tagline di bawah nama */
  withTagline?: boolean;
  /** ClassName tambahan untuk container */
  className?: string;
  /** Apakah logo berupa link ke beranda */
  asLink?: boolean;
};

export function Logo({
  size = "md",
  iconOnly = false,
  withTagline = false,
  className,
  asLink = true,
}: LogoProps) {
  const iconSizes = {
    sm: "h-6 w-5",
    md: "h-8 w-7",
    lg: "h-10 w-9",
  };

  const textSizes = {
    sm: "text-lg tracking-[-0.04em]",
    md: "text-xl md:text-2xl tracking-[-0.04em]",
    lg: "text-2xl md:text-3xl tracking-[-0.05em]",
  };

  const content = (
    <span className={cn("group inline-flex items-center gap-2.5 sm:gap-3", className)}>
      {/* Forged Monogram Icon Mark (Concept 1) */}
      <svg
        viewBox="0 0 220 260"
        className={cn(iconSizes[size], "shrink-0 transition-transform duration-300 group-hover:scale-105")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoRust" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e06e33" />
            <stop offset="100%" stopColor="#c45b25" />
          </linearGradient>
          <linearGradient id="logoSteel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cfcfcf" />
          </linearGradient>
        </defs>
        
        {/* Letter 'I' (Left chiseled pillar) */}
        <path d="M0,45 L45,0 L45,215 L0,260 Z" fill="url(#logoSteel)" />
        
        {/* Letter 'F' (Top Bar) */}
        <path d="M60,0 L205,0 L170,45 L60,45 Z" fill="url(#logoRust)" />
        
        {/* Letter 'F' (Middle Bar) */}
        <path d="M60,80 L165,80 L135,125 L60,125 Z" fill="url(#logoRust)" />
        
        {/* Letter 'F' (Accent Notch) */}
        <polygon points="60,160 105,160 85,190 60,190" fill="#e06e33" opacity="0.95" />
      </svg>

      {/* Typography */}
      {!iconOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-heading font-extrabold uppercase text-white transition-colors duration-300 group-hover:text-white",
              textSizes[size]
            )}
          >
            {siteConfig.brand.name}
          </span>
          {withTagline && (
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              {siteConfig.brand.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        aria-label={`${siteConfig.brand.name} Homepage`}
        className="relative z-50 inline-flex items-center"
      >
        {content}
      </Link>
    );
  }

  return content;
}
