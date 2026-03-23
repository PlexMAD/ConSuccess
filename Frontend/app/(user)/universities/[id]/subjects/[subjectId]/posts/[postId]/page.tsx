import { fetchPost } from "@/shared/api/posts";
import Link from "next/link";
import ImageGallery from "./_components/ImageGallery";

const PostPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string; postId: string }>;
}) => {
  const { id, subjectId, postId } = await params;
  const post = await fetchPost(Number(subjectId), Number(postId));

  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full min-w-0">
      <Link
        href={`/universities/${id}/subjects/${subjectId}`}
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Назад
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold wrap-break-word">{post.title}</h1>
        <p className="text-xs text-neutral-400">
          {new Date(post.createdAt).toLocaleDateString("ru-RU")}
        </p>
      </div>

      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap wrap-break-word">
        {post.body}
      </p>

      {post.attachments.length > 0 && (
        <ImageGallery attachments={post.attachments} title={post.title} />
      )}
    </div>
  );
};

export default PostPage;
