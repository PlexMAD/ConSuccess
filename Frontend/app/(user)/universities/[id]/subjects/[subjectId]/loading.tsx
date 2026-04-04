const SubjectLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-14 rounded bg-neutral-200 animate-pulse" />
        <div className="h-8 w-80 rounded bg-neutral-200 animate-pulse" />
        <div className="h-9 w-40 rounded-lg bg-neutral-200 animate-pulse" />
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="list-none">
            <div className="flex w-full flex-col rounded-2xl bg-white shadow-md overflow-hidden animate-pulse">
              <div className="h-36 w-full bg-neutral-200" />
              <div className="flex flex-col gap-2 p-4">
                <div className="h-4 w-3/4 rounded bg-neutral-200" />
                <div className="h-4 w-full rounded bg-neutral-200" />
                <div className="h-4 w-1/2 rounded bg-neutral-200" />
                <div className="mt-2 h-4 w-16 rounded bg-neutral-200" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectLoading;