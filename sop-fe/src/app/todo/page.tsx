import React from "react";
import { TodoForm } from "@/app/todo/_components/TodoForm";
import { TodoList } from "@/app/todo/_components/TodoList";
import { TodoTitle } from "@/app/todo/_components/TodoTitle";

export default async function TodoPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <React.Fragment>
      <TodoTitle />
      <TodoForm />
      <TodoList />
    </React.Fragment>
  );
}
