"use client";

import { useTranslation } from "react-i18next";
import { AppearanceSwitcher } from "@/app/components/AppearanceSwitcher";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import NavLink from "@/app/components/NavLink";
import LayoutHeaderUI from "@/app/components/ui/LayoutHeaderUI";

export default function LayoutHeader() {
  const { t } = useTranslation("default");

  const leftNav = <NavLink href="/todo">{t("todo")}</NavLink>;

  const rightNav = (
    <>
      <AppearanceSwitcher />
      <LanguageSwitcher />
    </>
  );

  return <LayoutHeaderUI leftNav={leftNav} rightNav={rightNav} />;
}
