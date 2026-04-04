const PostLoading = () => {
  return (
    <div className="flex flex-col gap-4 max-w-8xl w-full min-w-0">
      <div className="h-4 w-14 rounded bg-neutral-200 animate-pulse" />

      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 animate-pulse">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="h-8 w-2/3 rounded bg-neutral-200" />
            <div className="h-6 w-6 rounded bg-neutral-200 shrink-0" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-neutral-200" />
            <div className="h-3 w-20 rounded bg-neutral-200" />
            <div className="h-3 w-24 rounded bg-neutral-200" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-4 w-full rounded bg-neutral-200" />
          <div className="h-4 w-full rounded bg-neutral-200" />
          <div className="h-4 w-5/6 rounded bg-neutral-200" />
          <div className="h-4 w-4/6 rounded bg-neutral-200" />
          <div className="h-4 w-full rounded bg-neutral-200" />
          <div className="h-4 w-3/4 rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};

export default PostLoading;