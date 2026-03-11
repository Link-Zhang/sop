import type { TodoTitleUIProps } from "@/app/todo/lib/types";
import { cn } from "@/shadcn/lib/utils";

export default function TodoTitleUI({ className, title }: TodoTitleUIProps) {
  return (
    <h1
      className={cn(
        "font-extrabold mb-4 scroll-m-20 text-4xl text-balance text-center tracking-tight",
        className,
      )}
    >
      {title}
    </h1>
  );
}
