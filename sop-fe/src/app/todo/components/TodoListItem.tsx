"use client";

import { cn } from "cn";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteDialog from "@/app/components/DeleteDialog";
import { formatDate } from "@/app/lib/utils";
import useTodo from "@/app/todo/hooks/useTodo";
import type { Todo } from "@/app/todo/lib/types";
import { Button } from "@/shadcn/components/ui/button";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/shadcn/components/ui/item";

export default function TodoListItem({ todo }: { todo: Todo }) {
  const { id, content, status, date } = todo;

  const { deleteTodo, updateTodo } = useTodo();
  const { i18n, t } = useTranslation("todo");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteLabels = useMemo(
    () => ({
      cancel: t("dialog.delete.cancel"),
      confirm: t("dialog.delete.confirm"),
      description: t("dialog.delete.description"),
      title: t("dialog.delete.title"),
    }),
    [t],
  );
  const handleDeleteConfirm = () => {
    deleteTodo(id);
    setDeleteOpen(false);
  };

  const localeDate = formatDate(date, i18n.language);

  return (
    <Item size="sm" variant="outline">
      <ItemMedia>
        <Checkbox
          checked={status}
          onCheckedChange={() => updateTodo(id, { status: !status })}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle
          className={cn(status && "italic line-through text-muted-foreground")}
        >
          {content}
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button
          className="text-destructive"
          onClick={() => setDeleteOpen(true)}
          size="sm"
          variant="ghost"
        >
          <Trash2 />
          {localeDate}
        </Button>
        <DeleteDialog
          labels={deleteLabels}
          onConfirm={handleDeleteConfirm}
          onOpenChange={setDeleteOpen}
          open={deleteOpen}
        />
      </ItemActions>
    </Item>
  );
}
