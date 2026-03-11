"use client";

import { Controller } from "react-hook-form";
import type { TodoFormUIProps } from "@/app/todo/lib/types";
import { Button } from "@/shadcn/components/ui/button";
import { Field, FieldError } from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";
import { cn } from "@/shadcn/lib/utils";

export default function TodoFormUI({
  buttonText,
  className,
  control,
  onSubmit,
  placeholder,
  validation,
}: TodoFormUIProps) {
  return (
    <form
      className={cn("flex gap-4 items-start max-w-2xl mb-4 mx-auto", className)}
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
              id={field.name}
              placeholder={placeholder}
            />
            {fieldState.invalid && fieldState.error && (
              <FieldError>{validation}</FieldError>
            )}
          </Field>
        )}
      />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
}
