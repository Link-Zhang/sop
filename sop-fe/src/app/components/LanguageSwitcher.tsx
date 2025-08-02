"use client";

import { useTranslation } from "react-i18next";
import LanguageSwitcherUI from "@/app/components/ui/LanguageSwitcherUI";
import {
  LOCAL_STORAGE_SYNC_KEY,
  type SupportedLanguages,
} from "@/app/lib/i18n/i18n";

export default function LanguageSwitcher() {
  const { i18n, ready, t } = useTranslation("language");

  if (!ready) {
    return null;
  }

  const handleValueChange = async (value: string) => {
    const lng = value as SupportedLanguages;
    i18n.changeLanguage(lng).then(() => {
      document.documentElement.lang = lng;
      localStorage.setItem(LOCAL_STORAGE_SYNC_KEY, Date.now().toString());
    });
  };

  return (
    <LanguageSwitcherUI
      onValueChange={handleValueChange}
      tooltipText={t("tip")}
      value={i18n.language}
    />
  );
}
