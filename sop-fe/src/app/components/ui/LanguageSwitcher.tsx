"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";
import useLanguage from "@/app/hooks/useLanguage";
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguages,
} from "@/app/lib/i18n/i18n";
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

export default function LanguageSwitcher() {
  const { changeLanguage, currentLanguage, isReady } = useLanguage();

  const { t } = useTranslation("language");

  const handleValueChange = (value: string) => {
    changeLanguage(value as SupportedLanguages).then();
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" disabled={!isReady}>
              <Languages />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent> {t("tip")}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={currentLanguage}
          onValueChange={handleValueChange}
        >
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
