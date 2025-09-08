export function TodoTitleSkeleton() {
  return (
    <div className="font-bold mb-4 text-3xl text-center mx-auto w-36 bg-gray-200 rounded-md animate-pulse h-10" />
  );
}

export function TodoFormSkeleton() {
  return (
    <div className="flex gap-2 mb-4 max-w-2xl mx-auto">
      <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse" />
      <div className="w-16 h-10 bg-gray-200 rounded-md animate-pulse" />
    </div>
  );
}

export function TodoListSkeleton() {
  const skeletonItems = [
    { id: "todo-list-skeleton-1" },
    { id: "todo-list-skeleton-2" },
    { id: "todo-list-skeleton-3" },
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto mb-4">
      {skeletonItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 rounded-md bg-gray-200 animate-pulse"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-6 h-6 bg-gray-300 rounded-md" />
            <div className="w-32 h-6 bg-gray-300 rounded-md" />
          </div>
          <div className="w-16 h-4 bg-gray-300 rounded-md ml-4" />
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
