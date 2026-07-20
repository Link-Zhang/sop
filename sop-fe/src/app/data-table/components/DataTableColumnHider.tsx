"use client";

import { useCallback, useMemo } from "react";
import DataTableColumnHiderUI from "@/app/data-table/components/ui/DataTableColumnHiderUI";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type {
  ColumnHiderItem,
  DataTableColumnHiderProps,
} from "@/app/data-table/lib/types";

export default function DataTableColumnHider({
  ids,
  t,
}: DataTableColumnHiderProps) {
  const columnVisibility = useTableStore((s) => s.columnVisibility);
  const setColumnVisibility = useTableStore((s) => s.setColumnVisibility);
  const columns: ColumnHiderItem[] = useMemo(
    () =>
      ids.map((id) => ({
        header: t(`headers.${id}`),
        id,
        visible: columnVisibility[id] ?? true,
      })),
    [columnVisibility, ids, t],
  );

  const handleToggle = useCallback(
    (id: string) => {
      setColumnVisibility((prev) => ({
        ...prev,
        [id]: !(prev[id] ?? true),
      }));
    },
    [setColumnVisibility],
  );

  return (
    <DataTableColumnHiderUI
      columns={columns}
      label={t("columnHider")}
      onToggle={handleToggle}
    />
  );
}
