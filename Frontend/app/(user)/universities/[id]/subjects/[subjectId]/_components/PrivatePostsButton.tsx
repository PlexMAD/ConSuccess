"use client";

import { checkMe } from "@/shared/api/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

const PrivatePostsButton = ({
  universityId,
  subjectId,
}: {
  universityId: string;
  subjectId: string;
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
      className="self-start rounded-lg border border-neutral-200 bg-white px-4 py-2 font-medium text-neutral-600 transition hover:border-primary hover:text-primary"
      href={`/universities/${universityId}/subjects/${subjectId}/private`}
    >
      Мои личные
    </Link>
  );
};

export default PrivatePostsButton;
