"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { v7 as uuid } from "uuid";
import { getCurrentDate } from "@/app/_libs/date.utils";
import { serverFetcher } from "@/app/_libs/serverFetcher";
import type { Todo } from "@/app/_libs/todo.types";

const API_URL = "http://localhost:6900/todos";

export async function createTodo(content: string): Promise<Todo> {
  const t = await getTranslations("todo-form");
  const newTodoData: Todo = {
    id: uuid(),
    content: content.trim(),
    status: false,
    date: getCurrentDate(),
  };
  try {
    const createdTodo: Todo = await serverFetcher.post(API_URL, newTodoData);
    revalidatePath("/todos");
    return createdTodo;
  } catch (_error) {
    console.log(_error);
    throw new Error(t("create.error"));
  }
}

export async function readTodo(): Promise<Todo[]>;

export async function readTodo(id: string): Promise<Todo>;

export async function readTodo(id?: string): Promise<Todo | Todo[]> {
  const t = await getTranslations("todo-list");
  const path = id ? `${API_URL}/${id}` : API_URL;
  try {
    return await serverFetcher.get(path);
  } catch (_error) {
    throw new Error(t("read.error"));
  }
}

export async function updateTodo(todoData: {
  id: string;
  status: boolean;
}): Promise<Todo> {
  const t = await getTranslations("todo-list");
  const updateData = {
    status: todoData.status,
  };
  try {
    const updatedTodo: Todo = await serverFetcher.patch(
      `${API_URL}/${todoData.id}`,
      updateData,
    );
    revalidatePath("/todos");
    return updatedTodo;
  } catch (_error) {
    throw new Error(t("update.error"));
  }
}

export async function deleteTodo(id: string): Promise<Todo> {
  const t = await getTranslations("todo-list");
  try {
    const deletedTodo: Todo = await serverFetcher.delete(`${API_URL}/${id}`);
    revalidatePath("/todos");
    return deletedTodo;
  } catch (error) {
    if (error instanceof Error && error.message === t("delete.validation")) {
      throw error;
    }
    throw new Error(t("delete.error"));
  }
}
