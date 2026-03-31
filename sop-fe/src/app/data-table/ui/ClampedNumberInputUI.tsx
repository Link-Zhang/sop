"use client";

import type { ClampedNumberInputUIProps } from "@/app/data-table/lib/types";
import { Input } from "@/shadcn/components/ui/input";

export default function ClampedNumberInputUI({
  onBlur,
  onChange,
  onKeyDown,
  size,
  value,
}: ClampedNumberInputUIProps) {
  return (
    <Input
      className="text-center"
      id="clampedNumberInputUI"
      inputMode="numeric"
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      size={size}
      style={{ width: "auto" }}
      type="text"
      value={value}
    />
  );
}
