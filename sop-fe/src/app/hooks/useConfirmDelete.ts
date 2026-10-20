"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useConfirmContext from "@/app/hooks/useConfirmContext";
import type { ConfirmDialogOptions } from "@/app/lib/types";

export default function useConfirmDelete() {
  const ctx = useConfirmContext();
  const { t } = useTranslation();

  return useCallback(
    (overrides?: Partial<ConfirmDialogOptions>) =>
      ctx({
        cancel: t("cancel"),
        confirm: t("confirm"),
        description: t("delete.description"),
        destructive: true,
        title: t("delete.title"),
        ...overrides,
      }),
    [ctx, t],
  );
}
