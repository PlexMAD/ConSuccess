import { fetchKnowledgePosts } from "@/shared/api/posts";
import AddKnowledgePostButton from "./_components/AddKnowledgePostButton";
import KnowledgePostCard from "./_components/KnowledgePostCard";

const KnowledgePage = async () => {
  const posts = await fetchKnowledgePosts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Знания</h1>
        <p className="text-sm text-neutral-500">
          Полезные материалы, гайды и анонсы для студентов
        </p>
        <AddKnowledgePostButton />
      </div>

      {posts.length === 0 ? (
        <p className="text-neutral-400">Материалов пока нет</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <KnowledgePostCard key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default KnowledgePage;
