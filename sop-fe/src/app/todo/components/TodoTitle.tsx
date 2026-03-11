"use client";

import { useTranslation } from "react-i18next";
import TodoTitleUI from "@/app/todo/components/ui/TodoTitleUI";

export default function TodoTitle() {
  const { t } = useTranslation("todo");

  return <TodoTitleUI title={t("title")} />;
}
