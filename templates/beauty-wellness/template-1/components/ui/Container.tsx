import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 min-w-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
