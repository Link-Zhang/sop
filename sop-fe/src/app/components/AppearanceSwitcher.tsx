"use client";

import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import AppearanceSwitcherUI from "./ui/AppearanceSwitcherUI";

export function AppearanceSwitcher() {
  const { theme, setTheme } = useTheme();

  const { t } = useTranslation("appearance");

  const options = [
    { label: t("auto"), value: "system" },
    { label: t("dark"), value: "dark" },
    { label: t("light"), value: "light" },
  ] as const;

  type SupportedThemeValues = (typeof options)[number]["value"];

  const handleValueChange = (value: string) => {
    setTheme(value as SupportedThemeValues);
  };

  return (
    <AppearanceSwitcherUI
      onValueChange={handleValueChange}
      options={options}
      tooltipText={t("tip")}
      value={theme || options[0].value}
    />
  );
}
