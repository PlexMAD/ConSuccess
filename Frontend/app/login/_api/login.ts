import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";

export const loginUser = async (data: UserCreds) => {
  const responce = await axiosApi.post<string>(`${endpoints.auth}/login`, data);
  return responce.data;
};
