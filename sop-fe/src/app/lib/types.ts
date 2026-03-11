import type Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

interface ThemeOption {
  label: string;
  value: string;
}

export interface AppearanceSwitcherUIProps {
  onValueChange: (value: string) => void;
  options: ThemeOption[];
  tooltipText: string;
  value: string;
}

export interface LanguageSwitcherUIProps {
  disabled?: boolean;
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
