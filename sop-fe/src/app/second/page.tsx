"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SecondPage() {
  const { t } = useTranslation("second");

  return (
    <>
      <h1>{t("secondWelcome")}</h1>
      <p>{t("secondContent")}</p>
      <Link href="/">← {t("backToHome")}</Link>
    </>
  );
}
