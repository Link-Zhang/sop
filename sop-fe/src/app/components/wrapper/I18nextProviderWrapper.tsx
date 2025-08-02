"use client";

import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import useLanguage from "@/app/hooks/useLanguage";

export default function I18nextProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { isReady, i18n } = useLanguage();

  if (!isReady) {
    return;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
