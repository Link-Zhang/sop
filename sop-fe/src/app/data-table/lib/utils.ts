import type { Row } from "@tanstack/react-table";

export const clampValue = (n: number, max: number) => {
  if (max <= 0) return 0;
  if (Number.isNaN(n)) return 1;
  return Math.max(1, Math.min(n, max));
};

export const multiRangeFilterFn = <TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: [number, number][],
): boolean => {
  const value = row.getValue<number>(columnId);
  return filterValue.some(([min, max]) => min <= value && value < max);
};

export const hideLastSvgClass = "[&>svg:last-child]:hidden";

export const pageSizeOptions = [3, 7, 14, 28, 90];
