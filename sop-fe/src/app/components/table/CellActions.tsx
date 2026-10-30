"use client";

import {
  ClipboardPenLine,
  Copy,
  Ellipsis,
  FileBraces,
  Trash,
} from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

// todo
export default function CellActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="px-0 py-0" variant="ghost">
            <Ellipsis />
          </Button>
        }
      />
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem>
          <FileBraces />
          JSON
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ClipboardPenLine />
          Edit
        </DropdownMenuItem>{" "}
        <DropdownMenuItem>
          <Copy />
          Copy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
