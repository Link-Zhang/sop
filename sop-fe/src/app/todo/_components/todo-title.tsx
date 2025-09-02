import { HoverPrefetchLink } from "@/app/_components/hover-prefetch-link";

export function TodoTitle() {
  return (
    <div
      className="font-bold mb-4 text-3xl text-center text-gray-800"
      id="todo-title"
    >
      <HoverPrefetchLink href="/">Todo List</HoverPrefetchLink>
    </div>
  );
}
