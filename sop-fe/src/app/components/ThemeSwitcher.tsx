"use client";

import { useState } from "react";
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

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const { mounted, setTheme, theme } = useTheme();

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
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger render={<Button size="icon" variant="outline" />}>
        <CurrentIcon />
      </DropdownMenuTrigger>
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
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
