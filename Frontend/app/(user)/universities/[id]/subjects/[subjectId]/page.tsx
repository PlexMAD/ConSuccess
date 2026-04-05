import { fetchPostsBySubject } from "@/shared/api/posts";
import { fetchSubjectsByUniversity, fetchSubject } from "@/shared/api/subjects";
import { fetchUniversities, fetchUniversity } from "@/shared/api/universities";
import Link from "next/link";
import AddPostButton from "./_components/AddPostButton";
import PostCard from "@/app/_components/shared/PostCard";

export async function generateStaticParams() {
  const universities = await fetchUniversities();
  const params = await Promise.all(
    universities.map(async (university) => {
      const subjects = await fetchSubjectsByUniversity(university.id);
      return subjects.map((subject) => ({
        id: String(university.id),
        subjectId: String(subject.id),
      }));
    }),
  );
  return params.flat();
}

const SubjectPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string }>;
}) => {
  const { id, subjectId } = await params;
  const universityId = Number(id);
  const subjectIdNum = Number(subjectId);

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
        <AddPostButton universityId={id} subjectId={subjectId} />
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
