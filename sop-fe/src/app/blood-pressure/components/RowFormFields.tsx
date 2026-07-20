import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";

export interface RowFormField {
  key: string;
  name: string;
  placeholder: string;
  unit: string;
}

export interface RowFormFieldsProps {
  fields: RowFormField[];
}

export default function RowFormFields({ fields }: RowFormFieldsProps) {
  const { control } = useFormContext();

  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      {fields.map(({ key, name, placeholder, unit }) => (
        <Controller
          control={control}
          key={key}
          name={key}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                {name}
                {unit}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  field.onChange(rawValue === "" ? null : Number(rawValue));
                }}
                placeholder={placeholder}
                type="number"
                value={field.value != null ? String(field.value) : ""}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}
    </div>
  );
}
