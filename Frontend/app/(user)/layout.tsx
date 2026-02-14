import React from "react";
import Image from "next/image";
import Star from "../../assets/Star.svg";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="rounded-4xl h-175 bg-white w-50 mr-5 flex flex-col">
        <div className="bg-orange-400 w-full h-15 rounded-t-4xl flex items-center justify-center">
          <span className="flex items-center gap-3 text-white text-xl font-bold">
            <Image src={Star} width={32} height={32} alt={"star"} />
            Избранное
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;

