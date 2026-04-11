"use client";

import { apiURL } from "@/shared/api/config";
import { Post } from "@/shared/types/posts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeletePostButton from "./DeletePostButton";
import EditPostForm from "./EditPostForm";
import FavoriteButton from "@/app/_components/shared/FavoriteButton";
import ImageGallery from "@/app/_components/shared/ImageGallery";

const PostDetail = ({
  post,
  isOwner,
  isFavorited,
  isLoggedIn,
  universityId,
  subjectId,
}: {
  post: Post;
  isOwner: boolean;
  isFavorited: boolean;
  isLoggedIn: boolean;
  universityId: string;
  subjectId: string;
}) => {
  const [editMode, setEditMode] = useState(false);
  const backHref = `/universities/${universityId}/subjects/${subjectId}`;

  if (editMode) {
    return (
      <div className="flex flex-col gap-4 max-w-8xl w-full min-w-0">
        <EditPostForm
          postId={post.id}
          subjectId={subjectId}
          initialTitle={post.title}
          initialBody={post.body}
          attachments={post.attachments}
          onCancel={() => setEditMode(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-8xl w-full min-w-0">
      <Link
        href={backHref}
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Назад
      </Link>

      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-2xl font-bold wrap-break-word min-w-0 break-all">{post.title}</h1>
            <div className="flex items-center gap-3 shrink-0 sm:pt-1">
              {isLoggedIn && (
                <FavoriteButton postId={post.id} initialIsFavorited={isFavorited} />
              )}
              {isOwner && (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-sm text-neutral-500 hover:text-neutral-800 transition"
                  >
                    Редактировать
                  </button>
                  <DeletePostButton
                    postId={post.id}
                    subjectId={subjectId}
                    backHref={backHref}
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {post.user && (
              <>
                {post.user.avatar ? (
                  <Image
                    src={`${apiURL}${post.user.avatar}`}
                    alt={post.user.username}
                    width={18}
                    height={18}
                    unoptimized
                    className="rounded-full object-cover w-4.5 h-4.5"
                  />
                ) : (
                  <div className="w-4.5 h-4.5 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-semibold text-neutral-500 shrink-0">
                    {post.user.username[0].toUpperCase()}
                  </div>
                )}
                <span className="text-xs text-neutral-500">
                  {post.user.username}
                </span>
                <span className="text-xs text-neutral-300">·</span>
              </>
            )}
            <p className="text-xs text-neutral-400">
              {new Date(post.createdAt).toLocaleDateString("ru-RU")}
            </p>
          </div>
        </div>

        <div className="max-h-92 overflow-y-auto pr-1">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap wrap-break-word">
            {post.body}
          </p>
        </div>
      </div>

      {post.attachments.length > 0 && (
        <ImageGallery attachments={post.attachments} title={post.title} />
      )}
    </div>
  );
};

export default PostDetail;
