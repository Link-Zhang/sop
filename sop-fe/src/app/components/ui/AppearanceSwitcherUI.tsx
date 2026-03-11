"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import type { ReactNode } from "react";
import type { AppearanceSwitcherUIProps } from "@/app/lib/types";
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

const valueToIcon: Record<string, ReactNode> = {
  dark: <Moon className="mr-2 h-4 w-4" />,
  light: <Sun className="mr-2 h-4 w-4" />,
  system: <SunMoon className="mr-2 h-4 w-4" />,
};

export default function AppearanceSwitcherUI({
  onValueChange,
  options,
  tooltipText,
  value,
}: AppearanceSwitcherUIProps) {
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
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className={"w-40"}>
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {valueToIcon[option.value]}
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
