"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type { DataTableFilterProps } from "@/app/data-table/lib/types";
import DataTableFilterUI from "@/app/data-table/ui/DataTableFilterUI";

export default function DataTableFilter<TData>({
  ids,
  onReset,
  rows,
}: DataTableFilterProps<TData>) {
  const columnFilters = useTableStore((s) => s.columnFilters);
  const setColumnFilters = useTableStore((s) => s.setColumnFilters);
  const { t } = useTranslation("blood-pressure");

  const handleClear = useCallback(
    (id: string) => setColumnFilters((prev) => prev.filter((f) => f.id !== id)),
    [setColumnFilters],
  );

  const handleToggle = useCallback(
    (id: string, range: [number, number]) => {
      setColumnFilters((prev) => {
        const i = prev.findIndex((f) => f.id === id);
        const curRanges = (prev[i]?.value as [number, number][]) ?? [];
        const isSelected = curRanges.some(
          ([a, b]) => a === range[0] && b === range[1],
        );
        const newRanges = isSelected
          ? curRanges.filter(([a, b]) => a !== range[0] || b !== range[1])
          : [...curRanges, range];
        if (newRanges.length === 0) return prev.filter((f) => f.id !== id);
        if (i === -1) return [...prev, { id, value: newRanges }];
        return prev.map((f, idx) =>
          idx === i ? { ...f, value: newRanges } : f,
        );
      });
    },
    [setColumnFilters],
  );

  return (
    <DataTableFilterUI
      ids={ids}
      onClear={handleClear}
      onReset={onReset}
      onToggle={handleToggle}
      rows={rows}
      show={columnFilters.length > 0}
      text={t("filter.reset")}
    />
  );
}
