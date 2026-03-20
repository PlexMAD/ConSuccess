import { University } from "@/shared/types/universities";
import { axiosApi } from "../config";
import { endpoints } from "../endpoints";

export const fetchUniversities = async () => {
  const responce = await axiosApi.get<University[]>(
    `${endpoints.universities}`,
  );
  return responce.data;
};

export const fetchUniversity = async (id: number) => {
  const response = await axiosApi.get<University>(
    `${endpoints.universities}/${id}`,
  );
  return response.data;
};
