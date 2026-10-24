"use client";

import { Subscribe } from "@tanstack/react-table";
import { cn } from "cn";
import { useHeaderContext, useTableContext } from "@/app/hooks/useTable";

export default function Resize() {
  const header = useHeaderContext();
  const table = useTableContext();

  if (!header.column.getCanResize()) return null;

  return (
    <Subscribe source={table.atoms.columnResizing}>
      {() => (
        <hr
          aria-orientation="vertical"
          className={cn(
            "absolute border-0 cursor-e-resize h-full right-0 select-none top-0 touch-none transition-colors w-1.5 z-10",
            header.column.getIsResizing() && "bg-primary",
          )}
          onDoubleClick={() => header.column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
        />
      )}
    </Subscribe>
  );
}
