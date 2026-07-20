"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ClampedNumberInputUI from "@/app/data-table/components/ui/ClampedNumberInputUI";
import type { ClampedNumberInputProps } from "@/app/data-table/lib/types";
import { clampValue } from "@/app/data-table/lib/utils";

export default function ClampedNumberInput({
  max = Infinity,
  min = 1,
  onChange,
  value,
}: ClampedNumberInputProps) {
  const [inputValue, setInputValue] = useState(String(value));
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const clampFromString = useCallback(
    (raw: string): [number, boolean] => {
      const n = Number(raw);
      const clamped = clampValue(n, min, max);
      const changed = !Object.is(clamped, n);
      return [clamped, changed];
    },
    [min, max],
  );

  useEffect(() => {
    const [clamped, changed] = clampFromString(inputValue);
    if (changed) {
      setInputValue(String(clamped));
      onChangeRef.current(clamped);
    }
  }, [inputValue, clampFromString]);

  const apply = useCallback(() => {
    const [clamped, changed] = clampFromString(inputValue);
    if (changed) {
      setInputValue(String(clamped));
    }
    onChangeRef.current(clamped);
  }, [inputValue, clampFromString]);

  const size = Math.min(inputValue.length || 1, 6);

  return (
    <ClampedNumberInputUI
      onCommit={apply}
      onValueChange={setInputValue}
      size={size}
      value={inputValue}
    />
  );
}
