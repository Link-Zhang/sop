"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import TodoFormUI from "@/app/todo/components/ui/TodoFormUI";
import useTodo from "@/app/todo/hooks/useTodo";

export default function TodoForm() {
  const { createTodo } = useTodo();

  const { t } = useTranslation("todo");

  const formSchema = z.object({
    content: z.string().min(1, t("formInputValidation")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { content: "" },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await createTodo(data.content.trim());
    form.reset();
    return result;
  };

  return (
    <TodoFormUI
      buttonText={t("formButtonText")}
      control={form.control}
      onSubmit={form.handleSubmit(handleSubmit)}
      placeholder={t("formInputPlaceholder")}
      validation={t("formInputValidation")}
    />
  );
}
