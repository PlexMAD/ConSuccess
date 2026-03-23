import { Post } from "@/shared/types/universities";
import { axiosApi } from "../config";
import { endpoints } from "../endpoints";

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
