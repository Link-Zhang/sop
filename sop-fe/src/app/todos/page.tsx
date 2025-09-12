import React from "react";
import { TodoForm } from "@/app/todos/_components/clients/todo-form";
import { TodoList } from "@/app/todos/_components/servers/todo-list";
import { TodoTitle } from "@/app/todos/_components/servers/todo-title";

export default async function TodoPage() {
  return (
    <React.Fragment>
      <TodoTitle />
      <TodoForm />
      <TodoList />
    </React.Fragment>
  );
}
