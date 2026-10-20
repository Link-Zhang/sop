import type { ReactNode } from "react";
import { Button } from "@/shadcn/components/ui/button";

export default function DisabledIconButton({ icon }: { icon: ReactNode }) {
  return (
    <Button disabled size="icon" variant="outline">
      {icon}
    </Button>
  );
}
