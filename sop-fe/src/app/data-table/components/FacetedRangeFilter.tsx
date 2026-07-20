"use client";

import { useCallback, useMemo } from "react";
import FacetedRangeFilterUI from "@/app/data-table/components/ui/FacetedRangeFilterUI";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type { FacetedRangeFilterProps } from "@/app/data-table/lib/types";
import { isInAnyRange } from "@/app/lib/utils";

export default function FacetedRangeFilter<TData>({
  id,
  options,
  rows,
  t,
}: FacetedRangeFilterProps<TData>) {
  const columnFilters = useTableStore((s) => s.columnFilters);
  const setColumnFilters = useTableStore((s) => s.setColumnFilters);

  const processedOptions = useMemo(() => {
    const currentRanges =
      (columnFilters.find((f) => f.id === id)?.value as [number, number][]) ??
      [];
    const otherFilters = columnFilters.filter((f) => f.id !== id);
    const filteredRows =
      otherFilters.length === 0
        ? rows
        : rows.filter((row) =>
            otherFilters.every((filter) =>
              isInAnyRange(row, filter.id, filter.value as [number, number][]),
            ),
          );
    const counts = new Array(options.length).fill(0);
    for (const row of filteredRows) {
      const value = Number(row.getValue(id));
      const index = options.findIndex(
        (option) => option.range[0] <= value && value < option.range[1],
      );
      if (index !== -1) counts[index]++;
    }
    return options.map((option, index) => ({
      ...option,
      count: counts[index],
      key: `${id}-${option.range.join("-")}`,
      selected: currentRanges.some(
        ([a, b]) => a === option.range[0] && b === option.range[1],
      ),
      text: t(option.text),
    }));
  }, [columnFilters, id, options, rows, t]);

  const selectedBadgeOptions = useMemo(
    () =>
      processedOptions
        .filter((option) => option.selected)
        .map(({ color, key, icon, text }) => ({ color, key, icon, text })),
    [processedOptions],
  );

  const labels = useMemo(
    () => ({
      clear: t("filter.clear"),
      empty: t("filter.empty"),
      header: t(`headers.${id}`),
      summary: t("filter.summary", { count: selectedBadgeOptions.length }),
    }),
    [id, selectedBadgeOptions, t],
  );

  const handleClear = useCallback(
    () => setColumnFilters((prev) => prev.filter((f) => f.id !== id)),
    [id, setColumnFilters],
  );

  const handleFilter = useCallback(
    (value: string, search: string) => {
      const trimmed = search.trim();
      if (!trimmed) return 1;
      const opt = processedOptions.find((o) => o.key === value);
      if (!opt) return 0;
      const num = Number(trimmed);
      if (!Number.isNaN(num)) {
        return opt.range[0] <= num && num < opt.range[1] ? 1 : 0;
      }
      return opt.label?.toLowerCase().includes(trimmed.toLowerCase()) ? 1 : 0;
    },
    [processedOptions],
  );

  const handleToggle = useCallback(
    (range: [number, number]) => {
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
    [id, setColumnFilters],
  );

  return (
    <FacetedRangeFilterUI
      commandFilter={handleFilter}
      labels={labels}
      onClear={handleClear}
      onToggle={handleToggle}
      options={processedOptions}
      selectedBadgeOptions={selectedBadgeOptions}
    />
  );
}
