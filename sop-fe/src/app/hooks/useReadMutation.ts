"use client";

import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { TFunction } from "i18next";
import { toast } from "sonner";
import { fetcher } from "@/app/lib/utils";

export default function useReadMutation<T>(
  url: string,
  t: TFunction,
  queryKey: QueryKey = [url],
) {
  const queryClient = useQueryClient();

  return useMutation<T, Error>({
    mutationFn: () =>
      toast
        .promise(fetcher.get<T>(url), {
          error: t("read.error"),
          loading: t("read.loading"),
          success: t("read.success"),
        })
        .unwrap(),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      return data;
    },
  });
}
