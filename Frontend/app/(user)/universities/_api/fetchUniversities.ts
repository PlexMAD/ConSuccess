import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { University } from "@/shared/types/universities";

export const fetchUniversities = async () => {
  const responce = await axiosApi.get<University[]>(
    `${endpoints.universities}`,
  );
  return responce.data;
};
