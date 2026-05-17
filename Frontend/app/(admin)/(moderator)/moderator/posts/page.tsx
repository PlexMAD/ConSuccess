import { Heading } from "@/app/_components/typography/Heading";
import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { RecentPost } from "@/shared/types/posts";
import { cookies } from "next/headers";
import Link from "next/link";
import { PostsList } from "./_components/PostsList";

const ModeratorPostsPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")!.value;

  const [{ data: posts }, { data: currentUser }] = await Promise.all([
    axiosApi.get<RecentPost[]>("/admin/posts", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    axiosApi.get<{ role: string }>(`${endpoints.auth}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  ]);

  return (
    <div className="flex flex-col gap-1 max-w-3xl">
      <Link
        href={currentUser.role === "ADMIN" ? "/admin" : "/"}
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Назад
      </Link>
      <Heading title="Все посты" />
      <p className="text-sm text-slate-500 -mt-3 mb-6">
        Скрытые посты остаются в списке, чтобы их можно было вернуть.
      </p>
      <PostsList initialPosts={posts} />
    </div>
  );
};

export default ModeratorPostsPage;
