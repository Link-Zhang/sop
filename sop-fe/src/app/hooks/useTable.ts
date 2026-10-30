"use client";

import type { Column, RowData } from "@tanstack/react-table";
import {
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  createTableHook,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";
import type { CSSProperties } from "react";
import CellActions from "@/app/components/table/CellActions";
import HeaderContent from "@/app/components/table/HeaderContent";
import HeaderResize from "@/app/components/table/HeaderResize";
import HeaderSelect from "@/app/components/table/HeaderSelect";
import HeaderSettings from "@/app/components/table/HeaderSettings";
import TablePagination from "@/app/components/table/TablePagination";
import TableSearch from "@/app/components/table/TableSearch";

const features = tableFeatures({
  // bucketed faceting
  // columnFacetingFeature,
  // facetedRowModel: createFacetedRowModel(),
  // facetedMinMaxValues: createFacetedMinMaxValues(),
  // facetedUniqueValues: createFacetedUniqueValues(),

  // filter + global filter
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    // equalsString: filterFn_equalsString,
    includesString: filterFn_includesString,
    // inDateRange: filterFn_inDateRange,
    // inNumberRange: filterFn_inNumberRange,
  },
  // columnMeta: metaHelper<ColumnMeta>(),

  // pagination
  rowPaginationFeature,
  rowSelectionFeature,
  paginatedRowModel: createPaginatedRowModel(),

  // order + dnd
  columnOrderingFeature,

  // pin
  columnPinningFeature,

  // size
  columnSizingFeature,
  columnResizingFeature,

  // sort
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },

  // visible
  columnVisibilityFeature,
});

export const getPinStyles = <TData extends RowData>(
  column: Column<typeof features, TData>,
): CSSProperties => {
  const pinned = column.getIsPinned();
  const isEnd = pinned === "end";
  const isStart = pinned === "start";

  return {
    backgroundColor: pinned ? "var(--background)" : undefined,
    boxShadow: !column.getIsLastColumn("end")
      ? "inset -1px 0 0 0 var(--border)"
      : undefined,
    insetInlineEnd: isEnd ? `${column.getAfter("end")}px` : undefined,
    insetInlineStart: isStart ? `${column.getStart("start")}px` : undefined,
    position: pinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: pinned ? 1 : 0,
  };
};

export const {
  createAppColumnHelper,
  useAppTable,
  // useCellContext,
  useHeaderContext,
  useTableContext,
} = createTableHook({
  autoResetPageIndex: false,
  cellComponents: {
    CellActions,
  },
  columnResizeMode: "onChange",
  defaultColumn: {
    size: 120,
  },
  features: features,
  globalFilterFn: "includesString",
  headerComponents: {
    HeaderContent,
    HeaderResize,
    HeaderSelect,
    HeaderSettings,
  },
  tableComponents: {
    TablePagination,
    TableSearch,
  },
});
