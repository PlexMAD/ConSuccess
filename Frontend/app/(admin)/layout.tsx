import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  try {
    const { data } = await axiosApi.get<{ role: string }>(
      `${endpoints.auth}/me`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (!["ADMIN", "MODERATOR"].includes(data.role)) redirect("/");
  } catch {
    redirect("/login");
  }

  return <div className="h-full overflow-y-auto">{children}</div>;
};

export default AdminLayout;
