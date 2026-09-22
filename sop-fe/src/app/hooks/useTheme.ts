"use client";

import { useTheme as useNextTheme } from "@teispace/next-themes";
import { useCallback, useEffect, useState } from "react";
import type { ThemeMode } from "@/app/lib/types";
import { THEME_DEFAULT_MODE } from "@/app/lib/utils";

export default function useTheme() {
  const { setTheme: setNextTheme, theme: nextTheme } = useNextTheme();
  const setTheme = useCallback(
    (mode: ThemeMode) => {
      setNextTheme(mode);
    },
    [setNextTheme],
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    mounted,
    setTheme,
    theme: (nextTheme as ThemeMode) ?? THEME_DEFAULT_MODE,
  };
}
