"use client";
import { checkMe } from "@/shared/api/auth";
import { apiURL } from "@/shared/api/config";
import { AvatarIcon, LogoutIcon } from "@/app/_icons";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type User = { id: number; username: string; avatar: string | null };

const HeaderProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUser = () => {
    checkMe()
      .then((me) => setUser(me.ok && me.user ? me.user : null))
      .catch(() => setUser(null));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    router.refresh();
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.patch(`/api/users/${user.id}/avatar`, formData);
      fetchUser();
    } catch {}

    e.target.value = "";
  };

  if (user) {
    return (
      <div className="flex flex-row gap-3 items-center">
        <button
          onClick={handleAvatarClick}
          className="cursor-pointer rounded-full p-0.5 bg-primary shrink-0"
          title="Изменить аватар"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-white flex items-center justify-center">
            {user.avatar ? (
              <Image
                src={`${apiURL}${user.avatar}`}
                alt={user.username}
                width={36}
                height={36}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <Image src={AvatarIcon} alt="Аватар" width={24} height={24} />
            )}
          </div>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <span className="font-geist text-base font-bold text-primary">
          {user.username}
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
