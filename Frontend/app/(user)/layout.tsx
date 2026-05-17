import React from "react";
import FavoritesSidebar from "./_components/FavoritesSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="hidden md:block"><FavoritesSidebar /></div>
      <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
    </div>
  );
};

export default layout;
