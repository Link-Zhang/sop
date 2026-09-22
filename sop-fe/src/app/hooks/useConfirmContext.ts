"use client";

import { createContext, useContext } from "react";
import type { ConfirmFn } from "@/app/lib/types";

export const ConfirmContext = createContext<ConfirmFn | null>(null);

export default function useConfirmContext() {
  const ctx = useContext(ConfirmContext);

  if (!ctx) {
    throw new Error();
  }

  return ctx;
}
