// todo
export function BloodPressureTableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="animate-pulse bg-gray-300 h-8 rounded w-24" />
        <div className="animate-pulse bg-gray-300 h-8 rounded w-8" />
      </div>
    </div>
  );
}

export function BloodPressureFilter() {
  return <div className="animate-pulse bg-gray-300 h-8 rounded w-8" />;
}
