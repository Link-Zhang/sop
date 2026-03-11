"use client";

import { useTranslation } from "react-i18next";
import LanguageSwitcherUI from "@/app/components/ui/LanguageSwitcherUI";
import useLanguage from "@/app/hooks/useLanguage";
import type { SupportedLanguages } from "@/app/lib/i18n/i18n";

export default function LanguageSwitcher() {
  const { changeLanguage, currentLanguage, isReady } = useLanguage();

  const { t } = useTranslation("language");

  const handleValueChange = async (value: string) => {
    return await changeLanguage(value as SupportedLanguages);
  };

  return (
    <LanguageSwitcherUI
      disabled={!isReady}
      onValueChange={handleValueChange}
      tooltipText={t("tip")}
      value={currentLanguage}
    />
  );
}
