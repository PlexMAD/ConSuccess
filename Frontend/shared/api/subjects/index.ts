import { Subject } from "@/shared/types/universities";
import { axiosApi } from "../config";
import { endpoints } from "../endpoints";

export const fetchSubjectsByUniversity = async (universityId: number) => {
  const response = await axiosApi.get<Subject[]>(
    `${endpoints.universities}/${universityId}/subjects`,
  );
  return response.data;
};
