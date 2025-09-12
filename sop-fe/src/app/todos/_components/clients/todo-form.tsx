"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createTodoAction } from "@/app/todos/_libs/todo-actions";

export function TodoForm() {
  const router = useRouter();
  const t = useTranslations("todo-form");

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<{ content: string }>();

  useEffect(() => {
    if (errors.content?.message) {
      toast.error(errors.content.message as string);
    }
  }, [errors.content]);

  const handleFormSubmit: SubmitHandler<{ content: string }> = async (data) => {
    try {
      await createTodoAction(data.content);
      toast.success(t("create.success"));
      reset();
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form
      className="flex gap-2 max-w-2xl mb-4 mx-auto text-center"
      id="todo-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <input
        className="border flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md"
        id="todo-form-input"
        placeholder={t("input-placeholder")}
        type="text"
        {...register("content", { required: t("validation.required") })}
      />
      <button
        className="bg-blue-500 px-4 py-2 rounded-md text-white disabled:animate-pulse"
        disabled={isSubmitting}
        type="submit"
      >
        {t("button-text")}
      </button>
    </form>
  );
}
