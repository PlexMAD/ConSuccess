import { City } from "@/shared/types/universities";
import { axiosApi } from "../config";
import { endpoints } from "../endpoints";

export const fetchCities = async (): Promise<City[]> => {
  const response = await axiosApi.get<City[]>(endpoints.cities);
  return response.data;
};
