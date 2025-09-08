import toast from "react-hot-toast";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { fetcher } from "@/app/_lib/fetchers";
import type { Todo } from "@/app/_types/todo";

const DATE_LOCALE = "zh-CN";
const URL = "http://localhost:3001/todos";

const getCurrentDate = () => new Date().toLocaleDateString(DATE_LOCALE);

const handleError = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return defaultMessage;
};

export function useTodos() {
  const createTodo = async (content: string) => {
    const newTodo: Todo = {
      id: uuid(),
      content: content.trim(),
      status: false,
      date: getCurrentDate(),
    };

    try {
      await mutate(
        async (currentTodos = []) => {
          const createdTodo = await fetcher.post<Todo>(URL, newTodo);
          return [...currentTodos, createdTodo];
        },
        {
          optimisticData: (currentTodos = []) => [...currentTodos, newTodo],
          revalidate: false,
        },
      );
      toast.success("添加成功");
    } catch (err) {
      toast.error(`添加失败: ${handleError(err, "请稍后重试")}`);
    }
  };

  const { data, error, isLoading, mutate } = useSWR<Todo[]>(URL, fetcher.get);

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      await mutate(
        async (currentTodos = []) => {
          const updatedTodo = await fetcher.patch<Todo>(
            `${URL}/${id}`,
            updates,
          );
          return currentTodos.map((todo) =>
            todo.id === id ? updatedTodo : todo,
          );
        },
        {
          optimisticData: (currentTodos = []) =>
            currentTodos.map((todo) =>
              todo.id === id ? { ...todo, ...updates } : todo,
            ),
          revalidate: false,
        },
      );
      toast.success("更新成功");
    } catch (err) {
      toast.error(`更新失败: ${handleError(err, "请稍后重试")}`);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await mutate(
        async (currentTodos = []) => {
          await fetcher.delete(`${URL}/${id}`);
          return currentTodos.filter((todo) => todo.id !== id);
        },
        {
          optimisticData: (currentTodos = []) =>
            currentTodos.filter((todo) => todo.id !== id),
          revalidate: false,
        },
      );
      toast.success("删除成功");
    } catch (err) {
      toast.error(`删除失败: ${handleError(err, "请稍后重试")}`);
    }
  };

  return {
    todos: data,
    error,
    isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
