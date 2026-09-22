"use client";

import type { i18n as I18nInstance } from "i18next";
import { useEffect, useState } from "react";
import init from "@/app/lib/i18n/init";
import setup from "@/app/lib/i18n/setup";

export default function useLanguage() {
  const [i18n, setI18n] = useState<I18nInstance | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const instance = await init();
        setup(instance);
        if (cancelled) return;
        setI18n(instance);
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return i18n;
}
