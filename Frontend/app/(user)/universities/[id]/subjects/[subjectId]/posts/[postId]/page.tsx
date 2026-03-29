import { fetchPost } from "@/shared/api/posts";
import { fetchFavorites } from "@/shared/api/favorites";
import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import PostDetail from "./_components/PostDetail";

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

const PostPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string; postId: string }>;
}) => {
  const { id, subjectId, postId } = await params;
  const accessToken = await getAccessToken();

  const [post, currentUserId, favorites] = await Promise.all([
    fetchPost(Number(subjectId), Number(postId)),
    accessToken ? getCurrentUserId(accessToken) : Promise.resolve(null),
    accessToken ? fetchFavorites(accessToken).catch(() => []) : Promise.resolve([]),
  ]);

  const isOwner = currentUserId !== null && post.userId === currentUserId;
  const isFavorited = favorites.some((f) => f.postId === Number(postId));

  return (
    <PostDetail
      post={post}
      isOwner={isOwner}
      isFavorited={isFavorited}
      isLoggedIn={accessToken !== null}
      universityId={id}
      subjectId={subjectId}
    />
  );
};

export default PostPage;
