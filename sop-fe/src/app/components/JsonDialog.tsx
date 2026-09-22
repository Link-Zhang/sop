"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/shadcn/components/ui/dialog";

type JsonDialogProps = {
  data: unknown;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export default function JsonDialog({
  data,
  onOpenChange,
  open,
}: JsonDialogProps) {
  const { t } = useTranslation();
  const json = JSON.stringify(data, null, 2);

  useEffect(() => {
    if (!open) return;
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(json);
        toast.success(t("json.success"));
      } catch {
        toast.error(t("json.error"));
      }
    };
    void copy();
  }, [json, open, t]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <pre className="break-words whitespace-pre-wrap">{json}</pre>
      </DialogContent>
    </Dialog>
  );
}
