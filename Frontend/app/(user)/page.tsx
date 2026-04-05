import { Heading } from "@/app/_components/typography/Heading";
import { fetchRecentPosts } from "@/shared/api/posts";
import KnowledgePostCard from "@/app/_components/shared/KnowledgePostCard";
import PostCard from "@/app/_components/shared/PostCard";

export default async function Home() {
  const posts = await fetchRecentPosts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Heading title="Главная" />
        <p className="text-sm text-neutral-500">Последние добавленные материалы</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-neutral-400">Материалов пока нет</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) =>
            post.subject ? (
              <PostCard
                key={post.id}
                post={post}
                universityId={post.subject.universityId}
                subjectId={post.subject.id}
                universityName={post.subject.university.name}
                subjectName={post.subject.name}
              />
            ) : (
              <KnowledgePostCard key={post.id} post={post} />
            ),
          )}
        </ul>
      )}
    </div>
  );
}