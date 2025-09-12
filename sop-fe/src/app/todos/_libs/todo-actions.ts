"use server";

import { getTranslations } from "next-intl/server";
import { v4 as uuid } from "uuid";
import type { Todo } from "@/app/_libs/_types/todo";
import { getCurrentDate } from "@/app/_libs/date";
import { serverFetcher } from "@/app/_libs/server-fetcher";

const URL = "http://localhost:3001/todos";

export async function createTodoAction(content: string): Promise<Todo> {
  const t = await getTranslations("todo-form");
  const newTodoData: Todo = {
    id: uuid(),
    content,
    status: false,
    date: getCurrentDate(),
  };
  try {
    return await serverFetcher.post(URL, newTodoData);
  } catch (_error) {
    throw new Error(t("create.error"));
  }
}

export async function readTodoAction(): Promise<Todo[]>;

export async function readTodoAction(id: string): Promise<Todo>;

export async function readTodoAction(id?: string): Promise<Todo | Todo[]> {
  const t = await getTranslations("todo-list");
  const path = id ? `${URL}/${id}` : URL;
  try {
    return await serverFetcher.get(path);
  } catch (_error) {
    throw new Error(t("read.error"));
  }
}

export async function updateTodoAction(todoData: {
  id: string;
  status: boolean;
}): Promise<Todo> {
  const t = await getTranslations("todo-list");
  const updateData = {
    status: todoData.status,
  };
  try {
    return await serverFetcher.patch(`${URL}/${todoData.id}`, updateData);
  } catch (_error) {
    throw new Error(t("update.error"));
  }
}

export async function deleteTodoAction(id: string): Promise<void> {
  const t = await getTranslations("todo-list");
  try {
    return await serverFetcher.delete(`${URL}/${id}`);
  } catch (error) {
    if (error instanceof Error && error.message === t("delete.validation")) {
      throw error;
    }
    throw new Error(t("delete.error"));
  }
}
