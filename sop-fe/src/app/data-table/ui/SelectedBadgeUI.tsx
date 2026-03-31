"use client";

import type { SelectedBadgeUIProps } from "@/app/data-table/lib/types";
import { Badge } from "@/shadcn/components/ui/badge";
import { Separator } from "@/shadcn/components/ui/separator";

export default function SelectedBadgeUI({
  options,
  summary,
}: SelectedBadgeUIProps) {
  const len = options.length;

  if (!len) return null;

  return (
    <>
      <Separator className="bg-border h-4 mx-1 w-px" orientation="vertical" />
      {len > 3 ? (
        <Badge variant="secondary">{summary(len)}</Badge>
      ) : (
        options.map(({ color, key, icon: Icon, text }) => (
          <Badge className={color} key={key} variant="secondary">
            {Icon && <Icon />}
            {text}
          </Badge>
        ))
      )}
    </>
  );
}
