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
    mutationFn: () => fetcher.get<T>(url),
    onError: () => {
      toast.error(t("read.error"));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      toast.success(t("read.success"));
      return data;
    },
  });
}
