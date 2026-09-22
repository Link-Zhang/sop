"use client";

import type { TFunction } from "i18next";
import { useCallback } from "react";
import useConfirmContext from "@/app/hooks/useConfirmContext";
import type { ConfirmDialogOptions } from "@/app/lib/types";

export default function useConfirmDelete(t: TFunction) {
  const ctx = useConfirmContext();

  return useCallback(
    (overrides?: Partial<ConfirmDialogOptions>) =>
      ctx({
        cancel: t("dialog.delete.cancel"),
        confirm: t("dialog.delete.confirm"),
        description: t("dialog.delete.description"),
        destructive: true,
        title: t("dialog.delete.title"),
        ...overrides,
      }),
    [ctx, t],
  );
}
