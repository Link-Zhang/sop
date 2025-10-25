"use client";

import { Languages } from "lucide-react";
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

export default function LanguageSwitcher() {
  const { changeLanguage, currentLanguage, isReady } = useLanguage();

  const handleValueChange = (value: string) => {
    changeLanguage(value as SupportedLanguages).then();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={!isReady}>
          <Languages />
        </Button>
      </DropdownMenuTrigger>
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
