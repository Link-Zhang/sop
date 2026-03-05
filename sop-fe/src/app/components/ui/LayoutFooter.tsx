"use client";

import { useTranslation } from "react-i18next";
import { getCurrentYear } from "@/app/lib/utils";

export default function LayoutFooter() {
  const { t } = useTranslation("default");

  return (
    <footer className="px-4 py-3 text-center text-sm">
      {t("copyright")} © {getCurrentYear()} Link-Zhang
    </footer>
  );
}
