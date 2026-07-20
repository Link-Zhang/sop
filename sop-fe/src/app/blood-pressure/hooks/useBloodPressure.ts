"use client";

import { useTranslation } from "react-i18next";
import { v7 as uuid } from "uuid";
import type { BloodPressure } from "@/app/blood-pressure/lib/types";
import useCreateMutation from "@/app/hooks/useCreateMutation";
import useDeleteMutation from "@/app/hooks/useDeleteMutation";
import useReadMutation from "@/app/hooks/useReadMutation";
import useUpdateMutation from "@/app/hooks/useUpdateMutation";
import { BLOOD_PRESSURE_API_URL } from "@/app/lib/apis";

export default function useBloodPressure() {
  const { t } = useTranslation("blood-pressure");

  const createMutation = useCreateMutation<BloodPressure>(
    BLOOD_PRESSURE_API_URL,
    t,
  );
  const readMutation = useReadMutation<BloodPressure[]>(
    BLOOD_PRESSURE_API_URL,
    t,
  );
  const updateMutation = useUpdateMutation<BloodPressure>(
    BLOOD_PRESSURE_API_URL,
    t,
  );
  const deleteMutation = useDeleteMutation<BloodPressure>(
    BLOOD_PRESSURE_API_URL,
    t,
  );

  const createBloodPressure = (sbp: number, dbp: number, hr: number) => {
    const item: BloodPressure = {
      id: uuid(),
      systolicBloodPressure: sbp,
      diastolicBloodPressure: dbp,
      heartRate: hr,
      date: new Date().toISOString(),
    };
    createMutation.mutate({ item });
  };

  const readBloodPressure = () => {
    readMutation.mutate();
  };

  const updateBloodPressure = (
    id: string,
    updates: Omit<Partial<BloodPressure>, "id">,
  ) => {
    updateMutation.mutate({ id, updates });
  };

  const deleteBloodPressure = (id: string) => {
    deleteMutation.mutate({ id });
  };

  return {
    createBloodPressure,
    readBloodPressure,
    updateBloodPressure,
    deleteBloodPressure,
  };
}
