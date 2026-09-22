"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/shadcn/components/ui/skeleton";

export function TodoTitleSkeleton() {
  const { t } = useTranslation("todo");

  return (
    <Skeleton className="font-bold mx-auto text-4xl text-transparent w-fit">
      {t("title")}
    </Skeleton>
  );
}

export function TodoFormSkeleton() {
  return (
    <div className="flex gap-4 max-w-2xl mt-4 mx-auto w-full">
      <Skeleton className="flex-1 h-10" />
      <Skeleton className="h-10 w-12" />
    </div>
  );
}

export function TodoListSkeleton() {
  const ids = useMemo(
    () => Array.from({ length: 5 }, () => crypto.randomUUID()),
    [],
  );

  return (
    <ul className="max-w-2xl mt-4 mx-auto space-y-2 w-full">
      {ids.map((id) => (
        <li key={id} className="border flex gap-3 items-center p-2 rounded-md">
          <Skeleton className="rounded-sm size-4" />
          <Skeleton className="flex-1 h-8" />
          <Skeleton className="h-8 w-32" />
        </li>
      ))}
    </ul>
  );
}

export default function TodoSkeletons() {
  return (
    <>
      <TodoTitleSkeleton />
      <TodoFormSkeleton />
      <TodoListSkeleton />
    </>
  );
}
