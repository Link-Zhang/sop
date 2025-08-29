import { HoverPrefetchLink } from "@/app/_components/hover-prefetch-link";
import React from "react";

export function TodoPageSkeleton() {
  return (
    <div className="container max-w-2xl mx-auto p-4">
      <div className="mb-6 h-8 mx-auto w-48 bg-gray-300 rounded-md animate-pulse">
        <HoverPrefetchLink href="/todo">
          <div className="font-bold mb-6 text-3xl text-center text-gray-800">
            Todo List
          </div>
        </HoverPrefetchLink>
      </div>
      <div className="flex gap-2 mb-6">
        <div className="flex-1 h-10 bg-gray-300 rounded-md animate-pulse" />
        <div className="w-16 h-10 bg-gray-300 rounded-md animate-pulse" />
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_: undefined, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border bg-gray-100 rounded-md animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded-md" />
              <div className={"h-4 bg-gray-300 rounded-md w-24"} />
            </div>
            <div className="w-24 h-3 bg-gray-300 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
