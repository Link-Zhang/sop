"use client";

import { type ReactNode, useCallback, useState } from "react";
import ConfirmDialog from "@/app/components/app/ConfirmDialog";
import { ConfirmContext } from "@/app/hooks/useConfirmContext";
import type { ConfirmFn, ConfirmState } from "@/app/lib/types";

export default function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);

  const close = useCallback((result: boolean) => {
    setState((prev) => {
      if (!prev?.open) return prev;
      prev.resolve(result);
      return { ...prev, open: false };
    });
  }, []);

  const confirm = useCallback<ConfirmFn>(
    (options) =>
      new Promise<boolean>((resolve) => {
        setState((prev) => {
          prev?.resolve(false);
          return { options, open: true, resolve };
        });
      }),
    [],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) close(false);
    },
    [close],
  );

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <ConfirmDialog
          onConfirm={() => close(true)}
          onOpenChange={handleOpenChange}
          open={state.open}
          options={state.options}
        />
      )}
    </ConfirmContext.Provider>
  );
}
