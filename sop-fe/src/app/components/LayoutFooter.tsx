"use client";

import { useTranslation } from "react-i18next";

export default function LayoutFooter() {
  const { t } = useTranslation();

  return (
    <footer className="text-center text-sm">
      {t("app.copyright")} © {new Date().getFullYear()} {t("app.author")}
    </footer>
  );
}
