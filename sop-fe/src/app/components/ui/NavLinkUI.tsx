import Link from "next/link";
import type { NavLinkUIProps } from "@/app/lib/types";
import { cn } from "@/shadcn/lib/utils";

export default function NavLinkUI({
  children,
  className,
  isActive,
  ...rest
}: NavLinkUIProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "border-b-2 border-transparent py-2 transition-colors",
        isActive ? "border-b-foreground font-bold" : "hover:border-b-gray-300",
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
