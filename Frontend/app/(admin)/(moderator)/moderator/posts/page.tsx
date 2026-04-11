import { Heading } from "@/app/_components/typography/Heading";
import { axiosApi } from "@/shared/api/config";
import { RecentPost } from "@/shared/types/posts";
import { cookies } from "next/headers";
import { PostsList } from "./_components/PostsList";

const ModeratorPostsPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")!.value;

  const { data: posts } = await axiosApi.get<RecentPost[]>("/admin/posts", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return (
    <div className="flex flex-col gap-1 max-w-3xl">
      <Heading title="Все посты" />
      <p className="text-sm text-slate-500 -mt-3 mb-6">
        Опубликовано: {posts.length}
      </p>
      <PostsList initialPosts={posts} />
    </div>
  );
};

export default ModeratorPostsPage;