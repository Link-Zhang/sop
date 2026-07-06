import DeleteDialogUI from "@/app/components/ui/DeleteDialogUI";
import type { TodoListItemUIProps } from "@/app/todo/lib/types";
import { Button } from "@/shadcn/components/ui/button";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Label } from "@/shadcn/components/ui/label";
import { cn } from "@/shadcn/lib/utils";

export default function TodoListItemUI({
  content,
  deleteLabels,
  deleteOpen,
  id,
  localeDate,
  onCheckedChange,
  onDeleteOpenChange,
  onDeleteConfirm,
  status,
}: TodoListItemUIProps) {
  return (
    <li className="border flex gap-4 hover:bg-muted/50 items-center justify-between p-3 rounded-md transition-colors">
      <Checkbox
        checked={status}
        className="h-6 shrink-0 w-6"
        id={id}
        onCheckedChange={(checked) => onCheckedChange(Boolean(checked))}
      />
      <Label
        className={cn(
          "flex-1 min-w-0 truncate",
          status && "italic line-through text-muted-foreground",
        )}
        htmlFor={id}
      >
        {content}
      </Label>
      <Button
        className="shrink-0 text-destructive text-xs"
        onClick={() => onDeleteOpenChange(true)}
        variant="ghost"
      >
        {localeDate}
      </Button>
      <DeleteDialogUI
        labels={deleteLabels}
        onConfirm={onDeleteConfirm}
        onOpenChange={onDeleteOpenChange}
        open={deleteOpen}
      />
    </li>
  );
}
