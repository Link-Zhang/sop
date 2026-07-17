import { type QueryKey, useQuery } from "@tanstack/react-query";
import { fetcher, retryHandler } from "@/app/lib/utils";

export default function useGetQuery<T>(
  url: string,
  queryKey: QueryKey = [url],
) {
  return useQuery<T>({
    queryKey,
    queryFn: () => fetcher.get(url),
    retry: retryHandler,
  });
}
