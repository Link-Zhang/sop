import { z } from "zod";
import { isNumber } from "@/app/bp/lib/utils";

export const BPSchema = z.object({
  id: z.uuidv7(),
  sbp: z.number().min(1).max(299),
  dbp: z.number().min(1).max(299),
  hr: z.number().min(40).max(180),
  date: z.iso.datetime(),
});

export type BP = z.infer<typeof BPSchema>;

export const BPFormSchema = BPSchema.omit({ id: true, date: true }).refine(
  (data) => data.dbp < data.sbp,
  {
    message: "table.field.lt",
    path: ["dbp"],
  },
);

export type BPForm = z.infer<typeof BPFormSchema>;

export type BPRecord = Partial<BPForm> & { id?: string };

export const NUMBER_FIELDS = Object.entries(BPFormSchema.shape)
  .filter(([, schema]) => isNumber(schema))
  .map(([key]) => key) as (keyof BPForm)[];
