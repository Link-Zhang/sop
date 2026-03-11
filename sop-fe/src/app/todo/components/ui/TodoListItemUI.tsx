"use client";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/app/lib/utils";
import type { TodoListItemUIProps } from "@/app/todo/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import { Button } from "@/shadcn/components/ui/button";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Label } from "@/shadcn/components/ui/label";
import { cn } from "@/shadcn/lib/utils";

export default function TodoListItemUI({
  checkboxClassName,
  currentLanguage,
  deleteCancel,
  deleteContinue,
  deleteDescription,
  deleteTitle,
  labelClassName,
  liClassName,
  onCheckedChange,
  onClick,
  todo,
}: TodoListItemUIProps) {
  const { id, content, status, date } = todo;

  const locale =
    SUPPORTED_LOCALES.find((item) => item.code === currentLanguage)?.locale ??
    DEFAULT_LOCALE;

  const localeDate = new Intl.DateTimeFormat(locale).format(new Date(date));

  return (
    <li
      className={cn(
        "border flex gap-4 hover:bg-muted/50 items-center justify-between p-3 rounded-md transition-colors",
        liClassName,
      )}
    >
      <Checkbox
        checked={status}
        className={cn("h-6 shrink-0 w-6", checkboxClassName)}
        id={id}
        onCheckedChange={() => onCheckedChange(id, !status)}
      />
      <Label
        className={cn(
          "flex-1 min-w-0 truncate",
          status && "italic line-through text-muted-foreground",
          labelClassName,
        )}
        htmlFor={id}
      >
        {content}
      </Label>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="shrink-0 text-primary text-xs" variant="ghost">
            {localeDate}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>{deleteDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{deleteCancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => onClick(id)}>
              {deleteContinue}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
