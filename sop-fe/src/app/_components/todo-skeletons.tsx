export function TodoTitleSkeleton() {
  return (
    <div className="animate-pulse bg-gray-300  font-bold h-10 mb-4 mx-auto rounded-md text-3xl text-center w-36" />
  );
}

export function TodoFormSkeleton() {
  return (
    <div className="flex gap-2 max-w-2xl mb-4 mx-auto text-center">
      <div className="animate-pulse bg-gray-300 flex-1 h-12 rounded-md"></div>
      <div className="animate-pulse bg-gray-300 h-12 rounded-md w-16"></div>
    </div>
  );
}

export function TodoListItemSkeleton() {
  return (
    <li className="border flex items-center justify-between p-4 rounded-md transition-colors">
      <div className="flex flex-1 gap-4 items-center min-w-0">
        <div className="animate-pulse bg-gray-300 h-5 rounded shrink-0 w-5"></div>
        <div className="animate-pulse bg-gray-300 h-5 rounded w-36"></div>
      </div>
      <div className="animate-pulse bg-gray-300 h-4 rounded shrink-0 w-16"></div>
    </li>
  );
}

export function TodoListSkeleton() {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => ({
    id: `todo-list-skeleton-${index + 1}`,
  }));

  return (
    <ul className="max-w-2xl mb-4 mx-auto space-y-4">
      {skeletonItems.map((item) => (
        <TodoListItemSkeleton key={item.id} />
      ))}
    </ul>
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
