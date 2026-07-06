import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import BloodPressureCreateFields from "@/app/blood-pressure/components/BloodPressureCreateFields";
import useBloodPressure from "@/app/blood-pressure/hooks/useBloodPressure";
import { numberField } from "@/app/blood-pressure/lib/utils";
import { useMediaQuery } from "@/app/data-table/hooks/useMediaQuery";
import { Button } from "@/shadcn/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shadcn/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shadcn/components/ui/sheet";

type BloodPressureRow = {
  id: string;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  heartRate: number;
};

type RowUpdateProps = {
  row: BloodPressureRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function RowUpdate({ row, open, onOpenChange }: RowUpdateProps) {
  const { updateBloodPressure } = useBloodPressure();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { t } = useTranslation("blood-pressure");

  const rowSchema = useMemo(
    () =>
      z
        .object({
          systolicBloodPressure: numberField(
            t,
            "systolicBloodPressure",
            0,
            299,
          ),
          diastolicBloodPressure: numberField(
            t,
            "diastolicBloodPressure",
            0,
            299,
          ),
          heartRate: numberField(t, "heartRate", 40, 180),
        })
        .refine(
          (data) => data.diastolicBloodPressure < data.systolicBloodPressure,
          {
            message: t("validation.diastolicMustBeLessThanSystolic"),
            path: ["diastolicBloodPressure"],
          },
        ),
    [t],
  );

  const form = useForm({
    resolver: zodResolver(rowSchema),
    defaultValues: row,
  });

  const onSubmit = async (data: z.infer<typeof rowSchema>) => {
    await updateBloodPressure(row.id, data);
    onOpenChange(false);
    form.reset();
  };

  const { Container, Content, Header, Title, Description, Footer, Close } =
    isDesktop
      ? {
          Container: Sheet,
          Content: SheetContent,
          Header: SheetHeader,
          Title: SheetTitle,
          Description: SheetDescription,
          Footer: SheetFooter,
          Close: SheetClose,
        }
      : {
          Container: Drawer,
          Content: DrawerContent,
          Header: DrawerHeader,
          Title: DrawerTitle,
          Description: DrawerDescription,
          Footer: DrawerFooter,
          Close: DrawerClose,
        };

  return (
    <Container open={open} onOpenChange={onOpenChange}>
      <Content>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Header>
            <Title>{t("update.form.title")}</Title>
            <Description>{t("update.form.description")}</Description>
          </Header>
          <FormProvider {...form}>
            <BloodPressureCreateFields />
          </FormProvider>
          <Footer>
            <Button type="submit">{t("update.form.submit")}</Button>
            <Close asChild>
              <Button variant="outline">{t("update.form.cancel")}</Button>
            </Close>
          </Footer>
        </form>
      </Content>
    </Container>
  );
}
