"use client";

import { X } from "lucide-react";
import type { DataTableRangeFilterUIProps } from "@/app/data-table/lib/types";
import { Button } from "@/shadcn/components/ui/button";

export default function DataTableRangeFilterUI({
  filters,
  label,
  onReset,
  showReset,
}: DataTableRangeFilterUIProps) {
  return (
    <div className="flex flex-wrap gap-2 md:flex-1">
      {filters}
      {showReset && (
        <Button onClick={onReset} variant="ghost">
          {label}
          <X />
        </Button>
      )}
    </div>
  );
}
