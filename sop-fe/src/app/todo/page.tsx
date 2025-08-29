import React from "react";
import TodoTitle from "@/app/todo/_components/todo-title";
import { TodoBody } from "@/app/todo/_components/todo-body";

export default function TodoPage() {
  return (
    <div className="container max-w-2xl mx-auto p-4">
      <TodoTitle />
      <TodoBody />
    </div>
  );
}
