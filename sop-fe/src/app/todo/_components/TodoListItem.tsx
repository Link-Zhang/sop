import { useTranslations } from "next-intl";
import type { Todo } from "@/app/_libs/todo.types";
import { useTodoActions } from "@/app/todo/_hooks/useTodoActions";

export function TodoListItem({ todo }: { todo: Todo }) {
  const { updateTodo, deleteTodo } = useTodoActions();
  const t = useTranslations("todo-list");

  const confirmDelete = async (id: string) => {
    if (window.confirm(t("delete.confirm"))) {
      await deleteTodo(id);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await updateTodo(id, { status: completed });
  };

  return (
    <li className="border flex items-center justify-between p-4 rounded-md transition-colors">
      <div className="flex flex-1 gap-4 items-center min-w-0">
        <input
          checked={todo.status}
          className="accent-coreground h-5 shrink-0 w-5"
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
      <button onClick={() => confirmDelete(todo.id)} type="button">
        <time className="shrink-0 text-coreground text-xs" dateTime={todo.date}>
          {todo.date}
        </time>
      </button>
    </li>
  );
}
