import { Role } from "./users";

export type TeacherApplicationStatus = "PENDING" | "APPROVED";

export type TeacherApplicationUser = {
  id: number;
  username: string;
  avatar: string | null;
  role: Role;
};

export type TeacherApplicationReviewer = {
  id: number;
  username: string;
  role: Role;
};

export type TeacherApplication = {
  id: number;
  userId: number;
  fullName: string;
  documentUrl: string;
  status: TeacherApplicationStatus;
  createdAt: string;
  reviewedAt: string | null;
  reviewedById: number | null;
  user?: TeacherApplicationUser;
  reviewer?: TeacherApplicationReviewer | null;
};
