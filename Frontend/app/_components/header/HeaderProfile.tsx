"use client";

import Link from "next/link";

const HeaderProfile = () => {
  return (
    <div className="flex flex-row gap-2 items-center">
      {/* {isAuth ? (
        <Link
          href={"/"}
          className="text-primary text-right font-geist text-base font-bold w-30"
          onClick={logout}
        >
          Александр Петров
        </Link>
      ) : (
        <Link
          className="text-primary text-center font-geist font-bold text-2xl"
          href={"/login"}
        >
          Логин
        </Link>
      )}

      {isAuth && <div className="rounded-full bg-primary w-20 h-20"></div>} */}
    </div>
  );
};

export default HeaderProfile;
