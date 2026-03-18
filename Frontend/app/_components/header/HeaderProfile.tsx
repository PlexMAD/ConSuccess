"use client";
import { checkMe } from "@/shared/api/auth";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogoutIcon } from "@/app/_icons";
import { useRouter } from "next/navigation";

const HeaderProfile = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    checkMe()
      .then((me) => setUsername(me.ok && me.user ? me.user.username : null))
      .catch(() => setUsername(null));
  }, []);

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUsername(null);
    router.refresh();
  };

  if (username) {
    return (
      <div className="flex flex-row gap-3 items-center">
        <div className="rounded-full bg-primary w-10 h-10" />
        <span className="font-geist text-base font-bold text-primary">
          {username}
        </span>
        <button onClick={logout} title="Выйти" className="cursor-pointer">
          <Image src={LogoutIcon} alt="Выйти" width={20} height={20} />
        </button>
      </div>
    );
  }

  return (
    <Link
      className="text-primary text-center font-geist font-bold text-2xl"
      href="/login"
    >
      Логин
    </Link>
  );
};

export default HeaderProfile;
