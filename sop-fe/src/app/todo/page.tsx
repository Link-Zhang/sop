import TodoForm from "@/app/todo/components/TodoForm";
import TodoList from "@/app/todo/components/TodoList";
import TodoTitle from "@/app/todo/components/TodoTitle";

export default function TodoPage() {
  return (
    <>
      <TodoTitle />
      <TodoForm />
      <TodoList />
    </>
  );
}
