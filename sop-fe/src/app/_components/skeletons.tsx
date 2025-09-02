import { HoverPrefetchLink } from "@/app/_components/hover-prefetch-link";

export function RootSkeleton() {
  return (
    <div className="font-bold mb-4 text-3xl text-center text-gray-800 mx-auto w-36 bg-gray-200 rounded-md animate-pulse">
      <HoverPrefetchLink href="/todo">Todo</HoverPrefetchLink>
    </div>
  );
}
