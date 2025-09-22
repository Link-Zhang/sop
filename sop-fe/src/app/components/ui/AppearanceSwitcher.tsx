"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
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

export default function AppearanceSwitcher() {
  const { theme, setTheme } = useTheme();

  const { t } = useTranslation("appearance");

  const handleValueChange = (value: string) => {
    setTheme(value);
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent> {t("tip")}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={theme} onValueChange={handleValueChange}>
          <DropdownMenuRadioItem value="system">
            <SunMoon />
            {t("auto")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon />
            {t("dark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            <Sun />
            {t("light")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
