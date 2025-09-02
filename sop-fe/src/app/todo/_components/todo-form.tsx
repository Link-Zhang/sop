"use client";

import type React from "react";

export function TodoForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Add todo!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4 max-w-2xl mx-auto"
      id="todo-form"
    >
      <input
        type="text"
        id="todo-form-input"
        name="content"
        placeholder="Input Todo item..."
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        id="todo-form-button"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </form>
  );
}
