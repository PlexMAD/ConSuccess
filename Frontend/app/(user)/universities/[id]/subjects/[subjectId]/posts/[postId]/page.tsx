import { fetchPostsBySubject, fetchPost } from "@/shared/api/posts";
import { fetchSubjectsByUniversity } from "@/shared/api/subjects";
import { fetchUniversities } from "@/shared/api/universities";
import Link from "next/link";
import ImageGallery from "./_components/ImageGallery";

export async function generateStaticParams() {
  const universities = await fetchUniversities();
  const params = await Promise.all(
    universities.map(async (university) => {
      const subjects = await fetchSubjectsByUniversity(university.id);
      return Promise.all(
        subjects.map(async (subject) => {
          const posts = await fetchPostsBySubject(subject.id);
          return posts.map((post) => ({
            id: String(university.id),
            subjectId: String(subject.id),
            postId: String(post.id),
          }));
        }),
      );
    }),
  );
  return params.flat(2);
}

const PostPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string; postId: string }>;
}) => {
  const { id, subjectId, postId } = await params;
  const post = await fetchPost(Number(subjectId), Number(postId));

  return (
    <div className="flex flex-col gap-4 max-w-8xl w-full min-w-0">
      <Link
        href={`/universities/${id}/subjects/${subjectId}`}
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Назад
      </Link>

      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold wrap-break-word">{post.title}</h1>
          <p className="text-xs text-neutral-400">
            {new Date(post.createdAt).toLocaleDateString("ru-RU")}
          </p>
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

export default PostPage;
