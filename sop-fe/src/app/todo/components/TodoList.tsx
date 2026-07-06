"use client";

import { useTranslation } from "react-i18next";
import { TODO_API_URL } from "@/app/lib/apis";
import TodoListItem from "@/app/todo/components/TodoListItem";
import { TodoListSkeleton } from "@/app/todo/components/ui/TodoSkeletons";
import TodoError from "@/app/todo/error";
import useFetchQuery from "@/app/todo/hooks/useFetchQuery";
import type { Todo } from "@/app/todo/lib/types";

export default function TodoList() {
  const { data = [], error, isPending } = useFetchQuery<Todo[]>(TODO_API_URL);

  const { t } = useTranslation("todo");

  if (error) return <TodoError error={error} />;

  if (isPending) return <TodoListSkeleton />;

  return (
    <ul className="max-w-2xl mb-4 mx-auto space-y-4">
      {!data.length ? (
        <li className="text-center">{t("empty")}</li>
      ) : (
        data.map((todo) => <TodoListItem key={todo.id} todo={todo} />)
      )}
    </ul>
  );
}
