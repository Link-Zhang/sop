import type React from "react";
import type { Control } from "react-hook-form";

export interface Todo {
  id: string;
  content: string;
  status: boolean;
  date: string;
}

export interface TodoErrorProps {
  error?: Error;
}

export interface TodoFormUIProps {
  buttonText: string;
  className?: string;
  control: Control<{ content: string }>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  placeholder: string;
  validation: string;
}

export interface TodoListItemUIProps {
  checkboxClassName?: string;
  currentLanguage: string;
  deleteCancel: string;
  deleteContinue: string;
  deleteDescription: string;
  deleteTitle: string;
  labelClassName?: string;
  liClassName?: string;
  onCheckedChange: (
    id: string,
    completed: boolean,
  ) => Promise<Todo | undefined>;
  onClick: (id: string) => Promise<unknown>;
  todo: Todo;
}

export interface TodoTitleUIProps {
  className?: string;
  title: string;
}
