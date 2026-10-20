"use client";

import { useTranslation } from "react-i18next";
import useReadQuery from "@/app/hooks/useReadQuery";
import { API_TODO } from "@/app/lib/configs";
import TodoListItem from "@/app/todo/components/TodoListItem";
import { TodoListSkeleton } from "@/app/todo/components/TodoSkeletons";
import type { Todo } from "@/app/todo/lib/types";
import { ItemGroup } from "@/shadcn/components/ui/item";

export default function TodoList() {
  const { data = [], isPending } = useReadQuery<Todo[]>(API_TODO);
  const { t } = useTranslation("todo");

  if (isPending) return <TodoListSkeleton />;

  if (!data.length) return <div className="text-center">{t("empty")}</div>;

  return (
    <ItemGroup>
      {data.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ItemGroup>
  );
}
