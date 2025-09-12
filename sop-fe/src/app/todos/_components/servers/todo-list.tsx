import { getTranslations } from "next-intl/server";
import type { Todo } from "@/app/_libs/_types/todo";
import { TodoListItem } from "@/app/todos/_components/clients/todo-list-item";
import { readTodoAction } from "@/app/todos/_libs/todo-actions";

export async function TodoList() {
  const t = await getTranslations("todo-list");
  let todos: Todo[] = [];
  let hasError = false;

  try {
    todos = await readTodoAction();
  } catch (_error) {
    hasError = true;
  }

  if (hasError || !todos?.length) {
    return (
      <ul className="max-w-2xl mb-4 mx-auto space-y-4">
        <li className="text-center">
          {hasError ? t("read.error") : t("empty-text")}
        </li>
      </ul>
    );
  }

  return (
    <ul className="max-w-2xl mb-4 mx-auto space-y-4">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
