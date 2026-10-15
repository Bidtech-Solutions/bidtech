import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "w-full max-w-3xl min-w-0",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 sm:mb-5 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-[var(--color-primary)]" />

          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.24em] sm:text-xs",
              light ? "text-white/55" : "text-black/50"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "w-full max-w-full min-w-0 font-heading text-[clamp(1.5rem,5.5vw,4.5rem)] break-words",
          "font-bold uppercase leading-[1.05] sm:leading-[0.9]",
          "tracking-tight sm:tracking-[-0.045em]",
          light ? "text-white" : "text-black"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 sm:mt-6 w-full max-w-2xl min-w-0 text-xs sm:text-sm leading-relaxed sm:leading-7 md:text-base",
            align === "center" && "mx-auto",
            light ? "text-white/60" : "text-black/55"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}