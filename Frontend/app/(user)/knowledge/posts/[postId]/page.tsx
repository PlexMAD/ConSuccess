import { axiosApi } from "@/shared/api/config";
import { fetchFavorites } from "@/shared/api/favorites";
import { fetchKnowledgePost } from "@/shared/api/posts";
import { endpoints } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import KnowledgePostDetail from "./_components/KnowledgePostDetail";

async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value ?? null;
}

async function getCurrentUserId(accessToken: string): Promise<number | null> {
  try {
    const { data } = await axiosApi.get<{ id: number }>(
      `${endpoints.auth}/me`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return data.id;
  } catch {
    return null;
  }
}

const KnowledgePostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;
  const accessToken = await getAccessToken();

  const [post, currentUserId, favorites] = await Promise.all([
    fetchKnowledgePost(Number(postId)),
    accessToken ? getCurrentUserId(accessToken) : Promise.resolve(null),
    accessToken
      ? fetchFavorites(accessToken).catch(() => [])
      : Promise.resolve([]),
  ]);

  const isOwner = currentUserId !== null && post.userId === currentUserId;
  const isFavorited = favorites.some((f) => f.postId === Number(postId));

  return (
    <KnowledgePostDetail
      post={post}
      isOwner={isOwner}
      isFavorited={isFavorited}
      isLoggedIn={accessToken !== null}
    />
  );
};

export default KnowledgePostPage;
