"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export function NavLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const normalizePath = (path: string) => {
    return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  };
  const pathname = usePathname();
  const isActive = normalizePath(pathname) === normalizePath(href.toString());

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={`border-b-2 border-transparent py-2 transition-colors ${
        isActive ? "border-b-foreground font-bold" : "hover:border-b-gray-300"
      }`}
      href={href}
      {...rest}
    />
  );
}
