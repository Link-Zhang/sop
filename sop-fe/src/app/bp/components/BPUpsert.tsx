"use client";

import { useForm, useSelector } from "@tanstack/react-form";
import { ClipboardPenLine, Copy, Edit } from "lucide-react";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  type BPForm,
  BPFormSchema,
  type BPRecord,
  NUMBER_FIELDS,
} from "@/app/bp/lib/types";
import { numberScope } from "@/app/bp/lib/utils";
import useMediaQuery from "@/app/hooks/useMediaQuery";
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
import { Field, FieldError, FieldLabel } from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";
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

export default function BPUpsert({
  data,
  onOpenChange,
  open,
  onSave,
  trigger,
}: {
  data?: unknown;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  onSave: (value: BPForm) => void;
  trigger?: ReactElement | null;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { t } = useTranslation();

  const record = (data ?? {}) as BPRecord;
  const mode = data == null ? "create" : record.id != null ? "update" : "copy";
  const isUpdate = mode === "update";

  const form = useForm({
    defaultValues: {
      sbp: record.sbp,
      dbp: record.dbp,
      hr: record.hr,
    } as Partial<BPForm>,
    validators: { onChange: BPFormSchema },
    onSubmit: ({ value }) => {
      onSave(BPFormSchema.parse(value));
      onOpenChange(false);
    },
  });
  const canSubmit = useSelector(form.store, (s) => s.canSubmit);

  const {
    Container,
    Trigger,
    Content,
    Header,
    Title,
    Description,
    Footer,
    Close,
    containerProps,
    contentProps,
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
        containerProps: {},
        contentProps: { side: "right" as const },
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
        containerProps: {
          showSwipeHandle: true,
          swipeDirection: "down" as const,
        },
        contentProps: {},
      };

  const msg = (err: unknown, label: string, min?: number, max?: number) => {
    const { code, message } = err as { code?: string; message?: string };
    if (code === "invalid_type")
      return t("table.field.required", { field: label });
    if (code === "too_small" || code === "too_big")
      return t("table.field.scope", { field: label, min, max });
    if (code === "custom" && message === "table.field.lt")
      return t(message, {
        field1: t("header.field.dbp"),
        field2: t("header.field.sbp"),
      });
    return message ?? "";
  };

  return (
    <Container onOpenChange={onOpenChange} open={open} {...containerProps}>
      {trigger !== null && (
        <Trigger
          render={
            trigger ?? (
              <Button>
                {isUpdate ? (
                  <ClipboardPenLine />
                ) : mode === "copy" ? (
                  <Copy />
                ) : (
                  <Edit />
                )}
                {t(`${mode}.trigger`)}
              </Button>
            )
          }
        />
      )}
      <Content {...contentProps}>
        <Header>
          <Title>{t(`table.${mode}.title`)}</Title>
          <Description>{t(`table.${mode}.description`)}</Description>
        </Header>
        <form
          id="form"
          className="flex flex-col gap-4 overflow-y-auto pb-4 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          noValidate
        >
          {NUMBER_FIELDS.map((name) => {
            const { min, max } = numberScope(BPFormSchema.shape[name]);
            const label = t(`header.field.${name}`);
            const placeholder =
              min != null && max != null
                ? String(Math.round((min + max) / 2))
                : undefined;

            return (
              <form.Field key={name} name={name}>
                {(field) => {
                  const { errors, isTouched, isValid } = field.state.meta;
                  const invalid = isTouched && !isValid;

                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel htmlFor={field.name}>
                        {label}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        aria-invalid={invalid}
                        id={field.name}
                        inputMode="numeric"
                        max={max}
                        min={min}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value),
                          )
                        }
                        placeholder={placeholder}
                        type="number"
                        value={field.state.value ?? ""}
                      />
                      {invalid && (
                        <FieldError
                          errors={errors.map((err) => ({
                            message: msg(err, label, min, max),
                          }))}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            );
          })}
        </form>
        <Footer>
          <Button disabled={!canSubmit} form="form" type="submit">
            {t("submit")}
          </Button>
          <Close render={<Button variant="outline">{t("cancel")}</Button>} />
        </Footer>
      </Content>
    </Container>
  );
}
