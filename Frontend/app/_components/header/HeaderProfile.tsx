"use client";
import { checkMe } from "@/shared/api/auth";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeaderProfile = () => {
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const me = await checkMe();
        if (me.ok && me.user) {
          setUsername(me.user.username);
        } else {
          setUsername("");
        }
      } catch {
        setUsername("");
      }
    };
    fetchMe();
  }, []);
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } finally {
      setUsername("");
    }
  };
  return (
    <div className="flex flex-row gap-2 items-center">
      {username ? (
        <Link
          href="/"
          className="text-primary text-right font-geist text-base font-bold w-30"
          onClick={logout}
        >
          {username}
        </Link>
      ) : (
        <Link
          className="text-primary text-center font-geist font-bold text-2xl"
          href="/login"
        >
          Логин
        </Link>
      )}
      {username && <div className="rounded-full bg-primary w-20 h-20" />}
    </div>
  );
};
export default HeaderProfile;
