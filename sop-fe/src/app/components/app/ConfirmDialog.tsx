"use client";

import type { ConfirmDialogOptions } from "@/app/lib/types";
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

type ConfirmDialogProps = {
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  options: ConfirmDialogOptions;
};

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
                  ? "btn-destructive-compat text-destructive"
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
            className={destructive ? "btn-destructive-compat" : ""}
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
