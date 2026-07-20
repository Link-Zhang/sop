import type Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export interface AppearanceSwitcherUIProps {
  onValueChange: (value: string) => void;
  options: readonly ThemeOption[];
  tooltipText: string;
  value: string;
}

export interface DeleteDialogUILabels {
  cancel: string;
  confirm: string;
  description: string;
  title: string;
}

export interface DeleteDialogUIProps {
  labels: DeleteDialogUILabels;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export interface LanguageSwitcherUIProps {
  onValueChange: (value: string) => Promise<void>;
  tooltipText: string;
  value: string;
}

export interface LayoutFooterUIProps {
  author: string;
  className?: string;
  copyright: string;
  year: number;
}

export interface LayoutHeaderUIProps {
  className?: string;
  leftNav?: ReactNode;
  rightNav?: ReactNode;
}

export interface NavLinkUIProps extends ComponentProps<typeof Link> {
  isActive: boolean;
}

interface ThemeOption {
  label: string;
  value: string;
}

export interface TitleUIProps {
  onClick?: () => void;
  title: string;
}
