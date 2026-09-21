"use client";

import type { JsonDialogUIProps } from "@/app/lib/types";
import { Dialog, DialogContent } from "@/shadcn/components/ui/dialog";

export default function JsonDialogUI({
  data,
  onOpenChange,
  open,
}: JsonDialogUIProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <pre className="break-words whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      </DialogContent>
    </Dialog>
  );
}
