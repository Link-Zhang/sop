"use client";

import { cn } from "cn";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import useConfirmDelete from "@/app/hooks/useConfirmDelete";
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
  const confirmDelete = useConfirmDelete(t);

  return (
    <Item className="flex-nowrap" size="sm" variant="outline">
      <ItemMedia>
        <Checkbox
          checked={status}
          onCheckedChange={() => updateTodo(id, { status: !status })}
        />
      </ItemMedia>
      <ItemContent className="min-w-0">
        <ItemTitle
          className={cn(
            "w-full",
            status && "italic line-through text-muted-foreground",
          )}
        >
          <span className="min-w-0 truncate">{content}</span>
        </ItemTitle>
      </ItemContent>
      <ItemActions className="shrink-0">
        <Button
          className="text-destructive"
          onClick={async () => {
            if (await confirmDelete({ icon: <Trash2 /> })) deleteTodo(id);
          }}
          size="xs"
          variant="ghost"
        >
          <Trash2 />
          {formatDate(date, i18n.language)}
        </Button>
      </ItemActions>
    </Item>
  );
}
