"use client";

import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useSWR from "swr";
import { v7 as uuid } from "uuid";
import {
  type BloodPressure,
  bloodPressureSchema,
} from "@/app/blood-pressure/lib/types";
import { BLOOD_PRESSURE_API_URL } from "@/app/lib/apis";
import { fetcher } from "@/app/lib/utils";

export default function useBloodPressure() {
  const { data, error, isLoading, mutate } = useSWR<BloodPressure[]>(
    BLOOD_PRESSURE_API_URL,
    fetcher.get,
    {
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        if (error && typeof error === "object" && "status" in error) {
          if (error.status === 400 || error.status === 404) return;
        }
        if (retryCount >= 3) return;
        const timeout = Math.min(1000 * 2 ** retryCount, 8000);
        setTimeout(() => revalidate({ retryCount }), timeout);
      },
    },
  );

  const { t } = useTranslation("blood-pressure");

  const executeOptimistic = async <T>(
    optimisticMutate: (data: BloodPressure[] | undefined) => BloodPressure[],
    apiCall: () => Promise<T>,
    rollback: (data: BloodPressure[] | undefined) => BloodPressure[],
    msgKey: string,
  ) => {
    try {
      await mutate(optimisticMutate, false);
      const result = await apiCall();
      await mutate();
      toast.success(t(`${msgKey}.success`));
      return result;
    } catch {
      await mutate(rollback, false);
      toast.error(t(`${msgKey}.error`));
    }
  };

  const createBloodPressure = async (sbp: number, dbp: number, hr: number) => {
    const parsed = bloodPressureSchema
      .pick({
        systolicBloodPressure: true,
        diastolicBloodPressure: true,
        heartRate: true,
        measuredAt: true,
      })
      .safeParse({
        systolicBloodPressure: sbp,
        diastolicBloodPressure: dbp,
        heartRate: hr,
        measuredAt: new Date().toISOString(),
      });
    if (!parsed.success) {
      toast.error(
        t("validation.invalidInput", {
          message: parsed.error.issues[0]?.message,
        }),
      );
      return;
    }
    const newBP = { id: uuid(), ...parsed.data };
    return executeOptimistic(
      (data) => [...(data ?? []), newBP],
      () => fetcher.post<BloodPressure>(BLOOD_PRESSURE_API_URL, newBP),
      (data) => data?.filter((bp) => bp.id !== newBP.id) ?? [],
      "create",
    );
  };

  const updateBloodPressure = async (
    id: string,
    updates: Partial<BloodPressure>,
  ) => {
    const inputCheck = bloodPressureSchema
      .pick({
        systolicBloodPressure: true,
        diastolicBloodPressure: true,
        heartRate: true,
      })
      .partial()
      .safeParse(updates);
    if (!inputCheck.success) {
      toast.error(
        t("validation.invalidInput", {
          message: inputCheck.error.issues[0].message,
        }),
      );
      return;
    }
    let previousItem: BloodPressure | undefined;
    return executeOptimistic(
      (currentData) => {
        const target = currentData?.find((bp) => bp.id === id);
        previousItem = target ? { ...target } : undefined;
        return (
          currentData?.map((bp) =>
            bp.id === id ? { ...bp, ...updates } : bp,
          ) ?? []
        );
      },
      () =>
        fetcher.patch<BloodPressure>(
          `${BLOOD_PRESSURE_API_URL}/${id}`,
          updates,
        ),
      (currentData) => {
        if (previousItem) {
          const prev = previousItem;
          return currentData?.map((bp) => (bp.id === id ? prev : bp)) ?? [];
        }
        return currentData ?? [];
      },
      "update",
    );
  };

  const deleteBloodPressure = async (id: string) => {
    if (!bloodPressureSchema.shape.id.safeParse(id).success) {
      toast.error(
        t("validation.invalidInput", {
          message: "invalidId",
        }),
      );
      return;
    }

    let deletedItem: BloodPressure | undefined;
    return executeOptimistic(
      (currentData) => {
        deletedItem = currentData?.find((bp) => bp.id === id);
        return currentData?.filter((bp) => bp.id !== id) ?? [];
      },
      () => fetcher.delete(`${BLOOD_PRESSURE_API_URL}/${id}`),
      (currentData) => {
        if (deletedItem) {
          return [...(currentData ?? []), deletedItem];
        }
        return currentData ?? [];
      },
      "delete",
    );
  };

  return {
    createBloodPressure,
    data,
    deleteBloodPressure,
    error,
    isLoading,
    mutate,
    updateBloodPressure,
  };
}
