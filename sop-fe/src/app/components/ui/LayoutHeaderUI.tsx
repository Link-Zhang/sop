import type { LayoutHeaderUIProps } from "@/app/lib/types";
import { cn } from "@/shadcn/lib/utils";

export default function LayoutHeaderUI({
  className,
  leftNav,
  rightNav,
}: LayoutHeaderUIProps) {
  return (
    <header
      className={cn(
        "bg-on-primary dark:bg-on-primary flex items-center justify-between px-4 py-3 sticky top-0 z-50",
        className,
      )}
    >
      {leftNav && <nav className="space-x-4 text-xl">{leftNav}</nav>}
      {rightNav && <nav className="space-x-4 text-xl">{rightNav}</nav>}
    </header>
  );
}
