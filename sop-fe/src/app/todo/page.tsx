import TodoForm from "@/app/todo/components/TodoForm";
import TodoList from "@/app/todo/components/TodoList";
import TodoTitle from "@/app/todo/components/TodoTitle";

export default function TodoPage() {
  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full gap-4">
      <TodoTitle />
      <TodoForm />
      <TodoList />
    </div>
  );
}
