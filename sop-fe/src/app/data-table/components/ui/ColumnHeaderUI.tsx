"use client";

import { ArrowUpDown } from "lucide-react";
import type { ColumnHeaderUIProps } from "@/app/data-table/lib/types";
import { Button } from "@/shadcn/components/ui/button";

export default function ColumnHeaderUI({
  canSort,
  label,
  onClick,
  priority,
  sortIcon: SortIcon = ArrowUpDown,
}: ColumnHeaderUIProps) {
  if (!canSort) {
    return <span>{label}</span>;
  }

  return (
    <Button className="px-0" onClick={onClick} variant="ghost">
      {label}
      <SortIcon />
      {priority && <sup className="text-[10px]">{priority}</sup>}
    </Button>
  );
}
