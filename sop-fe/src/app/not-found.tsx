"use client";

import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 h-full items-center justify-center">
      <h1 className="border-r border-zinc-400 pr-4 text-2xl">404</h1>
      <h2 className="text-sm">{t("app.404")}</h2>
    </div>
  );
}
