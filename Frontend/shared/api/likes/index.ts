import { PostLike } from "@/shared/types/likes";
import { axiosApi } from "../config";
import { endpoints } from "../endpoints";

export const fetchLikes = async (accessToken: string) => {
  const { data } = await axiosApi.get<PostLike[]>(endpoints.likes, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
