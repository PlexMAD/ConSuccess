"use client";

import { checkMe } from "@/shared/api/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

const AddKnowledgePostButton = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkMe()
      .then((data) => data.ok && setIsAuthorized(true))
      .catch(() => {});
  }, []);

  if (!isAuthorized) return null;

  return (
    <Link
      className="self-start px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
      href="/knowledge/add-post"
    >
      Добавить
    </Link>
  );
};

export default AddKnowledgePostButton;
