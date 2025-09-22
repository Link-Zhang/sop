"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import useTodo from "@/app/todo/hooks/useTodo";
import { Button } from "@/shadcn/components/ui/button";
import { Field, FieldError } from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";

export default function TodoForm() {
  const { createTodo } = useTodo();

  const { t } = useTranslation("todo");

  const formSchema = z.object({
    content: z.string().min(1, t("formInputValidation")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createTodo(data?.content?.trim());
    form.reset();
  };

  return (
    <form
      className="flex gap-4 items-start max-w-2xl mb-4 mx-auto"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Field
            className="flex-1 min-w-0"
            data-invalid={fieldState.invalid}
            orientation="vertical"
          >
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
              id={field.name}
              placeholder={t("formInputPlaceholder")}
            />
            {fieldState.invalid && fieldState.error && (
              <FieldError>{t("formInputValidation")}</FieldError>
            )}
          </Field>
        )}
      />
      <Button type="submit">{t("formButtonText")}</Button>
    </form>
  );
}
