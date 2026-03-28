import { fetchPost } from "@/shared/api/posts";
import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import PostDetail from "./_components/PostDetail";

async function getCurrentUserId(): Promise<number | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) return null;
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

  const [post, currentUserId] = await Promise.all([
    fetchPost(Number(subjectId), Number(postId)),
    getCurrentUserId(),
  ]);

  const isOwner = currentUserId !== null && post.userId === currentUserId;

  return (
    <PostDetail
      post={post}
      isOwner={isOwner}
      universityId={id}
      subjectId={subjectId}
    />
  );
};

export default PostPage;
