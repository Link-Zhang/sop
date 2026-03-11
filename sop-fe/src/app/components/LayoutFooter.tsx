"use client";

import { useTranslation } from "react-i18next";
import LayoutFooterUI from "@/app/components/ui/LayoutFooterUI";
import { getCurrentYear } from "@/app/lib/utils";

export default function LayoutFooter() {
  const { t } = useTranslation("default");

  const year = getCurrentYear();

  return (
    <LayoutFooterUI
      author={"Link Zhang"}
      copyright={t("copyright")}
      year={year}
    />
  );
}
