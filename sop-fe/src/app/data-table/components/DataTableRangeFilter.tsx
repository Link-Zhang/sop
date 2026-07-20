"use client";

import { useCallback } from "react";
import FacetedRangeFilter from "@/app/data-table/components/FacetedRangeFilter";
import DataTableRangeFilterUI from "@/app/data-table/components/ui/DataTableRangeFilterUI";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type { DataTableRangeFilterProps } from "@/app/data-table/lib/types";

export default function DataTableRangeFilter<TData>({
  ids,
  map,
  rows,
  t,
}: DataTableRangeFilterProps<TData>) {
  const columnFilters = useTableStore((s) => s.columnFilters);
  const setColumnFilters = useTableStore((s) => s.setColumnFilters);

  const filterElements = ids.map((id) => (
    <FacetedRangeFilter
      id={id}
      key={id}
      options={map[id] ?? []}
      rows={rows}
      t={t}
    />
  ));

  const handleReset = useCallback(() => {
    setColumnFilters((prev) => prev.filter((f) => !ids.includes(f.id)));
  }, [ids, setColumnFilters]);

  return (
    <DataTableRangeFilterUI
      filters={filterElements}
      label={t("filter.reset")}
      showReset={columnFilters.length > 0}
      onReset={handleReset}
    />
  );
}
