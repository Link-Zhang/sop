"use client";

import { useTranslation } from "react-i18next";

export default function TodoTitle() {
  const { t } = useTranslation("todo");

  return (
    <h1 className="font-extrabold mb-4 scroll-m-20 text-4xl text-balance text-center tracking-tight">
      {t("title")}
    </h1>
  );
}
