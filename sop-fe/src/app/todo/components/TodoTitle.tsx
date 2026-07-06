"use client";

import { useTranslation } from "react-i18next";
import TitleUI from "@/app/components/ui/TitleUI";

export default function TodoTitle() {
  const { t } = useTranslation("todo");

  return <TitleUI title={t("title")} />;
}
