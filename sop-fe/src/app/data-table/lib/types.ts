import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import type { LucideProps } from "lucide-react";
import type {
  ChangeEvent,
  ForwardRefExoticComponent,
  KeyboardEvent,
  RefAttributes,
} from "react";

export interface ClampedNumberInputProps {
  max: number;
  onChange: (value: number) => void;
  value: number;
}

export interface ClampedNumberInputUIProps {
  onBlur: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  size: number;
  value: string;
}

export interface DataTableFilterProps<TData> {
  ids: string[];
  onReset: () => void;
  rows: Row<TData>[];
}

export interface DataTableFilterUIProps<TData> {
  ids: string[];
  onClear: (id: string) => void;
  onReset: () => void;
  onToggle: (id: string, range: [number, number]) => void;
  rows: Row<TData>[];
  show: boolean;
  text: string;
}

export interface DataTablePaginationProps {
  pageCount: number;
  rowCount: number;
}

export interface DataTablePaginationUIProps {
  onPageIndexChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
}

// getLevelOptions
export interface FacetedFilterOption {
  color: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  range: [number, number];
  text: string;
}

export interface FacetedFilterProps<TData> {
  id: string;
  onClear: (id: string) => void;
  onToggle: (id: string, range: [number, number]) => void;
  rows: Row<TData>[];
}

export interface FacetedFilterUIOption extends FacetedFilterOption {
  count: number;
  key: string;
}

export interface FacetedFilterUIProps {
  onClear: () => void;
  onFilter: (value: string, search: string) => number;
  onToggle: (range: [number, number]) => void;
  options: FacetedFilterUIOption[];
  ranges: [number, number][];
  texts: FacetedFilterUITexts;
}

interface FacetedFilterUITexts {
  clear: string;
  empty: string;
  title: string;
  summary: (count: number) => string;
}

interface SelectedBadgeUIOption
  extends Omit<FacetedFilterUIOption, "count" | "label" | "range"> {}

export interface SelectedBadgeUIProps {
  options: SelectedBadgeUIOption[];
  summary: (count: number) => string;
}

export interface TableHiderUIProps {
  getTitle: (id: string) => string;
  ids: string[];
  isVisible: (id: string) => boolean;
  onToggle: (id: string) => void;
  text: string;
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
