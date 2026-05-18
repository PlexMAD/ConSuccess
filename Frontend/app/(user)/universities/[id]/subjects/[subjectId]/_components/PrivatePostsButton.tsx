"use client";

import { checkMe } from "@/shared/api/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

const PrivatePostsButton = ({
  universityId,
  subjectId,
  count,
}: {
  universityId: string;
  subjectId: string;
  count: number;
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkMe()
      .then((data) => data.ok && setIsAuthorized(true))
      .catch(() => {});
  }, []);

  if (!isAuthorized) return null;

  return (
    <Link
      className="inline-flex min-w-44 items-center justify-between gap-4 self-start rounded-lg border border-neutral-200 bg-white px-4 py-2 font-medium text-neutral-600 transition hover:border-primary hover:text-primary"
      href={`/universities/${universityId}/subjects/${subjectId}/private`}
    >
      <span>Мои личные</span>
      <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold leading-none text-neutral-500">
        {count}
      </span>
    </Link>
  );
};

export default PrivatePostsButton;
