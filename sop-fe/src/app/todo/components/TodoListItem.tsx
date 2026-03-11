"use client";

import { useTranslation } from "react-i18next";
import TodoListItemUI from "@/app/todo/components/ui/TodoListItemUI";
import useTodo from "@/app/todo/hooks/useTodo";
import type { Todo } from "@/app/todo/lib/types";

export default function TodoListItem({ todo }: { todo: Todo }) {
  const { deleteTodo, updateTodo } = useTodo();

  const { i18n, t } = useTranslation("todo");

  const currentLanguage = i18n.language;

  const handleCheckedChange = async (id: string, completed: boolean) => {
    return await updateTodo(id, { status: completed });
  };

  const handleClick = async (id: string) => {
    return await deleteTodo(id);
  };

  return (
    <TodoListItemUI
      currentLanguage={currentLanguage}
      deleteCancel={t("delete.cancel")}
      deleteContinue={t("delete.continue")}
      deleteDescription={t("delete.description")}
      deleteTitle={t("delete.title")}
      onCheckedChange={handleCheckedChange}
      onClick={handleClick}
      todo={todo}
    />
  );
}
