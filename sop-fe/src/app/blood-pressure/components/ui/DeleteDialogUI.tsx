import { Trash2 } from "lucide-react";
import type { DeleteDialogUIProps } from "@/app/blood-pressure/lib/types";
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

export default function DeleteDialogUI({
  onConfirm,
  onOpenChange,
  open,
  texts,
}: DeleteDialogUIProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 dark:bg-destructive/20 dark:text-destructive text-destructive">
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>{texts.title}</AlertDialogTitle>
          <AlertDialogDescription>{texts.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{texts.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} variant="destructive">
            {texts.continue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
