import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import Link from "next/link";
import { cookies } from "next/headers";
import UserActions from "./UserActions";

type User = { id: number; username: string; avatar: string | null };

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
    return <UserActions user={user} />;
  }

  return (
    <Link className="text-primary text-center font-geist font-bold text-2xl" href="/login">
      Логин
    </Link>
  );
};

export default HeaderProfile;
