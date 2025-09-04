"use client";

import type React from "react";
import { useState } from "react";
import { useTodos } from "@/app/todo/_hooks/useTodos";

export function TodoForm() {
  const [content, setContent] = useState("");
  const { createTodo } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;
    await createTodo(trimmedContent);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4 max-w-2xl mx-auto"
      id="todo-form"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="输入待办事项..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        disabled={!content.trim()}
      >
        添加
      </button>
    </form>
  );
}
