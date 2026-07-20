import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import type { TFunction } from "i18next";
import type { ArrowDown, ArrowUp, ArrowUpDown, LucideIcon } from "lucide-react";
import type React from "react";

export interface ClampedNumberInputProps {
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  value: number;
}

export interface ClampedNumberInputUIProps {
  onCommit: () => void;
  onValueChange: (value: string) => void;
  size: number;
  value: string;
}

export interface ColumnHeaderProps {
  canSort?: boolean;
  id: string;
  label: string;
}

export interface ColumnHeaderUIProps {
  canSort: boolean;
  label: string;
  onClick?: () => void;
  priority?: number;
  sortIcon?: typeof ArrowUp | typeof ArrowDown | typeof ArrowUpDown;
}

export interface ColumnHiderItem {
  header: string;
  id: string;
  visible: boolean;
}

export interface DataTableColumnHiderProps {
  ids: string[];
  t: TFunction;
}

export interface DataTableColumnHiderUIProps {
  columns: ColumnHiderItem[];
  label: string;
  onToggle: (id: string) => void;
}

export interface DataTablePaginationProps {
  pageCount: number;
  rowCount: number;
}

export interface DataTablePaginationUIProps {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  rowRangeText: string;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rangeFilterMap: DataTableRangeFilterMap;
  t: TFunction;
}

export type DataTableRangeFilterMap = Record<
  string,
  DataTableRangeFilterOption[]
>;

interface DataTableRangeFilterOption {
  color: string;
  icon: LucideIcon;
  label: string;
  range: [number, number];
  text: string;
}

export interface DataTableRangeFilterProps<TData> {
  ids: string[];
  map: DataTableRangeFilterMap;
  rows: Row<TData>[];
  t: TFunction;
}

export interface DataTableRangeFilterUIProps {
  filters: React.ReactNode[];
  label: string;
  onReset: () => void;
  showReset: boolean;
}

export interface FacetedRangeFilterProps<TData> {
  id: string;
  options: DataTableRangeFilterOption[];
  rows: Row<TData>[];
  t: TFunction;
}

interface FacetedRangeFilterUILabels {
  clear: string;
  empty: string;
  header: string;
  summary: string;
}

interface FacetedRangeFilterUIOption extends DataTableRangeFilterOption {
  count: number;
  key: string;
  selected: boolean;
}

export interface FacetedRangeFilterUIProps {
  commandFilter: (value: string, search: string) => number;
  labels: FacetedRangeFilterUILabels;
  onClear: () => void;
  onToggle: (range: [number, number]) => void;
  options: FacetedRangeFilterUIOption[];
  selectedBadgeOptions: SelectedBadgeUIOption[];
}

export interface SelectedBadgeUIOption
  extends Pick<DataTableRangeFilterOption, "color" | "icon" | "text"> {
  key: string;
}

export interface SelectedBadgeUIProps {
  options: SelectedBadgeUIOption[];
  summary: string;
}

export interface TableStore {
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  pagination: PaginationState;
  sorting: SortingState;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setPagination: OnChangeFn<PaginationState>;
  setSorting: OnChangeFn<SortingState>;
}
