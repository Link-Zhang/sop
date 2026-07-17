"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { DeleteDialogUILabels } from "@/app/lib/types";
import { formatDate } from "@/app/lib/utils";
import TodoListItemUI from "@/app/todo/components/ui/TodoListItemUI";
import useTodo from "@/app/todo/hooks/useTodo";
import type { Todo } from "@/app/todo/lib/types";

export default function TodoListItem({ todo }: { todo: Todo }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { deleteTodo, updateTodo } = useTodo();
  const { i18n, t } = useTranslation("todo", { keyPrefix: "delete.dialog" });
  const deleteLabels: DeleteDialogUILabels = useMemo(
    () => ({
      cancel: t("cancel"),
      confirm: t("confirm"),
      description: t("description"),
      title: t("title"),
    }),
    [t],
  );

  const { id, content, status, date } = todo;
  const localeDate = formatDate(date, i18n.language);

  const handleCheckedChange = (checked: boolean) => {
    updateTodo(id, {
      status: checked,
    });
  };

  const handleDeleteConfirm = () => {
    deleteTodo(id);
    setDeleteOpen(false);
  };

  return (
    <TodoListItemUI
      content={content}
      deleteLabels={deleteLabels}
      deleteOpen={deleteOpen}
      id={id}
      localeDate={localeDate}
      onCheckedChange={handleCheckedChange}
      onDeleteConfirm={handleDeleteConfirm}
      onDeleteOpenChange={setDeleteOpen}
      status={status}
    />
  );
}
