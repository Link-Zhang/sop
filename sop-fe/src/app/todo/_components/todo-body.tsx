"use client";

import TodoInput from "@/app/todo/_components/todo-input";
import TodoTable from "@/app/todo/_components/todo-table";
import React, { useState } from "react";
import { Todo } from "@/app/todo/_lib/todo";
import { format } from "@/app/todo/_lib/format";

export function TodoBody() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Study React",
      completed: false,
      createdAt: format(new Date()),
    },
    {
      id: "2",
      title: "Study Next.js",
      completed: false,
      createdAt: format(new Date()),
    },
    {
      id: "3",
      title: "Develop Project SOP",
      completed: false,
      createdAt: format(new Date()),
    },
  ]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: format(new Date()),
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
    <div>
      <TodoInput onAddTodo={addTodo} />
      {todos?.length === 0 ? (
        <div className="text-center text-gray-500">No item, Add one...</div>
      ) : (
        <TodoTable todos={todos} onToggleTodo={toggleTodo} />
      )}
    </div>
  );
}
