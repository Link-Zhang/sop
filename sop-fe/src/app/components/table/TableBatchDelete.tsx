"use client";

import { Subscribe } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import useConfirmDelete from "@/app/hooks/useConfirmDelete";
import { useTableContext } from "@/app/hooks/useTable";
import { Button } from "@/shadcn/components/ui/button";

export default function TableBatchDelete() {
  const table = useTableContext();
  const { t } = useTranslation();
  const confirmDelete = useConfirmDelete();

  return (
    <Subscribe source={table.atoms.rowSelection}>
      {(rowSelection) => (
        <Button
          variant="destructive"
          disabled={Object.values(rowSelection).filter(Boolean).length < 2}
          onClick={async () => {
            if (!(await confirmDelete({ icon: <Trash /> }))) return;
            const { onDelete } = table.options.meta ?? {};
            table
              .getSelectedRowModel()
              .rows.map((r) => (r.original as { id?: string }).id)
              .forEach((id) => {
                if (id) onDelete?.(id);
              });
            table.resetRowSelection();
          }}
        >
          <Trash /> {t("table.delete.batch")}
        </Button>
      )}
    </Subscribe>
  );
}
