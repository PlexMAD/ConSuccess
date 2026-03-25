import { UserCreds } from "@/shared/types/users";
import axios from "axios";

type AuthResponse = { ok: true } | { message: string; ok: false };
type LoginResponse = AuthResponse;

type MeResponse = {
  ok: boolean;
  user?: { id: number; username: string; avatar: string | null };
  message?: string;
};

export const loginUser = async (data: UserCreds) => {
  const response = await axios.post<LoginResponse>("/api/auth/login", data, {
    withCredentials: true,
  });

  return response.data;
};

export const registerUser = async (data: UserCreds) => {
  const response = await axios.post<AuthResponse>("/api/auth/register", data, {
    withCredentials: true,
  });

  return response.data;
};

export const checkMe = async () => {
  const response = await axios.get<MeResponse>("/api/auth/me", {
    headers: {
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  return response.data
};
