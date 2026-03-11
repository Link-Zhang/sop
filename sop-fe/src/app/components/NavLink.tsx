"use client";

import type Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import NavLinkUI from "@/app/components/ui/NavLinkUI";

const normalizePath = (path: string) => {
  return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
};

export default function NavLink(props: ComponentProps<typeof Link>) {
  const href = props.href.toString();

  const pathname = usePathname();

  const isActive = normalizePath(pathname) === normalizePath(href);

  return <NavLinkUI isActive={isActive} {...props} />;
}
