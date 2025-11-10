"use client";

import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import type { Todo } from "@/app/lib/types";
import useTodo from "@/app/todo/hooks/useTodo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import { Button } from "@/shadcn/components/ui/button";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Label } from "@/shadcn/components/ui/label";

export default function TodoListItem({ todo }: { todo: Todo }) {
  const { deleteTodo, updateTodo } = useTodo();

  const { t } = useTranslation("todo");

  const handleClick = async (id: string) => {
    await deleteTodo(id);
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await updateTodo(id, { status: completed });
  };

  return (
    <li className="border flex gap-4 hover:bg-muted/50 items-center justify-between p-3 rounded-md transition-colors ">
      <Checkbox
        checked={todo.status}
        className="h-6 shrink-0 w-6"
        id={todo.id}
        onCheckedChange={() => handleToggle(todo.id, !todo.status)}
      />
      <Label
        className={clsx(
          "flex-1 min-w-0 truncate",
          todo.status && "italic line-through text-muted-foreground",
        )}
        htmlFor={todo.id}
      >
        {todo.content}
      </Label>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="shrink-0 text-primary text-xs" variant="ghost">
            {todo.date}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("delete.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("delete.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleClick(todo.id)}>
              {t("delete.continue")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
