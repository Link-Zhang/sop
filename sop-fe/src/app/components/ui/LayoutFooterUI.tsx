import type { LayoutFooterUIProps } from "@/app/lib/types";
import { cn } from "@/shadcn/lib/utils";

export default function LayoutFooterUI({
  author,
  className,
  copyright,
  year,
}: LayoutFooterUIProps) {
  return (
    <footer className={cn("px-4 py-3 text-center text-sm", className)}>
      {copyright} © {year} {author}
    </footer>
  );
}
