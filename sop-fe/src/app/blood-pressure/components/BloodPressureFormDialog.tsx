import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import BloodPressureCreateFields from "@/app/blood-pressure/components/BloodPressureCreateFields";
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

export type BloodPressureRow = {
  id: string;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  heartRate: number;
};

interface BloodPressureFormDialogProps {
  mode: "create" | "update";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: Omit<BloodPressureRow, "id">;
  onSubmit: (data: Omit<BloodPressureRow, "id">) => Promise<void>;
  trigger?: ReactNode; // 创建时传入按钮，更新时不传
}

export function BloodPressureFormDialog({
  mode,
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  trigger,
}: BloodPressureFormDialogProps) {
  const { t } = useTranslation("blood-pressure");
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
    defaultValues,
  });

  const handleSubmit = async (data: z.infer<typeof rowSchema>) => {
    await onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  // 自适应组件
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
    <Container open={open} onOpenChange={onOpenChange}>
      {/* 只有传入了 trigger 才渲染触发按钮（创建场景） */}
      {trigger && <Trigger asChild>{trigger}</Trigger>}
      <Content>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Header>
            <Title>{t(`${mode}.form.title`)}</Title>
            <Description>{t(`${mode}.form.description`)}</Description>
          </Header>
          <FormProvider {...form}>
            <BloodPressureCreateFields />
          </FormProvider>
          <Footer>
            <Button type="submit">{t(`${mode}.form.submit`)}</Button>
            <Close asChild>
              <Button variant="outline">{t(`${mode}.form.cancel`)}</Button>
            </Close>
          </Footer>
        </form>
      </Content>
    </Container>
  );
}
