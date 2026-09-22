"use client";

import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { TFunction } from "i18next";
import { toast } from "sonner";
import { fetcher } from "@/app/lib/utils";

export default function useDeleteMutation<
  T extends {
    id: string;
    date: string;
  },
>(url: string, t: TFunction, queryKey: QueryKey = [url]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      toast
        .promise(fetcher.delete<T>(`${url}/${encodeURIComponent(id)}`), {
          error: t("delete.error"),
          loading: t("delete.loading"),
          success: t("delete.success"),
        })
        .unwrap(),
    onError: (_err, _variables, onMutateResult) => {
      const previous = onMutateResult as T | undefined;
      if (previous) {
        queryClient.setQueryData(queryKey, (items: T[] = []) =>
          [...items.filter((item) => item.id !== previous.id), previous].sort(
            (a, b) => a.date.localeCompare(b.date),
          ),
        );
      }
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries(
        { exact: true, queryKey },
        { silent: true },
      );
      const previous = queryClient
        .getQueryData<T[]>(queryKey)
        ?.find((item) => item.id === variables.id);
      queryClient.setQueryData(queryKey, (items: T[] = []) =>
        items.filter((item) => item.id !== variables.id),
      );
      return previous;
    },
  });
}
