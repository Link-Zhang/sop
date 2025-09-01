import type { Todo } from "@/app/todo/_lib/todo";

export function TodoTable({
  todos,
  onToggleTodoAction,
}: {
  todos: Todo[];
  onToggleTodoAction: (id: string) => void;
}) {
  return (
    <ul className="space-y-3">
      {todos.map((todo: Todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-4 border rounded-md ${
            todo.completed
              ? "bg-gray-50 line-through text-gray-500"
              : "bg-white"
          } hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center gap-3">
            <input
              id={todo.id}
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleTodoAction(todo.id)}
              className="w-5 h-5 accent-blue-500"
            />
            <div>{todo.title}</div>
          </div>
          <div className="text-xs text-gray-400">{todo.createdAt}</div>
        </li>
      ))}
    </ul>
  );
}
