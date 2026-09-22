"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { TABS } from "@/app/lib/configs";
import { isActive } from "@/app/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";

export default function Tabulator() {
  const pathname = usePathname() ?? "";
  const { t } = useTranslation();

  const activeTab =
    TABS.find(({ path }) => isActive(pathname, path))?.path ?? "";

  return (
    <Tabs value={activeTab}>
      <TabsList variant="line">
        {TABS.map(({ label, path }) => (
          <TabsTrigger
            key={path}
            nativeButton={false}
            render={<Link href={path} />}
            value={path}
          >
            {t(label)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
