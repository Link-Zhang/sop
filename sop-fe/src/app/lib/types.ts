import type { ReactNode } from "react";
import type { COLUMN_VARIANTS, NAMESPACES } from "@/app/lib/configs";
import type { LANGUAGE_CODES, THEME_MODES } from "@/app/lib/utils";

export type ColumnMeta = {
  // facetOptions?: ReadonlyArray<FacetOption>
  filterVariant?: ColumnVariant;
};

export type ColumnVariant = (typeof COLUMN_VARIANTS)[number];

export type ConfirmDialogOptions = {
  cancel?: string;
  confirm?: string;
  description?: string;
  destructive?: boolean;
  icon?: ReactNode;
  title: string;
};

export type ConfirmDialogProps = {
  options: ConfirmDialogOptions;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export type ConfirmFn = (options: ConfirmDialogOptions) => Promise<boolean>;

export type ConfirmState = {
  open: boolean;
  options: ConfirmDialogOptions;
  resolve: (result: boolean) => void;
};

export type Language = (typeof LANGUAGE_CODES)[number];

export type Namespace = (typeof NAMESPACES)[number];

type SwitcherItem = {
  value: string;
  icon: ReactNode;
  label: string;
};

export type SwitcherProps = {
  items: SwitcherItem[];
  onValueChange: (value: string) => void;
  tip: string;
  triggerIcon: ReactNode;
  value: string;
};

export type ThemeMode = (typeof THEME_MODES)[number];

export type TitleProps = {
  onClick?: () => void;
  title: string;
};
