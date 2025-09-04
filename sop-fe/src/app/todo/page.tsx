import { TodoForm } from "@/app/todo/_components/todo-form";
import { TodoList } from "@/app/todo/_components/todo-list";
import { TodoTitle } from "@/app/todo/_components/todo-title";

export default async function TodoPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <section className="max-w-4xl mx-auto py-6 px-4">
      <TodoTitle />
      <TodoForm />
      <TodoList />
    </section>
  );
}
