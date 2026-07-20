import { zodResolver } from "@hookform/resolvers/zod";
import type { Row } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import {
  Copy,
  FileBraces,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import RowFormUI, {
  type RowFormUILabels,
} from "@/app/blood-pressure/components/ui/RowFormUI";
import useBloodPressure from "@/app/blood-pressure/hooks/useBloodPressure";
import useMediaQuery from "@/app/blood-pressure/hooks/useMediaQuery";
import type {
  BloodPressure,
  CreateBloodPressure,
  UpdateBloodPressure,
} from "@/app/blood-pressure/lib/types";
import {
  bloodPressureFields,
  getRowSchema,
} from "@/app/blood-pressure/lib/utils";
import DeleteDialogUI from "@/app/components/ui/DeleteDialogUI";
import type { DeleteDialogUILabels } from "@/app/lib/types";
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
  t: TFunction;
}

export default function RowActions<TData>({
  row,
  t,
}: DataTableRowActionsProps<TData>) {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  //todo
  const { createBloodPressure } = useBloodPressure();
  const { updateBloodPressure } = useBloodPressure();
  const { deleteBloodPressure } = useBloodPressure();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const rowData = row.original as BloodPressure;
  const { id, date, ...rest } = rowData;

  const createLabels: RowFormUILabels = useMemo(
    () => ({
      cancel: t("create.form.cancel"),
      description: t("create.form.description"),
      submit: t("create.form.submit"),
      title: t("create.form.title"),
    }),
    [t],
  );

  const updateLabels: RowFormUILabels = useMemo(
    () => ({
      cancel: t("update.form.cancel"),
      description: t("update.form.description"),
      submit: t("update.form.submit"),
      title: t("update.form.title"),
    }),
    [t],
  );

  const deleteLabels: DeleteDialogUILabels = useMemo(
    () => ({
      cancel: t("delete.dialog.cancel"),
      confirm: t("delete.dialog.confirm"),
      description: t("delete.dialog.description"),
      title: t("delete.dialog.title"),
    }),
    [t],
  );

  const rowSchema = useMemo(() => getRowSchema(t), [t]);

  const createForm = useForm<CreateBloodPressure>({
    defaultValues: rest,
    resolver: zodResolver(rowSchema),
  });

  const updateForm = useForm<UpdateBloodPressure>({
    defaultValues: rest,
    resolver: zodResolver(rowSchema),
  });

  useEffect(() => {
    if (createOpen) {
      createForm.reset();
    }
  }, [createOpen, createForm]);

  useEffect(() => {
    if (updateOpen) {
      updateForm.reset();
    }
  }, [updateOpen, updateForm]);

  const handleCreate = (data: CreateBloodPressure) => {
    createBloodPressure(
      data.systolicBloodPressure,
      data.diastolicBloodPressure,
      data.heartRate,
    );
    setCreateOpen(false);
    createForm.reset();
  };

  const handleUpdate = (data: UpdateBloodPressure) => {
    updateBloodPressure(id, data);
    setUpdateOpen(false);
    updateForm.reset();
  };

  const handleDelete = () => {
    deleteBloodPressure(id);
    setDeleteOpen(false);
  };

  const fields = bloodPressureFields.map((field) => ({
    ...field,
    name: t(`fields.${field.key}`),
  }));

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
            onSelect={() => alert(JSON.stringify(rowData, null, 2))}
          >
            <FileBraces />
            {t("actions.json")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setUpdateOpen(true);
            }}
          >
            <PencilLine />
            {t("actions.edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setCreateOpen(true);
            }}
          >
            <Copy />
            {t("actions.copy")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setDeleteOpen(true)}
            variant="destructive"
          >
            <Trash2 />
            {t("actions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RowFormUI
        form={createForm}
        isDesktop={isDesktop}
        labels={createLabels}
        onOpenChange={setCreateOpen}
        onSubmit={createForm.handleSubmit(handleCreate)}
        open={createOpen}
        fields={fields}
      />
      <RowFormUI
        form={updateForm}
        isDesktop={isDesktop}
        labels={updateLabels}
        onOpenChange={setUpdateOpen}
        onSubmit={updateForm.handleSubmit(handleUpdate)}
        open={updateOpen}
        fields={fields}
      />
      <DeleteDialogUI
        labels={deleteLabels}
        onConfirm={handleDelete}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
      />
    </>
  );
}
