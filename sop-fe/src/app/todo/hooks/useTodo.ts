"use client";

import { v7 as uuid } from "uuid";
import useCreateMutation from "@/app/hooks/useCreateMutation";
import useDeleteMutation from "@/app/hooks/useDeleteMutation";
import useReadMutation from "@/app/hooks/useReadMutation";
import useUpdateMutation from "@/app/hooks/useUpdateMutation";
import { API_TODO } from "@/app/lib/configs";
import type { Todo } from "@/app/todo/lib/types";

export default function useTodo() {
  const createMutation = useCreateMutation<Todo>(API_TODO);
  const readMutation = useReadMutation<Todo[]>(API_TODO);
  const updateMutation = useUpdateMutation<Todo>(API_TODO);
  const deleteMutation = useDeleteMutation<Todo>(API_TODO);

  const createTodo = (content: string) => {
    const item: Todo = {
      id: uuid(),
      content: content.trim(),
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
    isReading: readMutation.isPending,
  };
}
