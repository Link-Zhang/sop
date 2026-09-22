"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DisabledIconButton from "@/app/components/DisabledIconButton";
import Switcher from "@/app/components/Switcher";
import useTheme from "@/app/hooks/useTheme";
import { THEMES } from "@/app/lib/configs";
import type { ThemeMode } from "@/app/lib/types";
import { THEME_DEFAULT_ICON } from "@/app/lib/utils";

export default function ThemeSwitcher() {
  const { mounted, setTheme, theme } = useTheme();
  const { t } = useTranslation();

  const items = useMemo(
    () =>
      THEMES.map(({ icon: Icon, label, mode }) => ({
        icon: <Icon />,
        label: t(label),
        value: mode,
      })),
    [t],
  );

  if (!mounted) {
    return <DisabledIconButton icon={<THEME_DEFAULT_ICON />} />;
  }

  const CurrentIcon =
    THEMES.find(({ mode }) => mode === theme)?.icon ?? THEME_DEFAULT_ICON;

  return (
    <Switcher
      items={items}
      onValueChange={(mode) => setTheme(mode as ThemeMode)}
      tip={t("app.theme.tip")}
      triggerIcon={<CurrentIcon />}
      value={theme}
    />
  );
}
