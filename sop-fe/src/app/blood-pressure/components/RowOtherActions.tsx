import type { Row } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import RowUpdate from "@/app/blood-pressure/components/RowUpdate";
import useBloodPressure from "@/app/blood-pressure/hooks/useBloodPressure";
import type { BloodPressure } from "@/app/blood-pressure/lib/types";
import DeleteDialogUI from "@/app/components/ui/DeleteDialogUI";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function RowOtherActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { deleteBloodPressure } = useBloodPressure();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const { t } = useTranslation("blood-pressure");

  const rowData = row.original as BloodPressure;
  const id = rowData.id;
  const date = rowData.measuredAt;

  const handleDeleteConfirm = async () => {
    await deleteBloodPressure(id);
    setDeleteOpen(false);
  };

  const deleteLabels = useMemo(
    () => ({
      cancel: t("delete.dialog.cancel"),
      confirm: t("delete.dialog.confirm"),
      description: t("delete.dialog.description"),
      title: t("delete.dialog.title"),
    }),
    [t],
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8" size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => {
              setUpdateOpen(true);
            }}
          >
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => alert(`复制行 ID: ${id} Date: ${date}`)}
          >
            <Copy />
            Copy
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setDeleteOpen(true)}
            variant="destructive"
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RowUpdate row={rowData} open={updateOpen} onOpenChange={setUpdateOpen} />
      <DeleteDialogUI
        onConfirm={handleDeleteConfirm}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
        labels={deleteLabels}
      />
    </>
  );
}
