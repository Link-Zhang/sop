"use client";

import { useTranslation } from "react-i18next";
import Title from "@/app/components/Title";
import { TodoTitleSkeleton } from "@/app/todo/components/TodoSkeletons";
import useTodo from "@/app/todo/hooks/useTodo";

export default function TodoTitle() {
  const { readTodo, isReading } = useTodo();
  const { t } = useTranslation("todo");

  if (isReading) return <TodoTitleSkeleton />;

  return <Title onClick={() => readTodo()} title={t("title")} />;
}
