import Image from "next/image";
import React from "react";
import { Star } from "../_icons";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="rounded-4xl h-183 bg-white w-50 mr-5 flex flex-col shrink-0">
        <div className="bg-orange-400 w-full h-15 rounded-t-4xl flex items-center justify-center">
          <span className="flex items-center gap-3 text-white text-xl font-bold">
            <Image src={Star} width={32} height={32} alt={"star"} />
            Избранное
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
    </div>
  );
};

export default layout;
