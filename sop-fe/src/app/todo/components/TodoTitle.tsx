"use client";

import { useTranslation } from "react-i18next";

export default function TodoTitle() {
  const { t } = useTranslation("todo");

  return <h1 className="font-bold mb-4 text-3xl text-center">{t("title")}</h1>;
}
