"use client";

import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { TFunction } from "i18next";
import { toast } from "sonner";
import { fetcher } from "@/app/lib/utils";

export default function useUpdateMutation<T extends { id: string }>(
  url: string,
  t: TFunction,
  queryKey: QueryKey = [url],
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Omit<Partial<T>, "id">;
    }) =>
      toast
        .promise(
          fetcher.patch<T>(`${url}/${encodeURIComponent(id)}`, updates),
          {
            error: t("update.error"),
            loading: t("update.loading"),
            success: t("update.success"),
          },
        )
        .unwrap(),
    onError: (_err, _variables, onMutateResult) => {
      const previous = onMutateResult as T | undefined;
      if (previous) {
        queryClient.setQueryData(queryKey, (items: T[] = []) =>
          items.map((item) => (item.id === previous.id ? previous : item)),
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
        items.map((item) =>
          item.id === variables.id ? { ...item, ...variables.updates } : item,
        ),
      );
      return previous;
    },
    onSuccess: (data, variables) =>
      queryClient.setQueryData(queryKey, (items: T[] = []) =>
        items.map((item) => (item.id === variables.id ? data : item)),
      ),
  });
}
