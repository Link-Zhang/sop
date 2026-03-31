"use client";

import { useEffect, useState } from "react";
import type { ClampedNumberInputProps } from "@/app/data-table/lib/types";
import { clampValue } from "@/app/data-table/lib/utils";
import ClampedNumberInputUI from "@/app/data-table/ui/ClampedNumberInputUI";

export default function ClampedNumberInput({
  max = Infinity,
  onChange,
  value,
}: ClampedNumberInputProps) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => setInputValue(String(value)), [value]);

  useEffect(() => {
    const n = Number(inputValue);
    const clamped = clampValue(n, max);
    if (clamped !== n) {
      setInputValue(String(clamped));
      onChange(clamped);
    }
  }, [inputValue, max, onChange]);

  const apply = (raw: string) => {
    const n = Number(raw);
    const clamped = clampValue(n, max);
    setInputValue(String(clamped));
    onChange(clamped);
  };

  const size = Math.min(inputValue.length || 1, 6);

  return (
    <ClampedNumberInputUI
      onBlur={() => apply(inputValue)}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          apply(inputValue);
        }
      }}
      size={size}
      value={inputValue}
    />
  );
}
