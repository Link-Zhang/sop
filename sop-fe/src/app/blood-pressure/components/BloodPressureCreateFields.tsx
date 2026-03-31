import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field, FieldError, FieldLabel } from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";

const FIELDS = [
  {
    key: "systolicBloodPressure" as const,
    unit: "(mmHg)",
    placeholder: "120",
  },
  {
    key: "diastolicBloodPressure" as const,
    unit: "(mmHg)",
    placeholder: "80",
  },
  {
    key: "heartRate" as const,
    unit: "(bpm)",
    placeholder: "80",
  },
] as const;

export default function BloodPressureCreateFields() {
  const { control } = useFormContext();
  const { t } = useTranslation("blood-pressure");

  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      {FIELDS.map(({ key, unit, placeholder }) => (
        <Controller
          key={key}
          name={key}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                {t(`fields.${key}`)}
                {unit}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                type="number"
                value={field.value ?? ""}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}
    </div>
  );
}
