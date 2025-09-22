"use client";

import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useSWR from "swr";
import { v7 as uuid } from "uuid";
import type { Todo } from "@/app/lib/types";
import { fetcher, getCurrentDate } from "@/app/lib/utils";

const API_URL = "https://linkzhang.duckdns.org:31540/todos";

export default function useTodo() {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    API_URL,
    fetcher.get,
    {
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        if (error.status === 404 || error.status === 400) return;
        if (retryCount >= 3) return;
        const timeout = Math.min(1000 * 2 ** retryCount, 8000);
        setTimeout(() => revalidate({ retryCount }), timeout);
      },
    },
  );

  const { t } = useTranslation("todo");

  const createTodo = async (content: string) => {
    const newTodo = {
      id: uuid(),
      content: content.trim(),
      status: false,
      date: getCurrentDate(),
    };
    const optimisticData = data ? [...data, newTodo] : [newTodo];
    try {
      await mutate(optimisticData, false);
      const result = await fetcher.post<Todo>(API_URL, newTodo);
      await mutate();
      toast.success(t("create.success"));
      return result;
    } catch (_error) {
      await mutate(data, false);
      toast.error(t("create.error"));
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const previousData = data;
    const optimisticData =
      data?.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)) ||
      [];
    try {
      await mutate(optimisticData, false);
      const result = await fetcher.patch<Todo>(`${API_URL}/${id}`, updates);
      await mutate();
      toast.success(t("update.success"));
      return result;
    } catch (_error) {
      await mutate(previousData, false);
      toast.error(t("update.error"));
    }
  };

  const deleteTodo = async (id: string) => {
    const previousData = data;
    const optimisticData = data?.filter((todo) => todo.id !== id) || [];
    try {
      await mutate(optimisticData, false);
      const result = await fetcher.delete(`${API_URL}/${id}`);
      await mutate();
      toast.success(t("delete.success"));
      return result;
    } catch (_error) {
      await mutate(previousData, false);
      toast.error(t("delete.error"));
    }
  };

  return {
    createTodo,
    deleteTodo,
    error,
    isLoading,
    mutate,
    todos: data,
    updateTodo,
  };
}
