"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/shadcn/components/ui/item";
import { Skeleton } from "@/shadcn/components/ui/skeleton";

export function TodoTitleSkeleton() {
  const { t } = useTranslation("todo");

  return (
    <Skeleton className="mx-auto text-4xl text-transparent w-fit">
      {t("title")}
    </Skeleton>
  );
}

export function TodoListSkeleton() {
  const ids = useMemo(
    () => Array.from({ length: 5 }, () => crypto.randomUUID()),
    [],
  );

  return (
    <ItemGroup>
      {ids.map((id) => (
        <Item key={id} size="sm" variant="outline">
          <ItemMedia>
            <Skeleton className="rounded-sm size-4 shrink-0" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              <Skeleton className="h-5 max-w-full w-40" />
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <Skeleton className="h-8 shrink-0 w-32" />
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
