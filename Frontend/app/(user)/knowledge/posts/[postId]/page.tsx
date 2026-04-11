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

async function getCurrentUser(accessToken: string): Promise<{ id: number; role: string } | null> {
  try {
    const { data } = await axiosApi.get<{ id: number; role: string }>(
      `${endpoints.auth}/me`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return data;
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

  const [post, currentUser, favorites] = await Promise.all([
    fetchKnowledgePost(Number(postId)),
    accessToken ? getCurrentUser(accessToken) : Promise.resolve(null),
    accessToken
      ? fetchFavorites(accessToken).catch(() => [])
      : Promise.resolve([]),
  ]);

  const isOwner = currentUser !== null && post.userId === currentUser.id;
  const canModify = isOwner || ["ADMIN", "MODERATOR"].includes(currentUser?.role ?? "");
  const isFavorited = favorites.some((f: { postId: number }) => f.postId === Number(postId));

  return (
    <KnowledgePostDetail
      post={post}
      isOwner={canModify}
      isFavorited={isFavorited}
      isLoggedIn={accessToken !== null}
    />
  );
};

export default KnowledgePostPage;
