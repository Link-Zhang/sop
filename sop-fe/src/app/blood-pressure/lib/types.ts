import type { LucideIcon } from "lucide-react";
import z from "zod";

export const bloodPressureSchema = z.object({
  id: z.uuidv7(),
  systolicBloodPressure: z.number().min(1).max(299),
  diastolicBloodPressure: z.number().min(1).max(299),
  heartRate: z.number().min(40).max(180),
  date: z.iso.datetime(),
});

export type BloodPressure = z.infer<typeof bloodPressureSchema>;

export const createBloodPressureSchema = bloodPressureSchema.pick({
  systolicBloodPressure: true,
  diastolicBloodPressure: true,
  heartRate: true,
});

export type CreateBloodPressure = z.infer<typeof createBloodPressureSchema>;

export const updateBloodPressureSchema = bloodPressureSchema.pick({
  systolicBloodPressure: true,
  diastolicBloodPressure: true,
  heartRate: true,
});

export type UpdateBloodPressure = z.infer<typeof updateBloodPressureSchema>;

export type Level = {
  bgColor: string;
  dbpLimit?: number;
  icon: LucideIcon;
  limit?: number;
  sbpLimit?: number;
  text: string;
  textColor: string;
};
