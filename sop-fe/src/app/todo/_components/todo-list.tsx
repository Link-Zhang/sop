"use client";

import { TodoListSkeleton } from "@/app/todo/_components/todo-skeletons";
import { useTodos } from "@/app/todo/_hooks/useTodos";
import TodoError from "@/app/todo/error";

export function TodoList() {
  const { todos, isLoading, error, updateTodo, deleteTodo } = useTodos();

  if (isLoading) return <TodoListSkeleton />;
  if (error) return <TodoError error={error} />;

  const handleToggle = async (id: string, completed: boolean) => {
    await updateTodo(id, { status: !completed });
  };

  const confirmDelete = async (id: string) => {
    if (window.confirm("确定要删除此项吗？")) {
      await deleteTodo(id);
    }
  };

  if (!todos?.length) {
    return (
      <ul className="space-y-4 max-w-2xl mx-auto mb-4">
        <li className="text-center text-gray-500">暂无事项，添加一个...</li>
      </ul>
    );
  }

  return (
    <ul className="space-y-4 max-w-2xl mx-auto mb-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-4 border rounded-md transition-colors ${
            todo.status
              ? "bg-gray-50 line-through text-gray-500"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4 flex-1">
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => handleToggle(todo.id, todo.status)}
              className="w-6 h-6 accent-blue-500 cursor-pointer"
            />
            <span className="break-words flex-1">{todo.content}</span>
          </div>
          <button
            type="button"
            className="text-xs text-red-400 hover:text-red-600 transition-colors shrink-0 ml-4"
            onClick={() => confirmDelete(todo.id)}
            title="删除此项"
          >
            {todo.date}
          </button>
        </li>
      ))}
    </ul>
  );
}
