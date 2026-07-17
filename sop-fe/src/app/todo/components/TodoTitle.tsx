"use client";

import { useTranslation } from "react-i18next";
import TitleUI from "@/app/components/ui/TitleUI";
import useTodo from "@/app/todo/hooks/useTodo";

export default function TodoTitle() {
  const { readTodo } = useTodo();
  const { t } = useTranslation("todo");

  return <TitleUI title={t("title")} onClick={() => readTodo()} />;
}
