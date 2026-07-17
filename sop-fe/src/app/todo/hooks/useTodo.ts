"use client";

import { useTranslation } from "react-i18next";
import { v7 as uuid } from "uuid";
import useCreateMutation from "@/app/hooks/useCreateMutation";
import useDeleteMutation from "@/app/hooks/useDeleteMutation";
import useReadMutation from "@/app/hooks/useReadMutation";
import useUpdateMutation from "@/app/hooks/useUpdateMutation";
import { TODO_API_URL } from "@/app/lib/apis";
import type { CreateTodo, Todo } from "@/app/todo/lib/types";

export default function useTodo() {
  const { t } = useTranslation("todo");
  const createMutation = useCreateMutation<Todo>(TODO_API_URL, t);
  const readMutation = useReadMutation<Todo[]>(TODO_API_URL, t);
  const updateMutation = useUpdateMutation<Todo>(TODO_API_URL, t);
  const deleteMutation = useDeleteMutation<Todo>(TODO_API_URL, t);

  const createTodo = (input: CreateTodo) => {
    const item: Todo = {
      id: uuid(),
      content: input.content.trim(),
      status: false,
      date: new Date().toISOString(),
    };
    createMutation.mutate({ item });
  };

  const readTodo = () => {
    readMutation.mutate();
  };

  const updateTodo = (id: string, updates: Omit<Partial<Todo>, "id">) => {
    updateMutation.mutate({ id, updates });
  };

  const deleteTodo = (id: string) => {
    deleteMutation.mutate({ id });
  };

  return {
    createTodo,
    readTodo,
    updateTodo,
    deleteTodo,
  };
}
