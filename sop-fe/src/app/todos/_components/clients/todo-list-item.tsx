"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import type { Todo } from "@/app/_libs/_types/todo";
import {
  deleteTodoAction,
  updateTodoAction,
} from "@/app/todos/_libs/todo-actions";

export function TodoListItem({ todo }: { todo: Todo }) {
  const t = useTranslations("todo-list");
  const router = useRouter();

  const handleToggle = async (id: string, status: boolean) => {
    try {
      await updateTodoAction({ id, status });
      toast.success(t("update.success"));
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleClick = async (id: string) => {
    if (window.confirm(t("delete.confirm"))) {
      try {
        await deleteTodoAction(id);
        toast.success(t("delete.success"));
        router.refresh();
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  return (
    <li className="border flex items-center justify-between p-4 rounded-md transition-colors">
      <div className="flex flex-1 gap-4 items-center min-w-0">
        <input
          checked={todo.status}
          className="accent-blue-500 h-5 shrink-0 w-5"
          id={todo.id}
          onChange={() => handleToggle(todo.id, !todo.status)}
          type="checkbox"
        />
        <span
          className={`break-words flex-1 truncate ${
            todo.status ? "line-through" : ""
          }`}
        >
          {todo.content}
        </span>
      </div>
      <button onClick={() => handleClick(todo.id)} type="button">
        <time className="shrink-0 text-blue-500 text-xs" dateTime={todo.date}>
          {todo.date}
        </time>
      </button>
    </li>
  );
}
