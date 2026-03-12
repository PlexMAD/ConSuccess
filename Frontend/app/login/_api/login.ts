import { UserCreds } from "@/shared/types/users";
import axios from "axios";

type LoginResponse = { ok: true } | { message: string; ok: false };

export const loginUser = async (data: UserCreds) => {
  const response = await axios.post<LoginResponse>("/api/auth/login", data, {
    withCredentials: true,
  });

  return response.data;
};
