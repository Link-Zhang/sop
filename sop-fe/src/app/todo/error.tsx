"use client";

import { useEffect } from "react";

export default function TodoError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex h-full flex-col items-center justify-center"
      id="todo-error"
    >
      <h2 className="text-center">{error.message}</h2>
      <h2 className="text-center">Retrying...</h2>
    </div>
  );
}
