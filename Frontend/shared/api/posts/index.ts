import { Post, RecentPost } from "@/shared/types/posts";
import { axiosApi } from "../config";
import { endpoints } from "../endpoints";

export const fetchRecentPosts = async (limit = 20) => {
  const response = await axiosApi.get<RecentPost[]>(
    `${endpoints.posts}?limit=${limit}`,
  );
  return response.data;
};

const authHeaders = (accessToken?: string | null) =>
  accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;

export const fetchPostsBySubject = async (
  subjectId: number,
) => {
  const response = await axiosApi.get<Post[]>(
    `${endpoints.subjects}/${subjectId}/posts`,
  );
  return response.data;
};

export const fetchPrivatePostsBySubject = async (
  subjectId: number,
  accessToken: string,
) => {
  const response = await axiosApi.get<Post[]>(
    `${endpoints.subjects}/${subjectId}/posts/private`,
    { headers: authHeaders(accessToken) },
  );
  return response.data;
};

export const fetchPost = async (
  subjectId: number,
  postId: number,
  accessToken?: string | null,
) => {
  const response = await axiosApi.get<Post>(
    `${endpoints.subjects}/${subjectId}/posts/${postId}`,
    { headers: authHeaders(accessToken) },
  );
  return response.data;
};

export const fetchKnowledgePosts = async (limit = 20) => {
  const response = await axiosApi.get<Post[]>(
    `${endpoints.knowledgePosts}?limit=${limit}`,
  );
  return response.data;
};

export const fetchKnowledgePost = async (
  postId: number,
  accessToken?: string | null,
) => {
  const response = await axiosApi.get<Post>(
    `${endpoints.knowledgePosts}/${postId}`,
    { headers: authHeaders(accessToken) },
  );
  return response.data;
};
