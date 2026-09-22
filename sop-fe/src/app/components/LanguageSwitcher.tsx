"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";
import DisabledIconButton from "@/app/components/DisabledIconButton";
import Switcher from "@/app/components/Switcher";
import { LANGUAGES } from "@/app/lib/configs";
import type { Language } from "@/app/lib/types";

const LANGUAGE_ITEMS = LANGUAGES.map(({ code, nation, native }) => ({
  icon: <Flag className="h-4 w-6" code={nation} />,
  label: native,
  value: code,
}));

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  if (!i18n) {
    return <DisabledIconButton icon={<Languages />} />;
  }

  return (
    <Switcher
      items={LANGUAGE_ITEMS}
      onValueChange={(language) => i18n.changeLanguage(language as Language)}
      tip={t("app.language.tip")}
      triggerIcon={<Languages />}
      value={i18n.resolvedLanguage ?? i18n.language}
    />
  );
}
