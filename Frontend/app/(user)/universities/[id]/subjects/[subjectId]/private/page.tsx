import PostCard from "@/app/_components/shared/PostCard";
import { fetchPrivatePostsBySubject } from "@/shared/api/posts";
import { fetchSubject } from "@/shared/api/subjects";
import { fetchUniversity } from "@/shared/api/universities";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const PrivateSubjectPostsPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string }>;
}) => {
  const { id, subjectId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const universityId = Number(id);
  const subjectIdNum = Number(subjectId);

  const [university, subject, posts] = await Promise.all([
    fetchUniversity(universityId),
    fetchSubject(universityId, subjectIdNum),
    fetchPrivatePostsBySubject(subjectIdNum, accessToken),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link
          href={`/universities/${id}/subjects/${subjectId}`}
          className="self-start text-sm text-neutral-500 transition hover:text-neutral-800"
        >
          ← Назад
        </Link>
        <h1 className="text-2xl font-bold">
          {university.name} — {subject.name}
        </h1>
        <p className="text-sm text-neutral-500">Мои личные материалы</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-neutral-400">Личных материалов пока нет</p>
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

export default PrivateSubjectPostsPage;
