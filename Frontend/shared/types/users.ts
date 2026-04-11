export type UserCreds = {
  username: string;
  password: string;
};

export type Role = "USER" | "MODERATOR" | "ADMIN";

export type User = {
  id: number;
  username: string;
  role: Role;
  avatar: string | null;
  createdAt: string;
};