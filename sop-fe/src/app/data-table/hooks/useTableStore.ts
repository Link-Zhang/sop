"use client";

import { create } from "zustand";
import type { TableStore } from "@/app/data-table/lib/types";

export const useTableStore = create<TableStore>((set) => {
  const createSetter =
    <T>(key: keyof TableStore) =>
    (updater: T | ((prev: T) => T)) =>
      set((state) => ({
        [key]:
          typeof updater === "function"
            ? (updater as (prev: T) => T)(state[key] as T)
            : updater,
      }));

  return {
    columnFilters: [],
    columnVisibility: {},
    pagination: { pageIndex: 0, pageSize: 7 },
    sorting: [{ id: "date", desc: true }],
    setColumnFilters: createSetter("columnFilters"),
    setColumnVisibility: createSetter("columnVisibility"),
    setPagination: createSetter("pagination"),
    setSorting: createSetter("sorting"),
  };
});
