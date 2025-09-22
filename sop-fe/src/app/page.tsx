"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation("home");

  return (
    <>
      <h1>{t("welcome")}</h1>
      <p>{t("content")}</p>
      <Link href="/second">{t("secondPage")} →</Link>
    </>
  );
}
