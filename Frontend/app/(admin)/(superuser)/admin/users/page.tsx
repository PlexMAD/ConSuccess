import { Heading } from "@/app/_components/typography/Heading";
import { axiosApi } from "@/shared/api/config";
import { User } from "@/shared/types/users";
import { cookies } from "next/headers";
import { UsersTable } from "./_components/UsersTable";

const AdminUsersPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")!.value;

  const { data: users } = await axiosApi.get<User[]>("/users", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return (
    <div className="flex flex-col gap-1 max-w-3xl">
      <Heading title="Пользователи" />
      <p className="text-sm text-slate-500 -mt-3 mb-6">
        Зарегистрировано: {users.length}
      </p>
      <UsersTable initialUsers={users} />
    </div>
  );
};

export default AdminUsersPage;