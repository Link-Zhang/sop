import useSWR from "swr";
import type { Todo } from "@/app/lib/types";
import { clientFetcher } from "@/app/lib/utils";

const API_URL = "https://17521270049.kmdns.net:31540/todos";

export default function useTodos() {
  // noinspection JSUnusedGlobalSymbols
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    API_URL,
    clientFetcher.get,
    {
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        if (error.status === 404 || error.status === 400) return;
        if (retryCount >= 3) return;
        const timeout = Math.min(1000 * 2 ** retryCount, 8000);
        setTimeout(() => revalidate({ retryCount }), timeout);
      },
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
    },
  );

  return {
    error,
    isLoading,
    mutate,
    todos: data,
  };
}
