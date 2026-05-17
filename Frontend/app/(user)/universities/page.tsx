import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { fetchUniversities } from "@/shared/api/universities";
import { cookies } from "next/headers";
import AddUniversityButton from "./_components/AddUniversityButton";
import UniversityCard from "./_components/UniversityCard";

async function canEditUniversityAvatars() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return false;

  try {
    const { data } = await axiosApi.get<{ role: string }>(
      `${endpoints.auth}/me`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return ["ADMIN", "MODERATOR"].includes(data.role);
  } catch {
    return false;
  }
}

export const UniversitiesPage = async () => {
  const [universities, canEditAvatars] = await Promise.all([
    fetchUniversities(),
    canEditUniversityAvatars(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <AddUniversityButton />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {universities.map((university) => (
          <UniversityCard
            key={university.id}
            university={university}
            canEditAvatar={canEditAvatars}
          />
        ))}
      </ul>
    </div>
  );
};

export default UniversitiesPage;
