"use client";

import {
  columnFilteringFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createTableHook,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
} from "@tanstack/react-table";
import GlobalSearch from "@/app/components/table/GlobalSearch";
import Pagination from "@/app/components/table/Pagination";
import Resize from "@/app/components/table/Resize";

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
  // columnOrderingFeature,

  // pin
  // columnPinningFeature,

  // size
  columnSizingFeature,
  columnResizingFeature,

  // sort
  // rowSortingFeature,
  // sortedRowModel: createSortedRowModel(),
  // sortFns: {
  //   alphanumeric: sortFn_alphanumeric,
  //   datetime: sortFn_datetime,
  //   text: sortFn_text,
  // },

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
  columnResizeMode: "onChange",
  // defaultColumn: {
  //   maxSize: 400,
  //   minSize: 60,
  //   size: 120,
  // },
  features: features,
  globalFilterFn: "includesString",
  headerComponents: {
    Resize,
  },
  tableComponents: {
    GlobalSearch,
    Pagination,
  },
});
