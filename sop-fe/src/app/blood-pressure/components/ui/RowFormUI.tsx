import type { ComponentProps } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import RowFormFields, {
  type RowFormField,
} from "@/app/blood-pressure/components/RowFormFields";
import type {
  CreateBloodPressure,
  UpdateBloodPressure,
} from "@/app/blood-pressure/lib/types";
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

export interface RowFormUILabels {
  cancel: string;
  description: string;
  submit: string;
  title: string;
}

export interface RowFormUIProps {
  form: UseFormReturn<CreateBloodPressure | UpdateBloodPressure>;
  isDesktop: boolean;
  labels: RowFormUILabels;
  onOpenChange: (open: boolean) => void;
  onSubmit: ComponentProps<"form">["onSubmit"];
  open: boolean;
  fields: RowFormField[];
}

export default function RowFormUI({
  form,
  isDesktop,
  labels,
  onOpenChange,
  onSubmit,
  open,
  fields,
}: RowFormUIProps) {
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
        <form onSubmit={onSubmit}>
          <Header>
            <Title>{labels.title}</Title>
            <Description>{labels.description}</Description>
          </Header>
          <FormProvider {...form}>
            <RowFormFields fields={fields} />
          </FormProvider>
          <Footer>
            <Button type="submit">{labels.submit}</Button>
            <Close asChild>
              <Button variant="outline">{labels.cancel}</Button>
            </Close>
          </Footer>
        </form>
      </Content>
    </Container>
  );
}
