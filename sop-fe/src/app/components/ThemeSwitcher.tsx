"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "@/app/hooks/useTheme";
import { THEMES } from "@/app/lib/configs";
import type { ThemeMode } from "@/app/lib/types";
import { THEME_DEFAULT_ICON } from "@/app/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/ui/tooltip";

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const { mounted, setTheme, theme } = useTheme();
  const { t } = useTranslation();

  if (!mounted) {
    return (
      <Button disabled size="icon" variant="outline">
        <THEME_DEFAULT_ICON />
      </Button>
    );
  }

  const CurrentIcon =
    THEMES.find(({ mode }) => mode === theme)?.icon ?? THEME_DEFAULT_ICON;

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <Tooltip>
        <DropdownMenuTrigger
          render={
            <TooltipTrigger render={<Button size="icon" variant="outline" />} />
          }
        >
          <CurrentIcon />
        </DropdownMenuTrigger>
        <TooltipContent side="bottom">
          <p>{t("app.theme.tip")}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="min-w-fit w-fit">
        <DropdownMenuRadioGroup
          onValueChange={(mode: ThemeMode) => {
            setTheme(mode);
            setOpen(false);
          }}
          value={theme}
        >
          {THEMES.map(({ icon: Icon, label, mode }) => (
            <DropdownMenuRadioItem key={mode} value={mode}>
              <Icon />
              {t(label)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
