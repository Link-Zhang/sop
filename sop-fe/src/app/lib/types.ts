import type { ReactNode } from "react";
import type { NAMESPACES } from "@/app/lib/configs";
import type { LANGUAGE_CODES, THEME_MODES } from "@/app/lib/utils";

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
