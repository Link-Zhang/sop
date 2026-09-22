"use client";

import { useForm, useSelector } from "@tanstack/react-form";
import { Edit } from "lucide-react";
import { useTranslation } from "react-i18next";
import useTodo from "@/app/todo/hooks/useTodo";
import { Button } from "@/shadcn/components/ui/button";
import { Field, FieldError } from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";

const requiredValidator = ({ value }: { value: string }) =>
  value.trim() ? undefined : "form.required";

export default function TodoForm() {
  const { createTodo } = useTodo();
  const { t } = useTranslation("todo");
  const form = useForm({
    defaultValues: { content: "" },
    onSubmit: ({ formApi, value }) => {
      createTodo(value.content);
      formApi.reset();
    },
  });
  const canSubmit = useSelector(form.store, (s) => s.canSubmit);

  const label = t("field.content");

  return (
    <form
      className="flex gap-3 items-start"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.Field name="content" validators={{ onChange: requiredValidator }}>
        {(field) => {
          const { errors, isTouched, isValid } = field.state.meta;
          const isInvalid = isTouched && !isValid;
          return (
            <Field className="flex-1 min-w-0" data-invalid={isInvalid}>
              <Input
                aria-invalid={isInvalid}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={t("form.placeholder", { field: label })}
                value={field.state.value}
              />
              {isInvalid && (
                <FieldError
                  errors={errors.map((err) => ({
                    message:
                      typeof err === "string"
                        ? t(err, { field: label })
                        : String(err),
                  }))}
                />
              )}
            </Field>
          );
        }}
      </form.Field>
      <Button disabled={!canSubmit} type="submit">
        <Edit />
        {t("form.submit")}
      </Button>
    </form>
  );
}
