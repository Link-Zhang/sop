import type { ReactNode } from "react";
import type { NAMESPACES } from "@/app/lib/configs";
import type { LANGUAGE_CODES, THEME_MODES } from "@/app/lib/utils";

export type ConfirmDialogOptions = {
  cancel?: string;
  confirm?: string;
  description?: string;
  destructive?: boolean;
  icon?: ReactNode;
  title: string;
};

export type ConfirmFn = (options: ConfirmDialogOptions) => Promise<boolean>;

export type ConfirmState = {
  open: boolean;
  options: ConfirmDialogOptions;
  resolve: (result: boolean) => void;
};

export type Language = (typeof LANGUAGE_CODES)[number];

export type Namespace = (typeof NAMESPACES)[number];

export type SearchableRow = { getValue: (columnId: string) => unknown };

export type ThemeMode = (typeof THEME_MODES)[number];
