"use client";

import { useTranslations } from "next-intl";
import { TodoListSkeleton } from "@/app/_components/TodoSkeletons";
import type { Todo } from "@/app/_libs/todo.types";
import { TodoListItem } from "@/app/todo/_components/TodoListItem";
import { useTodos } from "@/app/todo/_hooks/useTodos";
import TodoError from "@/app/todo/error";

export function TodoList() {
  const t = useTranslations("todo-list");
  const { todos, isLoading, error } = useTodos();

  if (isLoading) return <TodoListSkeleton />;
  if (error) return <TodoError error={error} />;
  if (!todos?.length) {
    return (
      <ul className="max-w-2xl mb-4 mx-auto space-y-4">
        <li className="text-center">{t("empty-text")}</li>
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
