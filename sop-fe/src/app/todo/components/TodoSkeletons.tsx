export function TodoTitleSkeleton() {
  return (
    <div className="animate-pulse bg-gray-300 h-10 mb-4 mx-auto rounded-md w-48" />
  );
}

export function TodoFormSkeleton() {
  return (
    <div className="flex gap-4 max-w-2xl mb-4 mx-auto">
      <div className="animate-pulse bg-gray-300 flex-1 h-9 rounded" />
      <div className="animate-pulse bg-gray-300 h-9 rounded w-16" />
    </div>
  );
}

export function TodoListItemSkeleton() {
  return (
    <div className="border flex gap-4 p-3 rounded-md">
      <div className="animate-pulse bg-gray-300 h-8 rounded w-8" />
      <div className="animate-pulse bg-gray-300 flex-1 h-8 rounded" />
      <div className="animate-pulse bg-gray-300 h-8 rounded w-24" />
    </div>
  );
}

export function TodoListSkeleton() {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => ({
    id: `todo-list-skeleton-${index + 1}`,
  }));

  return (
    <div className="max-w-2xl mb-4 mx-auto space-y-4">
      {skeletonItems.map((item) => (
        <TodoListItemSkeleton key={item.id} />
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
