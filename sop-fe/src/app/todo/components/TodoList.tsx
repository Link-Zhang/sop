"use client";

import { useTranslation } from "react-i18next";
import type { Todo } from "@/app/lib/types";
import TodoListItem from "@/app/todo/components/TodoListItem";
import { TodoListSkeleton } from "@/app/todo/components/TodoSkeletons";
import TodoError from "@/app/todo/error";
import useTodos from "@/app/todo/hooks/useTodos";

export default function TodoList() {
  const { t } = useTranslation("todo");
  const { todos, isLoading, error } = useTodos();

  if (isLoading) return <TodoListSkeleton />;
  if (error) return <TodoError error={error} />;
  if (!todos?.length) {
    return (
      <ul className="max-w-2xl mb-4 mx-auto space-y-4">
        <li className="text-center">{t("listEmptyText")}</li>
      </ul>
    );
  }

  return (
    <ul className="max-w-2xl mb-4 mx-auto space-y-4">
      {todos.map((todo: Todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
