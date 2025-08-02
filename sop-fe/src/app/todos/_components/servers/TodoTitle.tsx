import { useTranslations } from "next-intl";

export function TodoTitle() {
  const t = useTranslations("todo-title");

  return <h1 className="font-bold mb-4 text-3xl text-center">{t("text")}</h1>;
}
