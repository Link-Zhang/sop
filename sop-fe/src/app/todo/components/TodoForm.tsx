"use client";

import { useForm, useSelector } from "@tanstack/react-form";
import { Edit } from "lucide-react";
import { useTranslation } from "react-i18next";
import useTodo from "@/app/todo/hooks/useTodo";
import { Button } from "@/shadcn/components/ui/button";
import { Field, FieldError } from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";

const onChange = ({ value }: { value: string }) =>
  value.trim() ? undefined : "form.empty";

export function TodoForm() {
  const { createTodo } = useTodo();
  const { t } = useTranslation("todo");
  const label = t("field.content");

  const form = useForm({
    defaultValues: { content: "" },
    onSubmit: ({ formApi, value }) => {
      createTodo(value.content);
      formApi.reset();
    },
  });

  const canSubmit = useSelector(form.store, (s) => s.canSubmit);

  return (
    <form
      className="flex gap-4 items-start max-w-2xl mt-4 mx-auto w-full"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.Field name="content" validators={{ onChange }}>
        {(field) => {
          const { isTouched, isValid, errors } = field.state.meta;
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
