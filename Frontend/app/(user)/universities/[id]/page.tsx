import { fetchSubjectsByUniversity } from "@/shared/api/subjects";
import { fetchUniversities, fetchUniversity } from "@/shared/api/universities";
import { cookies } from "next/headers";
import Link from "next/link";
import SubjectCard from "./_components/SubjectCard";

export async function generateStaticParams() {
  const universities = await fetchUniversities();

  return universities.map((university) => ({
    id: String(university.id),
  }));
}

const UniversityPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const universityId = Number(id);

  const cookieStore = await cookies();
  const isAuthorized = !!cookieStore.get("access_token");

  const [university, subjects] = await Promise.all([
    fetchUniversity(universityId),
    fetchSubjectsByUniversity(universityId),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{university.name} — Предметы</h1>
        <p className="text-sm text-neutral-500">{university.city.name}</p>
        {isAuthorized && (
          <Link
            className="self-start px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
            href={`/universities/${id}/add-subject`}
          >
            Добавить
          </Link>
        )}
      </div>

      {subjects.length === 0 ? (
        <p className="text-neutral-400">Предметов пока нет</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UniversityPage;
