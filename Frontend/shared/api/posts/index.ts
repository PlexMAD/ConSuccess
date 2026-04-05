import { Post, RecentPost } from "@/shared/types/posts";
import { axiosApi } from "../config";
import { endpoints } from "../endpoints";

export const fetchRecentPosts = async (limit = 20) => {
  const response = await axiosApi.get<RecentPost[]>(
    `${endpoints.posts}?limit=${limit}`,
  );
  return response.data;
};

export const fetchPostsBySubject = async (subjectId: number) => {
  const response = await axiosApi.get<Post[]>(
    `${endpoints.subjects}/${subjectId}/posts`,
  );
  return response.data;
};

export const fetchPost = async (subjectId: number, postId: number) => {
  const response = await axiosApi.get<Post>(
    `${endpoints.subjects}/${subjectId}/posts/${postId}`,
  );
  return response.data;
};

export const fetchKnowledgePosts = async (limit = 20) => {
  const response = await axiosApi.get<Post[]>(
    `${endpoints.knowledgePosts}?limit=${limit}`,
  );
  return response.data;
};

export const fetchKnowledgePost = async (postId: number) => {
  const response = await axiosApi.get<Post>(
    `${endpoints.knowledgePosts}/${postId}`,
  );
  return response.data;
};
