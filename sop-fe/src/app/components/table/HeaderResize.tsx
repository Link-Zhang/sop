"use client";

import { Subscribe } from "@tanstack/react-table";
import { cn } from "cn";
import { useHeaderContext, useTableContext } from "@/app/hooks/useTable";

export default function HeaderResize() {
  const header = useHeaderContext();
  const table = useTableContext();

  if (!header.column.getCanResize()) return null;

  return (
    <Subscribe source={table.atoms.columnResizing}>
      {(columnResizing) => {
        const isResizing = columnResizing.isResizingColumn === header.column.id;
        const onResize = header.getResizeHandler();

        return (
          <hr
            aria-orientation="vertical"
            className={cn(
              "absolute border-0 cursor-e-resize h-full right-0 select-none top-0 touch-none transition-colors w-1.5 z-10",
              isResizing && "bg-primary",
            )}
            onDoubleClick={() => header.column.resetSize()}
            onMouseDown={onResize}
            onTouchStart={onResize}
          />
        );
      }}
    </Subscribe>
  );
}
