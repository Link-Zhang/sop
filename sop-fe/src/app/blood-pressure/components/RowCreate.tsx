import { zodResolver } from "@hookform/resolvers/zod";
import type { TFunction } from "i18next";
import { Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import RowFormUI, {
  type RowFormUILabels,
} from "@/app/blood-pressure/components/ui/RowFormUI";
import useBloodPressure from "@/app/blood-pressure/hooks/useBloodPressure";
import useMediaQuery from "@/app/blood-pressure/hooks/useMediaQuery";
import type { CreateBloodPressure } from "@/app/blood-pressure/lib/types";
import {
  bloodPressureFields,
  getRowSchema,
} from "@/app/blood-pressure/lib/utils";
import { Button } from "@/shadcn/components/ui/button";

export interface RowCreateProps {
  t: TFunction;
}

export default function RowCreate({ t }: RowCreateProps) {
  const [createOpen, setCreateOpen] = useState(false);

  const { createBloodPressure } = useBloodPressure();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const createLabels: RowFormUILabels = useMemo(
    () => ({
      cancel: t("create.form.cancel"),
      description: t("create.form.description"),
      submit: t("create.form.submit"),
      title: t("create.form.title"),
    }),
    [t],
  );

  const rowSchema = useMemo(() => getRowSchema(t), [t]);

  const createForm = useForm<CreateBloodPressure>({
    resolver: zodResolver(rowSchema),
  });

  useEffect(() => {
    if (createOpen) {
      createForm.reset();
    }
  }, [createOpen, createForm]);

  const handleCreate = (data: CreateBloodPressure) => {
    createBloodPressure(
      data.systolicBloodPressure,
      data.diastolicBloodPressure,
      data.heartRate,
    );
    setCreateOpen(false);
    createForm.reset();
  };

  const fields = bloodPressureFields.map((field) => ({
    ...field,
    name: t(`fields.${field.key}`),
  }));

  return (
    <>
      <Button onClick={() => setCreateOpen(true)} type="button">
        <Pencil />
        {t("create.form.text")}
      </Button>
      <RowFormUI
        form={createForm}
        isDesktop={isDesktop}
        labels={createLabels}
        onOpenChange={setCreateOpen}
        onSubmit={createForm.handleSubmit(handleCreate)}
        open={createOpen}
        fields={fields}
      />
    </>
  );
}
