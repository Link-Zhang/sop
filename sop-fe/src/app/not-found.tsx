"use client";

import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 items-center justify-center gap-4">
      <h1 className="border-r border-zinc-400 pr-4 text-2xl">404</h1>
      <h2 className="text-sm">{t("app.404")}</h2>
    </div>
  );
}
