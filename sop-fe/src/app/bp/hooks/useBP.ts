"use client";

import { v7 as uuid } from "uuid";
import type { BP } from "@/app/bp/lib/types";
import useCreateMutation from "@/app/hooks/useCreateMutation";
import useDeleteMutation from "@/app/hooks/useDeleteMutation";
import useReadMutation from "@/app/hooks/useReadMutation";
import useUpdateMutation from "@/app/hooks/useUpdateMutation";
import { API_BP } from "@/app/lib/configs";

export default function useBP() {
  const createMutation = useCreateMutation<BP>(API_BP);
  const readMutation = useReadMutation<BP[]>(API_BP);
  const updateMutation = useUpdateMutation<BP>(API_BP);
  const deleteMutation = useDeleteMutation<BP>(API_BP);

  const createBP = (sbp: number, dbp: number, hr: number) => {
    const item: BP = {
      id: uuid(),
      sbp: sbp,
      dbp: dbp,
      hr: hr,
      date: new Date().toISOString(),
    };
    createMutation.mutate({ item });
  };

  const readBP = () => {
    readMutation.mutate();
  };

  const updateBP = (id: string, updates: Omit<Partial<BP>, "id">) => {
    updateMutation.mutate({ id, updates });
  };

  const deleteBP = (id: string) => {
    deleteMutation.mutate({ id });
  };

  return {
    createBP,
    readBP,
    updateBP,
    deleteBP,
    isReading: readMutation.isPending,
  };
}
