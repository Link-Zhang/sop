import useSWR from "swr";
import { clientFetcher } from "@/app/_libs/clientFetcher";
import type { Todo } from "@/app/_libs/todo.types";

const API_URL = "https://17521270049.kmdns.net:31569/todos";

export function useTodos() {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    API_URL,
    clientFetcher.get,
    {
      dedupingInterval: 2000,
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
    todos: data,
    error,
    isLoading,
    mutate,
  };
}
