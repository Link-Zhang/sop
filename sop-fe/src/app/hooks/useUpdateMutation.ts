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
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Omit<Partial<T>, "id">;
    }) => fetcher.patch<T>(`${url}/${encodeURIComponent(id)}`, updates),
    onError: (_err, _variables, onMutateResult) => {
      if (onMutateResult) {
        const previous = onMutateResult as T;
        queryClient.setQueryData(queryKey, (items: T[] = []) =>
          items.map((item) => (item.id === previous.id ? previous : item)),
        );
      }
      toast.error(t("update.error"));
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
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKey, (items: T[] = []) =>
        items.map((item) => (item.id === variables.id ? data : item)),
      );
      toast.success(t("update.success"));
      return data;
    },
  });
}
