"use client";

import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
// todo
import { getLevelOptions } from "@/app/blood-pressure/lib/utils";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type { FacetedFilterProps } from "@/app/data-table/lib/types";
import { multiRangeFilterFn } from "@/app/data-table/lib/utils";
import FacetedFilterUI from "@/app/data-table/ui/FacetedFilterUI";

export default function FacetedFilter<TData>({
  id,
  onClear,
  onToggle,
  rows,
}: FacetedFilterProps<TData>) {
  const columnFilters = useTableStore((s) => s.columnFilters);
  const { t } = useTranslation("blood-pressure");

  const options = useMemo(() => {
    const baseOptions = getLevelOptions(id).map((raw) => ({
      ...raw,
      key: `${id}-${raw.range.join("-")}`,
      text: t(raw.text),
    }));
    const otherFilters = columnFilters.filter((f) => f.id !== id);
    const filteredRows =
      otherFilters.length === 0
        ? rows
        : rows.filter((row) =>
            otherFilters.every((f) =>
              multiRangeFilterFn(row, f.id, f.value as [number, number][]),
            ),
          );
    const counts = baseOptions.map(
      (opt) =>
        filteredRows.filter((row) => {
          const val = Number(row.getValue(id));
          return opt.range[0] <= val && val < opt.range[1];
        }).length,
    );
    return baseOptions.map((opt, idx) => ({
      ...opt,
      count: counts[idx],
    }));
  }, [columnFilters, id, rows, t]);

  const onFilter = useCallback(
    (value: string, search: string) => {
      const trimmed = search.trim();
      if (!trimmed) return 1;
      const opt = options.find((o) => o.key === value);
      if (!opt) return 0;
      const num = Number(trimmed);
      if (!Number.isNaN(num)) {
        return opt.range[0] <= num && num < opt.range[1] ? 1 : 0;
      }
      return opt.label?.toLowerCase().includes(trimmed.toLowerCase()) ? 1 : 0;
    },
    [options],
  );

  const ranges = useMemo<[number, number][]>(
    () =>
      (columnFilters.find((f) => f.id === id)?.value as [number, number][]) ??
      [],
    [columnFilters, id],
  );

  const texts = useMemo(
    () => ({
      clear: t("filter.clear"),
      empty: t("filter.empty"),
      summary: (count: number) => t("filter.summary", { count }),
      title: t(`titles.${id}`),
    }),
    [t, id],
  );

  return (
    <FacetedFilterUI
      onClear={() => onClear(id)}
      onFilter={onFilter}
      onToggle={(range) => onToggle(id, range)}
      options={options}
      ranges={ranges}
      texts={texts}
    />
  );
}
