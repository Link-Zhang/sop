import useSWR from "swr";
import { clientFetcher } from "@/app/_libs/clientFetcher";
import type { Todo } from "@/app/_libs/todo.types";

const API_URL = "http://17521270049.kmdns.net:31569/todos";

export function useTodos() {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    API_URL,
    clientFetcher.get,
    {
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        if (error.status === 404 || error.status === 400) return;
        if (retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount: retryCount }), 5000);
      },
    },
  );

  return {
    todos: data,
    error,
    isLoading,
    mutate,
  };
}
