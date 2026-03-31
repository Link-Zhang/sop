import z from "zod";

export const bloodPressureSchema = z.object({
  id: z.uuidv7(),
  systolicBloodPressure: z.number().min(0).max(299),
  diastolicBloodPressure: z.number().min(0).max(299),
  heartRate: z.number().int().min(40).max(180),
  measuredAt: z.iso.datetime(),
});

export type BloodPressure = z.infer<typeof bloodPressureSchema>;

export interface ColumnHeaderProps {
  canSort?: boolean;
  id: string;
}

export interface DeleteDialogUIProps {
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  texts: DeleteDialogUITexts;
}

interface DeleteDialogUITexts {
  cancel: string;
  continue: string;
  description: string;
  title: string;
}
