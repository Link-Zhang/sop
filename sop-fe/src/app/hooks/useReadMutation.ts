"use client";

import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { fetcher } from "@/app/lib/utils";

export default function useReadMutation<T extends { id: string }[]>(
  url: string,
  queryKey: QueryKey = [url],
) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<T, Error>({
    mutationFn: () =>
      toast
        .promise(fetcher.get<T>(url), {
          error: t("read.error"),
          loading: t("read.loading"),
          success: t("read.success"),
        })
        .unwrap(),
    onSuccess: (data) => queryClient.setQueryData(queryKey, data),
  });
}
