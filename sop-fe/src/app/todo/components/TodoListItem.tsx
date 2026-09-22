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
          onClick={async () => {
            if (await confirmDelete({ icon: <Trash2 /> })) deleteTodo(id);
          }}
          size="sm"
          variant="ghost"
        >
          <Trash2 />
          {formatDate(date, i18n.language)}
        </Button>
      </ItemActions>
    </Item>
  );
}
