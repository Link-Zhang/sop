import { Skeleton } from "@/shadcn/components/ui/skeleton";

export function TodoTitleSkeleton() {
  return <Skeleton className="h-12 mx-auto rounded-md w-40" />;
}

export default function TodoSkeletons() {
  return (
    <>
      <TodoTitleSkeleton />
    </>
  );
}
