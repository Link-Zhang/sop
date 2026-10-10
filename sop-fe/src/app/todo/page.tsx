"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import { useState } from "react";
// import TodoSkeleton from "@/app/todo/components/TodoSkeletons";
import TodoTitle from "@/app/todo/components/TodoTitle";

export default function TodoPage() {
  const [queryClient] = useState(() => new QueryClient());

  // const [ready, setReady] = useState(false);
  //
  // useEffect(() => {
  //   const timer = setTimeout(() => setReady(true), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/*{ready ? <TodoTitle /> : <TodoSkeleton />}*/}
      <TodoTitle />
    </QueryClientProvider>
  );
}
