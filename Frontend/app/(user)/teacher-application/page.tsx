import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { TeacherApplication } from "@/shared/types/teacher-applications";
import { Role } from "@/shared/types/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TeacherApplicationForm from "./_components/TeacherApplicationForm";

type CurrentUser = {
  id: number;
  username: string;
  role: Role;
};

const TeacherApplicationPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  let currentUser: CurrentUser;
  let application: TeacherApplication | null = null;

  try {
    const [{ data: user }, { data: userApplication }] = await Promise.all([
      axiosApi.get<CurrentUser>(`${endpoints.auth}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      axiosApi.get<TeacherApplication | null>(`${endpoints.teacherApplications}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    currentUser = user;
    application = userApplication;
  } catch {
    redirect("/login");
  }

  return (
    <TeacherApplicationForm
      currentRole={currentUser.role}
      initialApplication={application}
    />
  );
};

export default TeacherApplicationPage;
