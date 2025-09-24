"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { NavLink } from "@/app/_components/NavLink";

export function HoverPrefetchLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <NavLink
      href={href}
      onMouseEnter={() => setActive(true)}
      prefetch={active ? null : false}
    >
      {children}
    </NavLink>
  );
}
