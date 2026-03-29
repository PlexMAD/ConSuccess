import { FavoritePost } from "@/shared/types/favorites";
import { axiosApi } from "../config";
import { endpoints } from "../endpoints";

export const fetchFavorites = async (accessToken: string) => {
  const { data } = await axiosApi.get<FavoritePost[]>(endpoints.favorites, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};
