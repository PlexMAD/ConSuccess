import {
  fetchPostsBySubject,
  fetchPrivatePostsBySubject,
} from "@/shared/api/posts";
import { fetchSubject } from "@/shared/api/subjects";
import { fetchUniversity } from "@/shared/api/universities";
import { cookies } from "next/headers";
import Link from "next/link";
import AddPostButton from "./_components/AddPostButton";
import PrivatePostsButton from "./_components/PrivatePostsButton";
import PostCard from "@/app/_components/shared/PostCard";

export const dynamic = "force-dynamic";

const SubjectPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string }>;
}) => {
  const { id, subjectId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const universityId = Number(id);
  const subjectIdNum = Number(subjectId);

  const privatePostsCountPromise = accessToken
    ? fetchPrivatePostsBySubject(subjectIdNum, accessToken)
        .then((privatePosts) => privatePosts.length)
        .catch(() => 0)
    : Promise.resolve(0);

  const [university, subject, posts, privatePostsCount] = await Promise.all([
    fetchUniversity(universityId),
    fetchSubject(universityId, subjectIdNum),
    fetchPostsBySubject(subjectIdNum),
    privatePostsCountPromise,
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
        <div className="flex flex-wrap gap-2">
          <AddPostButton universityId={id} subjectId={subjectId} />
          <PrivatePostsButton
            universityId={id}
            subjectId={subjectId}
            count={privatePostsCount}
          />
        </div>
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
