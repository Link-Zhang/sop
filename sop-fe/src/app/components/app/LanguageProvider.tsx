"use client";

import type { ReactNode } from "react";
import useLanguage from "@/app/hooks/useLanguage";
import { Spinner } from "@/shadcn/components/ui/spinner";

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const i18n = useLanguage();

  if (!i18n) {
    return (
      <div className="flex-1 grid place-items-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return <>{children}</>;
}
