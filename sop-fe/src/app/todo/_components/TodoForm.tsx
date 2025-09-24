"use client";

import { useTranslations } from "next-intl";
import { type FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTodoActions } from "@/app/todo/_hooks/useTodoActions";

export function TodoForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createTodoAction } = useTodoActions();
  const t = useTranslations("todo-form");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      toast.error(t("input-validation"));
      inputRef.current?.focus();
      return;
    }
    setIsSubmitting(true);
    await createTodoAction(trimmedContent);
    setContent("");
    setIsSubmitting(false);
  };

  return (
    <form
      className="flex gap-2 max-w-2xl mb-4 mx-auto text-center"
      id="todo-form"
      onSubmit={handleSubmit}
    >
      <input
        className="border flex-1 focus:outline-none focus:ring-2 focus:ring-primary px-4 py-2 rounded-md"
        disabled={isSubmitting}
        id="todo-form-input"
        onChange={(e) => setContent(e.target.value)}
        placeholder={t("input-placeholder")}
        ref={inputRef}
        type="text"
        value={content}
      />
      <button
        className="bg-primary disabled:animate-pulse px-4 py-2 rounded-md text-on-primary"
        disabled={isSubmitting}
        type="submit"
      >
        {t("button-text")}
      </button>
    </form>
  );
}
