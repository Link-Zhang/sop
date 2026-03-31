"use client";

import { create } from "zustand";
import type { TableStore } from "@/app/data-table/lib/types";

export const useTableStore = create<TableStore>((set) => ({
  columnFilters: [],
  columnVisibility: {},
  pagination: { pageIndex: 0, pageSize: 7 },
  sorting: [
    {
      id: "measuredAt",
      desc: true,
    },
  ],
  setColumnFilters: (updater) =>
    set((state) => ({
      columnFilters:
        typeof updater === "function" ? updater(state.columnFilters) : updater,
    })),
  setColumnVisibility: (updater) =>
    set((state) => ({
      columnVisibility:
        typeof updater === "function"
          ? updater(state.columnVisibility)
          : updater,
    })),
  setPagination: (updater) =>
    set((state) => ({
      pagination:
        typeof updater === "function" ? updater(state.pagination) : updater,
    })),
  setSorting: (updater) =>
    set((state) => ({
      sorting: typeof updater === "function" ? updater(state.sorting) : updater,
    })),
}));
