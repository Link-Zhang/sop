import React from "react";
import TodoForm from "@/app/todo/components/TodoForm";
import TodoList from "@/app/todo/components/TodoList";
import TodoTitle from "@/app/todo/components/TodoTitle";

export default async function TodoPage() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <React.Fragment>
      <TodoTitle />
      <TodoForm />
      <TodoList />
    </React.Fragment>
  );
}
