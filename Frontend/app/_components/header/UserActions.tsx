"use client";

import { AvatarIcon, LogoutIcon } from "@/app/_icons";
import { apiURL } from "@/shared/api/config";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type User = { id: number; username: string; avatar: string | null };

const UserActions = ({ user }: { user: User }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
    router.refresh();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.patch(`/api/users/${user.id}/avatar`, formData);
      router.refresh();
    } catch {}

    e.target.value = "";
  };

  return (
    <div className="flex flex-row gap-3 items-center">
      <button
        onClick={() => fileInputRef.current?.click()}
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
};

export default UserActions;
