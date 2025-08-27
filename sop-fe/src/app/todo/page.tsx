"use client";

import { useState } from "react";
import TodoInput from "@/components/TodoInput";
import { Todo } from "@/types/todo";
import { formatDateTime } from "@/utils/formatDateTime";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Study Next.js",
      completed: false,
      createdAt: formatDateTime(new Date()),
    },
    {
      id: "2",
      title: "Study React",
      completed: false,
      createdAt: formatDateTime(new Date()),
    },
    {
      id: "3",
      title: "Develop Project SOP",
      completed: false,
      createdAt: formatDateTime(new Date()),
    },
  ]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: formatDateTime(new Date()),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Todo List
      </h1>

      <TodoInput onAddTodo={addTodo} />

      {todos.length === 0 ? (
        <div className="text-center text-gray-500">No item, Add one...</div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 border rounded-md ${
                todo.completed
                  ? "bg-gray-50 line-through text-gray-500"
                  : "bg-white"
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 accent-blue-500"
                />
                <span>{todo.title}</span>
              </div>
              <span className="text-xs text-gray-400">{todo.createdAt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
