"use client";

import useSWR from "swr";
import { TodoListSkeleton } from "@/app/todo/_components/skeletons";
import type { Todo } from "@/app/todo/_lib/todo";
import TodoError from "@/app/todo/error";

const url: string = "http://localhost:3001/todos/";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function TodoList() {
  const { data: todos, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) return <TodoListSkeleton />;

  if (error) return <TodoError error={error} />;

  return todos?.length === 0 ? (
    <ul className="space-y-4 max-w-2xl mx-auto mb-4" id="todo-list">
      <li className="text-center text-gray-500" id="todo-list-item">
        No item, Add one...
      </li>
    </ul>
  ) : (
    <ul className="space-y-4 max-w-2xl mx-auto mb-4" id="todo-list">
      {todos?.map((todo: Todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-4 border rounded-md ${
            todo.status ? "bg-gray-50 line-through text-gray-500" : "bg-white"
          }`}
          id={`todo-list-item-${todo.id}`}
        >
          <div
            className="flex items-center gap-4"
            id={`todo-list-item-${todo.id}-left`}
          >
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => null}
              className="w-6 h-6 accent-blue-500"
              id={`todo-list-item-${todo.id}-left-checkbox`}
            />
            <div id={`todo-list-item-${todo.id}-text`}>{todo.content}</div>
          </div>
          <div
            className="text-xs text-gray-400"
            id={`todo-list-item-${todo.id}-right`}
          >
            {todo.date}
          </div>
        </li>
      ))}
    </ul>
  );
}
