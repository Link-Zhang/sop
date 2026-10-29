"use client";

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
import ColumnHeader from "@/app/components/table/ColumnHeader";
import ColumnResize from "@/app/components/table/ColumnResize";
import ColumnSettings from "@/app/components/table/ColumnSettings";
import GlobalSearch from "@/app/components/table/GlobalSearch";
import Pagination from "@/app/components/table/Pagination";

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

export const {
  createAppColumnHelper,
  useAppTable,
  // useCellContext,
  useHeaderContext,
  useTableContext,
} = createTableHook({
  autoResetPageIndex: false,
  columnResizeMode: "onChange",
  // defaultColumn: {
  //   maxSize: 400,
  //   minSize: 60,
  //   size: 120,
  // },
  features: features,
  globalFilterFn: "includesString",
  headerComponents: {
    ColumnHeader,
    ColumnResize,
  },
  tableComponents: {
    ColumnSettings,
    GlobalSearch,
    Pagination,
  },
});
