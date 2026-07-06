import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { fetcher } from "@/app/lib/utils";

const retryHandler = (failureCount: number, error: unknown) => {
  const status = (error as AxiosError).response?.status;
  if (status && 400 <= status && status < 500) return false;
  return failureCount <= 2;
};

export default function useFetchQuery<T>(key: string, url?: string) {
  return useQuery<T>({
    queryKey: [key],
    queryFn: () => fetcher.get(url ?? key),
    retry: retryHandler,
  });
}
