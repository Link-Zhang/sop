"use client";

import { Controller } from "react-hook-form";
import type { TodoFormUIProps } from "@/app/todo/lib/types";
import { Button } from "@/shadcn/components/ui/button";
import { Field, FieldError } from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";

export default function TodoFormUI({
  control,
  labels,
  onSubmit,
}: TodoFormUIProps) {
  return (
    <form
      className="flex gap-4 items-start max-w-2xl mb-4 mx-auto"
      onSubmit={onSubmit}
    >
      <Controller
        control={control}
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
              placeholder={labels.placeholder}
            />
            {fieldState.error && <FieldError>{labels.required}</FieldError>}
          </Field>
        )}
      />
      <Button type="submit">{labels.submit}</Button>
    </form>
  );
}
