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
  const [updating, setUpdating] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const handleVisibilityChange = async (id: number, visible: boolean) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible }),
      });
      if (!res.ok) throw new Error();
      setPosts((prev) => prev.map((post) => (
        post.id === id ? { ...post, visible } : post
      )));
      toast.success(visible ? "Пост снова виден" : "Пост скрыт");
    } catch {
      toast.error(visible ? "Не удалось вернуть пост" : "Не удалось скрыть пост");
    } finally {
      setUpdating(null);
      setConfirmId(null);
    }
  };

  const confirmPost = posts.find((post) => post.id === confirmId);
  const visibleCount = posts.filter((post) => post.visible).length;
  const hiddenCount = posts.length - visibleCount;

  return (
    <>
      <p className="mb-3 text-xs text-slate-400">
        Всего: {posts.length} · Видимых: {visibleCount} · Скрытых: {hiddenCount}
      </p>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`flex items-start gap-4 rounded-2xl bg-white p-4 shadow-md transition-all duration-200 hover:shadow-lg ${
              post.visible ? "" : "opacity-70"
            }`}
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
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                    post.visible
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {post.visible ? "Виден" : "Скрыт"}
                </span>
              </div>
              <p className="font-semibold text-slate-900 text-sm truncate">{post.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{post.body}</p>
            </div>

            <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-2 shrink-0">
              {post.visible ? (
                <Link
                  href={getPostHref(post)}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Открыть →
                </Link>
              ) : (
                <span className="text-xs text-slate-400">Недоступен</span>
              )}
              {post.visible ? (
                <button
                  onClick={() => setConfirmId(post.id)}
                  disabled={updating === post.id}
                  className="text-xs text-red-500 font-medium transition hover:text-red-700 disabled:opacity-50"
                >
                  Скрыть
                </button>
              ) : (
                <button
                  onClick={() => handleVisibilityChange(post.id, true)}
                  disabled={updating === post.id}
                  className="text-xs text-emerald-600 font-medium transition hover:text-emerald-700 disabled:opacity-50"
                >
                  {updating === post.id ? "Возврат..." : "Вернуть"}
                </button>
              )}
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
          onClick={() => !updating && setConfirmId(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold">Скрыть пост?</h2>
              <p className="text-sm text-neutral-500">
                Пост пропадёт из каталога, но его можно будет вернуть позже.
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmId(null)}
                disabled={!!updating}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-sm hover:bg-neutral-50 transition disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                onClick={() => confirmPost && handleVisibilityChange(confirmPost.id, false)}
                disabled={!!updating || !confirmPost}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50"
              >
                {updating === confirmId ? "Скрытие..." : "Скрыть"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
