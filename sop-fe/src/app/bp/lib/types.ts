import { z } from "zod";

export const BPSchema = z.object({
  id: z.uuidv7(),
  sbp: z.number().min(1).max(299),
  dbp: z.number().min(1).max(299),
  hr: z.number().min(40).max(180),
  date: z.iso.datetime(),
});

export type BP = z.infer<typeof BPSchema>;

export type BPTableSkeletonProps = {
  columns: number;
  rows?: number;
};
