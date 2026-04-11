import { AdminIcon } from "@/app/_icons";
import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import UserActions from "./UserActions";

type User = { id: number; username: string; avatar: string | null; role: string };

const HeaderProfile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  let user: User | null = null;

  if (token) {
    try {
      const res = await axiosApi.get(`${endpoints.auth}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      user = res.data;
    } catch {
      user = null;
    }
  }

  if (user) {
    return (
      <>
        <UserActions user={user} />
        {user.role === "ADMIN" && (
          <Link
            href="/admin"
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            <Image src={AdminIcon} alt="Admin" width={16} height={16} className="invert" />
            Режим администратора
          </Link>
        )}
        {user.role === "MODERATOR" && (
          <Link
            href="/moderator/posts"
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            <Image src={AdminIcon} alt="Moderator" width={16} height={16} className="invert" />
            Режим модератора
          </Link>
        )}
      </>
    );
  }

  return (
    <Link className="text-primary text-center font-geist font-bold text-2xl" href="/login">
      Логин
    </Link>
  );
};

export default HeaderProfile;
