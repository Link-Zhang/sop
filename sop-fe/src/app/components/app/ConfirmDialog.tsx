"use client";

import type { ConfirmDialogProps } from "@/app/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/shadcn/components/ui/alert-dialog";

export default function ConfirmDialog({
  onConfirm,
  onOpenChange,
  open,
  options: { cancel, confirm, description, destructive = false, icon, title },
}: ConfirmDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          {icon && (
            <AlertDialogMedia
              className={
                destructive
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
              }
            >
              {icon}
            </AlertDialogMedia>
          )}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
            variant={destructive ? "destructive" : "default"}
          >
            {confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
