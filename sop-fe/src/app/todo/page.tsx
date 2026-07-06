"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoForm from "@/app/todo/components/TodoForm";
import TodoList from "@/app/todo/components/TodoList";
import TodoTitle from "@/app/todo/components/TodoTitle";

const queryClient = new QueryClient();

export default function TodoPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoTitle />
      <TodoForm />
      <TodoList />
    </QueryClientProvider>
  );
}
