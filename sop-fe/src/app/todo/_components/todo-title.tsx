import { HoverPrefetchLink } from "@/app/_components/hover-prefetch-link";

export function TodoTitle() {
  return (
    <HoverPrefetchLink href="/">
      <div className="font-bold mb-6 text-3xl text-center text-gray-800">
        Todo List
      </div>
    </HoverPrefetchLink>
  );
}
