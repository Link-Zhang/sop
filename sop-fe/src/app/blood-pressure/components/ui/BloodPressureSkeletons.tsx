export function BloodPressureTitleSkeleton() {
  return (
    <div className="animate-pulse bg-gray-300 h-10 mb-4 mx-auto rounded-md w-48" />
  );
}

export function BloodPressureTableSkeleton() {
  return (
    <>
      <BloodPressureToolsSkeleton />
      <BloodPressureTableBodySkeleton />
      <BloodPressurePaginationSkeleton />
    </>
  );
}

export function BloodPressureToolsSkeleton() {
  return (
    <div className="flex flex-col gap-2 mb-4 md:flex-row md:items-center md:justify-between w-full">
      <div className="flex gap-2">
        <div className="animate-pulse bg-gray-300 h-8 rounded w-20" />
        <div className="animate-pulse bg-gray-300 h-8 rounded w-20" />
        <div className="animate-pulse bg-gray-300 h-8 rounded w-20" />
      </div>
      <div className="flex gap-2">
        <div className="animate-pulse bg-gray-300 h-8 rounded w-20" />
        <div className="animate-pulse bg-gray-300 h-8 rounded w-20" />
      </div>
    </div>
  );
}

export function BloodPressureTableBodySkeleton() {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => ({
    id: `bp-table-skeleton-${index + 1}`,
  }));

  return (
    <div className="mb-4 mx-auto overflow-x-auto w-full">
      <div className="border inline-block min-w-full rounded">
        {skeletonItems.map((item) => (
          <BloodPressureTableRowSkeleton key={item.id} />
        ))}
      </div>
    </div>
  );
}

export function BloodPressureTableRowSkeleton() {
  return (
    <div className="border flex gap-2 md:gap-4 p-2 md:p-4">
      <div className="animate-pulse bg-gray-300 h-8 rounded shrink-0 w-8" />
      <div className="animate-pulse bg-gray-300 h-8 rounded shrink-0 w-32" />
      <div className="animate-pulse bg-gray-300 h-8 rounded shrink-0 w-32" />
      <div className="animate-pulse bg-gray-300 h-8 rounded shrink-0 w-32" />
      <div className="animate-pulse bg-gray-300 h-8 rounded shrink-0 w-32" />
      <div className="animate-pulse bg-gray-300 h-8 rounded shrink-0 flex-1" />
      <div className="animate-pulse bg-gray-300 h-8 rounded shrink-0 w-16" />
    </div>
  );
}

export function BloodPressurePaginationSkeleton() {
  return (
    <div className="flex flex-row gap-2 items-center justify-between mb-4 w-full">
      <div className="animate-pulse bg-gray-300 h-8 rounded w-16" />
      <div className="animate-pulse bg-gray-300 h-8 rounded w-48" />
      <div className="animate-pulse bg-gray-300 h-8 rounded w-16" />
    </div>
  );
}

export default function BloodPressurePageSkeleton() {
  return (
    <>
      <BloodPressureTitleSkeleton />
      <BloodPressureTableSkeleton />
    </>
  );
}
