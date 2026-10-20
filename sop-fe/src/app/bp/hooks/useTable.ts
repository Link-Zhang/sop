import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFacetedMinMaxValues,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  createTableHook,
  filterFn_equalsString,
  filterFn_includesString,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  metaHelper,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";
import ResizeHandle from "@/app/bp/components/dt/header/ResizeHandle";
import type { ColumnMeta } from "@/app/lib/types";

const features = tableFeatures({
  // bucketed faceting
  columnFacetingFeature,
  facetedRowModel: createFacetedRowModel(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  facetedUniqueValues: createFacetedUniqueValues(),

  // filter
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    equalsString: filterFn_equalsString,
    includesString: filterFn_includesString,
    inDateRange: filterFn_inDateRange,
    inNumberRange: filterFn_inNumberRange,
  },
  columnMeta: metaHelper<ColumnMeta>(),

  // pagination
  rowPaginationFeature,
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
  columnResizeMode: "onChange" as const,
  defaultColumn: {
    maxSize: 400,
    minSize: 60,
    size: 120,
  },
  features: features,
  headerComponents: {
    ResizeHandle,
  },
});
