"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SKELETON_NUMBER } from "@/app/lib/configs";
import { makeKeys } from "@/app/lib/utils";
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
  const ids = useMemo(() => makeKeys(SKELETON_NUMBER), []);

  return (
    <ItemGroup>
      {ids.map((id) => (
        <Item className="flex-nowrapr" key={id} size="sm" variant="outline">
          <ItemMedia>
            <Skeleton className="rounded-sm size-4" />
          </ItemMedia>
          <ItemContent className="min-w-0">
            <ItemTitle className="w-full">
              <Skeleton className="h-5 w-full" />
            </ItemTitle>
          </ItemContent>
          <ItemActions className="shrink-0">
            <Skeleton className="h-6 w-20" />
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
