import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
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
  DrawerTrigger,
} from "@/shadcn/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/components/ui/sheet";

export default function RowCreate() {
  const { createBloodPressure } = useBloodPressure();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
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
  });

  const onSubmit = async (data: z.infer<typeof rowSchema>) => {
    await createBloodPressure(
      data.systolicBloodPressure,
      data.diastolicBloodPressure,
      data.heartRate,
    );
    setOpen(false);
    form.reset();
  };

  const {
    Container,
    Trigger,
    Content,
    Header,
    Title,
    Description,
    Footer,
    Close,
  } = isDesktop
    ? {
        Container: Sheet,
        Trigger: SheetTrigger,
        Content: SheetContent,
        Header: SheetHeader,
        Title: SheetTitle,
        Description: SheetDescription,
        Footer: SheetFooter,
        Close: SheetClose,
      }
    : {
        Container: Drawer,
        Trigger: DrawerTrigger,
        Content: DrawerContent,
        Header: DrawerHeader,
        Title: DrawerTitle,
        Description: DrawerDescription,
        Footer: DrawerFooter,
        Close: DrawerClose,
      };

  return (
    <Container open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <Button>{t("create.form.text")}</Button>
      </Trigger>
      <Content>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Header>
            <Title>{t("create.form.title")}</Title>
            <Description>{t("create.form.description")}</Description>
          </Header>
          <FormProvider {...form}>
            <BloodPressureCreateFields />
          </FormProvider>
          <Footer>
            <Button type="submit">{t("create.form.submit")}</Button>
            <Close asChild>
              <Button variant="outline">{t("create.form.cancel")}</Button>
            </Close>
          </Footer>
        </form>
      </Content>
    </Container>
  );
}
