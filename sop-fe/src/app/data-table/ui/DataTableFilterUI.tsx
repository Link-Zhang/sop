"use client";

import { X } from "lucide-react";
import FacetedFilter from "@/app/data-table/FacetedFilter";
import type { DataTableFilterUIProps } from "@/app/data-table/lib/types";
import { Button } from "@/shadcn/components/ui/button";

export default function DataTableFilterUI<TData>({
  ids,
  onClear,
  onReset,
  onToggle,
  rows,
  show,
  text,
}: DataTableFilterUIProps<TData>) {
  return (
    <div className="flex flex-wrap gap-2 md:flex-1">
      {ids.map((id) => (
        <FacetedFilter
          key={id}
          id={id}
          onClear={onClear}
          onToggle={onToggle}
          rows={rows}
        />
      ))}
      {show && (
        <Button onClick={onReset} variant="ghost">
          {text}
          <X />
        </Button>
      )}
    </div>
  );
}
