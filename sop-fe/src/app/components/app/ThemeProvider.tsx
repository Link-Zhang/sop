"use client";

import { ThemeProvider as NextThemeProvider } from "@teispace/next-themes";
import type { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}
