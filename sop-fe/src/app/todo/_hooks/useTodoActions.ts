"use client";

import { useTranslations } from "next-intl";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { v7 as uuid } from "uuid";
import { clientFetcher } from "@/app/_libs/clientFetcher";
import { getCurrentDate } from "@/app/_libs/date.utils";
import type { Todo } from "@/app/_libs/todo.types";

const API_URL = "http://17521270049.kmdns.net:31569/todos";

export function useTodoActions() {
  const { mutate } = useSWRConfig();
  const t = useTranslations();

  const createTodo = useCallback(
    async (content: string) => {
      const newTodo: Todo = {
        id: uuid(),
        content: content.trim(),
        status: false,
        date: getCurrentDate(),
      };
      try {
        await mutate(
          API_URL,
          (currentTodos: Todo[] = []) => [...currentTodos, newTodo],
          false,
        );
        const createdTodo: Todo = await clientFetcher.post<Todo>(
          API_URL,
          newTodo,
        );
        await mutate(
          API_URL,
          (currentTodos: Todo[] = []) =>
            currentTodos.map((todo: Todo) =>
              todo.id === newTodo.id ? createdTodo : todo,
            ),
          false,
        );
        toast.success(t("todo-form.create.success"));
        return createdTodo;
      } catch (_error) {
        await mutate(
          API_URL,
          (currentTodos: Todo[] = []) =>
            currentTodos.filter((todo: Todo) => todo.id !== newTodo.id),
          false,
        );
        toast.error(t("todo-form.create.error"));
      }
    },
    [mutate, t],
  );

  const updateTodo = useCallback(
    async (id: string, updates: Partial<Todo>) => {
      let previousTodo: Todo | undefined;
      try {
        await mutate(
          API_URL,
          (currentTodos: Todo[] = []) => {
            return currentTodos.map((todo: Todo) => {
              if (todo.id === id) {
                previousTodo = { ...todo };
                return { ...todo, ...updates };
              }
              return todo;
            });
          },
          false,
        );
        const updatedTodo: Todo = await clientFetcher.patch<Todo>(
          `${API_URL}/${id}`,
          updates,
        );
        await mutate(
          API_URL,
          (currentTodos: Todo[] = []) =>
            currentTodos.map((todo: Todo) =>
              todo.id === id ? updatedTodo : todo,
            ),
          false,
        );
        toast.success(t("todo-list.update.success"));
        return updatedTodo;
      } catch (_error) {
        if (previousTodo) {
          await mutate(
            API_URL,
            (currentTodos: Todo[] = []) =>
              currentTodos.map((todo: Todo) =>
                todo.id === id ? (previousTodo as Todo) : todo,
              ),
            false,
          );
        }
        toast.error(t("todo-list.update.error"));
      }
    },
    [mutate, t],
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      let previousTodo: Todo | undefined;
      try {
        await mutate(
          API_URL,
          (currentTodos: Todo[] = []) => {
            const todoToDelete: Todo | undefined = currentTodos.find(
              (todo: Todo) => todo.id === id,
            );
            if (todoToDelete) {
              previousTodo = { ...todoToDelete };
            }
            return currentTodos.filter((todo: Todo) => todo.id !== id);
          },
          false,
        );
        const deletedTodo: Todo = await clientFetcher.delete(
          `${API_URL}/${id}`,
        );
        toast.success(t("todo-list.delete.success"));
        return deletedTodo;
      } catch (_error) {
        if (previousTodo) {
          await mutate(
            API_URL,
            (currentTodos: Todo[] = []) => [
              ...currentTodos,
              previousTodo as Todo,
            ],
            false,
          );
        }
        toast.error(t("todo-list.delete.error"));
      }
    },
    [mutate, t],
  );

  return {
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
