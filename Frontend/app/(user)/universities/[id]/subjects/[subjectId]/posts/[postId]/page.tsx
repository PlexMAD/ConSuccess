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

const PostPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string; postId: string }>;
}) => {
  const { id, subjectId, postId } = await params;
  const accessToken = await getAccessToken();

  const [post, currentUser, favorites] = await Promise.all([
    fetchPost(Number(subjectId), Number(postId)),
    accessToken ? getCurrentUser(accessToken) : Promise.resolve(null),
    accessToken ? fetchFavorites(accessToken).catch(() => []) : Promise.resolve([]),
  ]);

  const isOwner = currentUser !== null && post.userId === currentUser.id;
  const canModify = isOwner || ["ADMIN", "MODERATOR"].includes(currentUser?.role ?? "");
  const isFavorited = favorites.some((f: { postId: number }) => f.postId === Number(postId));

  return (
    <PostDetail
      post={post}
      isOwner={canModify}
      isFavorited={isFavorited}
      isLoggedIn={accessToken !== null}
      universityId={id}
      subjectId={subjectId}
    />
  );
};

export default PostPage;
