"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { BPTableSkeletonProps } from "@/app/bp/lib/types";
import { SKELETON_NUMBER } from "@/app/lib/configs";
import { makeKeys } from "@/app/lib/utils";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";

export function BPTitleSkeleton() {
  const { t } = useTranslation("bp");

  return (
    <Skeleton className="mx-auto text-4xl text-transparent w-fit">
      {t("title")}
    </Skeleton>
  );
}

export function BPTableSkeleton({
  columns,
  rows = SKELETON_NUMBER,
}: BPTableSkeletonProps) {
  const colKeys = useMemo(() => makeKeys(columns), [columns]);
  const rowKeys = useMemo(() => makeKeys(rows), [rows]);

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {colKeys.map((ck) => (
              <TableHead key={ck}>
                <Skeleton className="h-4 max-w-sm w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowKeys.map((rk) => (
            <TableRow key={rk}>
              {colKeys.map((ck) => (
                <TableCell key={ck}>
                  <Skeleton className="h-4 max-w-3xs w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
