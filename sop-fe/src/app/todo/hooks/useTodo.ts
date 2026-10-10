"use client";

import { useTranslation } from "react-i18next";
import useReadMutation from "@/app/hooks/useReadMutation";
import { API_TODO } from "@/app/lib/configs";
import type { Todo } from "@/app/todo/lib/types";

export default function useTodo() {
  const { t } = useTranslation("todo");
  // const createMutation = useCreateMutation<Todo>(TODO_API_URL, t);
  const readMutation = useReadMutation<Todo[]>(API_TODO, t);
  // const updateMutation = useUpdateMutation<Todo>(TODO_API_URL, t);
  // const deleteMutation = useDeleteMutation<Todo>(TODO_API_URL, t);

  // const createTodo = (content: string) => {
  //   const item: Todo = {
  //     id: uuid(),
  //     content: content.trim(),
  //     status: false,
  //     date: new Date().toISOString(),s
  //   };
  //   createMutation.mutate({ item });
  // };

  const readTodo = () => {
    readMutation.mutate();
  };

  // const updateTodo = (id: string, updates: Omit<Partial<Todo>, "id">) => {
  //   updateMutation.mutate({ id, updates });
  // };
  //
  // const deleteTodo = (id: string) => {
  //   deleteMutation.mutate({ id });
  // };

  return {
    // createTodo,
    readTodo,
    // updateTodo,
    // deleteTodo,
    isReading: readMutation.isPending,
  };
}
