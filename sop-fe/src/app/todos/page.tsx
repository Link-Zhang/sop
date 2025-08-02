import React from "react";
import { TodoForm } from "@/app/todos/_components/clients/TodoForm";
import { TodoList } from "@/app/todos/_components/servers/TodoList";
import { TodoTitle } from "@/app/todos/_components/servers/TodoTitle";

export default async function TodoPage() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <React.Fragment>
      <TodoTitle />
      <TodoForm />
      <TodoList />
    </React.Fragment>
  );
}
