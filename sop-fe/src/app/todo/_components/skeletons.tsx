import { HoverPrefetchLink } from "@/app/_components/hover-prefetch-link";

export function TodoTitleSkeleton() {
  return (
    <div
      className="font-bold mb-4 text-3xl text-center text-gray-800 mx-auto w-36 bg-gray-200 rounded-md animate-pulse"
      id="todo-title"
    >
      <HoverPrefetchLink href="/todo">Todo List</HoverPrefetchLink>
    </div>
  );
}

export function TodoFormSkeleton() {
  return (
    <div className="flex gap-2 mb-4 max-w-2xl mx-auto" id="todo-form">
      <div
        className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"
        id="todo-form-input"
      />
      <div
        className="w-15 h-10 bg-gray-200 rounded-md animate-pulse"
        id="todo-form-button"
      />
    </div>
  );
}

export function TodoListSkeleton() {
  return (
    <div className="space-y-4 max-w-2xl mx-auto mb-4" id="todo-list">
      {[...Array(3)].map((_: undefined, index: number) => (
        <div
          key={`todo-page-skeleton-${index}-${Date.now()}`}
          className="flex items-center justify-between p-4 rounded-md bg-gray-200 animate-pulse"
          id={`todo-list-item-${index}`}
        >
          <div
            className="flex items-center gap-4"
            id={`todo-list-item-${index}-left`}
          >
            <div
              className="w-6 h-6 bg-gray-300 rounded-md"
              id={`todo-list-item-${index}-left-checkbox`}
            />
            <div
              className={"w-32 h-6 bg-gray-300 rounded-md"}
              id={`todo-list-item-${index}-text`}
            />
          </div>
          <div
            className="w-16 h-4 bg-gray-300 rounded-md"
            id={`todo-list-item-${index}-right`}
          />
        </div>
      ))}
    </div>
  );
}

export function TodoPageSkeleton() {
  return (
    <>
      <TodoTitleSkeleton />
      <TodoFormSkeleton />
      <TodoListSkeleton />
    </>
  );
}
