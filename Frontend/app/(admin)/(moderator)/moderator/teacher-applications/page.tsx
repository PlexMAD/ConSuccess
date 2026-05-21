import { Heading } from "@/app/_components/typography/Heading";
import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { TeacherApplication } from "@/shared/types/teacher-applications";
import { cookies } from "next/headers";
import Link from "next/link";
import TeacherApplicationsList from "./_components/TeacherApplicationsList";

const TeacherApplicationsPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")!.value;

  const [{ data: applications }, { data: currentUser }] = await Promise.all([
    axiosApi.get<TeacherApplication[]>(endpoints.teacherApplications, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    axiosApi.get<{ role: string }>(`${endpoints.auth}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  ]);

  const pendingCount = applications.filter((item) => item.status === "PENDING").length;

  return (
    <div className="flex flex-col gap-1 max-w-4xl">
      <Link
        href={currentUser.role === "ADMIN" ? "/admin" : "/moderator"}
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Назад
      </Link>
      <Heading title="Заявки преподавателей" />
      <p className="text-sm text-slate-500 -mt-3 mb-6">
        Ожидают проверки: {pendingCount} · Всего: {applications.length}
      </p>
      <TeacherApplicationsList initialApplications={applications} />
    </div>
  );
};

export default TeacherApplicationsPage;
