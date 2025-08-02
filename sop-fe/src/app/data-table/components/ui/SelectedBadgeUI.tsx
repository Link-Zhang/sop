"use client";

import type { SelectedBadgeUIProps } from "@/app/data-table/lib/types";
import { Badge } from "@/shadcn/components/ui/badge";
import { Separator } from "@/shadcn/components/ui/separator";

export default function SelectedBadgeUI({
  options,
  summary,
}: SelectedBadgeUIProps) {
  const count = options.length;

  if (!count) return null;

  return (
    <>
      <Separator className="bg-border h-4 mx-1 w-px" orientation="vertical" />
      {count > 3 ? (
        <Badge variant="secondary">{summary}</Badge>
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
