"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TodoFormUI from "@/app/todo/components/ui/TodoFormUI";
import useTodo from "@/app/todo/hooks/useTodo";
import {
  type CreateTodo,
  createTodoSchema,
  type TodoFormUILabels,
} from "@/app/todo/lib/types";

export default function TodoForm() {
  const form = useForm<CreateTodo>({
    defaultValues: { content: "" },
    resolver: zodResolver(createTodoSchema),
  });
  const { createTodo } = useTodo();
  const { t } = useTranslation("todo");
  const labels: TodoFormUILabels = useMemo(
    () => ({
      placeholder: t("create.form.placeholder", {
        field: t("fields.content"),
      }),
      required: t("validation.required", {
        field: t("fields.content"),
      }),
      submit: t("create.form.submit"),
    }),
    [t],
  );

  const handleSubmit = (data: CreateTodo) => {
    form.reset();
    createTodo({ content: data.content });
  };

  return (
    <TodoFormUI
      control={form.control}
      labels={labels}
      onSubmit={form.handleSubmit(handleSubmit)}
    />
  );
}
