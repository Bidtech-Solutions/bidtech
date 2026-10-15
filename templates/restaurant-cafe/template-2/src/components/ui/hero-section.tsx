import { cn } from '@/lib/utils'

interface FloatingImageProps {
  src: string
  alt: string
  className: string
}

export interface FloatingFoodHeroProps {
  id?: string
  title: string
  description: string
  images: FloatingImageProps[]
  className?: string
}

export const Swirls = () => (
  <>
    <svg
      className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-pink-100 dark:text-pink-900/20"
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    <svg
      className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-pink-100 dark:text-pink-900/20"
      width="700"
      height="700"
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </>
)

export function FloatingFoodHero({
  id = 'home',
  title,
  description,
  images,
  className,
}: FloatingFoodHeroProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full h-dvh flex items-center justify-center overflow-hidden bg-background',
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>

      <div className="absolute inset-0 z-10">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={cn('absolute object-contain', image.className)}
            style={{ animationDelay: `${index * 300}ms` }}
          />
        ))}
      </div>

      <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
        <h1
          className="font-display font-black tracking-[-0.04em] leading-[0.95] text-[clamp(3rem,9vw,7rem)] text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-500"
        >
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  )
}
