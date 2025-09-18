"use server";

import { getTranslations } from "next-intl/server";
import { v7 as uuid } from "uuid";
import { getCurrentDate } from "@/app/_libs/date.utils";
import { serverFetcher } from "@/app/_libs/serverFetcher";
import type { Todo } from "@/app/_libs/todo.types";

const API_URL = "http://localhost:6901/todos";

export async function createTodoAction(content: string): Promise<Todo> {
  const t = await getTranslations("todo-form");
  const newTodoData: Todo = {
    id: uuid(),
    content: content.trim(),
    status: false,
    date: getCurrentDate(),
  };
  try {
    return await serverFetcher.post(API_URL, newTodoData);
  } catch (_error) {
    throw new Error(t("create.error"));
  }
}

export async function readTodoAction(): Promise<Todo[]>;

export async function readTodoAction(id: string): Promise<Todo>;

export async function readTodoAction(id?: string): Promise<Todo | Todo[]> {
  const t = await getTranslations("todo-list");
  const path = id ? `${API_URL}/${id}` : API_URL;
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
    return await serverFetcher.patch(`${API_URL}/${todoData.id}`, updateData);
  } catch (_error) {
    throw new Error(t("update.error"));
  }
}

export async function deleteTodoAction(id: string): Promise<void> {
  const t = await getTranslations("todo-list");
  try {
    return await serverFetcher.delete(`${API_URL}/${id}`);
  } catch (error) {
    if (error instanceof Error && error.message === t("delete.validation")) {
      throw error;
    }
    throw new Error(t("delete.error"));
  }
}
