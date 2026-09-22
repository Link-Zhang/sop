"use client";

import { Subscribe } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTableContext } from "@/app/hooks/useTable";
import { Button } from "@/shadcn/components/ui/button";

export default function TableBatchDelete() {
  const table = useTableContext();
  const { t } = useTranslation();

  return (
    <Subscribe source={table.atoms.rowSelection}>
      {(rowSelection) => (
        <Button
          className="btn-destructive-compat"
          disabled={Object.values(rowSelection).filter(Boolean).length < 2}
          onClick={() => {
            const { onDelete } = table.options.meta ?? {};
            const ids = table
              .getSelectedRowModel()
              .rows.map((r) => (r.original as { id?: string }).id)
              .filter((id): id is string => Boolean(id));
            onDelete?.(ids);
            table.resetRowSelection();
          }}
          variant="destructive"
        >
          <Trash /> {t("table.delete.batch")}
        </Button>
      )}
    </Subscribe>
  );
}
