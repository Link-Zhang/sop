"use client";

import { Languages } from "lucide-react";
import Flag from "react-world-flags";
import { SUPPORTED_LANGUAGES } from "@/app/lib/i18n/i18n";
import type { LanguageSwitcherUIProps } from "@/app/lib/types";
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

export default function LanguageSwitcherUI({
  disabled,
  onValueChange,
  tooltipText,
  value,
}: LanguageSwitcherUIProps) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" disabled={disabled}>
              <Languages />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className={"w-36"}>
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code}>
              <Flag className="h-4 w-6" code={lang.countryCode} />
              {lang.nativeName}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
