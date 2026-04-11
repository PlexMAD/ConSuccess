import { fetchFavorites } from "@/shared/api/favorites";
import { cookies } from "next/headers";
import React from "react";
import FavoritesSidebar from "./_components/FavoritesSidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const favorites = accessToken
    ? await fetchFavorites(accessToken).catch(() => [])
    : [];

  return (
    <div className="flex h-full overflow-hidden">
      <div className="hidden md:block"><FavoritesSidebar initialFavorites={favorites} /></div>
      <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
    </div>
  );
};

export default layout;
