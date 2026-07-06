import type { ComponentProps } from "react";
import type { Control } from "react-hook-form";
import z from "zod";
import type { DeleteDialogUILabels } from "@/app/lib/types";

export const todoSchema = z.object({
  id: z.uuidv7(),
  content: z.string().trim().min(1),
  status: z.boolean(),
  date: z.iso.datetime(),
});

export const createTodoSchema = todoSchema.pick({ content: true });

export type Todo = z.infer<typeof todoSchema>;

export type CreateTodo = z.infer<typeof createTodoSchema>;

export interface TodoFormUILabels {
  placeholder: string;
  required: string;
  submit: string;
}

export interface TodoFormUIProps {
  control: Control<CreateTodo>;
  labels: TodoFormUILabels;
  onSubmit: ComponentProps<"form">["onSubmit"];
}

export interface TodoListItemUIProps {
  content: string;
  deleteLabels: DeleteDialogUILabels;
  deleteOpen: boolean;
  id: string;
  localeDate: string;
  onCheckedChange: (checked: boolean) => void;
  onDeleteOpenChange: (open: boolean) => void;
  onDeleteConfirm: () => void;
  status: boolean;
}
