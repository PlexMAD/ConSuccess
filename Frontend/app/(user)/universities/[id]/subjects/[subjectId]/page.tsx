import { fetchPostsBySubject } from "@/shared/api/posts";
import { fetchSubject } from "@/shared/api/subjects";
import { fetchUniversity } from "@/shared/api/universities";
import { cookies } from "next/headers";
import Link from "next/link";
import PostCard from "./_components/PostCard";

const SubjectPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string }>;
}) => {
  const { id, subjectId } = await params;
  const universityId = Number(id);
  const subjectIdNum = Number(subjectId);

  const cookieStore = await cookies();
  const isAuthorized = !!cookieStore.get("access_token");

  const [university, subject, posts] = await Promise.all([
    fetchUniversity(universityId),
    fetchSubject(universityId, subjectIdNum),
    fetchPostsBySubject(subjectIdNum),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link
          href={`/universities/${id}`}
          className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
        >
          ← Назад
        </Link>
        <h1 className="text-2xl font-bold">
          {university.name} — {subject.name}
        </h1>
        <p className="text-sm text-neutral-500"></p>
        {isAuthorized && (
          <Link
            className="self-start px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
            href={`/universities/${id}/subjects/${subjectId}/add-post`}
          >
            Добавить
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-neutral-400">Материалов пока нет</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              universityId={universityId}
              subjectId={subjectIdNum}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubjectPage;
