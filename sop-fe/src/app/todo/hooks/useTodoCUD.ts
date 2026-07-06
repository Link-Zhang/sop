"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { v7 as uuid } from "uuid";
import { TODO_API_URL } from "@/app/lib/apis";
import { fetcher } from "@/app/lib/utils";
import type { CreateTodo, Todo } from "@/app/todo/lib/types";

export default function useTodoCUD() {
  const queryClient = useQueryClient();
  const { t } = useTranslation("todo");

  const createMutation = useMutation({
    mutationFn: async ({ todo }: { todo: Todo }) => {
      if (Math.random() < 0.5) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        throw new Error("模拟失败 (随机触发)");
      }
      return fetcher.post<Todo>(TODO_API_URL, todo);
    },
    onError: (_err, variables) => {
      queryClient.setQueryData([TODO_API_URL], (todos: Todo[]) =>
        todos?.filter((todo) => todo.id !== variables.todo.id),
      );
      toast.error(t("create.error"));
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries(
        { exact: true, queryKey: [TODO_API_URL] },
        { silent: true },
      );
      queryClient.setQueryData([TODO_API_URL], (todos: Todo[]) => [
        ...(todos ?? []),
        variables.todo,
      ]);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData([TODO_API_URL], (todos: Todo[]) =>
        todos?.map((todo) => (todo.id === variables.todo.id ? data : todo)),
      );
      toast.success(t("create.success"));
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Omit<Partial<Todo>, "id">;
    }) => {
      if (Math.random() < 0.5) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        throw new Error("模拟失败 (随机触发)");
      }
      return fetcher.patch<Todo>(
        `${TODO_API_URL}/${encodeURIComponent(id)}`,
        updates,
      );
    },
    onError: (_err, _variables, onMutateResult) => {
      if (onMutateResult) {
        queryClient.setQueryData([TODO_API_URL], (todos: Todo[]) =>
          todos?.map((todo) =>
            todo.id === (onMutateResult as Todo).id ? onMutateResult : todo,
          ),
        );
      }
      toast.error(t("update.error"));
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries(
        { exact: true, queryKey: [TODO_API_URL] },
        { silent: true },
      );
      const previous = queryClient
        .getQueryData<Todo[]>([TODO_API_URL])
        ?.find((todo) => todo.id === variables.id);
      queryClient.setQueryData([TODO_API_URL], (todos: Todo[]) =>
        todos?.map((todo) =>
          todo.id === variables.id ? { ...todo, ...variables.updates } : todo,
        ),
      );
      return previous;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData([TODO_API_URL], (todos: Todo[]) =>
        todos?.map((todo) => (todo.id === variables.id ? { ...data } : todo)),
      );
      toast.success(t("update.success"));
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (Math.random() < 0.5) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        throw new Error("模拟失败 (随机触发)");
      }
      return fetcher.delete(`${TODO_API_URL}/${encodeURIComponent(id)}`);
    },
    onError: (_err, _variables, onMutateResult) => {
      if (onMutateResult) {
        const previous = onMutateResult as Todo;
        queryClient.setQueryData([TODO_API_URL], (todos: Todo[]) =>
          [
            ...(todos ?? []).filter((todo) => todo.id !== previous?.id),
            previous,
          ]
            .filter(Boolean)
            .sort((a, b) => a.date.localeCompare(b.date)),
        );
      }
      toast.error(t("update.error"));
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries(
        { exact: true, queryKey: [TODO_API_URL] },
        { silent: true },
      );
      const previous = queryClient
        .getQueryData<Todo[]>([TODO_API_URL])
        ?.find((todo) => todo.id === variables.id);
      queryClient.setQueryData([TODO_API_URL], (todos: Todo[]) =>
        todos?.filter((todo) => todo.id !== variables.id),
      );
      return previous;
    },
    onSuccess: (data) => {
      toast.success(t("update.success"));
      return data;
    },
  });

  const createTodo = (input: CreateTodo) => {
    const todo: Todo = {
      id: uuid(),
      content: input.content.trim(),
      status: false,
      date: new Date().toISOString(),
    };
    createMutation.mutate({ todo });
  };

  const updateTodo = (id: string, updates: Omit<Partial<Todo>, "id">) => {
    updateMutation.mutate({ id, updates });
  };

  const deleteTodo = (id: string) => {
    deleteMutation.mutate({ id });
  };

  return {
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
