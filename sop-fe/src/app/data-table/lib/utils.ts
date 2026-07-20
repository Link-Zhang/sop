export const clampValue = (value: number, min: number, max: number): number => {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  if (Number.isNaN(value)) {
    return lower;
  }
  return Math.min(Math.max(value, lower), upper);
};

export const hideLastSvgClass = "[&>svg:last-child]:hidden";

export const pageSizeOptions = [2, 3, 7, 14, 28];
