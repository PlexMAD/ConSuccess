const UniversitiesLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-9 w-44 rounded-lg bg-neutral-200 animate-pulse" />
      <ul className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="list-none">
            <div className="flex min-h-45 w-full flex-col rounded-2xl bg-white p-5 shadow-md animate-pulse">
              <div className="mb-4 h-14 w-14 rounded-xl bg-neutral-200" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-3/4 rounded bg-neutral-200" />
                <div className="h-4 w-1/2 rounded bg-neutral-200" />
              </div>
              <div className="mt-4 h-4 w-32 rounded bg-neutral-200" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversitiesLoading;