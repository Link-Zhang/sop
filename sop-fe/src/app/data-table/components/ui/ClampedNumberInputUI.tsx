"use client";

import type { ClampedNumberInputUIProps } from "@/app/data-table/lib/types";
import { Input } from "@/shadcn/components/ui/input";

export default function ClampedNumberInputUI({
  onCommit,
  onValueChange,
  size,
  value,
}: ClampedNumberInputUIProps) {
  return (
    <Input
      className="text-center"
      id="clampedNumberInputUI"
      inputMode="numeric"
      onBlur={onCommit}
      onChange={(e) => onValueChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit();
        }
      }}
      size={size}
      style={{ width: "auto" }}
      type="text"
      value={value}
    />
  );
}
