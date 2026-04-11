"use client";

import { apiURL } from "@/shared/api/config";
import { RecentPost } from "@/shared/types/posts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

function getPostHref(post: RecentPost): string {
  if (post.subject) {
    return `/universities/${post.subject.universityId}/subjects/${post.subject.id}/posts/${post.id}`;
  }
  return `/knowledge/posts/${post.id}`;
}

export function PostsList({ initialPosts }: { initialPosts: RecentPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Пост удалён");
    } catch {
      toast.error("Не удалось удалить пост");
    } finally {
      setDeleting(null);
      setConfirmId(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-4 rounded-2xl bg-white shadow-md p-4 transition-all duration-200 hover:shadow-lg"
          >
            {/* Автор */}
            <div className="flex flex-col items-center gap-1 shrink-0 w-10 pt-0.5">
              {post.user.avatar ? (
                <Image
                  src={`${apiURL}${post.user.avatar}`}
                  alt={post.user.username}
                  width={36}
                  height={36}
                  unoptimized
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500">
                  {post.user.username[0].toUpperCase()}
                </div>
              )}
            </div>

            {/* Содержимое */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-0.5">
                <span className="text-xs text-slate-400">{post.user.username}</span>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString("ru-RU")}
                </span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${post.subject
                    ? "bg-blue-50 text-primary"
                    : "bg-slate-100 text-slate-500"
                    }`}
                >
                  {post.subject ? post.subject.name : "Знания"}
                </span>
              </div>
              <p className="font-semibold text-slate-900 text-sm truncate">{post.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{post.body}</p>
            </div>

            <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-2 shrink-0">
              <Link
                href={getPostHref(post)}
                className="text-xs text-primary font-medium hover:underline"
              >
                Открыть →
              </Link>
              <button
                onClick={() => setConfirmId(post.id)}
                className="text-xs text-red-500 font-medium hover:text-red-700 transition"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-slate-400 text-sm">Постов нет</p>
        )}
      </div>

      {confirmId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => !deleting && setConfirmId(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold">Удалить пост?</h2>
              <p className="text-sm text-neutral-500">Это действие нельзя отменить.</p>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmId(null)}
                disabled={!!deleting}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-sm hover:bg-neutral-50 transition disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={!!deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50"
              >
                {deleting === confirmId ? "Удаление..." : "Удалить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}