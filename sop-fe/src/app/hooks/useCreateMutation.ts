import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { TFunction } from "i18next";
import { toast } from "sonner";
import { fetcher } from "@/app/lib/utils";

export default function useCreateMutation<T extends { id: string }>(
  url: string,
  t: TFunction,
  queryKey: QueryKey = [url],
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ item }: { item: T }) => fetcher.post<T>(url, item),
    onError: (_err, variables) => {
      queryClient.setQueryData(queryKey, (items: T[] = []) =>
        items.filter((item) => item.id !== variables.item.id),
      );
      toast.error(t("create.error"));
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries(
        { exact: true, queryKey },
        { silent: true },
      );
      queryClient.setQueryData(queryKey, (items: T[] = []) => [
        ...items,
        variables.item,
      ]);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKey, (items: T[] = []) =>
        items.map((item) => (item.id === variables.item.id ? data : item)),
      );
      toast.success(t("create.success"));
      return data;
    },
  });
}
