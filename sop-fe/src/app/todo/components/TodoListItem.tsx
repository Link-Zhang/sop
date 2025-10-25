import { useTranslation } from "react-i18next";
import type { Todo } from "@/app/lib/types";
import { useTodoActions } from "@/app/todo/hooks/useTodoActions";

export default function TodoListItem({ todo }: { todo: Todo }) {
  const { deleteTodoAction, updateTodoAction } = useTodoActions();
  const { t } = useTranslation("todo");

  const handleClick = async (id: string) => {
    if (window.confirm(t("delete.confirm"))) {
      await deleteTodoAction(id);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await updateTodoAction(id, { status: completed });
  };

  return (
    <li className="border flex items-center justify-between p-4 rounded-md transition-colors">
      <div className="flex flex-1 gap-4 items-center min-w-0">
        <input
          checked={todo.status}
          className="accent-primary h-5 shrink-0 w-5"
          id={todo.id}
          onChange={() => handleToggle(todo.id, !todo.status)}
          type="checkbox"
        />
        <span
          className={`break-words flex-1 truncate ${
            todo.status ? "italic line-through" : ""
          }`}
        >
          {todo.content}
        </span>
      </div>
      <button onClick={() => handleClick(todo.id)} type="button">
        <time className="shrink-0 text-primary text-xs" dateTime={todo.date}>
          {todo.date}
        </time>
      </button>
    </li>
  );
}
